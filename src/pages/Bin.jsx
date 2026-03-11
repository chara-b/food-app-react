import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Paginator from "../components/paginator";
import ProductList from "../components/product-list";
import Spinner from "../components/spinner/spinner";
import { useMemo } from "react";

function Bin({ searchText }) {
  const disabledProducts = useLoaderData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "restore",
        buttonIcon: "fa-solid fa-arrow-rotate-left",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      {" "}
      {!isLoading && location.pathname === "/bin" && (
        <ProductList
          className="w-full"
          data={disabledProducts}
          searchText={searchText}
          actionBtns={actionBtns}
          colsCount="3"
        >
          <Paginator count={disabledProducts.length} perPage={5} />
        </ProductList>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}

export default Bin;
