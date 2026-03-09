import { createContext, useContext, useState } from "react";
import Input from "../components/input";

const CustomModalContext = createContext(null);
// use reducer sti forma tou edit product gia na tin elegxei kai sta context ola!
// to add new input button na kanei ti douleia tou
// to save sto routing na douleuei
// o paginator
// to context tis listas me ta proionta sto filtering klp na ftiaxtei
// o bin kai to logout
// optimization
// typescript
// i forma sto add new product na ginetai opos leei o maximilian
function CustomModalContextProvider({ children }) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [modalActionBtnLeft, setModalActionBtnLeft] = useState("");
  const [modalActionBtnRight, setModalActionBtnRight] = useState("");

  const [modalResultData, setModalResultData] = useState();

  const handleCloseCustomModal = () => {
    setShowCustomModal(false);
  };

  const handleConfirmCustomModal = () => {
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

  const handleNewInput = () => {
    setShowCustomModal(true);
    setModalTitle("Add new Input");
    const input = (
      <Input
        label="Enter new form field name"
        id="new-field"
        name="new-field"
        type="text"
        onChange={(e) => setModalResultData(e.target.value)}
      />
    );
    setModalContent(input);
    setModalIcon("fa-solid fa-plus");
    setModalActionBtnLeft("Cancel");
    setModalActionBtnRight("Add");
  };

  return (
    <CustomModalContext.Provider
      value={{
        showCustomModal: showCustomModal,
        modalTitle: modalTitle,
        modalContent: modalContent,
        modalIcon: modalIcon,
        modalActionBtnLeft: modalActionBtnLeft,
        modalActionBtnRight: modalActionBtnRight,
        modalResultData: modalResultData,
        onAddNewProduct: handleAddNewProduct,
        onAddNewInputField: handleNewInput,
        onCloseModal: handleCloseCustomModal,
        onConfirmModal: handleConfirmCustomModal,
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
