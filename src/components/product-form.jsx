/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";

import MemoizedCustomModal from "./custom-modal.jsx";
import Form from "./form.jsx";
import Button from "./button.jsx";
import NewInputForm from "./new-input-form.jsx";
import { editProductForm, newInputForm } from "../constants/formNames.js";

function ProductForm({ product, formName, onClick, onSubmit }) {
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
    onDelete,
    user,
    isAuthenticated,
    logout,
    submitLogin,
    submitNewProduct,
    updateProductDetails,
    updateWholeProductDetails,
    submitNewInputFields,
  } = useFormContext();

  // for ingredient inputs with no labels
  const ingredients = Object.entries(formState).filter(([key, value]) =>
    key.includes(`${formName}_ingredient`),
  );

  const rowsCount = useRef(product?.ingredients_visible?.length);

  // for other inputs with labels
  const [newInputsDetails, setNewInputsDetails] = useState([]);

  function handleAddNewIngredient() {
    rowsCount.current += 1;
    onChange(`${formName}_ingredient${rowsCount.current}`, "");
  }

  function handleRemoveIngredient(fieldName) {
    onDelete(fieldName);
  }

  const handleCloseModal = useCallback(
    (e, formRef) => {
      e.preventDefault();
      const newInputDetails = submitNewInputFields(e, formRef);
      console.log("newInput:", newInputDetails);

      if (newInputDetails) {
        const found = Object.keys(formState).find((key) =>
          key.includes(`${formName}_${newInputDetails.label}`),
        );

        if (found) {
          setFormErrors({
            [`${newInputForm}_label`]: "field already exists!",
          });
          return;
        }

        setNewInputsDetails((prev) => [
          ...prev,
          {
            label: newInputDetails.label,
            value: newInputDetails.value,
            type: "text",
          },
        ]);
        // after creating the new fields prepei na baloume sto state to value tous gia na mporoume na kanoume
        // to element controlled element kai na to diaxeirizomaste me tin onChange otan tou allazoume tin timi xoris
        // na petaei error oti to state den exei timi kai einai arxikos undefined kathe fora pou tou allazoume to value
        // autou tou pediou tis formas !
        onChange(`${formName}_${newInputDetails.label}`, newInputDetails.value);
        onConfirmModal();
      }
    },
    [
      formName,
      formState,
      onChange,
      onConfirmModal,
      setFormErrors,
      submitNewInputFields,
    ],
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

  useEffect(function () {
    // set state with the defult product values oste na mporoume na ta kanoume controlled elements meta
    // mias pou gia na ginoun kai na mporoume na allaksoume tin timi tous prepei na exoun arxiki timi sto state!
    Object.entries(product).forEach(([key, value]) => {
      if (key.includes("visible") && !key.includes("ingredients")) {
        onChange(`${formName}_${key.split("_")[0]}`, value);
      }
      if (key.includes("visible") && key.includes("ingredients")) {
        value.forEach((ingredientName, i) => {
          onChange(`${formName}_ingredient${i}`, ingredientName);
        });
      }
    });
  }, []);

  const formRef = useRef();
  return (
    <>
      <Form
        formName={formName}
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

export default ProductForm;
