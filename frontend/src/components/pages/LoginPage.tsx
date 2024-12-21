import LoginForm from "../Forms/LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 px-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome Back, Book Lover!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 my-2">
            Sign in to explore our vast collection and keep your bookshelf
            growing.
          </p>
          <LoginForm />
        </div>

        {/* Right Section: Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <img
            src="/path-to-your-image.png"
            alt="Reading Illustration"
            className="h-96 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
