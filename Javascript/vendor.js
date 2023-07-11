let ejercicios = [];
let tiposDePeso = [];
let gruposMusculares = [];

// Leer json
fetch('/assets/data_sorted.json')
    .then(response => response.json())
    .then(data => {
        gruposMusculares = data.GruposMusculares;
        ejercicios = data.Ejercicios;
        tiposDePeso = data.TiposDePeso;

        llenarSelect(gruposMusculares, document.getElementById('grupoMuscularSelect'));
        llenarSelect(ejercicios, document.getElementById('ejercicioSelect'));
        llenarSelect(tiposDePeso, document.getElementById('tiposDePesoSelect'));

    })

// Función para llenar los select
function llenarSelect(data, select) {
    data.forEach(item => {
        let option = document.createElement('option');
        option.text = item;
        select.add(option);
    });
}

let rangeInput = document.getElementById("seriesInput");

rangeInput.addEventListener("input", function() {
  this.setAttribute("title", this.value);
});