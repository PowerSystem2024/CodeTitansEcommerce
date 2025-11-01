import React from "react";
import axios from "axios";
import "./CustomBarComponents/Header.css";
import group from "../assets/img/Group.svg";
import user from "../assets/img/user.svg";
import { useNavigate } from "react-router-dom";

export const UserHeader = () => {

  const navigate = useNavigate();

  const API_BASE =
    (import.meta.env.VITE_BACKEND_URL
      ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/api`
      : '/api');

  const handleNavigateToHome = () => {
    console.log('Navegando a home...');
    navigate('/');
    console.log('Navigate ejecutado');
  };

  const handleLogout = async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      if (token) {
        await axios.post(`${API_BASE}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch {
      // ignorar errores de logout
    } finally {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('authUser');
      navigate('/');
    }
  };


  return (
    <div className="header">
      <div className="left-group">
        <div className="logo-container" onClick={handleNavigateToHome}>
          <img src={group} alt="Catfecito logo" />
        </div>
        <button
          type="button"
          className="shop-button"
          onClick={handleNavigateToHome}
          aria-label="Volver a la tienda"
        >
          Shop
        </button>
      </div>
      
      <div className="user-icons">
        <button
          type="button"
          className="profile-button"
          onClick={() => {
            const token = sessionStorage.getItem('authToken');
            if (!token) return navigate('/login');

            // 1) Try role from stored user
            let role = undefined;
            try {
              const u = JSON.parse(sessionStorage.getItem('authUser') || 'null');
              role = u?.role;
            } catch {
              // ignore JSON parse errors
            }

            // 2) Fallback: decode JWT payload (no verify, solo lectura)
            if (!role) {
              try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const payload = JSON.parse(jsonPayload);
                role = payload?.role;
              } catch {
                // ignore jwt decode errors
              }
            }

            navigate(role === 'admin' ? '/admin' : '/profile');
          }}
        >
          <img className="user" src={user} alt="Usuario" />
        </button>
        <button
          type="button"
          className="shop-button"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          style={{ marginLeft: 8 }}
        >
          Cerrar sesión
        </button>
        
      </div>

      
    </div>
  );
};
