import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyCrops, updateCrop, deleteCrop } from "../utils/api";

const MyPosts = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCrop, setEditingCrop] = useState(null);
  const [deletingCrop, setDeletingCrop] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchMyCrops = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const data = await getMyCrops(user.email);
      setCrops(data || []);
    } catch (error) {
      console.error("Error fetching crops:", error);
      setCrops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCrops();
  }, [user]);

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    reset({
      name: crop.name,
      type: crop.type,
      pricePerUnit: crop.pricePerUnit,
      unit: crop.unit,
      quantity: crop.quantity,
      description: crop.description,
      location: crop.location,
      image: crop.image,
    });
  };

  const onEditSubmit = async (data) => {
    try {
      const updateData = {
        name: data.name,
        type: data.type,
        pricePerUnit: parseFloat(data.pricePerUnit),
        unit: data.unit,
        quantity: parseFloat(data.quantity),
        description: data.description,
        location: data.location,
        image: data.image,
      };

      await updateCrop(editingCrop._id, updateData);
      setEditingCrop(null);
      reset();
      fetchMyCrops();
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCrop(deletingCrop._id);
      setDeletingCrop(null);
      fetchMyCrops();
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 bg-base-300 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-base-300 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Posts</h1>
          <p className="text-base-content/70">
            Manage your crop listings ({crops.length})
          </p>
        </div>
        <Link to="/add-crop" className="btn btn-primary gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Crop
        </Link>
      </div>

      {crops.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-base-content/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-2xl font-semibold text-base-content/60 mb-2">
            You haven't posted any crops yet
          </p>
          <p className="text-base-content/50 mb-6">
            Start by adding your first crop listing
          </p>
          <Link to="/add-crop" className="btn btn-primary gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Your First Crop
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((crop) => (
                  <tr key={crop._id}>
                    <td>
                      <div className="avatar">
                        <div className="w-16 h-16 rounded">
                          <img src={crop.image} alt={crop.name} />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{crop.name}</td>
                    <td>
                      <div className="badge badge-secondary">{crop.type}</div>
                    </td>
                    <td className="text-primary font-semibold">
                      ₹{crop.pricePerUnit}/{crop.unit}
                    </td>
                    <td>
                      {crop.quantity} {crop.unit}
                    </td>
                    <td>{crop.location}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(crop)}
                          className="btn btn-sm btn-ghost gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingCrop(crop)}
                          className="btn btn-sm btn-ghost text-error gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {crops.map((crop) => (
              <div key={crop._id} className="card bg-base-100 shadow-xl">
                <figure className="h-48">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">
                    {crop.name}
                    <div className="badge badge-secondary">{crop.type}</div>
                  </h3>
                  <div className="space-y-2">
                    <p className="text-primary font-semibold text-lg">
                      ₹{crop.pricePerUnit}/{crop.unit}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Quantity:</span>{" "}
                      {crop.quantity} {crop.unit}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {crop.location}
                    </p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleEdit(crop)}
                      className="btn btn-sm btn-primary gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingCrop(crop)}
                      className="btn btn-sm btn-error gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editingCrop && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-2xl mb-4">Edit Crop</h3>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Crop Name</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.name.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Type</span>
                  </label>
                  <select
                    className={`select select-bordered ${
                      errors.type ? "select-error" : ""
                    }`}
                    {...register("type", { required: "Type is required" })}
                  >
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Grain">Grain</option>
                    <option value="Cash Crop">Cash Crop</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Price per Unit (₹)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className={`input input-bordered ${
                      errors.pricePerUnit ? "input-error" : ""
                    }`}
                    {...register("pricePerUnit", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Unit</span>
                  </label>
                  <select
                    className={`select select-bordered ${
                      errors.unit ? "select-error" : ""
                    }`}
                    {...register("unit", { required: "Unit is required" })}
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="ton">Ton</option>
                    <option value="bag">Bag</option>
                    <option value="quintal">Quintal</option>
                    <option value="piece">Piece</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Quantity</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className={`input input-bordered ${
                      errors.quantity ? "input-error" : ""
                    }`}
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: 0.01,
                        message: "Quantity must be greater than 0",
                      },
                    })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Location</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered ${
                      errors.location ? "input-error" : ""
                    }`}
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image URL</span>
                </label>
                <input
                  type="url"
                  className={`input input-bordered ${
                    errors.image ? "input-error" : ""
                  }`}
                  {...register("image", { required: "Image URL is required" })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  className={`textarea textarea-bordered h-24 ${
                    errors.description ? "textarea-error" : ""
                  }`}
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 20, message: "Minimum 20 characters" },
                  })}
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setEditingCrop(null);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Crop"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setEditingCrop(null)}
          ></div>
        </div>
      )}

      {deletingCrop && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Confirm Delete</h3>
            <div className="py-4">
              <p className="mb-4">Are you sure you want to delete this crop?</p>
              <div className="bg-base-200 rounded-lg p-4">
                <p className="font-semibold text-lg">{deletingCrop.name}</p>
                <p className="text-sm text-base-content/70">
                  {deletingCrop.type}
                </p>
              </div>
              <p className="text-sm text-error mt-4">
                ⚠️ This action cannot be undone. All interests for this crop
                will also be deleted.
              </p>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setDeletingCrop(null)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setDeletingCrop(null)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
