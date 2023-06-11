let tareas = [];

const form = document.querySelector("form");
// primero tomo los datos y los guardo
form.addEventListener("submit", (event) => { 
    event.preventDefault();

    const inputText = document.querySelector("#text");
    tareas.push({ //con este push creo el objeto/Tarea
        id: Date.now(),
        text: inputText.value,
        complete: false,
    });

    localStorage.setItem("tareas", JSON.stringify(tareas)); //con esto lo guardo en el local storage, pero necesito guardarlo como texto y para eso lo paso a string de json

    inputText.value = ""; // esto resetea el input
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
                <td>${tarea.text}</td>
                <td>
                    <button>Completar</button>
                    <button>Editar</button>
                    <button>Borrar</button>
                </td>
            </tr>
            `
        )
    );
};

//con esto me aseguro que renderTareas se ejecute despues de que se cargue el tbody 
document.addEventListener("DOMContentLoaded", () => {
    renderTareas();
}); 
