import React from 'react';
import '../styles/Card.css';

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default Card;