import {useAuth} from '../../context/orderWebpage'


const ProductCard = (props) => {
   const {details} = props 
   const {name,price} = details
   const {addToCart} = useAuth()
   const AddToCart = () => {
       const product = {...details,quantity : 1}
       addToCart(product)
   }
   return (
    <li className="shadow-2xl flex flex-col rounded-xl min-h-95 w-75">
      <div className="p-3">
      <div className="flex justify-center items-center mt-2 mb-4">
         <img className="w-50" src='https://m.media-amazon.com/images/I/81QTmxHxyhL._AC_SL1500_.jpg' alt='lol'/>
      </div>
     <h1 className="mt-3 mb-2 text-xl "><span className="font-bold">Product Name:</span>{name}</h1>
     <p className="mt-2 mb-2 text-xl "><span className="font-bold">Product Price:</span>₹ {price}</p>
      </div>
      <button onClick={AddToCart} className="cursor-pointer mt-auto bg-[#95FA37] rounded-b-xl w-75 outline-0 p-2 hover:bg-[#95FA3799] hover:text-red-400 text-white font-bold">Add to cart</button>
    </li>
   )
}

export default ProductCard