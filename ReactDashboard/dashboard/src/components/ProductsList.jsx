import React, { useState, useEffect } from 'react';
import '../styles/ProductsList.css';

const ProductsList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Estado de carga

  const itemsPerPage = 10;

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false); // Datos cargados, cambiar estado de carga
    }
  }, [products]); // Solo se ejecuta cuando los productos cambian

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras los productos se cargan
  }

  // Lógica de paginación
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="products-list">
      <h3>Lista de Productos</h3>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.categories[0]}</td>
                <td>${product.price}</td>
                <td>{product.stock === 'Y' ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Barra de navegación */}
      <div className="pagination-controls">
        <button
          onClick={handlePrev}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          &lt; Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          Siguiente &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
