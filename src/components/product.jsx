import { useState } from "react";
import Button from "./button";
import Form from "./form.jsx";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import CustomModal from "./custom-modal.jsx";
import { defaultProductFormInputs } from "../constants/formFieldsNames.js";
import MemoizedCustomModal from "./custom-modal.jsx";

function CardSection1({ imgName }) {
  return <img src={"../src/assets/" + imgName} className="w-20 mr-2" />;
}

function CardSection2({ product, editable, onClick, actionBtns }) {
  // for ingredient inputs with no labels
  const [ingredientNames, setIngredientNames] = useState(product.ingredients);

  // for other inputs with labels
  const [labeledInputsData, setLabeledInputsData] = useState(function () {
    return defaultProductFormInputs.map(({ label, type }) => {
      return {
        label: label,
        value: product[label],
        type: type,
      };
    });
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
        title={product.title}
        inputsTitle="Ingredients"
        inputsNoLabels={ingredientNames}
        inputsWithLabels={labeledInputsData}
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
      <h1 className="mb-5 text-xl">{product.title}</h1>
      <div className="mb-5">
        <span>
          <u>Ingredients:</u>
        </span>
        <ul>
          {product.ingredients.map((ingredient, i) => (
            <li key={i}>
              <i>{ingredient}</i>
            </li>
          ))}
        </ul>
      </div>
      <p className="font-bold">
        Price: {`${product.price} ${product.currency_symbol}`}
      </p>
      <span>Quantity: {product.quantity}</span>
    </div>
  );
}

function Product({ product, onClick, editable, actionBtns }) {
  return (
    <li className="flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5">
      <CardSection1 imgName={product.imgName} />
      <CardSection2
        editable={editable}
        product={product}
        onClick={onClick}
        actionBtns={actionBtns}
      />
      {actionBtns.length &&
        !editable &&
        actionBtns?.map(({ actionBtn, buttonIcon }, i) => {
          return (
            <Button
              styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              key={i}
              onClick={() => onClick(actionBtn, product)}
              type="button"
            >
              <i className={buttonIcon}></i>
            </Button>
          );
        })}
    </li>
  );
}
export default Product;
