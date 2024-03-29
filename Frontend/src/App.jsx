import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './Components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Cart = lazy(() => import('./pages/Cart'));
const SingleProduct = lazy(()=>import( './pages/SingleProduct'));
const About= lazy(()=>import('./pages/About'))
const Contact= lazy(()=>import('./pages/Contact'))
const ErrorPage = lazy(()=>import('./pages/ErrorPage'))
function App() {
  return (
    
    <Router>
      <div className='font-Roboto'>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Shop" element={<Shop />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<SignUp />} />
          <Route exact path="/Singleproduct/:id" element={<SingleProduct />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
        
      </Suspense>
      </div>
    </Router>
  );
}

export default App;
