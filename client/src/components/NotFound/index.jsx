const NotFound = () => (
  <div className='flex flex-col justify-center items-center h-screen bg-white text-black'>
    <img className="w-100 md:w-150" src='https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png' alt='not-found'/>
    <h1 className="mt-2 text-center font-bold text-xl md:text-4xl">Page Not Found</h1>
    <p className="text-center mt-2 md:text-xl">We are sorry, the page you requested could not be found.</p>
  </div>
)

export default NotFound;