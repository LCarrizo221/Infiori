import React from 'react';
import '../styles/LastItemPanel.css';

const LastItemPanel = ({ item }) => {
  if (!item) return <div className="last-item-panel">Cargando...</div>;

  return (
    <div className="last-item-panel">
      <h3>Último agregado</h3>
      <div className="item-details">
        <div className="item-image-container">
          <img 
            src={item.img_url} 
            alt={item.name || item.title} 
          />
        </div>
        <div className="item-info">
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Nombre:</strong> {item.name || item.title}</p>
          <p><strong>Descripción:</strong> {item.description}</p>
          {item.price && (
            <p className="price">
              <strong>Precio:</strong> ${item.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastItemPanel;