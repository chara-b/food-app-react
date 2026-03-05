import Button from "./button";

function CardSection1({ imgName }) {
  return <img src={"../src/assets/" + imgName} className="w-20 mr-2" />;
}

function CardSection2({ title, ingredients, price, currency, quantity }) {
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
      <p className="font-bold">Price: {price + currency}</p>
      <span>Quantity: {quantity}</span>
    </div>
  );
}

function Product({ productData, onClick, buttonsActions, disabledBtn }) {
  return (
    <li className="flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5">
      <CardSection1 imgName={productData.imgName} />
      <CardSection2
        title={productData.title}
        ingredients={productData.ingredients}
        price={productData.price}
        currency={productData.currency}
        quantity={productData.quantity}
      />
      {buttonsActions.map(({ buttonAction, buttonIcon }, i) => {
        return (
          <Button
            styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            key={i}
            onClick={() => onClick(buttonAction, productData)}
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
