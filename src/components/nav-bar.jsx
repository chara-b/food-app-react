import { useState, useEffect } from "react";
import Button from "./button";
import ProductList from "./product-list";
import CustomModal from "./custom-modal";
import { useNavigate } from "react-router-dom";

function NavBar({ deletedProducts, children }) {
  const navigate = useNavigate();
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [btnNameClicked, setBtnNameClicked] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalList, setModalList] = useState([]);
  const [modalIcon, setModalIcon] = useState("");
  const [modalActionBtnLeft, setModalActionBtnLeft] = useState("");
  const [modalActionBtnRight, setModalActionBtnRight] = useState("");

  const handleCloseModal = () => {
    setShowCustomModal(false);
  };

  const handleLougout = () => {
    navigate("/login");
  };

  const handleAddClick = () => {
    setShowCustomModal(true);
    setBtnNameClicked("add");
    setModalTitle("Add new Product");
    setModalContent("here goes the form to add new Product...");
    setModalIcon("fa-solid fa-utensils");
    setModalActionBtnLeft("Cancel");
    setModalActionBtnRight("Add");
  };

  const handleDeletedFolderClick = () => {
    setShowCustomModal(true);
    setBtnNameClicked("deleted");
    setModalTitle("This is your deleted Products folder");
    setModalContent(
      "here goes the form to show you what's in your deleted Products folder...",
    );
    setModalIcon("fa-solid fa-trash");
    setModalActionBtnLeft("Cancel");
    setModalActionBtnRight("Restore All");
  };

  useEffect(() => {
    setModalList(deletedProducts);
  }, [deletedProducts]);

  return (
    <div className="flex items-center gap-4 rounded-lg bg-blue-200 p-6 shadow-md outline outline-black/5">
      {children}
      <div className="flex ml-auto gap-4">
        <Button
          styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
          onClick={handleAddClick}
        >
          <i className="fa-solid fa-circle-plus"></i>Add
        </Button>
        {showCustomModal && (
          <CustomModal
            isOpen={true}
            onClose={handleCloseModal}
            title={modalTitle}
            icon={modalIcon}
            actionBtnLeft={modalActionBtnLeft}
            actionBtnRight={modalActionBtnRight}
          >
            {btnNameClicked === "deleted" ? (
              <ProductList
                className="w-full"
                data={modalList}
                buttonsActions={[
                  {
                    buttonAction: "restore",
                    buttonIcon: "fa-solid fa-arrow-rotate-right",
                  },
                ]}
                colsCount="1"
              />
            ) : (
              <p className="text-sm text-gray-500">{modalContent}</p>
            )}
          </CustomModal>
        )}
        <Button
          styles="bg-blue-600 text-white px-5 py-3 rounded-lg text-base hover:bg-blue-800"
          onClick={handleDeletedFolderClick}
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
