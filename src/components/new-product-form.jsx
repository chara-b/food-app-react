/* eslint-disable no-unused-vars */
import { memo, useRef } from "react";
import { useFormContext } from "../contexts/FormContext";
import { Form } from "react-router-dom";
import { Button } from "@headlessui/react";
import { useCustomModalContext } from "../contexts/CustomModalContext";

const NewProductForm = memo(() => {
  const {
    formState,
    formErrors,
    isFormValid,
    onChange,
    user,
    isAuthenticated,
    logout,
    submitLogin,
    submitNewProduct,
    updateProductDetails,
    submitNewInputFields,
  } = useFormContext();

  const {
    showCustomModal,
    modalTriggerButtonName,
    modalTitle,
    modalContent,
    modalIcon,
    modalActionBtnLeft,
    modalActionBtnRight,
    addNewInputModalResultData,
    addNewInputDisabledBtn,
    addNewInputFormState,
    onAddNewProduct,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

  function handleSubmit(e) {
    const submitted = submitNewProduct(e, formRef);
    if (submitted) {
      onConfirmModal();
    }
  }

  const formRef = useRef();
  return (
    <Form
      className="w-full max-w-sm m-auto"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="title"
          >
            Title
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="title"
            name="title"
            type="text"
            onChange={(e) => onChange("title", e.target.value)}
          />
          {formErrors.title && (
            <span className="text-red-600">{formErrors.title}</span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="ingredients"
          >
            Ingredients (comma seperated)
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="ingredients"
            name="ingredients"
            type="ingredients"
            onChange={(e) => onChange("ingredients", e.target.value)}
          />
          {formErrors.ingredients && (
            <span className="text-red-600">{formErrors.ingredients}</span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="price"
          >
            Price
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="price"
            name="price"
            type="text"
            onChange={(e) => onChange("price", e.target.value)}
          />
          {formErrors.price && (
            <span className="text-red-600">{formErrors.price}</span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="quantity"
          >
            Quantity
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="quantity"
            name="quantity"
            type="text"
            onChange={(e) => onChange("quantity", e.target.value)}
          />
          {formErrors.quantity && (
            <span className="text-red-600">{formErrors.quantity}</span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="imgName"
          >
            ImgName (eg. imgName.png)
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="imgName"
            name="imgName"
            type="text"
            onChange={(e) => onChange("imgName", e.target.value)}
          />
          {formErrors.imgName && (
            <span className="text-red-600">{formErrors.imgName}</span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-1/3">
          <Button
            type="submit"
            disabled={
              formErrors.title ||
              formErrors.ingredients ||
              formErrors.price ||
              formErrors.quantity
            }
            styles="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Save
          </Button>
        </div>
        <div className="md:w-1/3">
          <Button
            type="button"
            onClick={onCloseModal}
            styles="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </Button>
        </div>
        <div className="md:w-1/3">
          {formErrors.form && (
            <span className="text-red-600">{formErrors.form}</span>
          )}
        </div>
      </div>
    </Form>
  );
});

export default NewProductForm;
