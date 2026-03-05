// react hooks
import { useState } from "react";

// css
import "./App.css";

// components
import NavBarComponent from "./components/nav-bar";
import NavBarItem from "./components/nav-item.jsx";
import FoodList from "./components/food-list";
import Footer from "./components/footer";
import Spinner from "./components/spinner/spinner.jsx";
import Error from "./pages/Error.jsx";

// custom hooks
import { useFetch } from "./hooks/useFetch.jsx";

// constants
import { PRODUCTS_URL } from "./constants/urls.js";

function App() {
  const [searchText, setSearchText] = useState("");
  const [deletedFoods, setDeletedFoods] = useState([]);

  const [fetchedData, isLoading, error] = useFetch(PRODUCTS_URL);

  const handleChangedSearchText = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const handleDeletedFoodsList = (deletedFoodsList) => {
    setDeletedFoods(deletedFoodsList);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      <NavBarComponent className="w-full" deletedFoods={() => deletedFoods}>
        <NavBarItem
          styles="w-100 px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          placeholder="Search..."
          type="input"
          value={searchText}
          icon="fa-solid fa-magnifying-glass"
          onChange={handleChangedSearchText}
        />
      </NavBarComponent>

      {!error && !isLoading && (
        <FoodList
          className="w-full"
          data={fetchedData}
          searchText={searchText}
          receiveDeletedFoodsList={handleDeletedFoodsList}
          buttonsActions={[
            { buttonAction: "delete", buttonIcon: "fa-solid fa-trash" },
            { buttonAction: "edit", buttonIcon: "fa-solid fa-edit" },
          ]}
          colsCount="3"
        />
      )}
      {!error && isLoading && <Spinner className="w-full" />}
      {error && <Error />}

      <Footer className="w-full" />
    </div>
  );
}

export default App;
