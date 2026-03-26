/* eslint-disable no-unused-vars */
import React from "react";
import { firstLetterToUpperCaseFormatter } from "../utils/utilities.js";

const CardSection2 = React.memo(({ product }) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-5 text-xl">
        {firstLetterToUpperCaseFormatter(product?.title_visible) || ""}
      </h1>
      <div className="mb-5">
        <span>
          <u>Ingredients:</u>
        </span>
        <ul>
          {product?.ingredients_visible.map((ingredient, i) => (
            <li key={i}>
              <i>{ingredient}</i>
            </li>
          )) || []}
        </ul>
      </div>
      <p className="font-bold">
        Price:
        {` ${product?.price_visible || ""} ${product?.currency_symbol || ""}`}
      </p>
      <p>Quantity: {product?.quantity_visible || ""}</p>

      {/* to display the rest labeled inputs */}
      {Object.entries(
        Object.keys(product)
          .filter(
            (key) =>
              key.includes("visible") &&
              !key.includes("title") &&
              !key.includes("ingredients") &&
              !key.includes("price") &&
              !key.includes("quantity"),
          )
          .reduce((newObj, key) => {
            newObj[key] = product[key];
            return newObj;
          }, {}),
      ).map(([key, value], i) => (
        <span key={i}>
          {firstLetterToUpperCaseFormatter(key.split("_")[0])}: {value || ""}
        </span>
      ))}
    </div>
  );
});
export default CardSection2;
