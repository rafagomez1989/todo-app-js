// Selección de elementos del DOM
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Intentamos recuperar tareas guardadas o creamos un array vacío
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Guarda las tareas en localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dibuja la lista de tareas en el HTML
function renderTasks() {
  list.innerHTML = ""; // Limpiar la lista antes de renderizar de nuevo

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'text-decoration-line-through text-muted' : ''}`;

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-success" onclick="toggleComplete(${index})">
          <i class="fas fa-check"></i>
        </button>
        <button class="btn btn-outline-danger" onclick="deleteTask(${index})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Evento al enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el recargo de página

  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = ""; // Limpia el input
    saveTasks();
    renderTasks();
  }
});

// Marca una tarea como completada o la desmarca
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Elimina una tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Render inicial al cargar la página
renderTasks();
