/* eslint-disable no-unused-vars */
import Button from "./button";
import ProductList from "./product-list";
import CustomModal from "./custom-modal";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import MemoizedCustomModal from "./custom-modal";
import { useFormContext } from "../contexts/FormContext.jsx";
import NewProductForm from "./new-product-form.jsx";

function NavBar({ children }) {
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
    onAddNewProduct,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

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

  const navigate = useNavigate();
  const { username } = useParams();

  const handleLougout = () => {
    logout();
    navigate("/");
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

  return (
    <div className="flex items-center gap-4 rounded-lg bg-blue-200 p-6 shadow-md outline outline-black/5">
      {children}
      {
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white shadow-sm">
          Hello {username.toUpperCase()}!
        </span>
      }
      <div className="flex ml-auto gap-4">
        <Button
          styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
          onClick={() => onAddNewProduct(<NewProductForm />)}
        >
          <i className="fa-solid fa-circle-plus"></i>Add
        </Button>
        {showCustomModal && modalTriggerButtonName === "addProduct" && (
          <MemoizedCustomModal
            isOpen={true}
            onClose={onCloseModal}
            onConfirm={onConfirmModal}
            title={modalTitle}
            icon={modalIcon}
          >
            {modalContent}
          </MemoizedCustomModal>
        )}
        <Button
          styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
          onClick={handleBinClick}
        >
          <i className="fa-solid fa-trash"></i>Deleted
        </Button>
        <Button
          styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
          onClick={handleLougout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>Logout
        </Button>
      </div>
    </div>
  );
}
export default NavBar;
