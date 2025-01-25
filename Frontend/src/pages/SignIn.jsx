import React from "react";

const SignIn = () => {
  return (
    <div className="auth-container max-w-sm mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
