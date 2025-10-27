import "../styles/CustomBar.css";
import "../styles/index.css";
import "../styles/App.css";
import "animate.css";


import { NavBar } from "./CustomBarComponents/NavBar";
import { Header } from "./CustomBarComponents/Header";
import { Banner } from "./CustomBarComponents/Banner";
import { Footer } from "./FooterComponent/Footer";


export const HomePage = ({
  cartItems,
  itemCount,
  isCartOpen,
  onOpenCart,
  onCloseCart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenAuthModal = null,
}) => {
  return (
    <>
      <Header
              cartItems={cartItems}
              itemCount={itemCount}
              isCartOpen={isCartOpen}
              onOpenCart={onOpenCart}
              onCloseCart={onCloseCart}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
              onOpenAuthModal={onOpenAuthModal}
            />
      <NavBar />
      <Banner />
      <Footer />
    </>
  );
};
