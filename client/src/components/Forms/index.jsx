import {useForm} from 'react-hook-form'
import {useEffect} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {IoCloseSharp} from 'react-icons/io5'


const schema = yup.object().shape({
  name : yup.string().required('Name is required'),
  price : yup.number().typeError('Price must be a number').positive('Price must be positive').required('Price is required'),
  imageUrl : yup.string().url('Image URL must be a valid URL').required('Image URL is required'),
})

export const ProductAddForm = ({ onSubmitAddProducts,close}) => {
  const {register,handleSubmit,formState:{errors},reset} = useForm({
    resolver : yupResolver(schema)
  })

  const onSubmit = (data) => {
    onSubmitAddProducts(data)
    reset()
    close()
  }

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg ">
      <div className="popup-cancel-cont">
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
      <div className="p-4">             
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <p className="text-gray-500 mb-4">Fill in the details below to add a new product.</p>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
         {...register('name')}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price')}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          {...register('imageUrl')}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
    </div> 
    </div>  
  );
}

export const ProductEditForm = ({ onSubmitEditProducts, close, actualDetails }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: actualDetails?.name || '',
      price: actualDetails?.price || '',
      imageUrl: actualDetails?.imageUrl || '',
      id: actualDetails?.id || '',
    },
  });

  
  useEffect(() => {
    reset({
      name: actualDetails?.name || '',
      price: actualDetails?.price || '',
      imageUrl: actualDetails?.imageUrl || '',
      id: actualDetails?.id || '',
    });
  }, [actualDetails, reset]);

  const onSubmit = (data) => {
    onSubmitEditProducts(data); 
    reset(); 
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg">
      <div className="popup-cancel-cont">
        <button type="button" className="trigger-button" onClick={close}>
          <IoCloseSharp />
        </button>
      </div>
      <div className="p-6 w-75 md:w-100">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <p className="text-gray-500 mb-4">Update product details below.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              {...register('name')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              {...register('price')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              {...register('imageUrl')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};