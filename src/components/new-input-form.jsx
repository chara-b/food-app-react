/* eslint-disable no-unused-vars */
import { memo, useMemo } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useCustomModalContext } from "../contexts/CustomModalContext";

const handleChange = (value) => {
  console.log(value);
};

const NewInputForm = memo(() => {
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

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "save",
        buttonIcon: "fa-solid fa-floppy-disk",
        type: "submit",
      },
      { actionBtn: "cancel", buttonIcon: "fa-solid fa-x", type: "button" },
    ],
    [],
  );

  const inputsWithLabels = useMemo(
    () => [
      {
        label: "Enter new form field label",
        id: "new-field-label",
        name: "new-field-label",
        value: "",
        type: "text",
      },
      {
        label: "Enter new form field value",
        id: "new-field-value",
        name: "new-field-value",
        value: "",
        type: "text",
      },
    ],
    [],
  );

  return (
    <Form
      inputsWithLabels={inputsWithLabels}
      onSubmit={submitNewInputFields}
      onClick={onCloseModal}
      actionBtns={actionBtns}
      formState={formState}
      formErrors={formErrors}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
});

export default NewInputForm;
