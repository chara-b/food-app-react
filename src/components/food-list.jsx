import Food from "./food.jsx";
import { useEffect, useState } from "react";

function FoodList({
  data,
  buttonsActions,
  searchText,
  receiveDeletedFoodsList,
  colsCount,
}) {
  const [availableFoods, setAvailableFoods] = useState(data || []);
  const [filteredFoods, setFilteredFoods] = useState(data || []);
  const [deletedFoods, setDeletedFoods] = useState([]);

  const handleDeletedFood = (deletedFood) => {
    console.log("deletedFood: ", deletedFood);
    const results = filteredFoods.filter((food) => food.id !== deletedFood.id);
    setFilteredFoods(results);
    setAvailableFoods(results);
    setDeletedFoods((prevDeletedFoods) => [...prevDeletedFoods, deletedFood]);
  };

  const handleRestoredFood = (restoredFood) => {
    console.log("restoredFood: ", restoredFood);
    setFilteredFoods((prevFilteredFoods) => [
      ...prevFilteredFoods,
      restoredFood,
    ]);
  };

  const handleEditedFood = (editedFood) => {
    console.log("editedFood: ", editedFood);
  };

  const handleFood = (buttonAction, foodData) => {
    if (buttonAction === "delete") {
      handleDeletedFood(foodData);
    }
    if (buttonAction === "restore") {
      handleRestoredFood(foodData);
    }
    if (buttonAction === "edit") {
      handleEditedFood(foodData);
    }
  };

  useEffect(() => {
    // for search keyword
    if (!searchText?.trim()) {
      setFilteredFoods(availableFoods);
    }
    if (searchText?.trim()) {
      const lowCaseSearchText = searchText.toLowerCase();
      const results = availableFoods.filter((food) =>
        food.title.toLowerCase().includes(lowCaseSearchText),
      );
      setFilteredFoods(results);
    }

    // for sending back to the App the real deletedFoods list
    if (typeof receiveDeletedFoodsList === "function") {
      receiveDeletedFoodsList(deletedFoods);
      console.log(deletedFoods);
    }
  }, [searchText, deletedFoods, receiveDeletedFoodsList, availableFoods]);

  const foodsNum = filteredFoods.length;

  return foodsNum ? (
    <ul
      className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
    >
      {filteredFoods.map((food) => {
        return (
          <Food
            foodData={food}
            key={food.id}
            onClick={handleFood}
            buttonsActions={buttonsActions}
          />
        );
      })}
    </ul>
  ) : (
    <ul
      className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
    >
      <li> "No foods found !"</li>
    </ul>
  );
}

export default FoodList;
