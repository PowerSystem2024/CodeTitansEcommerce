import React from "react";
import "./Header.css";
import group from "../../assets/img/Group.svg";
import searchIcon from "../../assets/img/lupa.png";
import user from "../../assets/img/user.svg";
import cart from "../../assets/img/cart.svg";
import { Cart } from "../Cart";
import { useNavigate } from "react-router-dom";


export const Header = ({
  cartItems = [],
  itemCount = 0,
  isCartOpen = false,
  onOpenCart = () => {},
  onCloseCart = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {}
  , onOpenAuthModal = null
}) => {

  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    console.log('Navegando a home...');
    navigate('/');
    console.log('Navigate ejecutado');
  };

  const resolveUserRole = () => {
    try {
      const stored = sessionStorage.getItem('authUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.role) return parsed.role;
      }
  } catch { /* noop */ }

    const token = sessionStorage.getItem('authToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      return payload?.role || null;
    } catch {
      return null;
    }
  };


  return (
    <div className="header">
      <div className="logo-container" onClick={handleNavigateToHome}>
        <img src={group} alt="Catfecito logo" />
      </div>
      <div className="searcher">
        <input
          className="search-rec"
          type="search"
          placeholder="¿Que café estas buscando?"
        />
        <button className="search-icon">
          <img src={searchIcon} alt="Buscar" />
        </button>
      </div>
      <div className="user-icons">
        <button
          type="button"
          className="profile-button"
          onClick={() => {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
              // If parent provided an auth modal opener, use it; else fall back to navigation
              if (typeof onOpenAuthModal === 'function') {
                onOpenAuthModal('login');
                return;
              }
              navigate('/login', { state: { from: window.location.pathname, background: { pathname: window.location.pathname } } });
              return;
            }
            const role = resolveUserRole();
            if (role === 'admin') navigate('/admin');
            else navigate('/profile');
          }}
        >
          <img className="user" src={user} alt="Usuario" />
        </button>
        <button type="button" className="cart-button" onClick={onOpenCart}>
          <img className="cart" src={cart} alt="Carrito" />
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </button>
      </div>

      <Cart 
        isOpen={isCartOpen}
        onClose={onCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
    </div>
  );
};
