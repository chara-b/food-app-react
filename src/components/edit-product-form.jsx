/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useRef, useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useCustomModalContext } from "../contexts/CustomModalContext";

import MemoizedCustomModal from "./custom-modal";
import Form from "./form.jsx";
import Button from "./button.jsx";
import NewInputForm from "../components/new-input-form";
import { editProductForm } from "../constants/formNames.js";

function EditProductForm({ product, onClick, onSubmit }) {
  // for ingredient inputs with no labels
  const [ingredients, setIngredients] = useState(product.ingredients_visible);

  // for other inputs with labels
  const [newInputsDetails, setNewInputsDetails] = useState([]);

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

  function handleAddNewIngredient() {
    setIngredients((ingredients) => [...ingredients, ""]);
  }

  function handleRemoveIngredient(indexToRemove) {
    setIngredients((ingredients) =>
      ingredients.filter((_, i) => i !== indexToRemove),
    );
  }

  const handleCloseModal = useCallback(
    (e, formRef) => {
      e.preventDefault();
      const newInputDetails = submitNewInputFields(e, formRef);
      console.log("newInput:", newInputDetails);

      setNewInputsDetails((prev) => [
        ...prev,
        {
          label: newInputDetails.label,
          value: newInputDetails.value,
          type: "text",
        },
      ]);
      onConfirmModal();
    },
    [onConfirmModal, submitNewInputFields],
  );

  const handleNewInput = useCallback(() => {
    setFormErrors({});
    dispatch({ type: "showCustomModal", payload: true });
    dispatch({ type: "modalTriggerButtonName", payload: "addInput" });
    dispatch({ type: "modalTitle", payload: "Add new Input" });
    dispatch({
      type: "modalContent",
      payload: <NewInputForm onSubmit={handleCloseModal} />,
    });

    dispatch({ type: "modalIcon", payload: "fa-solid fa-plus" });
    dispatch({ type: "modalActionBtnLeft", payload: "Cancel" });
    dispatch({ type: "modalActionBtnRight", payload: "Add" });
  }, [dispatch, handleCloseModal, setFormErrors]);

  const formRef = useRef();
  return (
    <>
      <Form
        formName={editProductForm}
        product={product}
        ingredients={ingredients}
        newInputsDetails={newInputsDetails}
        onAddNewIngredient={handleAddNewIngredient}
        onRemoveIngredient={handleRemoveIngredient}
        onCancel={onClick}
        formState={formState}
        formErrors={formErrors}
        onChange={onChange}
        onSubmit={(e) => onSubmit(e, formRef)}
        formRef={formRef}
        disabled={formErrors ? Object.keys(formErrors).length !== 0 : false}
      >
        <div className="flex flex-row justify-end items-center gap-2">
          <Button
            type="button"
            onClick={handleNewInput}
            styles="shadow bg-blue-400 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Add new Input
          </Button>
        </div>
      </Form>
      {showCustomModal && modalTriggerButtonName === "addInput" && (
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
    </>
  );
}

export default EditProductForm;
