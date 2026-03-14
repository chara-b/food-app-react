import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Input from "./input.jsx";
import Button from "./button.jsx";
import React from "react";

const Form = React.memo(
  ({
    titleInputWithLabel,
    inputsTitle,
    inputsNoLabels,
    inputsWithLabels,
    onSubmit,
    onClick,
    actionBtns,
    formErrors,
    onChange,
    children,
  }) => {
    return (
      <form className="flex flex-col w-full" onSubmit={onSubmit}>
        <div className="flex gap-4 justify-end">{children}</div>
        {titleInputWithLabel && (
          <Input
            label={titleInputWithLabel.label}
            id={titleInputWithLabel.id?.toLowerCase().split(" ").join("-")}
            name={titleInputWithLabel.name?.toLowerCase().split(" ").join("-")}
            onChange={onChange}
            type={titleInputWithLabel.type}
            className={
              formErrors?.[titleInputWithLabel.name.toLowerCase()]?.length
                ? "border border-red-500"
                : ""
            }
          >
            {formErrors?.[titleInputWithLabel.name.toLowerCase()]?.length && (
              <ul className="text-red-500 text-sm">
                {formErrors?.[titleInputWithLabel.name.toLowerCase()]?.map(
                  (error, i) => (
                    <li key={i}>{error}</li>
                  ),
                )}
              </ul>
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
                    id={`${inputsTitle?.toLowerCase().split(" ").join("-")}-${inputNoLabel?.toLowerCase().split(" ").join("-")}`}
                    name={`${inputsTitle?.toLowerCase().split(" ").join("-")}-${inputNoLabel?.toLowerCase().split(" ").join("-")}`}
                    onChange={onChange}
                    type="text"
                    className={
                      formErrors?.[
                        `${inputsTitle?.toLowerCase().split(" ").join("-")}-${inputNoLabel?.toLowerCase().split(" ").join("-")}`
                      ]?.length
                        ? "border border-red-500"
                        : ""
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {inputsWithLabels?.length &&
          inputsWithLabels.map((inputData, i) => (
            <Input
              key={i}
              label={inputData.label}
              id={inputData.id?.toLowerCase().split(" ").join("-")}
              name={inputData.name?.toLowerCase().split(" ").join("-")}
              onChange={onChange}
              type={inputData.type}
              className={
                formErrors?.[inputData.name?.toLowerCase().split(" ").join("-")]
                  ?.length
                  ? "border border-red-500"
                  : ""
              }
            >
              {formErrors?.[inputData.name?.toLowerCase().split(" ").join("-")]
                ?.length && (
                <ul className="text-red-500 text-sm">
                  {formErrors?.[
                    inputData.name?.toLowerCase().split(" ").join("-")
                  ]?.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              )}
            </Input>
          ))}
        <div className="flex mt-5 justify-end gap-5">
          {actionBtns?.length &&
            actionBtns?.map(({ actionBtn, buttonIcon, type }, i) => {
              return (
                <Button
                  styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  key={i}
                  onClick={onClick}
                  type={type}
                  disabled={Object.keys(formErrors)?.length}
                >
                  {actionBtn}

                  <i className={buttonIcon}></i>
                </Button>
              );
            })}
          {/* {!actionBtns?.length && (
            <>
              <Button
                type="button"
                onClick={onClick}
                styles="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                styles="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                disabled={formState?.errors}
              >
                Add
              </Button>
            </>
          )} */}
        </div>
      </form>
    );
  },
);

export default Form;
