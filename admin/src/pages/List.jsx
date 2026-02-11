import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
import './List.css';

const List = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/foods/list`);
      if (response.data.success) {
        setList(response.data.foods);
      }
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const removeFood = async (foodId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.delete(`${url}/api/foods/delete/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        alert('Food item removed successfully');
        await fetchList();
      }
    } catch (error) {
      console.error('Error removing food:', error);
      alert(error.response?.data?.message || 'Error removing food item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p className="title">All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button onClick={() => removeFood(item._id)} className="delete-btn">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
