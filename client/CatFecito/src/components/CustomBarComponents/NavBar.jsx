import React, { useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from "../Modal/ModalContainer";

export const NavBar = () => {
  const navigate = useNavigate();
  const [showConstructionModal, setShowConstructionModal] = useState(false);

  const handleNavigateToProducts = () => {
    console.log('Navegando a products...');
    navigate('/products');
    console.log('Navigate ejecutado');
  };

  const handleShowConstruction = () => {
    setShowConstructionModal(true);
  };

  const handleCloseModal = () => {
    setShowConstructionModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <button onClick={handleNavigateToProducts} className="button">
          Café en grano
        </button>
        <button onClick={handleShowConstruction} className="button">
          Cápsulas
        </button>
        <button onClick={handleShowConstruction} className="button">
          Cafeteras y accesorios
        </button>
        <button onClick={handleShowConstruction} className="button">
          Ofertas
        </button>
        <button href="#" className="button">
          Contacto
        </button>
      </nav>

      
      <ModalContainer 
        type="construction"
        visible={showConstructionModal}
        onClose={handleCloseModal}
      />
    </>
  );
};
