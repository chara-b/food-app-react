/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { defaultProductFormInputs } from "../constants/formFieldsNames";
import { useCustomModalContext } from "../contexts/CustomModalContext";
import MemoizedCustomModal from "./custom-modal";
import Form from "./form";
import Button from "./button";
import { useFormContext } from "../contexts/FormContext";

const CardSection2 = React.memo(
  ({ product, editable, onClick, actionBtns, onSubmit }) => {
    // for ingredient inputs with no labels
    const [ingredientNames, setIngredientNames] = useState(
      product?.ingredients || [""],
    );

    // for other inputs with labels
    const [labeledInputsData, setLabeledInputsData] = useState(function () {
      return defaultProductFormInputs.map(({ label, type }, i) => {
        return {
          label: label,
          id: (product?.id && `field-${product?.id}`) || `field-${i}`,
          name: (product?.id && `field-${product?.id}`) || `field-${i}`,
          value: product?.[label] || "",
          type: type,
        };
      });
    });
    // for the title one and only input
    const [productTitleInput] = useState({
      label: "Food Title",
      id: "product-title",
      name: "product-title",
      value: product?.title || "",
      type: "text",
    });

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
      submitNewInputFields,
    } = useFormContext();

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

    if (editable) {
      return (
        <Form
          titleInputWithLabel={productTitleInput}
          inputsTitle="Ingredients"
          inputsNoLabels={ingredientNames}
          inputsWithLabels={labeledInputsData}
          onSubmit={onSubmit}
          onClick={onClick}
          actionBtns={actionBtns}
          formState={formState}
          formErrors={formErrors}
          onChange={onChange}
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
  },
);
export default CardSection2;
