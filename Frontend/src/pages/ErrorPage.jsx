import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-9xl font-bold text-gray-800 mb-4 md:text-[10rem]">404</h2>
        <h3 className="text-4xl font-bold text-gray-700 mb-6 md:text-[4.2rem]">UH OH! You're lost.</h3>
        <p className="text-gray-600 mb-8 md:text-lg">
          The page you are looking for does not exist. How you got here is a mystery. But you can click the
          button below to go back to the homepage.
        </p>
        <Link to="/">
          <button className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;