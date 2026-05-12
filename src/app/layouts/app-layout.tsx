import Footer from "../../features/footer/components/footer.tsx";
import NavBar from "../../features/nav-bar/components/nav-bar.tsx";
import NavBarItem from "../../features/nav-bar/components/nav-item.tsx";

function AppLayout() {
  return (
    <div className="flex flex-col w-full h-screen justify-between">
      <NavBar className="w-full">
        <NavBarItem
          styles="w-100 px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          placeholder="Search..."
          type="input"
          icon="fa-solid fa-magnifying-glass"
        />
      </NavBar>
      <Outlet />
      <Footer className="w-full h-screen" />
    </div>
  );
}

export default AppLayout;
