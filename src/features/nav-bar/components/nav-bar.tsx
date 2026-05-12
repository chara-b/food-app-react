/* eslint-disable no-unused-vars */
import Button from "./button.js";
import { useNavigate } from "react-router-dom";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import { useFormContext } from "../contexts/FormContext.jsx";
import { useCallback, useState } from "react";

function NavBar({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    showCustomModal,
    modalTriggerButtonName,
    modalTitle,
    modalContent,
    modalIcon,
    modalActionBtnLeft,
    modalActionBtnRight,
    addNewInputModalResultData,
    addNewInputDisabledBtn,
    addNewInputFormState,
    dispatch,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

  const {
    formState,
    setFormState,
    formErrors,
    setFormErrors,
    isFormValid,
    onChange,
    user,
    isAuthenticated,
    logout,
    submitLogin,
    submitNewProduct,
    updateProductDetails,
    updateWholeProductDetails,
    submitNewInputFields,
  } = useFormContext();

  const navigate = useNavigate();
  const userFirstName = JSON.parse(localStorage.getItem("user"))?.firstName;
  const userLastName = JSON.parse(localStorage.getItem("user"))?.lastName;
  const userFullName =
    userFirstName && userLastName ? `${userFirstName} ${userLastName}` : "";

  const handleLougout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleBinClick = () => {
    navigate("bin", {
      replace: true,
    });
    // navigate("bin"); // an diagrapso kai bo sto bin kai meta piso sto mainpage den fortonei ta
    // available data alla ta disabled ksana ! epeidi den prokalei rerender to browser history
    // ki as ksanasetaro ta initial data tou state me auta pou erxontai apo tin loader function
    // kata to routing back !
  };

  const handleAddNewProduct = useCallback(() => {
    setFormErrors({});
    navigate("/products/new-product", { replace: true });
  }, [navigate, setFormErrors]);

  function goToHomepage() {
    navigate("/products", { replace: true });
  }

  return (
    <nav className="bg-blue-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="hidden md:block">
            <Button
              styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
              onClick={goToHomepage}
            >
              Homepage
            </Button>
          </div>
          {/* search bar */}
          {children}

          {/* Desktop buttons */}
          <div className="hidden md:flex gap-4">
            {
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white shadow-sm">
                Hello {userFullName.toUpperCase()}!
              </span>
            }
            <Button
              styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
              onClick={() => handleAddNewProduct()}
            >
              <i className="fa-solid fa-circle-plus"></i>Add
            </Button>

            <Button
              styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
              onClick={handleBinClick}
            >
              <i className="fa-solid fa-trash"></i>Bin
            </Button>
            <Button
              styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
              onClick={handleLougout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>Logout
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu - conditional render */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-100 border-t">
            <div className="flex flex-col gap-2 py-4 px-4">
              {
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white shadow-sm">
                  Hello {userFullName.toUpperCase()}!
                </span>
              }
              <Button
                styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
                onClick={goToHomepage}
              >
                Homepage
              </Button>
              <Button
                styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
                onClick={() => handleAddNewProduct()}
              >
                <i className="fa-solid fa-circle-plus"></i>Add
              </Button>

              <Button
                styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
                onClick={handleBinClick}
              >
                <i className="fa-solid fa-trash"></i>Bin
              </Button>
              <Button
                styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
                onClick={handleLougout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;
