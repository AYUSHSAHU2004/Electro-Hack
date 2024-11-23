import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthHome = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("user");
  const [data, setData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("updates");
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useState();
  const [dep, setDep] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const datas = await axios.get(
        `http://localhost:5000/users/checkAuth/${email}`
      );
      if (datas) {
        setLoc(datas.data.Location);
        setDep(datas.data.Department);
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/getProblem/${datas.data.Location}/${datas.data.Department}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchOtherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/getCompleteProblem/${loc}/${dep}`
        );
        setOtherData(response.data.data);
      } catch (err) {
        console.error("Error fetching other data:", err);
      }
    };

    fetchData();
    fetchOtherData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data.length === 0) return <p>No data available.</p>;

  const renderContent = () => {
    const currentData = activeTab === "updates" ? data : otherData;
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentData && currentData.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full"
            >
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                <img
                  src={item.imageUrl}
                  alt="card-image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.tags}
                  </p>
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.location}
                  </p>
                </div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                  {item.problemDetail}
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button"
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getTitle = () => {
    if (activeTab === "updates") {
      return "Pending Issues";
    } else if (activeTab === "other") {
      return "Solved Issues";
    }
    return "Content";
  };

  return (
    <div className="container mx-auto text-center px-2">
      <div className="mb-4 mt-6">
        <button
          onClick={() => setActiveTab("updates")}
          className={`p-2 rounded ${
            activeTab === "updates"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } mx-2`}
        >
          Locality Issues
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={`p-2 rounded ${
            activeTab === "other"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } mx-2`}
        >
          Solved Issues
        </button>
      </div>
      <h2 className="text-black text-xl md:text-2xl mt-2 mb-2">{getTitle()}</h2>
      {renderContent()}
    </div>
  );
};

export default AuthHome;