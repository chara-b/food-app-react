// react
import { useState } from "react";
// components
import NavBar from "../components/nav-bar.jsx";
import NavBarItem from "../components/nav-item.jsx";
import ProductList from "../components/product-list.jsx";
import Footer from "../components/footer";
import Spinner from "../components/spinner/spinner.jsx";
import Paginator from "../components/paginator.jsx";
// pages
import Error from "./Error.jsx";
// custom hooks
import { useFetch } from "../hooks/useFetch.jsx";
// constants
import { PRODUCTS_URL } from "../constants/urls.js";

function MainPage() {
  const [searchText, setSearchText] = useState("");
  const [deletedProducts, setDeletedProducts] = useState([]);

  const [fetchedData, isLoading, error] = useFetch(PRODUCTS_URL);

  const handleChangedSearchText = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const handleDeletedProductsList = (deletedProductsList) => {
    setDeletedProducts(deletedProductsList);
  };
  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      <NavBar className="w-full" deletedProducts={() => deletedProducts}>
        <NavBarItem
          styles="w-100 px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          placeholder="Search..."
          type="input"
          value={searchText}
          icon="fa-solid fa-magnifying-glass"
          onChange={handleChangedSearchText}
        />
      </NavBar>

      {!error && !isLoading && (
        <ProductList
          className="w-full"
          data={fetchedData}
          searchText={searchText}
          receiveDeletedProductsList={handleDeletedProductsList}
          buttonsActions={[
            { buttonAction: "delete", buttonIcon: "fa-solid fa-trash" },
            { buttonAction: "edit", buttonIcon: "fa-solid fa-edit" },
          ]}
          colsCount="3"
        >
          <Paginator count={fetchedData.length} perPage={5} />
        </ProductList>
      )}

      {!error && isLoading && <Spinner />}
      {error && <Error />}

      <Footer className="w-full" />
    </div>
  );
}

export default MainPage;
