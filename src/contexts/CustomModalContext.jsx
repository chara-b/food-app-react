/* eslint-disable no-unused-vars */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import NewInputForm from "../components/new-input-form";

const CustomModalContext = createContext(null);
// to button sto new input modal na energopoieitai mono otan exoun siblirothei kai ta dio inputs!
// ta errors sti forma tou add new input na fainontai
// ta pedia tis edit product formas na allazoun timi
// use reducer sti forma tou edit product gia na tin elegxei!
// to save sto routing na douleuei
// o paginator
// optimization
// typescript

// se env arxeio ta constants mou na psakso na do pos ginetai !

function reducer(state, action) {
  switch (action.type) {
    case "showCustomModal":
      return { ...state, showCustomModal: action.payload };
    case "modalTriggerButtonName":
      return { ...state, modalTriggerButtonName: action.payload };
    case "modalTitle":
      return { ...state, modalTitle: action.payload };
    case "modalContent":
      return { ...state, modalContent: action.payload };
    case "modalIcon":
      return { ...state, modalIcon: action.payload };
    case "modalActionBtnLeft":
      return { ...state, modalActionBtnLeft: action.payload };
    case "modalActionBtnRight":
      return { ...state, modalActionBtnRight: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}
function CustomModalContextProvider({ children }) {
  const initialState = {
    showCustomModal: false,
    modalTriggerButtonName: "",
    modalTitle: "",
    modalContent: "",
    modalIcon: "",
    modalActionBtnLeft: "",
    modalActionBtnRight: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    showCustomModal,
    modalTriggerButtonName,
    modalTitle,
    modalContent,
    modalIcon,
    modalActionBtnLeft,
    modalActionBtnRight,
  } = state;

  const handleCloseCustomModal = useCallback(() => {
    dispatch({ type: "showCustomModal", payload: false });
  }, [dispatch]);

  const handleConfirmCustomModal = () => {
    dispatch({ type: "showCustomModal", payload: false });
  };

  const handleAddNewProduct = useCallback(
    (content) => {
      dispatch({ type: "showCustomModal", payload: true });
      dispatch({ type: "modalTriggerButtonName", payload: "addProduct" });
      dispatch({ type: "modalTitle", payload: "Add new Product" });
      dispatch({ type: "modalContent", payload: content });
      dispatch({ type: "modalIcon", payload: "fa-solid fa-utensils" });
      dispatch({ type: "modalActionBtnLeft", payload: "Cancel" });
      dispatch({ type: "modalActionBtnRight", payload: "Add" });
    },
    [dispatch],
  );

  const handleNewInput = useCallback(() => {
    dispatch({ type: "showCustomModal", payload: true });
    dispatch({ type: "modalTriggerButtonName", payload: "addInput" });
    dispatch({ type: "modalTitle", payload: "Add new Input" });
    dispatch({
      type: "modalContent",
      payload: NewInputForm,
    });

    dispatch({ type: "modalIcon", payload: "fa-solid fa-plus" });
    dispatch({ type: "modalActionBtnLeft", payload: "Cancel" });
    dispatch({ type: "modalActionBtnRight", payload: "Add" });
  }, []);

  const value = useMemo(
    () => ({
      showCustomModal: showCustomModal,
      modalTriggerButtonName: modalTriggerButtonName,
      modalTitle: modalTitle,
      modalContent: modalContent,
      modalIcon: modalIcon,
      modalActionBtnLeft: modalActionBtnLeft,
      modalActionBtnRight: modalActionBtnRight,
      // addNewInputModalResultData: formState,
      // addNewInputDisabledBtn: formState?.errors,
      // addNewInputFormState: formState,
      onAddNewProduct: handleAddNewProduct,
      onAddNewInputField: handleNewInput,
      onCloseModal: handleCloseCustomModal,
      onConfirmModal: handleConfirmCustomModal,
    }),
    [
      handleAddNewProduct,
      handleCloseCustomModal,
      handleNewInput,
      modalActionBtnLeft,
      modalActionBtnRight,
      modalContent,
      modalIcon,
      modalTitle,
      modalTriggerButtonName,
      showCustomModal,
    ],
  );

  return (
    <CustomModalContext.Provider value={value}>
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
