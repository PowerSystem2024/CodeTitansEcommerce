import React from 'react'
import GatitoEnTaza from '../../assets/img/GatitoEnTaza.png'
import './constructionComponent.css'

export const ConstructionComponent = () => {
  return (
    <div className="construction-container">
      <img 
        src={GatitoEnTaza} 
        alt="Gatito en taza" 
        className="construction-image"
      />
      <h3 className="construction-title">Proximamente</h3>
      <h5 className="construction-subtitle">Disculpe las molestias</h5>
    </div>
  )
}
