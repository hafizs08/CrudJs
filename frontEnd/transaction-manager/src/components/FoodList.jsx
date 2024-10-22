// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { deleteFood, getFoods } from '../api';

// function FoodsList() {
//   const [foods, setFoods] = useState([]);
//   const navigate = useNavigate();

//   const refreshData = () => {
//     getFoods().then(response => setFoods(response.data.data));
//   };

//   useEffect(() => {
//     refreshData();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteFood(id);
//     refreshData();
//   };

//   return (
//     <div>
//       <h2>Foods List</h2>
//       <button className="btn btn-primary" onClick={() => navigate('/foods/new')}>
//         Add Food
//       </button>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {foods.map((food, index) => (
//             <tr key={food.id}>
//               <td>{index + 1}</td>
//               <td>{food.food_name}</td>
//               <td>{food.price}</td>
//               <td>{food.stock}</td>
//               <td>
//                 <button
//                   className="btn btn-warning me-2"
//                   onClick={() => navigate(`/foods/edit/${food.id}`)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(food.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default FoodsList;
