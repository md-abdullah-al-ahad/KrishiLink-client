import { useParams } from "react-router";

const CropDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Crop Details</h1>
      <p className="text-gray-600">Details for crop ID: {id}</p>
    </div>
  );
};

export default CropDetails;
