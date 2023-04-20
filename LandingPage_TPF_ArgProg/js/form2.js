
// Obtener el formulario y los campos
const form = document.getElementById('form');
const nameField = document.getElementById('nombre');
const apellidoField = document.getElementById('apellido');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('telefono');
const msjField = document.getElementById('mensaje');

const constraints = {
  nombre: {
    presence: true,
    format: {
      pattern: '[A-Za-z]+',
      message: 'Ingrese un nombre valido'
    }
  },
  apellido: {
    presence: true,
    format: {
      pattern: '[A-Za-z]+',
      message: 'Ingrese un apellido valido'
    }
  },
  email: {
    presence: true,
    email: {
      message: 'Ingrese un correo electrónico válido'
    }
  },
  telefono: {
    presence: true,
    format: {
      pattern: '[0-9]{10}',
      message: 'Ingrese un número de teléfono válido (10 dígitos)'
    }
  },
  mensaje: {
    presence: true,
    length: {
      minimum: 10,
      message: "Debe tener al menos 10 caracteres",
    }
  }

};
// Validar los campos del formulario al presional enviar
// y mostrar el mensaje de error si es necesario
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const errors = validate({
    nombre: nameField.value,
    apellido: apellidoField.value,
    email: emailField.value,
    telefono: phoneField.value,
    mensaje: msjField.value
  }, constraints);

  if (errors) {
    Object.keys(errors).forEach((field) => {
      const errorMessage = errors[field][0];
      const fieldInput = document.getElementById(field);

      // Mostrar el mensaje de error en el elemento div correspondiente
      if (field === 'msj') {
        const errorDiv = document.getElementById(`${field}-error`);
        errorDiv.innerText = errorMessage;
      } else {
        fieldInput.setCustomValidity(errorMessage);
        fieldInput.reportValidity();
      }
    });
  } else {
    mostrarDatos();
  }
});

function mostrarDatos() {
  // Oculta el formulario 
  document.getElementById("form").style.display = "none";
  // Muestra el resultado con los datos del formulario
  document.getElementById("res").style.display = "block";
}

