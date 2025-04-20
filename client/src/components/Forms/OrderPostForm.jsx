import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import axios from '../../axiosInstance';
import { useAuth } from '../../context/orderWebpage';

const schema = yup.object().shape({
  buyerName: yup.string().required('Buyer name is required'),
  buyerContact: yup
    .string()
    .required('Contact is required')
    .matches(/^\+?[0-9]{7,15}$/, 'Enter a valid contact number'),
  deliveryAddress: yup.string().required('Delivery address is required'),
});

const OrderPostForm = ({ close }) => {
  const { mycart } = useAuth();

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      buyerName: '',
      buyerContact: '',
      deliveryAddress: '',
    },
  });

  const onSubmit = async (data) => {
    if (!mycart || mycart.length === 0) {
      setStatusMsg('Your cart is empty.');
      return;
    }

    const items = mycart.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const token = Cookies.get('jwt_token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    setLoading(true);
    setStatusMsg(null);

    try {
      const response = await axios.post('/api/orders', { ...data, items }, { headers });
      console.log('Order placed:', response.data);
      setStatusMsg('Order placed successfully!');
      reset();
    } catch (err) {
      console.error('Order placing failed:', err);
      setStatusMsg('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg">
      <div className="popup-cancel-cont">
        <button type="button" className="trigger-button" onClick={close}>
          <IoCloseSharp />
        </button>
      </div>

      <div className="p-6 w-75 md:w-100">
        <h2 className="text-xl font-bold mb-4">Place Order</h2>
        <p className="text-gray-500 mb-4">Fill in your details to complete the order.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">
          <div>
            <label className="block mb-1 font-medium">Buyer Name</label>
            <input
              {...register('buyerName')}
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />
            {errors.buyerName && <p className="text-red-500">{errors.buyerName.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact</label>
            <input
              {...register('buyerContact')}
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />
            {errors.buyerContact && <p className="text-red-500">{errors.buyerContact.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Delivery Address</label>
            <textarea
              {...register('deliveryAddress')}
              className="w-full border px-3 py-2 rounded"
              rows={3}
              disabled={loading}
            />
            {errors.deliveryAddress && <p className="text-red-500">{errors.deliveryAddress.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          {statusMsg && (
            <p className={`text-center mt-2 ${statusMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
              {statusMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};


export default OrderPostForm