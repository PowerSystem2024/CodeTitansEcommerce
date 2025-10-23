import React from 'react'
import './Footer.css'
import logo from '../../assets/img/Group.svg'
import instagramIcon from '../../assets/img/instagram.svg'
import facebookIcon from '../../assets/img/facebook.svg'
import twitterIcon from '../../assets/img/twitterx.png'

export const Footer = () => {
  return (
    <footer className="cf-footer">
      <div className="cf-footer-inner">
        <div className="cf-footer-brand">
          <img src={logo} alt="Catfecito" className="cf-footer-logo" />
          <p className="cf-footer-desc">CatFecito - Café con amor. Descubre y compra los mejores granos seleccionados.</p>
        </div>

        <div className="cf-footer-links">
          <div>
            <h4>Explorar</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/products">Productos</a></li>
              <li><a href="#">Promociones</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4>Soporte</h4>
            <ul>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Devoluciones</a></li>
            </ul>
          </div>

          <div>
            <h4>Redes</h4>
            <div className="cf-socials">
              <a href="https://www.instagram.com/catfecitoARG/" target='_blank' aria-label="Instagram" ><img src={instagramIcon} alt="Instagram" /></a>
              <a href="https://www.facebook.com/catfecitoARG" target='_blank' aria-label="Facebook" ><img src={facebookIcon} alt="Facebook" /></a>
              <a href="https://twitter.com/catfecitoARG" target='_blank' aria-label="Twitter" ><img src={twitterIcon} alt="Twitter" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="cf-footer-bottom">
        <p>© {new Date().getFullYear()} CatFecito. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
