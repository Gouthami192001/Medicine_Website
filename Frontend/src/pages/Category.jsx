import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HorizontalCardScroll from '../Components/HorizontalCardScroll';
import axios from "axios";
import ReviewSection from '../Components/ReviewSection';
import { BsCart3 } from "react-icons/bs";
import { AuthContext } from '../Components/AuthProvider';
import LoadingGif from "../Components/LoadingGif";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactImageMagnify from 'react-image-magnify';

const Category = () => {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products?sub_category=${product.Sub_Category}`, {
          headers: {
            apikey: apiKey,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      finally {
        setIsLoading(false); // Set loading to false after fetching (even on errors)
      }
    };

    // Retrieve existing cart items from local storage once during initial mount
    fetchData();
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  const isMedicine = !!product.Medicine_Name;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  const { isAuthenticated, user } = useContext(AuthContext);

  const handleAddToCart = (product, quantity) => {
    const { _id, Name, Price, Image_URL, Product_id } = product;
    const cartItem = {
      _id,
      Name,
      Price,
      Image_URL,
      quantity,
      Product_id
    };
    const updatedCartItems = [...cartItems, cartItem];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setItemAddedToCart(true); // Set the state to indicate item added to cart
    toast.success('Item Added To Cart', { autoClose: 2000 });
  };

  return (
    <div>
      <div className="bg-white min-h-screen md:p-[1px] p-[1rem] ">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center md:block ">
              <button
                className="hidden md:block bg-white rounded-full p-2 transition-colors duration-300 hover:bg-gray-200"
                onClick={handleBackClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div className="flex justify-center items-center">
              <ReactImageMagnify
  {...{
    smallImage: {
      alt: isMedicine ? product.Medicine_Name : product.Name,
      isFluidWidth: true,
      src: product.Image_URL,
    },
    largeImage: {
      src: product.Image_URL,
      width: 1200,
      height: 1800,
    },
    shouldUsePositiveSpaceLens: true,
    className: "md:max-w-[26rem] md:max-h-[22rem]",
    enlargedImageContainerDimensions: { width: '200%', height: '200%' },
    enlargedImagePosition: 'beside',
    isHintEnabled: true,
    shouldHideHintAfterFirstBigViewOpened: true,
    isEnlargedImagePortalEnabledForTouch: true,
    lensStyle: {
      lensStyle: {
        background: 'rgba(77, 144, 254, 0.3)', // Blue tinted background
        border: '1px solid #4d90fe', // Blue border
      },
    },
  }}
/>
</div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mt-[5rem] mb-[2rem] text-gray-800">
                  {isMedicine ? product.Medicine_Name : product.Name}
                </h2>
                <div className="bg-white rounded-lg mb-[0.5rem]">
                  <p className="text-gray-600"><span className='text-lg font-semibold text-gray-700'> Manufacturer :</span> {product.Manufacturer}</p>
                </div>
                {/* Render Composition if available */}
                {product.Composition && (
                  <div className=" bg-white rounded-lg mb-[0.5rem]">
                    <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Composition :</span> {product.Composition}</p>
                  </div>
                )}
                {/* Render Uses if available */}
                {product.Uses && (
                  <div className="bg-white rounded-lg mb-[0.5rem]">
                    <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Uses :</span> {product.Uses}</p>
                  </div>
                )}
                {/* Render Description if available */}
                {product.Description && (
                  <div className=" bg-white rounded-lg mb-[0.5rem]">
                    <p className="text-gray-600"><span className="text-lg font-semibold text-gray-700">Description :</span> {product.Description}</p>
                  </div>
                )}
                {/* Render Directions for Use if available */}
                {product['Directions for Use'] && (
                  <div className=" bg-white rounded-lg mb-[0.5rem]">
                    <h3 ></h3>
                    <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Directions for Use :</span> {product['Directions for Use']}</p>
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-3xl md:text-4xl text-blue-800 font-semibold">{`₹${product.Price}`}</p>
                </div>
                <div className="mb-4 bg-white rounded-lg mb-[0.5rem]">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Quantity</h3>
                  <div className="flex mt-[1rem]">
                    <button
                      className="bg-gray-200 text-gray-600  px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-8 text-center text-gray-700 ml-4"
                    />
                    <button
                      className="bg-gray-200 text-gray-600  px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                    <div className="md:ml-[12rem] ml-[2rem]">
                      <button
                        className="flex items-center justify-center bg-[#125872] text-white font-bold py-2 md:px-8 px-[6px] rounded transition-colors duration-300"
                        onClick={() => handleAddToCart(product, quantity)}
                      >
                        <BsCart3 className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <LoadingGif />
          ) : (
            <div className='md:mt-[2rem]'>
              <HorizontalCardScroll itemForHorizontalScroll={items} />
              <ReviewSection />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Category;
