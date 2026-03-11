import { useFormContext } from "../contexts/FormContext.jsx";
import Button from "./button";
import CardSection1 from "./card-section1.jsx";
import CardSection2 from "./card-section2.jsx";

function Product({ product, onClick, editable, actionBtns }) {
  const { updateProductDetails } = useFormContext();
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
              id={`${actionBtn}-${i}`}
              styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              key={i}
              onClick={() => onClick(actionBtn, product, updateProductDetails)}
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
