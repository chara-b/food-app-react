/* eslint-disable no-unused-vars */
import { memo, useMemo, useRef } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import Form from "./form.js";
import { newInputForm } from "../constants/formNames.js";

const NewInputForm = memo(({ onSubmit }) => {
  const { formErrors, onChange } = useFormContext();

  const { onCloseModal } = useCustomModalContext();

  const formRef = useRef();

  return (
    <Form
      className="w-full max-w-sm m-auto"
      onSubmit={(e) => onSubmit(e, formRef)}
      onCancel={onCloseModal}
      formRef={formRef}
      disabled={formErrors ? Object.keys(formErrors).length !== 0 : false}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newInputForm}_label`}
          >
            Label
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newInputForm}_label`}
            name={`${newInputForm}_label`}
            type="text"
            onChange={(e) => onChange(`${newInputForm}_label`, e.target.value)}
          />
          {formErrors?.[`${newInputForm}_label`] && (
            <span className="text-red-600">
              {formErrors[`${newInputForm}_label`]}
            </span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newInputForm}_value`}
          >
            Value
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newInputForm}_value`}
            name={`${newInputForm}_value`}
            type="text"
            onChange={(e) => onChange(`${newInputForm}_value`, e.target.value)}
          />
          {formErrors?.[`${newInputForm}_value`] && (
            <span className="text-red-600">
              {formErrors[`${newInputForm}_value`]}
            </span>
          )}
        </div>
      </div>
    </Form>
  );
});

export default NewInputForm;
