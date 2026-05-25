import type { DisplayedProduct } from "../../shared/types/types";

export type CardProps = {
  imgName?: string;
  allowUploadPhoto?: boolean;
  product?: DisplayedProduct;
  imageFile?: string;
  onChange?: () => void;
};
