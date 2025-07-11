import React, {  useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
const Add = ({url}) => {
  // const url="http://localhost:4000";
  const [image, setImage] = useState(null);
const [data,setData]=useState({
  name:"",
  description:"",
  price:"",
  category:"Salad"
})
const onChangeHandler=(event)=>{
  const name=event.target.name;
  const value=event.target.value;
  setData(data=>({...data,[name]:value}))
}
const onSubmitHandler=async(event)=>{
event.preventDefault()
const formData=new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("image", image);

const response=await axios.post(`${url}/api/food/add`,formData);
if(response.data.success){
setData({
  name:"",
  description:"",
  price:"",
  category:"Salad"
})
setImage(false)
toast.success(response.data.message)
}else{
toast.error(response.data.message)
}

}


  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Add Product</h2>

      <form className="space-y-5" onSubmit={onSubmitHandler}>

        
        <div>
          <label className="block font-medium mb-2">Product Image</label>
          <div className="w-[300px] h-[200px] border border-dashed border-gray-300 rounded-lg overflow-hidden">
            <label
              htmlFor="image-upload"
              className="block w-full h-full cursor-pointer bg-gray-50  items-center justify-center hover:bg-gray-100"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Click to upload image</span>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
          onChange={onChangeHandler}
          value={data.name}
            type="text"
            name="name"
            placeholder="Enter product name"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block font-medium mb-1">Product Price (₹)</label>
          <input
onChange={onChangeHandler}
          value={data.price}
          name="price"
            type="number"
            placeholder="Enter price"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Product Description</label>
          <textarea
          onChange={onChangeHandler}
          value={data.description}
          name="description"
            placeholder="Write description here"
            className="border border-gray-300 p-2 rounded w-full"
            rows={3}
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Product Category</label>
          <select className="border border-gray-300 p-2 rounded w-full"
            onChange={onChangeHandler} name="category">
       
            <option value="Salad">Salad</option>
            <option value="PureVeg">PureVeg</option>
            <option value="Desserts">Desserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Coke">Coke</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
