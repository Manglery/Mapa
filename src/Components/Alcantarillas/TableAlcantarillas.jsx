import React, { useState } from 'react';
import TbodyAlcantarillas from './TbodyAlcantarillas';

const TableAlcantarillas = ({
  allAlcantarillas,
  tableRef,
  setSelectedAlcantarilla,
  setcrud,
}) => {
  const [numberPage, setNumberPage] = useState(1);
  const viewDataPage = 1000;

  // Define el rango de números de página que se mostrarán
  const [startRange, setStartRange] = useState(1);
  const totalPages = Math.ceil(
    allAlcantarillas?.length / viewDataPage
  );
  const endRange = Math.min(startRange + 4, totalPages);

  const handlePrevClick = () => {
    setStartRange(1);
    setNumberPage(1);
  };

  const handleNextClick = () => {
    const newStartRange = totalPages > 4 ? totalPages - 4 : 1;
    setStartRange(newStartRange);
    setNumberPage(totalPages);
  };

  const handlePageChange = (page) => {
    setNumberPage(page);
    const newStartRange = Math.max(page - 2, 1);
    setStartRange(newStartRange);
  };

  const handlePrevPageClick = () => {
    if (numberPage > 1) {
      setNumberPage(numberPage - 1);
      const newStartRange = Math.max(numberPage - 3, 1);
      setStartRange(newStartRange);
    }
  };

  const handleNextPageClick = () => {
    if (numberPage < totalPages) {
      setNumberPage(numberPage + 1);
    }
  };

  const startIndex = (numberPage - 1) * viewDataPage;
  const endIndex = Math.min(
    startIndex + viewDataPage,
    allAlcantarillas?.length
  );
  const currentData = allAlcantarillas?.slice(startIndex, endIndex);

  return (
    <div className="table_divContainer">
      <div className="table_divHoverflow">
        <table className="table__container" ref={tableRef}>
          <thead>
            <tr>
              <th>Nro</th>
              <th>COD</th>
              <th>ENTIDAD</th>
              <th>GESTION</th>
              <th>TIPO</th>
              <th>ELEM_ID</th>
              <th>ID_ACCIONA</th>
              <th>FECHA</th>
              <th>ESTADO</th>
              <th>REALIZADO</th>
              <th>IMPEDIDO</th>
              <th>IMP. TÉCNICA</th>
              <th>NUM_REJ</th>
              <th>LONGITUD ARQUETA</th>
              <th>Cod. Empresa</th>
              <th>X</th>
              <th>Y</th>
              <th>LONGITUD</th>
              <th>LATITUD</th>
              <th>Foto 1</th>
              <th>Foto 2</th>
              <th>Operario Asignado</th>
              <th>Usuario</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <TbodyAlcantarillas
            currentData={currentData}
            startIndex={startIndex}
            setSelectedAlcantarilla={setSelectedAlcantarilla}
            setcrud={setcrud}
          />
        </table>
      </div>
      <div className="TableBirds_paginations_container">
        <i
          className="bx bx-chevrons-left"
          onClick={handlePrevClick}
        ></i>
        <i
          className="bx bx-chevron-left"
          onClick={handlePrevPageClick}
        ></i>
        {Array.from(
          { length: endRange - startRange + 1 },
          (_, index) => startRange + index
        ).map((page) => (
          <div key={page} className="TableBirds_paginations_number">
            <p
              onClick={() => handlePageChange(page)}
              style={{
                color:
                  page === numberPage
                    ? 'var(--text-color-red)'
                    : null,
              }}
            >
              {page}
            </p>
            <span>-</span>
          </div>
        ))}
        <i
          className="bx bx-chevron-right"
          onClick={handleNextPageClick}
        ></i>
        <i
          className="bx bx-chevrons-right"
          onClick={handleNextClick}
        ></i>
      </div>
    </div>
  );
};

export default TableAlcantarillas;
