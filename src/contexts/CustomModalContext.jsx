import { createContext, useContext, useState } from "react";
import Input from "../components/input";

const CustomModalContext = createContext(null);
// use reducer sti forma tou edit product gia na tin elegxei kai sta context ola!
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

  const [modalResultData, setModalResultData] = useState({
    label: "",
    value: "",
  });

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

  const handleChange = (field, value) => {
    setModalResultData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewInput = () => {
    setShowCustomModal(true);
    setModalTitle("Add new Input");
    const inputs = (
      <>
        <Input
          label="Enter new form field label"
          id={modalResultData}
          name={modalResultData}
          type="text"
          onChange={(e) => handleChange("label", e.target.value)}
        />
        <Input
          label="Enter new form field value"
          id={modalResultData}
          name={modalResultData}
          type="text"
          onChange={(e) => handleChange("value", e.target.value)}
        />
      </>
    );
    setModalContent(inputs);
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
