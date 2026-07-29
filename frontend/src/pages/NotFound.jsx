import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;