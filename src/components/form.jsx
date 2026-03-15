import Input from "./input.jsx";
import Button from "./button.jsx";
import React from "react";

const Form = React.memo(
  ({
    titleInput,
    inputsTitle,
    inputsNoLabels,
    labeledInputs,
    onSubmit,
    onClick,
    formState,
    formErrors,
    onChange,
    formRef,
    children,
  }) => {
    return (
      <form className="flex flex-col w-full" onSubmit={onSubmit} ref={formRef}>
        <div className="flex gap-4 justify-end">{children}</div>
        {titleInput && (
          <Input
            label={titleInput.title}
            id="title"
            name="title"
            placeholder={titleInput.value}
            value={formState?.title}
            onChange={(e) => onChange("title", e.target.value)}
            type="text"
            className={formErrors?.title?.length ? "border border-red-500" : ""}
          >
            {/* {formErrors?.title?.length && (
              <ul className="text-red-500 text-sm">
                {formErrors?.title?.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )} */}
            {formErrors?.title && (
              <span className="text-red-500 text-sm">{formErrors.title}</span>
            )}
          </Input>
        )}
        {inputsNoLabels?.length && (
          <div className="mb-5">
            <span className="block text-sm/6 font-medium text-gray-900">
              {inputsTitle}
            </span>
            <ul>
              {inputsNoLabels.map((inputNoLabel, i) => (
                <li key={i}>
                  <Input
                    id={`ingredient-${i}`}
                    name={`ingredient-${i}`}
                    placeholder={inputNoLabel}
                    value={formState?.[`ingredient-${i}`]}
                    onChange={(e) =>
                      onChange(`ingredient-${i}`, e.target.value)
                    }
                    type="text"
                  />
                </li>
              ))}
            </ul>
            {/* {formErrors?.ingredients?.length && (
              <ul className="text-red-500 text-sm">
                {formErrors?.ingredients?.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )} */}
            {formErrors?.ingredients && (
              <span className="text-red-500 text-sm">
                {formErrors.ingredients}
              </span>
            )}
          </div>
        )}

        {labeledInputs?.length &&
          labeledInputs.map((inputData, i) => (
            <Input
              key={i}
              label={inputData.label}
              id={`feature-${i}`}
              name={inputData?.label?.toLowerCase()}
              placeholder={inputData.value}
              value={formState?.[inputData?.label?.toLowerCase()]}
              onChange={(e) =>
                onChange(inputData?.label?.toLowerCase(), e.target.value)
              }
              type="text"
              className={
                formErrors?.[inputData?.label?.toLowerCase()]?.length
                  ? "border border-red-500"
                  : ""
              }
            >
              {/* {formErrors?.[inputData?.label?.toLowerCase()]?.length && (
                <ul className="text-red-500 text-sm">
                  {formErrors?.inputData?.label
                    ?.toLowerCase()
                    ?.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                </ul>
              )} */}
              {formErrors?.[inputData?.label?.toLowerCase()] && (
                <span className="text-red-500 text-sm">
                  {formErrors.ingredients}
                </span>
              )}
            </Input>
          ))}
        <div className="flex mt-5 justify-end gap-5">
          <div className="md:w-1/3"></div>
          <div className="md:w-1/3">
            <Button
              type="button"
              onClick={onClick}
              styles="shadow bg-gray-400 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </Button>
          </div>
          <div className="md:w-1/3">
            <Button
              type="submit"
              disabled={Object.keys(formErrors).length}
              styles="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Save
            </Button>
          </div>

          <div className="md:w-1/3">
            {formErrors?.form && (
              <span className="text-red-600">{formErrors.form}</span>
            )}
          </div>
        </div>
      </form>
    );
  },
);

export default Form;
