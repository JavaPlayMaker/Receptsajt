import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* under uppbyggnad med Categories */

function RootLayout() {
  const categories = ["huvudrätt", "Sushi", "Stark"];

  return (
    <>
      <Header categories={categories} />

      <Outlet />

      <Footer />
    </>
  );
}

export default RootLayout;
