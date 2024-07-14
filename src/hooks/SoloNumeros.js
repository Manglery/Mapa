const soloNumeros = (event) => {
  const charCode = event.which ? event.which : event.keyCode;

  // Permitir números 0-9, tecla de retroceso, y punto decimal
  if (
    !(charCode >= 48 && charCode <= 57) && // Números 0-9
    charCode !== 8 && // Tecla de retroceso
    charCode !== 46 // Punto decimal
  ) {
    event.preventDefault();
  }

  // Evitar más de un punto decimal
  if (charCode === 46 && event.target.value.includes('.')) {
    event.preventDefault();
  }
};

export default soloNumeros;
