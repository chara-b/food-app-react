import Input from "./input.jsx";
import Button from "./button.jsx";
import React from "react";

const Form = React.memo(
  ({
    formName,
    product,
    ingredients,
    newInputsDetails,
    onSubmit,
    onCancel,
    onAddNewIngredient,
    onRemoveIngredient,
    formState,
    formErrors,
    disabled,
    onChange,
    formRef,
    children,
  }) => {
    return (
      <form className="flex flex-col w-full" onSubmit={onSubmit} ref={formRef}>
        <div className="flex gap-4 justify-end flex-col">{children}</div>

        {product &&
          Object.keys(product).map((key, i) => {
            // in db visible fields are saved as title_visible so the form knows what fields to dynamically
            // show ! to idio tha borouse na ginei an eixa mia pragmatiki basi me enan lookuptable o opoios
            // tha kratouse ta kleidia ton pedion pou thelo na einai visible kai me ena query tha ta eferna edo sti forma
            // alla ston json server ebala ena _visible tag gia na prosomoioso kati tetoio ! opote to cleanKey stin ousia
            // exei to onoma tou pediou xoris auto to _visible tag ! sti basi ola ta nea mou pleon fields pou kanei add
            // o xristis exoun auto to _visible !
            const cleanKey = key.split("_")[0];
            if (key.includes("title")) {
              return (
                <React.Fragment key={i}>
                  <Input
                    label={cleanKey}
                    id={`${formName}_${cleanKey}_feature`}
                    name={`${formName}_${cleanKey}`}
                    placeholder={product[key]}
                    value={formState?.[`${formName}_${cleanKey}`] || ""}
                    onChange={(e) =>
                      onChange(`${formName}_${cleanKey}`, e.target.value)
                    }
                    type="text"
                    className={
                      formErrors?.[`${formName}_${cleanKey}`]?.length
                        ? "border border-red-500"
                        : ""
                    }
                  ></Input>
                  {formErrors?.[`${formName}_${cleanKey}`] && (
                    <span className="text-red-500 text-sm">
                      {" "}
                      {formErrors[`${formName}_${cleanKey}`]}
                    </span>
                  )}
                </React.Fragment>
              );
            }

            if (key.includes("ingredients")) {
              return (
                <div className="mb-5" key={i}>
                  <span className="block text-sm/6 font-medium text-gray-900">
                    {cleanKey}
                  </span>
                  <ul>
                    {ingredients?.map(([key, value], i) => (
                      <li key={i}>
                        <Input
                          id={key}
                          name={key}
                          placeholder={value}
                          value={formState?.[key] || ""}
                          onChange={(e) => onChange(key, e.target.value)}
                          type="text"
                        >
                          <Button
                            type="button"
                            onClick={
                              i === ingredients.length - 1
                                ? onAddNewIngredient
                                : () => onRemoveIngredient(key)
                            }
                            styles={
                              i === ingredients.length - 1
                                ? "shadow bg-blue-400 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                : "shadow bg-red-400 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            }
                          >
                            {i === ingredients.length - 1 ? "+" : "-"}
                          </Button>
                        </Input>
                      </li>
                    ))}
                  </ul>

                  {formErrors?.[`${formName}_ingredients`] && (
                    <span className="text-red-500 text-sm">
                      {formErrors[`${formName}_ingredients`]}
                    </span>
                  )}
                </div>
              );
            }

            if (
              key.includes("visible") &&
              !key.includes("title") &&
              !key.includes("ingredients")
            ) {
              return (
                <React.Fragment key={i}>
                  <Input
                    label={cleanKey}
                    id={`${formName}_${cleanKey}_feature`}
                    name={`${formName}_${cleanKey}`}
                    placeholder={product[key]}
                    value={formState?.[`${formName}_${cleanKey}`] || ""}
                    onChange={(e) =>
                      onChange(`${formName}_${cleanKey}`, e.target.value)
                    }
                    type="text"
                    className={
                      formErrors?.[`${formName}_${cleanKey}`]?.length
                        ? "border border-red-500"
                        : ""
                    }
                  ></Input>
                  {formErrors?.[`${formName}_${cleanKey}`] && (
                    <span className="text-red-500 text-sm">
                      {formErrors[`${formName}_${cleanKey}`]}
                    </span>
                  )}
                </React.Fragment>
              );
            }
          })}

        {newInputsDetails?.map((newInputDetails, i) => {
          return (
            <React.Fragment key={i}>
              <Input
                label={newInputDetails.label}
                id={`${formName}_${newInputDetails.label}_feature`}
                name={`${formName}_${newInputDetails.label}`}
                placeholder={newInputDetails.value}
                value={
                  formState?.[`${formName}_${newInputDetails.label}`] || ""
                }
                onChange={(e) =>
                  onChange(
                    `${formName}_${newInputDetails.label}`,
                    e.target.value,
                  )
                }
                type="text"
                className={
                  formErrors?.[`${formName}_${newInputDetails.label}`]?.length
                    ? "border border-red-500"
                    : ""
                }
              ></Input>
              {formErrors?.[`${formName}_${newInputDetails.label}`] && (
                <span className="text-red-500 text-sm">
                  {formErrors[`${formName}_${newInputDetails.label}`]}
                </span>
              )}
            </React.Fragment>
          );
        })}

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
              disabled={disabled}
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
