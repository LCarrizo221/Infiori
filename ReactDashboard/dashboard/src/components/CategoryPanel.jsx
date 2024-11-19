import React from 'react';
import '../styles/CategoryPanel.css';
import PieChart from './PieChart'; // Importa tu componente PieChart

const CategoryPanel = ({ categories }) => {
  return (
    <div className="category-panel">
      <h3>Categorías</h3>
      <div className="categories-list">
        {Object.entries(categories).map(([category, count]) => (
          <div key={category} className="category-item">
            <span className="category-name">{category}</span>
            <span className="category-count">{count}</span>
          </div>
        ))}
      </div>
      {/* Renderiza el gráfico de torta y pasa los datos de categorías */}
      <div className="category-chart">
        <PieChart data={categories} />
      </div>
    </div>
  );
};

export default CategoryPanel;
