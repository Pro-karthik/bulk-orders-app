import {useNavigate} from "react-router-dom";

const InitialPage = () => {
  const Navigate = useNavigate()
  return (
    <div className="h-screen  flex flex-col justify-between items-center bg-cover bg-center md:justify-center"
         style={{ backgroundImage: "url('https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg')" }}>
    <div className="mt-4 p-4">
      <h1 style={{ fontFamily: 'Winky Rough' }} className="text-4xl font-bold text-[#932f6b] md:text-5xl">Agrofix Fresh</h1>
      <p style={{ fontFamily: 'Winky Rough' }} className="text-lg font-bold text-[#ffffff] mt-3 md:text-xl">Fresh Fruits & Vegetables Delivered with Ease</p>
      </div>
      <div className="mb-6 md:mt-10">
        <button style={{ fontFamily: 'Winky Rough' }} className="bg-[#da9700]  text-white px-6 py-2 rounded mr-4 hover:bg-[#ffffff] hover:text-[#da9700] md:text-xl"
              onClick={() => Navigate('/login')}  >Login</button>
        <button style={{ fontFamily: 'Winky Rough' }} className="bg-transparent border-[#da9700] outline text-[#da9700] px-6 py-2 md:ml-10 md:text-xl rounded hover:bg-[#da9700] hover:text-white hover:outline-0"
              onClick={() => Navigate('/register')}  >Register</button>
      </div>
    </div>
  );
};

export default InitialPage;