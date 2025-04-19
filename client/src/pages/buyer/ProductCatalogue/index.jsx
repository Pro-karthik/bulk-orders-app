import {PropagateLoader} from 'react-spinners'

import { useAuth } from "../../../context/orderWebpage";

import { useEffect, useState } from "react";



const ProductCatalogue = () => {
  const {user,loading} = useAuth()

  return (
    loading ? (<div>
      <PropagateLoader size={20} />
      </div> 
    ) : (<div>
       <h1>Products page</h1>
      <p>{user.id},{user.role}</p></div>)
  )


}

export default ProductCatalogue