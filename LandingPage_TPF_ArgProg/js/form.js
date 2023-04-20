
// Obtener el formulario y los campos
const form = document.getElementById('form');
const nameField = document.getElementById('nombre');
const apellidoField = document.getElementById('apellido');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('telefono');
const planField = document.getElementById('plan');

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
  plan: {
    presence: true,
    inclusion: {
      within: ['Start', 'Mega', 'Ultra'],
      message: "^Por favor, seleccione un plan válido"
    }
  }
};
// Validar los campos del formulario al presional enviar
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const errors = validate({
    nombre: nameField.value,
    apellido: apellidoField.value,
    email: emailField.value,
    telefono: phoneField.value,
    plan: planField.value
  }, constraints);

  if (errors) {
    // Mostrar los errores en los campos del formulario
    Object.keys(errors).forEach((field) => {
      const errorMessage = errors[field][0];
      const fieldInput = document.getElementById(field);
      fieldInput.setCustomValidity(errorMessage);
      fieldInput.reportValidity();
    });
  } else {
    mostrarDatos();
  }
});

function mostrarDatos() {
  // Obtener los valores ingresados en el formulario
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var plan = document.getElementById("plan").value;
  // Oculta el formulario 
  document.getElementById("form").style.display = "none";
  // Mostrar los valores en la página
  document.getElementById("nombreMostrado").innerHTML = nombre;
  document.getElementById("apellidoMostrado").innerHTML = apellido;
  document.getElementById("emailMostrado").innerHTML = email;
  document.getElementById("telefonoMostrado").innerHTML = telefono;
  document.getElementById("planMostrado").innerHTML = plan;
  // Muestra el resultado con los datos del formulario
  document.getElementById("res").style.display = "block";
}

function generarPDF() {
  // Crear un nuevo objeto jsPDF
  var doc = new jsPDF();
  // Obtener los valores ingresados en el formulario
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var email = document.getElementById("email").value;
  var telefono = document.getElementById("telefono").value;
  var plan = document.getElementById("plan").value;
  // Agregar el contenido al PDF
  doc.setFontSize(20);
  doc.text("Formulario de contacto:", 15, 10);
  doc.setFontSize(12);
  doc.text("Nombre: " + nombre, 20, 20);
  doc.text("Apellido: " + apellido, 20, 30);
  doc.text("Email: " + email, 20, 40);
  doc.text("Teléfono: " + telefono, 20, 50);
  doc.setFontSize(15);
  doc.text("Planes disponibles:", 20, 60);
  doc.setFontSize(12);
  doc.text("Start:", 30, 70);
  doc.setFontSize(8);
  doc.text("Pagina web simple", 48, 70);
  doc.setFontSize(12);
  doc.text("Mega:", 30, 75);
  doc.setFontSize(8);
  doc.text("Pagina web personalizada con host por un año", 48, 75);
  doc.setFontSize(12);
  doc.text("Ultra:", 30, 80);
  doc.setFontSize(8);
  doc.text("Pagina web compleja con asistencia 24/7 y host incluido (3 años)", 48, 80);
  doc.setFontSize(15);
  doc.text("Plan seleccionado: " + plan, 20, 90);

  // Guardar el PDF
  doc.save("formulario.pdf");
}
// Leer el valor del parámetro "opcion" de la URL
const urlParams = new URLSearchParams(window.location.search);
const opcion = urlParams.get('opcion');

// Seleccionar la opción correspondiente en el formulario
if (opcion === 'Start') {
  document.getElementById('plan').value = 'Start';
} else if (opcion === 'Mega') {
  document.getElementById('plan').value = 'Mega';
} else if (opcion === 'Ultra') {
  document.getElementById('plan').value = 'Ultra';
}