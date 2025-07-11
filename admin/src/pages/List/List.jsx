import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  // const url = 'http://localhost:4000';
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching data');
      }
    } catch (err) {
      toast.error('Fetch failed');
      console.error(err);
    }
  };


const removeFood=async(foodId)=>{
const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
await fetchList();
if(response.data.success){
  toast.success(response.data.message)
}else{
  toast.error("Error")
}
}


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 w-full max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Food List</h2>

      {/* Header */}
      <div className="flex items-center text-base font-semibold border-b pb-2 mb-3 w-full">
        <div className="w-[15%]">Image</div>
        <div className="w-[25%] pl-8">Name</div>
        <div className="w-[20%]">Category</div>
        <div className="w-[20%]">Price</div>
        <div className="w-[20%]">Action</div>
      </div>

      {/* Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="flex items-center border-b py-3 w-full text-sm"
        >
          <div className="w-[15%] pr-4">
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="w-full h-[80px] object-cover rounded"
            />
          </div>
          <div className="w-[35%] pr-4 pl-[50px]">{item.name}</div>
          <div className="w-[20%] pr-4">{item.category}</div>
          <div className="w-[20%] pr-4">₹{item.price}</div>
          <div className="w-[20%]">
            <button onClick={()=>removeFood(item._id)} className="text-red-600 font-bold hover:text-red-800">
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
