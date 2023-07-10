
// Anadir Ejercicios del formulario
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();  // Evita que el formulario se envíe

    let ejercicio = document.getElementById("ejercicioSelect").value;
    let tiposPeso = document.getElementById("tiposDePesoSelect").value;
    let pesoEscogido = document.getElementById("pesoInput").value;
    let series = document.getElementById("seriesInput").value;
    let repeticiones = document.getElementById("repeticionesInput").value;
    let recuperacionMinutos = document.getElementById("minutosInput").value;
    let recuperacionSegundos = document.getElementById("segundosInput").value;

    // Validar los valores ingresados por el usuario
        if (isNaN(series) || series < 0 || isNaN(repeticiones) || repeticiones < 0 || isNaN(recuperacionMinutos) || recuperacionMinutos < 0 || isNaN(recuperacionSegundos) || recuperacionSegundos < 0) {
            Swal.fire(
                "",
                "NO PUEDEN HABER VALORES NEGATIVOS",
                'success'
              )
            return;
        }

// Duplica la fila de acuerdo con la cantidad de series
    for (var i = 0; i < series; i++) {
        // Crea una nueva fila y la añade a la tabla
        var nuevaFila = `<tr>
            <td name="ejercicio" contenteditable='true'>${ejercicio}</td>
            <td name="tipoDePeso" contenteditable='true'>${tiposPeso}</td>
            <td name="pesoALevantar" contenteditable='true'>${pesoEscogido}</td>
            <td name="sets" contenteditable='true'>1</td>
            <td name="repeticiones" contenteditable='true'>${repeticiones}</td>
            <td name="minutos" contenteditable='true'>${recuperacionMinutos}</td>
            <td name="segundos" contenteditable='true'>${recuperacionSegundos}</td>
            <td name="ejercicioCompletado" contenteditable='true'></td>
        </tr>`;
        document.querySelector("#tablaEjercicios tbody").innerHTML += nuevaFila;
    }
    event.target.reset();
    Swal.fire(
        "",
        `Ejercicio Añadido: ${ejercicio.toUpperCase()}. (Si necesitas añadir otro vuelve al paso número 2)`,
        'success'
      )
});

// Countdown Click Event
document.getElementById("btnRecuperar").addEventListener("click", function() {
    // Obtiene la última fila de la tabla de ejercicios
    var ultimaFila = document.querySelector("#tablaEjercicios tbody").lastElementChild;
    
    if (ultimaFila) {
        // Obtiene los valores de tiempo de recuperación de la última fila
        var minutos = parseInt(ultimaFila.children[5].textContent);
        var segundos = parseInt(ultimaFila.children[6].textContent);

        // Convierte el tiempo de recuperación a segundos
        var tiempoRecuperacion = minutos * 60 + segundos;

        // Inicia la cuenta regresiva
        iniciarCuentaRegresiva(tiempoRecuperacion);
    } else {
        console.log("No hay ejercicios en la tabla.");
    }
});

const audio = new Audio('marioPowerUpFX.mp3');

// Countdown Timer
function iniciarCuentaRegresiva(tiempo) {
    let tiempoInicial = tiempo;  // Guarda el tiempo de recuperación inicial
    let timerInterval;

    Swal.fire({
        title: '¡Tiempo de recuperación!',
        html: 'Quedan <b></b> segundos.',
        timer: tiempoInicial * 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Math.round(Swal.getTimerLeft() / 1000);
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            audio.play();
            Swal.fire('¡Tiempo de recuperación completado!', 'Puedes continuar con el siguiente ejercicio.', 'success');
        }
    });
}

// BOTON BORRAR TODO 
document.getElementById('botonBorrarTodo').addEventListener('click',()=> location.reload())

// Obtener Fecha
const currentDate = new Date();
const dateString = currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const element = document.getElementById("fechaContainer");
function AnadirFecha(){
        element.innerHTML = `Fecha: ${dateString}`;
}

// Aceptar Grupo Muscular
document.getElementById('botonAceptarGrupoMuscular').addEventListener('click', function(event){
    event.preventDefault();
    AnadirFecha();
    let grupoMuscular = document.getElementById('grupoMuscularSelect').value;
    document.getElementById('grupoMuscularContainer').textContent = `Grupo Muscular: ${grupoMuscular}`;
    document.getElementById('paso1Container').style.visibility = "hidden";
    Swal.fire(
        "",
        `Grupo Muscular Seleccionado: ${grupoMuscular.toUpperCase()}`,
        'success'
      )
})

// Descargar CSV
function downloadTableAsCSV() {
    // Obtener los datos de la tabla HTML
    let table = document.getElementById("tablaEjercicios"); // Reemplaza "myTable" con el ID de tu tabla
    let data = [];

    for (let i = 0, row; row = table.rows[i]; i++) {
        let rowData = [];
        for (let j = 0, col; col = row.cells[j]; j++) {
            rowData.push(col.innerText);
        }
        data.push(rowData.join(","));
    }

    // Convertir los datos a formato CSV
    let csvContent = data.join("\n");

    // Crear un enlace de descarga para el archivo CSV
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    let grupoMuscular = document.getElementById('grupoMuscularSelect').value;
    link.setAttribute("download", `${grupoMuscular}_${dateString}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Firestore
// Initialize Firebase and Firestore
// Remember to replace with your actual Firebase config
document.addEventListener("DOMContentLoaded", function(){

var firebaseConfig = {
    apiKey: "AIzaSyB7pUSAuL3_DWGfOfaEBAmjUhrVirTGc7Q",
    authDomain: "misrutinas-65775.firebaseapp.com",
    projectId: "misrutinas-65775",
  };
  
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  
  // Function to send data to Firestore
  function sendTableToFirestore() {
      // Get the table data
      let table = document.getElementById("tablaEjercicios");
      let data = [];
  
      for (let i = 0, row; row = table.rows[i]; i++) {
          let rowData = {};
          for (let j = 0, col; col = row.cells[j]; j++) {
              rowData[col.getAttribute("name")] = col.innerText;
          }
          data.push(rowData);
      }
  
      // Send each row to Firestore
      for (let i = 0; i < data.length; i++) {
          db.collection("misrutinas-65775").add(data[i])
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
      }
  }
})