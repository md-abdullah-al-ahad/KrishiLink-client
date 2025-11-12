import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCrops } from "../utils/api";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const data = await getAllCrops();
        setCrops(data || []);
        setFilteredCrops(data || []);
      } catch (error) {
        console.error("Error fetching crops:", error);
        setCrops([]);
        setFilteredCrops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCrops(crops);
    } else {
      const filtered = crops.filter((crop) =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCrops(filtered);
    }
  }, [searchQuery, crops]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-12 bg-base-300 rounded-lg w-full animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl animate-pulse"
            >
              <figure className="h-48 bg-base-300"></figure>
              <div className="card-body">
                <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-2/3 mb-2"></div>
                <div className="h-10 bg-base-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Crops</h1>
        <p className="text-base-content/70 mb-6">
          Browse all available crops from our farming community
        </p>

        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search crops by name..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square btn-primary">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {searchQuery && (
          <div className="mt-4 text-sm text-base-content/60">
            {filteredCrops.length}{" "}
            {filteredCrops.length === 1 ? "result" : "results"} found for "
            {searchQuery}"
          </div>
        )}
      </div>

      {filteredCrops.length === 0 ? (
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-2xl font-semibold text-base-content/60 mb-2">
            {searchQuery ? "No crops found" : "No crops available"}
          </p>
          <p className="text-base-content/50 mb-6">
            {searchQuery
              ? `Try searching with different keywords`
              : "Be the first to add a crop to the marketplace"}
          </p>
          {!searchQuery && (
            <Link to="/add-crop" className="btn btn-primary gap-2">
              Add Your Crop
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
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <div
              key={crop._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
              }}
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  {crop.name}
                  <div className="badge badge-secondary">{crop.type}</div>
                </h3>

                <div className="space-y-2 my-2">
                  <div className="flex items-center gap-2 text-primary font-semibold text-lg">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      ₹{crop.pricePerUnit}/{crop.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-base-content/70">
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
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>
                      {crop.quantity} {crop.unit} available
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-base-content/70">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{crop.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-base-content/70">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{crop.owner?.ownerName || "Unknown"}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/crops/${crop._id}`}
                    className="btn btn-primary w-full gap-2"
                  >
                    View Details
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllCrops;
