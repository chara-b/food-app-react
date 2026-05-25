/* eslint-disable no-unused-vars */
import Product from "./product.jsx";
import { useProductsContext } from "../../../app/providers/ProductsContext.tsx";
import React, { useEffect, useRef, type PropsWithChildren } from "react";
import CardSection2 from "../../card/components/card-section2.tsx";
import CardSection1 from "../../card/components/card-section1.tsx";
import type { ProductListBinProps } from "../types.ts";

const ProductListBin: React.FC<PropsWithChildren<ProductListBinProps>> =
  React.memo(({ actionBtns, colsCount, children }) => {
    const { displayedProducts } = useProductsContext();

    const listRef = useRef<HTMLUListElement>(null);

    let productsNum: number = displayedProducts.length;

    useEffect(() => {
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    }, [displayedProducts]);

    return productsNum ? (
      <>
        <ul
          ref={listRef}
          className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
        >
          {displayedProducts.map((product) => {
            return (
              <Product
                product={product}
                key={product.id}
                actionBtns={actionBtns}
              >
                <CardSection1
                  imgName={product.imgName}
                  allowUploadPhoto={false}
                />
                <CardSection2 product={product} />
              </Product>
            );
          })}
        </ul>
        {children}
      </>
    ) : (
      <ul
        className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
      >
        <li> "No Products found !"</li>
      </ul>
    );
  });

export default ProductListBin;
