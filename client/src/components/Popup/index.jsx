import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseSharp} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'
import NavItemsUser from '../NavItems/NavItemsUser'
import NavItemsAdmin from '../NavItems/NavItemsAdmin'
import { ProductAddForm ,ProductEditForm} from '../Forms'
import OrderPostForm from '../Forms/OrderPostForm'
import { FaEdit } from 'react-icons/fa'


import './index.css'

export const MobileUserNavItemsPopup =  () => {

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <div type="button">
            <GiHamburgerMenu />
          </div>
        }
      >
        {close => (
          <>
            <div className='h-screen w-screen bg-[#ffffff]'>
              <div className="popup-cancel-cont">
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  <IoCloseSharp />
                </button>
              </div>
              <div className="popup-nav-cont">
                <div className="w-screen">
                <NavItemsUser close={close}/>
                </div>
              </div>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}

export const MobileNavItemsPopup = () => {

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <div type="button">
            <GiHamburgerMenu />
          </div>
        }
      >
        {close => (
          <>
            <div className='h-screen w-screen bg-[#ffffff]'>
              <div className="popup-cancel-cont">
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  <IoCloseSharp />
                </button>
              </div>
              <div className="popup-nav-cont">
                <div className="w-screen">
                <NavItemsAdmin close={close}/>
                </div>
              </div>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}

export const LogoutBtnSm = props => {
  const {LogoutHandler} = props

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <div onClick={() => LogoutHandler()} type="button">
            <FiLogOut />
          </div>
        }
      >
        {close => (
          <>
            <div className="logout-container">
              <div className='logout-cont-main'>
                <p className="logout-head">Are you sure, you want to logout</p>
                <div className="btn-cont">
                  <button
                    className="cancel-btn"
                    onClick={() => close()}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-btn"
                    onClick={LogoutHandler}
                    type="button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}

export const LogoutBtnLg = props => {
  const { LogoutHandler} = props

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button
            className='cursor-pointer bg-[#ffffff] text-[#000000]  rounded-md px-4 py-2 hover:bg-[#E44C89] hover:text-[#ffffff] md:text-lg'
            onClick={LogoutHandler}
            type="button"
          >
            Logout
          </button>
        }
      >
        {close => (
          <>
            <div className="logout-container">
              <div className="logout-cont-main">
                <p className="logout-head">Are you sure, you want to logout</p>
                <div className="btn-cont">
                  <button
                    className="cancel-btn"
                    onClick={() => close()}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-btn"
                    onClick={LogoutHandler}
                    type="button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}

export const AddProductPopup = props => {
  const { onSubmitAddProducts} = props
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button className="bg-white shadow-md rounded-lg p-2 text-md cursor-pointer" type="button">➕ Add New Product</button>
        }
      >
        {close => (
          <>
            <div className="logout-container">
             <ProductAddForm  onSubmitAddProducts={ onSubmitAddProducts} close={close}/>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}


export const EditProductPopup = props => {
  const { onSubmitEditProducts,actualDetails} = props
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button className="text-blue-500 text-lg hover:text-blue-700 cursor-pointer flex justify-center items-center md:text-2xl" type="button">
                            <FaEdit />
                          </button> }
      >
        {close => (
          <>
            <div className="logout-container">
             <ProductEditForm  onSubmitEditProducts={ onSubmitEditProducts} close={close} actualDetails={actualDetails}/>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
}

export const PlaceOrderPopup = () =>  (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-3">
          Place order
       </button> }
      >
        {close => (
          <>
            <div className="logout-container">
             <OrderPostForm  close={close}/>
            </div>
          </>
        )}
      </Popup>
    </div>
  )
