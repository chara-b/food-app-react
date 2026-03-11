// react
import { useEffect, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  Outlet,
} from "react-router-dom";
// components
import NavBar from "../components/nav-bar.jsx";
import NavBarItem from "../components/nav-item.jsx";
import ProductList from "../components/product-list.jsx";
import Footer from "../components/footer";
import Spinner from "../components/spinner/spinner.jsx";
import Paginator from "../components/paginator.jsx";
// pages

// custom hooks

// constants
// contexts
import { CustomModalContextProvider } from "../contexts/CustomModalContext.jsx";
import { FormContextProvider } from "../contexts/FormContext.jsx";
import { ProductsContextProvider } from "../contexts/ProductsContext.jsx";

function MainPage() {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();

  const fetchedData = useLoaderData();

  const handleChangedSearchText = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  useEffect(
    function () {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/login");
      }
    },
    [navigate],
  );

  return (
    <FormContextProvider>
      <CustomModalContextProvider>
        <ProductsContextProvider initialData={fetchedData}>
          <div className="flex flex-col gap-4 w-full h-screen">
            <NavBar className="w-full">
              <NavBarItem
                styles="w-100 px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                placeholder="Search..."
                type="input"
                value={searchText}
                icon="fa-solid fa-magnifying-glass"
                onChange={handleChangedSearchText}
              />
            </NavBar>

            {!isLoading &&
              (location.pathname === "/" ? (
                <ProductList
                  className="w-full"
                  searchText={searchText}
                  actionBtns={[
                    { actionBtn: "delete", buttonIcon: "fa-solid fa-trash" },
                    { actionBtn: "edit", buttonIcon: "fa-solid fa-edit" },
                  ]}
                  colsCount="3"
                >
                  <Paginator count={fetchedData.length} perPage={5} />
                </ProductList>
              ) : (
                <Outlet />
              ))}

            {isLoading && <Spinner />}

            <Footer className="w-full" />
          </div>
        </ProductsContextProvider>
      </CustomModalContextProvider>
    </FormContextProvider>
  );
}

export default MainPage;
