import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel edit - reset to original values
      setDisplayName(user?.displayName || "");
      setPhotoURL(user?.photoURL || "");
    }
    setIsEditMode(!isEditMode);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null,
      });

      // Update local user state
      setUser({
        ...user,
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null,
      });

      toast.success("Profile updated successfully!");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar Section */}
              <div className="shrink-0">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                      />
                    ) : (
                      <div className="bg-primary text-primary-content flex items-center justify-center text-4xl font-bold">
                        {getInitials(user?.displayName || user?.email)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="grow w-full">
                {isEditMode ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Photo URL
                        </span>
                      </label>
                      <input
                        type="url"
                        className="input input-bordered"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                      />
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">
                          Optional: Enter a URL for your profile photo
                        </span>
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Email</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered bg-base-200"
                        value={user?.email || ""}
                        disabled
                      />
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">
                          Email cannot be changed
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="btn btn-primary gap-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Saving...
                          </>
                        ) : (
                          <>
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="btn btn-ghost gap-2"
                        disabled={loading}
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        {user?.displayName || "Anonymous User"}
                      </h2>
                      <p className="text-base-content/70">{user?.email}</p>
                    </div>

                    <div className="divider"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Account Type</div>
                        <div className="stat-value text-2xl">
                          {user?.emailVerified ? "Verified" : "Unverified"}
                        </div>
                        <div className="stat-desc">
                          {user?.emailVerified
                            ? "Email verified ✓"
                            : "Email not verified"}
                        </div>
                      </div>

                      <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">Member Since</div>
                        <div className="stat-value text-2xl">
                          {user?.metadata?.creationTime
                            ? new Date(
                                user.metadata.creationTime
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </div>
                        <div className="stat-desc">
                          Joined{" "}
                          {user?.metadata?.creationTime
                            ? new Date(
                                user.metadata.creationTime
                              ).toLocaleDateString()
                            : "recently"}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleEditToggle}
                      className="btn btn-primary gap-2"
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h3 className="card-title mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-base-300">
                <span className="text-base-content/70">User ID</span>
                <span className="font-mono text-sm">
                  {user?.uid?.slice(0, 20)}...
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-base-300">
                <span className="text-base-content/70">Provider</span>
                <span className="badge badge-outline">
                  {user?.providerData?.[0]?.providerId === "google.com"
                    ? "Google"
                    : "Email/Password"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-base-content/70">Last Sign In</span>
                <span className="text-sm">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
