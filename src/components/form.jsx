import Input from "./input.jsx";
import Button from "./button.jsx";
import React from "react";

const Form = React.memo(
  ({
    formName,
    titleInput,
    inputsTitle,
    inputsNoLabels,
    labeledInputs,
    onSubmit,
    onCancel,
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
          <>
            <Input
              label={titleInput.title}
              id={`${formName}_title`}
              name={`${formName}_title`}
              placeholder={titleInput.value}
              value={formState?.[`${formName}_title`] || ""}
              onChange={(e) => onChange(`${formName}_title`, e.target.value)}
              type="text"
              className={
                formErrors?.[`${formName}_title`]?.length
                  ? "border border-red-500"
                  : ""
              }
            >
              {/* {formErrors?.title?.length && (
              <ul className="text-red-500 text-sm">
                {formErrors?.title?.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )} */}
            </Input>
            {formErrors?.[`${formName}_title`] && (
              <span className="text-red-500 text-sm">
                {" "}
                {formErrors[`${formName}_title`]}
              </span>
            )}
          </>
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
                    id={`${formName}_ingredient${i}`}
                    name={`${formName}_ingredient${i}`}
                    placeholder={inputNoLabel}
                    value={formState?.[`${formName}_ingredient${i}`] || ""}
                    onChange={(e) =>
                      onChange(`${formName}_ingredient${i}`, e.target.value)
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
            {formErrors?.[`${formName}_ingredients`] && (
              <span className="text-red-500 text-sm">
                {formErrors[`${formName}_ingredients`]}
              </span>
            )}
          </div>
        )}

        {labeledInputs?.length &&
          labeledInputs.map((inputData, i) => (
            <React.Fragment key={i}>
              <Input
                label={inputData.label}
                id={`${formName}_feature${i}`}
                name={`${formName}_${inputData?.label}`.toLowerCase()}
                placeholder={inputData.value}
                value={
                  formState?.[
                    `${formName}_${inputData?.label}`.toLowerCase()
                  ] || ""
                }
                onChange={(e) =>
                  onChange(
                    `${formName}_${inputData?.label}`.toLowerCase(),
                    e.target.value,
                  )
                }
                type="text"
                className={
                  formErrors?.[`${formName}_${inputData?.label}`.toLowerCase()]
                    ?.length
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
              </Input>
              {formErrors?.[
                `${formName}_${inputData?.label}`.toLowerCase()
              ] && (
                <span className="text-red-500 text-sm">
                  {formErrors[`${formName}_${inputData?.label}`.toLowerCase()]}
                </span>
              )}
            </React.Fragment>
          ))}
        <div className="flex mt-5 justify-end gap-5">
          <div className="md:w-1/3"></div>
          <div className="md:w-1/3">
            <Button
              type="button"
              onClick={onCancel}
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
