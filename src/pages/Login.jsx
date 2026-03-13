/* eslint-disable no-unused-vars */
import Button from "../components/button";
import { Form, useNavigate } from "react-router-dom";
import { useFormContext } from "../contexts/FormContext";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const {
    formState,
    formErrors,
    isFormValid,
    onChange,
    user,
    isAuthenticated,
    logout,
    submitLogin,
    submitNewProduct,
    updateProductDetails,
    submitNewInputFields,
  } = useFormContext();

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate(`mainpage/${user.email.split("@")[0]}`);
      }
    },
    [isAuthenticated, navigate, user?.email],
  );
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Form className="w-full max-w-sm m-auto" onSubmit={submitLogin}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              name="email"
              type="text"
              // value={formState?.email}
              onChange={(e) => onChange("email", e.target.value)}
              // onBlur={(e) =>
              //   validateField("email", e.target.value, { required: true })
              // }
            />
            {formErrors.email && (
              <span className="text-red-600">{formErrors.email}</span>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              name="password"
              type="password"
              // value={formState?.password}
              onChange={(e) => onChange("password", e.target.value)}
              // onBlur={(e) =>
              //   validateField("email", e.target.value, { required: true })
              // }
            />
            {formErrors.password && (
              <span className="text-red-600">{formErrors.password}</span>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-1/3">
            <Button
              type="submit"
              disabled={formErrors.email || formErrors.password}
              styles="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Button>
          </div>
          <div className="md:w-1/3">
            {formErrors.form && (
              <span className="text-red-600">{formErrors.form}</span>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
