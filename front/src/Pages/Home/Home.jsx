import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)



  useEffect(() => { const fetchData = async () => {
    setLoading(true)
     try { 
      const response = await axios.get('http://localhost:5000/problems/getAllProblem'); 
     setData(response.data.data); 
     setLoading(false); 
    } catch (err) {
       setError(err.message); 
       setLoading(false); 
      } };
      fetchData(); 
    }, []);

    if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;
      if (data.length === 0) return <p>No data available.</p>;

  return (
    <div class="container mx-auto text-center px-2">
      <h2 className='text-black text-xl md:text-2xl mt-2 mb-2'>All Updates</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
              <div key={index} class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
              <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                <img
                  src={item.imageUrl}
                  alt="card-image" class="object-cover w-full h-full" />
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.tags}
                  </p>
                  <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.location}
                  </p>
                </div>
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                  {item.problemDetail}
                </p>
              </div>
              <div class="p-6 pt-0">
                <button
                  class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button">
                  learn more
                </button>
              </div>
            </div>
      ))}
      <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
            alt="card-image" class="object-cover w-full h-full" />
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-2">
            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Road Issue
            </p>
            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Keonjhar
            </p>
          </div>
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae suscipit sequi totam nam culpa sint?
          </p>
        </div>
        <div class="p-6 pt-0">
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            type="button">
            learn more
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
