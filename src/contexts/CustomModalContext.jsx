import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import Form from "../components/form";
import { useFormContext } from "./FormContext";

const CustomModalContext = createContext(null);
// to button sto new input modal na energopoieitai mono otan exoun siblirothei kai ta dio inputs!
// ta errors sti forma tou add new input na fainontai
// ta pedia tis edit product formas na allazoun timi
// use reducer sti forma tou edit product gia na tin elegxei!
// to save sto routing na douleuei
// o paginator
// to context tis listas me ta proionta sto filtering klp na ftiaxtei
// o bin kai to logout
// optimization
// typescript
// i forma sto add new product na ginetai opos leei o maximilian

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

  const {
    addNewInputFormState,
    addNewInputFormPending,
    addNewInputFormAction,
  } = useFormContext();

  const handleCloseCustomModal = () => {
    dispatch({ type: "showCustomModal", payload: false });
  };

  const handleConfirmCustomModal = () => {
    dispatch({ type: "showCustomModal", payload: false });
  };

  const handleAddNewProduct = () => {
    dispatch({ type: "showCustomModal", payload: true });
    dispatch({ type: "modalTriggerButtonName", payload: "addProduct" });
    dispatch({ type: "modalTitle", payload: "Add new Product" });
    dispatch({
      type: "modalContent",
      payload: "here goes the form to add new Product...",
    });
    dispatch({ type: "modalIcon", payload: "fa-solid fa-utensils" });

    dispatch({ type: "modalActionBtnLeft", payload: "Cancel" });
    dispatch({ type: "modalActionBtnRight", payload: "Add" });
  };

  // const handleNewInput_OLD = () => {
  //   setShowCustomModal(true);
  //   setModalTitle("Add new Input");
  //   const newInputsForm = (
  //     <Form
  //       inputsWithLabels={[
  //         {
  //           label: "Enter new form field label",
  //           id: addNewInputFormState.enteredValues.label,
  //           name: addNewInputFormState.enteredValues.label,
  //           type: "text",
  //         },
  //         {
  //           label: "Enter new form field value",
  //           id: addNewInputFormState.enteredValues.value,
  //           name: addNewInputFormState.enteredValues.value,
  //           type: "text",
  //         },
  //       ]}
  //       actionFunction={addNewInputFormAction}
  //       formState={addNewInputFormState}
  //     ></Form>
  //   );
  //   setModalContent(newInputsForm);
  //   setModalIcon("fa-solid fa-plus");
  //   setModalActionBtnLeft("Cancel");
  //   setModalActionBtnRight("Add");
  // };

  const NewInputFormContent = memo(({ formState, actionFunction }) => (
    <Form
      inputsWithLabels={[
        {
          label: "Enter new form field label",
          id: formState.enteredValues.label,
          name: formState.enteredValues.label,
          type: "text",
        },
        {
          label: "Enter new form field value",
          id: formState.enteredValues.value,
          name: formState.enteredValues.value,
          type: "text",
        },
      ]}
      actionFunction={actionFunction}
      formState={formState}
    />
  ));

  const handleNewInput = useCallback(() => {
    dispatch({ type: "showCustomModal", payload: true });
    dispatch({ type: "modalTriggerButtonName", payload: "addInput" });
    dispatch({ type: "modalTitle", payload: "Add new Input" });
    dispatch({
      type: "modalContent",
      payload: (
        <NewInputFormContent
          formState={addNewInputFormState}
          actionFunction={addNewInputFormAction}
        />
      ),
    });

    dispatch({ type: "modalIcon", payload: "fa-solid fa-plus" });
    dispatch({ type: "modalActionBtnLeft", payload: "Cancel" });
    dispatch({ type: "modalActionBtnRight", payload: "Add" });
  }, [addNewInputFormState, addNewInputFormAction]);

  const value = useMemo(
    () => ({
      showCustomModal: showCustomModal,
      modalTriggerButtonName: modalTriggerButtonName,
      modalTitle: modalTitle,
      modalContent: modalContent,
      modalIcon: modalIcon,
      modalActionBtnLeft: modalActionBtnLeft,
      modalActionBtnRight: modalActionBtnRight,
      addNewInputModalResultData: addNewInputFormState.enteredValues,
      addNewInputDisabledBtn: addNewInputFormState.errors,
      addNewInputFormState: addNewInputFormState,
      addNewInputFormAction: addNewInputFormAction,
      addNewInputPending: addNewInputFormPending,
      onAddNewProduct: handleAddNewProduct,
      onAddNewInputField: handleNewInput,
      onCloseModal: handleCloseCustomModal,
      onConfirmModal: handleConfirmCustomModal,
    }),
    [
      addNewInputFormAction,
      addNewInputFormPending,
      addNewInputFormState,
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
