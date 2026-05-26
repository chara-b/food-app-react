export type ActionBtn = {
  actionBtn: string;
  buttonIcon: string;
  type: string;
};
export type DisplayedProduct = {
  id?: string;
  title_visible?: string;
  ingredients_visible?: string[];
  price_visible?: string;
  currency?: string;
  currency_symbol?: string;
  imgName?: string;
  quantity_visible?: string;
  disabled?: boolean;
  [key: string]: unknown;
};

export type InputProps = {
  label?: string;
  id?: string;
  className?: string;
  name?: string;
  value?: string | number;
  type?: string;
  onChange: () => void;
  onClick?: () => void;
  placeholder?: string;
};

export type ButtonProps = {
  id?: string;
  type?: "button" | "submit" | "reset";
  name?: string;
  styles?: string;
  onClick: () => void;
  disabled?: boolean;
};

export type User = {
  id: string | number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};
