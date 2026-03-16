/* eslint-disable no-unused-vars */
import { memo, useRef } from "react";
import { useFormContext } from "../contexts/FormContext";
import { Button } from "@headlessui/react";
import { useCustomModalContext } from "../contexts/CustomModalContext";
import { useProductsContext } from "../contexts/ProductsContext";
import { newProductForm } from "../constants/formNames.js";
import Form from "./form.jsx";
import { useNavigate } from "react-router-dom";

const NewProductForm = memo(() => {
  const navigate = useNavigate();
  const cachedUser = JSON.parse(localStorage.getItem("user"));
  const {
    formState,
    setFormState,
    formErrors,
    setFormErrors,
    isFormValid,
    onChange,
    user,
    isAuthenticated,
    logout,
    submitLogin,
    submitNewProduct,
    updateProductDetails,
    updateWholeProductDetails,
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
    dispatch,
    onAddNewInputField,
    onCloseModal,
    onConfirmModal,
  } = useCustomModalContext();

  const {
    filteredProducts,
    availableProducts,
    disabledProducts,
    searchText,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
    setDisabledProducts,
  } = useProductsContext();

  async function handleSubmit(e) {
    const submitted = await submitNewProduct(e, formRef);
    if (submitted) {
      await getAvailableProducts();
      navigate(`/mainpage/${cachedUser.email.split("@")[0]}`);
      onConfirmModal();
    }
  }

  const formRef = useRef();
  return (
    <Form
      className="w-full max-w-sm m-auto"
      onSubmit={handleSubmit}
      onCancel={onCloseModal}
      formRef={formRef}
      disabled={formErrors ? Object.keys(formErrors).length !== 0 : false}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newProductForm}_title`}
          >
            Title
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newProductForm}_title`}
            name={`${newProductForm}_title`}
            type="text"
            onChange={(e) =>
              onChange(`${newProductForm}_title`, e.target.value)
            }
          />
          {formErrors?.[`${newProductForm}_title`] && (
            <span className="text-red-600">
              {formErrors[`${newProductForm}_title`]}
            </span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newProductForm}_ingredients`}
          >
            Ingredients (comma seperated)
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newProductForm}_ingredients`}
            name={`${newProductForm}_ingredients`}
            type="text"
            onChange={(e) =>
              onChange(`${newProductForm}_ingredients`, e.target.value)
            }
          />
          {formErrors?.[`${newProductForm}_ingredients`] && (
            <span className="text-red-600">
              {formErrors[`${newProductForm}_ingredients`]}
            </span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newProductForm}_price`}
          >
            Price
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newProductForm}_price`}
            name={`${newProductForm}_price`}
            type="text"
            onChange={(e) =>
              onChange(`${newProductForm}_price`, e.target.value)
            }
          />
          {formErrors?.[`${newProductForm}_price`] && (
            <span className="text-red-600">
              {formErrors[`${newProductForm}_price`]}
            </span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newProductForm}_quantity`}
          >
            Quantity
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newProductForm}_quantity`}
            name={`${newProductForm}_quantity`}
            type="text"
            onChange={(e) =>
              onChange(`${newProductForm}_quantity`, e.target.value)
            }
          />
          {formErrors?.[`${newProductForm}_quantity`] && (
            <span className="text-red-600">
              {formErrors[[`${newProductForm}_quantity`]]}
            </span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor={`${newProductForm}_imgName`}
          >
            ImgName (eg. imgName.png)
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={`${newProductForm}_imgName`}
            name={`${newProductForm}_imgName`}
            type="text"
            onChange={(e) =>
              onChange(`${newProductForm}_imgName`, e.target.value)
            }
          />
          {formErrors?.[`${newProductForm}_imgName`] && (
            <span className="text-red-600">
              {formErrors[`${newProductForm}_imgName`]}
            </span>
          )}
        </div>
      </div>
    </Form>
  );
});

export default NewProductForm;
