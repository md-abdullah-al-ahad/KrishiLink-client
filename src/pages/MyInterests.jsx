import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyInterests } from "../utils/api";

const MyInterests = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("status");

  const fetchMyInterests = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const data = await getMyInterests(user.email);
      setInterests(data || []);
      setFilteredInterests(data || []);
    } catch (error) {
      console.error("Error fetching interests:", error);
      setInterests([]);
      setFilteredInterests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInterests();
  }, [user]);

  useEffect(() => {
    if (sortBy === "status") {
      const sorted = [...interests].sort((a, b) => {
        const statusOrder = { pending: 1, accepted: 2, rejected: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      setFilteredInterests(sorted);
    } else {
      setFilteredInterests([...interests]);
    }
  }, [sortBy, interests]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <div className="badge badge-warning">Pending</div>;
      case "accepted":
        return <div className="badge badge-success">Accepted</div>;
      case "rejected":
        return <div className="badge badge-error">Rejected</div>;
      default:
        return <div className="badge">{status}</div>;
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Interests</h1>
        <p className="text-base-content/70">
          Crops you've shown interest in ({filteredInterests.length})
        </p>
      </div>

      {interests.length === 0 ? (
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-2xl font-semibold text-base-content/60 mb-2">
            You haven't expressed interest in any crops yet
          </p>
          <p className="text-base-content/50 mb-6">
            Browse crops and connect with farmers
          </p>
          <Link to="/all-crops" className="btn btn-primary gap-2">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Browse Crops
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Sort by</span>
              </label>
              <select
                className="select select-bordered"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="status">Status (Pending First)</option>
                <option value="date">Date Added</option>
              </select>
            </div>
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Crop Name</th>
                  <th>Owner</th>
                  <th>Quantity</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterests.map((interest) => (
                  <tr key={interest._id}>
                    <td>
                      <Link
                        to={`/crops/${interest.cropId}`}
                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-semibold"
                      >
                        {interest.cropName}
                      </Link>
                    </td>
                    <td>
                      <div>
                        <p className="font-semibold">{interest.ownerName}</p>
                        <a
                          href={`mailto:${interest.ownerEmail}`}
                          className="link link-primary text-sm"
                        >
                          {interest.ownerEmail}
                        </a>
                      </div>
                    </td>
                    <td className="font-semibold">{interest.quantity}</td>
                    <td>
                      {interest.message ? (
                        <p
                          className="max-w-xs truncate"
                          title={interest.message}
                        >
                          {interest.message}
                        </p>
                      ) : (
                        <span className="text-base-content/50 italic">
                          No message
                        </span>
                      )}
                    </td>
                    <td>{getStatusBadge(interest.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {filteredInterests.map((interest) => (
              <div key={interest._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-3">
                    <Link
                      to={`/crops/${interest.cropId}`}
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-bold text-lg"
                    >
                      {interest.cropName}
                    </Link>
                    {getStatusBadge(interest.status)}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-base-content/60">Owner</p>
                      <p className="font-semibold">{interest.ownerName}</p>
                      <a
                        href={`mailto:${interest.ownerEmail}`}
                        className="link link-primary text-sm"
                      >
                        {interest.ownerEmail}
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/60">Quantity</p>
                      <p className="font-semibold">{interest.quantity}</p>
                    </div>

                    {interest.message && (
                      <div>
                        <p className="text-sm text-base-content/60">Message</p>
                        <p className="text-sm">{interest.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/crops/${interest.cropId}`}
                      className="btn btn-sm btn-primary gap-2"
                    >
                      View Crop
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
        </>
      )}
    </div>
  );
};

export default MyInterests;
