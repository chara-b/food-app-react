import { createContext, useContext, useState } from "react";
import Input from "../components/input";

const CustomModalContext = createContext(null);

function CustomModalContextProvider({ children }) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [modalActionBtnLeft, setModalActionBtnLeft] = useState("");
  const [modalActionBtnRight, setModalActionBtnRight] = useState("");

  const handleCloseCustomModal = () => {
    setShowCustomModal(false);
  };

  const handleAddNewProduct = () => {
    setShowCustomModal(true);
    setModalTitle("Add new Product");
    setModalContent("here goes the form to add new Product...");
    setModalIcon("fa-solid fa-utensils");
    setModalActionBtnLeft("Cancel");
    setModalActionBtnRight("Add");
  };

  const handleNewFormFieldName = () => {
    setShowCustomModal(true);
    setModalTitle("Add new Input");
    setModalContent(
      <Input
        label="Enter new form field name"
        id="new-field"
        name="new-field"
        type="text"
      />,
    );
    setModalIcon("fa-solid fa-plus");
    setModalActionBtnLeft("Cancel");
    setModalActionBtnRight("Add");
  };
  return (
    <CustomModalContext.Provider
      value={{
        modalTitle: modalTitle,
        modalContent: modalContent,
        modalIcon: modalIcon,
        modalActionBtnLeft: modalActionBtnLeft,
        modalActionBtnRight: modalActionBtnRight,
        onAddNewProduct: handleAddNewProduct,
        onAddNewFormField: handleNewFormFieldName,
        showCustomModal: showCustomModal,
        onCloseModal: handleCloseCustomModal,
      }}
    >
      {children}
    </CustomModalContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
function useCustomModalContext() {
  const context = useContext(CustomModalContext);
  if (context === undefined) {
    throw new Error("CustomModalContext was used outside of its Provider");
  }
  return context;
}

export { CustomModalContextProvider, useCustomModalContext };
