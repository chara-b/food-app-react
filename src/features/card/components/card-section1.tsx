import { type PropsWithChildren } from "react";
import Input from "../../../shared/components/input.tsx";
import type { CardProps } from "../types.ts";

const CardSection1: React.FC<PropsWithChildren<CardProps>> = ({
  imgName,
  imageFile,
  allowUploadPhoto,
  onChange,
}) => {
  if (allowUploadPhoto) {
    return (
      <label className="cursor-pointer w-32 rounded">
        Upload Photo
        <img src={imageFile} className="w-20 mr-2" />
        <Input
          id="upload-photo"
          name="upload-photo"
          type="file"
          className="hidden"
          onChange={onChange}
        ></Input>
      </label>
    );
  }

  return (
    <img
      src={
        imgName.includes("base64") ? imgName : `/src/public/images/${imgName}`
      }
      className="w-20 mr-2"
    />
  );
};

export default CardSection1;
