import React from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="relative h-screen bg-sky-200">

      {/* Content */}
      <div className="relative flex flex-col w-87 justify-center items-center p-6">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
