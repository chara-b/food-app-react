import { useState } from "react";
import { defaultProductFormInputs } from "../constants/formFieldsNames";
import { useCustomModalContext } from "../contexts/CustomModalContext";
import MemoizedCustomModal from "./custom-modal";
import Form from "./form";
import Button from "./button";

function CardSection2({ product, editable, onClick, actionBtns }) {
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
    addNewInputModalResultData,
    addNewInputDisabledBtn,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

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
        title={product?.title || "New Food"}
        inputsTitle="Ingredients"
        inputsNoLabels={ingredientNames}
        inputsWithLabels={labeledInputsData}
        titleInputWithLabel={productTitleInput}
        onClick={onClick}
        actionBtns={actionBtns}
      >
        <Button
          styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={handleAddNewIngredient}
          type="button"
        >
          <i className="fa-solid fa-plus"></i>Add Ingredient
        </Button>
        <Button
          styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={onAddNewInputField}
          type="button"
        >
          <i className="fa-solid fa-plus"></i>Add Input
        </Button>
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
}

export default CardSection2;
