import React from 'react';
import {  FaTrash } from 'react-icons/fa';
import {EditProductPopup} from '../Popup';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-auto">
      <table className="min-w-full border bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="py-2 px-4">Product ID</th>
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Product Price</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="py-2 px-4">{product.id}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">₹{product.price}</td>
              <td className="py-2 px-4 flex justify-center items-center gap-4">
                <EditProductPopup onSubmitEditProducts={onEdit} actualDetails={product}/>
                <button onClick={() => onDelete(product.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
