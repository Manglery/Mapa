import React, { useEffect, useRef, useState } from 'react';
import config from '../utils/getToken';
import TableAlcantarillas from '../Components/Alcantarillas/TableAlcantarillas';
import axios from 'axios';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import UploadExel from '../Components/Alcantarillas/UploadExel';
import DeleteAlcantarilla from '../Components/Alcantarillas/crudAlcantarillas/DeleteAlcantarilla';
import DeleteAllAlcantarilla from '../Components/Alcantarillas/crudAlcantarillas/DeleteAllAlcantarilla';

const Alcantarillas = () => {
  const tableRef = useRef(null);
  const [crud, setcrud] = useState();
  const [allAlcantarillas, setAllAlcantarillas] = useState();
  const [selectedAlcantarilla, setSelectedAlcantarilla] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/alcantarilla`;

    axios.get(url, config).then((res) => {
      setAllAlcantarillas(res.data.alcantarillas);
    });
  }, [crud]);

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Alcantarillas');

    // Define estilos para las celdas
    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFF' } }, // Color blanco
      alignment: { horizontal: 'center' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '31383F' }, // Color de fondo oscuro
      },
      border: {
        top: { style: 'thin', color: { argb: 'FFFFFF' } },
        left: { style: 'thin', color: { argb: 'FFFFFF' } },
        bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
        right: { style: 'thin', color: { argb: 'FFFFFF' } },
      },
    };

    const celdaStyle = {
      font: { bold: false, color: { argb: '31383f' } }, // Fuente en negrita, color de texto oscuro
      alignment: { horizontal: 'center' }, // Alineación centrada horizontalmente
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF' },
      },
      border: {
        top: { style: 'thin', color: { argb: 'bdbdbd' } }, // Borde delgado en la parte superior, color gris claro
        left: { style: 'thin', color: { argb: 'bdbdbd' } }, // Borde delgado a la izquierda, color gris claro
        bottom: { style: 'thin', color: { argb: 'bdbdbd' } }, // Borde delgado en la parte inferior, color gris claro
        right: { style: 'thin', color: { argb: 'bdbdbd' } }, // Borde delgado a la derecha, color gris claro
      },
    };

    // Definir encabezados
    worksheet
      .addRow([
        'Nro',
        'COD',
        'ENTIDAD',
        'GESTION',
        'TIPO',
        'ELEM_ID',
        'ID_ACCIONA',
        'FECHA',
        'ESTADO',
        'REALIZADO',
        'IMPEDIDO',
        'IMP. TÉCNICA',
        'NUM_REJ',
        'LONGITUD ARQUETA',
        'Cod. Empresa',
        'X',
        'Y',
        'LONGITUD',
        'LATITUD',
        'Foto 1',
        'Foto 2',
        'Operario Asignado',
        'Usuario',
      ])
      .eachCell((cell) => {
        cell.style = headerStyle;
      });
    // Agregar datos
    allAlcantarillas.forEach((alcantarilla, index) => {
      const rowIndex = index + 2; // 1 for header
      worksheet
        .addRow([
          rowIndex,
          alcantarilla.cod || '',
          alcantarilla.entidad || '',
          alcantarilla.gestion || '',
          alcantarilla.tipo || '',
          alcantarilla.elem_id || '',
          alcantarilla.id_acciona || '',
          alcantarilla.fecha || '',
          alcantarilla.estado || '',
          alcantarilla.realizado || '',
          alcantarilla.impedido || '',
          alcantarilla.imp_tecnica || '',
          alcantarilla.numero_rej || '',
          alcantarilla.longitud_arqueta || '',
          alcantarilla.cod_empresa || '',
          alcantarilla.x || '',
          alcantarilla.y || '',
          alcantarilla.longitud || '',
          alcantarilla.latitud || '',
          `${import.meta.env.VITE_URL_IMG}/${alcantarilla.foto1}`,
          `${import.meta.env.VITE_URL_IMG}/${alcantarilla.foto2}`,
          alcantarilla.operario_asignado,
          alcantarilla.user?.user_name,
        ])
        .eachCell((cell) => {
          cell.style = celdaStyle;
        });
    });

    // Ajustar ancho de columnas
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value
          ? cell.value.toString().length
          : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 20 ? 20 : maxLength;
    });

    // Generar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'alcantarillas.xlsx');
  };

  return (
    <div className="page_container">
      <section className="page_sectionOne">
        <h1>Alcantarillas</h1>
      </section>
      <section className="page_sectionTwo">
        <p></p>
        <div className="page_sectionTwo_buttons">
          <button onClick={() => setcrud('uploadExel')}>
            Subir Exel
          </button>
          <button onClick={downloadExcel}>Descargar Datos</button>
          <button onClick={() => setcrud('deleteAll')}>
            Eliminar todo
          </button>
        </div>
      </section>
      <TableAlcantarillas
        allAlcantarillas={allAlcantarillas}
        setcrud={setcrud}
        tableRef={tableRef}
        setSelectedAlcantarilla={setSelectedAlcantarilla}
      />
      {crud === 'uploadExel' && <UploadExel setcrud={setcrud} />}
      {crud === 'delete' && (
        <DeleteAlcantarilla
          setcrud={setcrud}
          selectedAlcantarilla={selectedAlcantarilla}
        />
      )}
      {crud === 'deleteAll' && (
        <DeleteAllAlcantarilla setcrud={setcrud} />
      )}
    </div>
  );
};

export default Alcantarillas;
