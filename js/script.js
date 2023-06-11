let tareas = [];

const form = document.querySelector("form");
// primero tomo los datos y los guardo
form.addEventListener("submit", (event) => { 
    event.preventDefault();

    const inputId = document.querySelector("#id");
    const inputText = document.querySelector("#text");

    if (inputId.value) {
        tareas.forEach((tarea) => {
            if (tarea.id == inputId.value){
                tarea.text = inputText.value;
            }
        });
    } else {
        tareas.push({ //con este push creo el objeto/Tarea
        id: Date.now(),
        text: inputText.value,
        complete: false,
    });};
   

    localStorage.setItem("tareas", JSON.stringify(tareas)); //con esto lo guardo en el local storage, pero necesito guardarlo como texto y para eso lo paso a string de json

    inputText.value = ""; // esto resetea el input
    inputId.value = ""; // resetea el Id
    renderTareas(); // aca se va mostrando la tarea dinamicamente
});

//despues los muestro
const renderTareas = () => {
    //1ro tengo que leer lo que tengo en el localstorage o que me traiga un array vacio
    tareas = JSON.parse(localStorage.getItem("tareas")) || []; 
    
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = ""; //borra el tbody

    tareas.forEach(
        (tarea) => 
         (tbody.innerHTML += `
            <tr>
                <td class="${tarea.complete ? "complete" : ""}">${tarea.text}</td>
                <td>
                    <button data-id="${tarea.id}" class="btn-completar">Completar</button>
                    <button onclick="editarTarea(${tarea.id})">Editar</button>
                    <button onclick="borrarTarea(${tarea.id})">Borrar</button>
                </td>
            </tr>
            `
        )
    );
};

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-completar")) {
        completarTarea(e.target.dataset.id); 
        //cuando clickeo en completar me muestra el id de la tarea
    }
});

const completarTarea = (id) => {
    tareas.forEach(tarea => {
        if (tarea.id == id){
            tarea.complete = !tarea.complete;
        }
    });
    // una vez que recorro la tarea y le cambio el completado tengo que volver a guardar las tareas y mandarselas al render
    
    localStorage.setItem("tareas", JSON.stringify(tareas));
    renderTareas();
};


const editarTarea = (id) => {
    const tarea = tareas.find((tarea) => tarea.id == id);
    if (tarea) {
      const inputId = document.querySelector("#id");
      inputId.value = tarea.id;
      const inputText = document.querySelector("#text");
      inputText.value = tarea.text;
    }
  };


const borrarTarea = (id) => {
    if (confirm("Estas segurx?")){
        const filtradas = tareas.filter((tarea) => tarea.id != id);
        // eso trae todas las tareas que no sean la que voy a borrar
        // y asi guardo solamente las tareas que quedaron
        localStorage.setItem("tareas", JSON.stringify(filtradas));
        renderTareas();
    };
};

//con esto me aseguro que renderTareas se ejecute despues de que se cargue el tbody 
document.addEventListener("DOMContentLoaded", () => {
    renderTareas();
}); 
