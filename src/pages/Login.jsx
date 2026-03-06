import { useReducer } from "react";
import Button from "../components/button";
import { Form, useNavigate } from "react-router-dom";

const initialState = { email: "", password: "" };

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return { email: "", password: "" };
    default:
      throw new Error("unknown action");
  }
}

function Login() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "reset" });
    localStorage.setItem("user", 123);
    navigate("/");
  }

  function handleEmail(e) {
    dispatch({ type: "email", payload: e.target.value });
  }

  function handlePassword(e) {
    dispatch({ type: "password", payload: e.target.value });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form class="w-full max-w-sm m-auto">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-email"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              type="text"
              value={formState.email}
              onChange={handleEmail}
              required
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              value={formState.password}
              onChange={handlePassword}
              required
            />
          </div>
        </div>

        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <Button
              type="submit"
              styles="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
