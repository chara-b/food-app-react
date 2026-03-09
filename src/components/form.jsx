import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Input from "./input.jsx";

function Form({
  title,
  inputsTitle,
  inputsNoLabels,
  inputsWithLabels,
  onChange,
  children,
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 justify-end">{children}</div>
      <h1 className="mb-5 text-xl">{title}</h1>
      {inputsNoLabels.length && (
        <div className="mb-5">
          <span className="block text-sm/6 font-medium text-gray-900">
            {inputsTitle}
          </span>
          <ul>
            {inputsNoLabels.map((inputNoLabel, i) => (
              <li key={i}>
                <Input
                  id={`${inputsTitle?.toLowerCase()}-${inputNoLabel?.toLowerCase()}`}
                  name={`${inputsTitle?.toLowerCase()}-${inputNoLabel?.toLowerCase()}`}
                  value={inputNoLabel}
                  onChange={onChange}
                  type="text"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <Input
        label="Price"
        id="price"
        name="price"
        value={product.value}
        onChange={onChange}
        type="text"
      >
        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
          <select
            id="currency"
            name="currency"
            aria-label="Currency"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option>USD</option>
            <option selected={product.currency === "euro"}>EUR</option>
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </Input> */}

      {inputsWithLabels.length &&
        inputsWithLabels.map((inputData, i) => (
          <Input
            key={i}
            label={inputData.label}
            id={inputData.label?.toLowerCase()}
            name={inputData.label?.toLowerCase()}
            value={inputData.value}
            onChange={onChange}
            type={inputData.type}
          />
        ))}
    </div>
  );
}

export default Form;
