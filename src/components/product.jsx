import { useState } from "react";
import Button from "./button";
import Form from "./form.jsx";

function CardSection1({ imgName }) {
  return <img src={"../src/assets/" + imgName} className="w-20 mr-2" />;
}

function CardSection2({
  title,
  ingredients,
  price,
  currency,
  currency_symbol,
  quantity,
  editable,
}) {
  const [ingredientNames, setIngredientNames] = useState(ingredients);
  const [newInputsWithLabelNames, setNewInputsWithLabelNames] = useState([]);
  const [newInputName, setNewInputName] = useState("");

  function onAddNewInput() {
    setNewInputsWithLabelNames((inputsWithLabel) => [
      ...inputsWithLabel,
      {
        label: "Quantity",
        id: "quantity",
        name: "quantity",
        value: quantity,
        type: "text",
      },
    ]);
  }
  function onAddNewIngredient() {
    setIngredientNames((ingredientNames) => [...ingredientNames, ""]);
  }
  if (editable) {
    return (
      <Form
        title={title}
        ingredients={ingredientNames}
        newInputsWithLabelNames={newInputsWithLabelNames}
        price={price}
        currency={currency}
        quantity={quantity}
      >
        <Button
          styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={onAddNewIngredient}
        >
          <i className="fa-solid fa-plus"></i>Add Ingredient
        </Button>
        <Button
          styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={onAddNewInput}
        >
          <i className="fa-solid fa-plus"></i>Add Input
        </Button>
      </Form>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-5 text-xl">{title}</h1>
      <div className="mb-5">
        <span>
          <u>Ingredients:</u>
        </span>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li key={i}>
              <i>{ingredient}</i>
            </li>
          ))}
        </ul>
      </div>
      <p className="font-bold">Price: {`${price} ${currency_symbol}`}</p>
      <span>Quantity: {quantity}</span>
    </div>
  );
}

function Product({ product, onClick, actionBtns, editable, disabledBtn }) {
  return (
    <li className="flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5">
      <CardSection1 imgName={product.imgName} />
      <CardSection2
        editable={editable}
        title={product.title}
        ingredients={product.ingredients}
        price={product.price}
        currency={product.currency}
        currency_symbol={product.currency_symbol}
        quantity={product.quantity}
      />
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
