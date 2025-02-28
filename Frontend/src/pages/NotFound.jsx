import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-2xl mt-4">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-400">
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
