export type ActionBtn = {
  actionBtn: string;
  buttonIcon: string;
  type: string;
};
export type DisplayedProduct = {
  id: string;
  title_visible: string;
  ingredients_visible: string[];
  price_visible: string;
  currency: string;
  currency_symbol: string;
  imgName: string;
  quantity_visible: string;
  disabled: boolean;
  [key: string]: unknown;
};
