import Button from "./button";
import ProductList from "./product-list";
import CustomModal from "./custom-modal";
import { useNavigate } from "react-router-dom";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import MemoizedCustomModal from "./custom-modal";

function NavBar({ children }) {
  const {
    showCustomModal,
    modalTriggerButtonName,
    modalTitle,
    modalContent,
    modalIcon,
    modalActionBtnLeft,
    modalActionBtnRight,
    onAddNewProduct,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

  const navigate = useNavigate();

  const handleLougout = () => {
    navigate("/login");
  };

  const handleBinClick = () => {
    navigate("bin");
  };

  return (
    <div className="flex items-center gap-4 rounded-lg bg-blue-200 p-6 shadow-md outline outline-black/5">
      {children}
      <div className="flex ml-auto gap-4">
        <Button
          styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
          onClick={onAddNewProduct}
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
            actionBtnLeft={modalActionBtnLeft}
            actionBtnRight={modalActionBtnRight}
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
