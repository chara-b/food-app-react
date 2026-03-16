/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from "react";
import { defaultProductFormInputs } from "../constants/formFieldsNames";
import { useCustomModalContext } from "../contexts/CustomModalContext";
import MemoizedCustomModal from "./custom-modal";
import Form from "./form.jsx";
import { useFormContext } from "../contexts/FormContext";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import Button from "./button.jsx";
import NewInputForm from "../components/new-input-form";
import { editProductForm } from "../constants/formNames.js";

const CardSection2 = React.memo(({ product, editable, onClick, onSubmit }) => {
  // for ingredient inputs with no labels
  const [ingredientNames, setIngredientNames] = useState(product.ingredients);

  // for other inputs with labels
  const [labeledInputsData, setLabeledInputsData] = useState(function () {
    return defaultProductFormInputs.map(({ label, type }, i) => {
      return {
        label: label,
        value: product[label],
        type: "text",
      };
    });
  });

  // for product title input
  const titleInput = useMemo(
    () => ({
      title: "Food Title",
      value: product.title,
    }),
    [product.title],
  );
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

  const {
    filteredProducts,
    availableProducts,
    disabledProducts,
    searchText,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
  } = useProductsContext();

  function handleAddNewIngredient() {
    setIngredientNames((ingredientNames) => [...ingredientNames, ""]);
  }

  function handleCloseModal() {
    onConfirmModal();
    console.log("MODAL DATA", addNewInputModalResultData);
    setLabeledInputsData((prev) => [
      ...prev,
      {
        label: addNewInputModalResultData.label,
        value: addNewInputModalResultData.value,
        type: "text",
      },
    ]);
  }

  const handleNewInput = useCallback(() => {
    setFormErrors({});
    dispatch({ type: "showCustomModal", payload: true });
    dispatch({ type: "modalTriggerButtonName", payload: "addInput" });
    dispatch({ type: "modalTitle", payload: "Add new Input" });
    dispatch({
      type: "modalContent",
      payload: <NewInputForm />,
    });

    dispatch({ type: "modalIcon", payload: "fa-solid fa-plus" });
    dispatch({ type: "modalActionBtnLeft", payload: "Cancel" });
    dispatch({ type: "modalActionBtnRight", payload: "Add" });
  }, [dispatch, setFormErrors]);

  const formRef = useRef();

  if (editable) {
    return (
      <>
        <Form
          formName={editProductForm}
          titleInput={titleInput}
          inputsTitle="Ingredients"
          inputsNoLabels={ingredientNames}
          labeledInputs={labeledInputsData}
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
              onClick={handleAddNewIngredient}
              styles="shadow bg-blue-400 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Add new Ingredient
            </Button>
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
            onConfirm={handleCloseModal}
            title={modalTitle}
            icon={modalIcon}
            disabledBtn={addNewInputDisabledBtn}
          >
            {modalContent}
          </MemoizedCustomModal>
        )}
      </>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-5 text-xl">{product?.title || ""}</h1>
      <div className="mb-5">
        <span>
          <u>Ingredients:</u>
        </span>
        <ul>
          {product?.ingredients.map((ingredient, i) => (
            <li key={i}>
              <i>{ingredient}</i>
            </li>
          )) || []}
        </ul>
      </div>
      <p className="font-bold">
        Price: {`${product?.price || ""} ${product?.currency_symbol || ""}`}
      </p>
      <span>Quantity: {product?.quantity || ""}</span>
    </div>
  );
});
export default CardSection2;
