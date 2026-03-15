/* eslint-disable no-unused-vars */
import React, { useMemo, useRef, useState } from "react";
import { defaultProductFormInputs } from "../constants/formFieldsNames";
import { useCustomModalContext } from "../contexts/CustomModalContext";
import MemoizedCustomModal from "./custom-modal";
import Form from "./form.jsx";
import { useFormContext } from "../contexts/FormContext";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../contexts/ProductsContext.jsx";

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
    onAddNewProduct,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

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

  const formRef = useRef();

  if (editable) {
    return (
      <Form
        titleInput={titleInput}
        inputsTitle="Ingredients"
        inputsNoLabels={ingredientNames}
        labeledInputs={labeledInputsData}
        onClick={onClick}
        formState={formState}
        formErrors={formErrors}
        onChange={onChange}
        onSubmit={onSubmit}
        ref={formRef}
      >
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
      </Form>
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
