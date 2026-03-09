import { useState } from "react";
import Button from "./button";
import Form from "./form.jsx";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import CustomModal from "./custom-modal.jsx";
import { defaultProductFormInputs } from "../constants/formFieldsNames.js";

function CardSection1({ imgName }) {
  return <img src={"../src/assets/" + imgName} className="w-20 mr-2" />;
}

function CardSection2({ product, editable }) {
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
    modalTitle,
    modalContent,
    modalIcon,
    modalActionBtnLeft,
    modalActionBtnRight,
    modalResultData,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

  function handleAddNewIngredient() {
    setIngredientNames((ingredientNames) => [...ingredientNames, ""]);
  }

  function handleCloseModal() {
    onConfirmModal();
    console.log("MODAL DATA", modalResultData);
    setLabeledInputsData((prev) => [
      ...prev,
      {
        label: modalResultData.label,
        value: modalResultData.value,
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
        product={product}
      >
        <Button
          styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={handleAddNewIngredient}
        >
          <i className="fa-solid fa-plus"></i>Add Ingredient
        </Button>
        <Button
          styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={onAddNewInputField}
        >
          <i className="fa-solid fa-plus"></i>Add Input
        </Button>
        {showCustomModal && (
          <CustomModal
            isOpen={true}
            onClose={onCloseModal}
            onConfirm={handleCloseModal}
            title={modalTitle}
            icon={modalIcon}
            actionBtnLeft={modalActionBtnLeft}
            actionBtnRight={modalActionBtnRight}
          >
            {modalContent}
          </CustomModal>
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

function Product({ product, onClick, actionBtns, editable, disabledBtn }) {
  return (
    <li className="flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5">
      <CardSection1 imgName={product.imgName} />
      <CardSection2 editable={editable} product={product} />
      {actionBtns?.map(({ actionBtn, buttonIcon }, i) => {
        return (
          <Button
            styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            key={i}
            onClick={() => onClick(actionBtn, product)}
            disabled={disabledBtn}
          >
            <i className={buttonIcon}></i>
          </Button>
        );
      })}
    </li>
  );
}
export default Product;
