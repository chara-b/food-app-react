import type { FormErrors, FormState } from "../../../features/form/types";
import type { DisplayedProduct, User } from "../../../shared/types/types";

export type NewInputField = { label: string; value: string };

export type ProductDetails = {
  id: string;
  propToUpdate: string;
  newValue: boolean;
};

export type FormContextType = {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  isFormValid: boolean;
  onChange: (fieldName: string, value: string) => void;
  onDelete: (fieldName: string) => void;
  user: User;
  isAuthenticated: boolean;
  logout: () => void;
  submitLogin: (
    e: React.SubmitEvent,
    formRef: React.RefObject<HTMLFormElement>
  ) => Promise<object | void>;
  submitNewProduct: (
    e: React.SubmitEvent,
    formRef: React.RefObject<HTMLFormElement>,
    imageBase64: string
  ) => Promise<boolean>;
  updateProductDetails: (productDetails: ProductDetails) => Promise<void>;
  updateWholeProductDetails: (
    e: React.SubmitEvent,
    formRef: React.RefObject<HTMLFormElement>,
    imageBase64: string,
    editedProduct: DisplayedProduct
  ) => Promise<boolean>;
  submitNewInputFields: (
    e: React.SubmitEvent,
    formRef: React.RefObject<HTMLFormElement>
  ) => NewInputField | void;
};
