/* eslint-disable no-unused-vars */
import React from "react";

const CardSection2 = React.memo(({ product }) => {
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

      {/* to display the new inputs */}
      {Object.entries(
        Object.keys(product)
          .filter((key) => key.startsWith("editProductForm"))
          .reduce((newObj, key) => {
            newObj[key] = product[key];
            return newObj;
          }, {}),
      ).map(([key, value], i) => (
        <span key={i}>
          {key.split("_")[1]}: {value || ""}
        </span>
      ))}
    </div>
  );
});
export default CardSection2;
