import { useState } from "react";
import "./App.css";

import { data } from "./data.js";
import NavBarComponent from "./components/nav-bar";
import NavBarItem from "./components/nav-item.jsx";
import FoodList from "./components/food-list";
import Footer from "./components/footer";

function App() {
  const [searchText, setSearchText] = useState("");
  const [deletedFoods, setDeletedFoods] = useState([]);

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
      <FoodList
        className="w-full"
        data={data}
        searchText={searchText}
        receiveDeletedFoodsList={handleDeletedFoodsList}
        buttonsActions={[
          { buttonAction: "delete", buttonIcon: "fa-solid fa-trash" },
        ]}
        colsCount="3"
      />
      <Footer className="w-full" />
    </div>
  );
}

export default App;
