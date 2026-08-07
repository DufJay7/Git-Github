const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalCount = document.getElementById('total-count');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    totalCount.textContent = tasks.length;

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-msg" style="color: #64748b; text-align: center; padding: 15px;">Nenhuma tarefa cadastrada.</li>';
        return;
    }

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="btn-action btn-check" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Desmarcar' : 'Concluir'}
                </button>
                <button class="btn-action btn-edit" onclick="editTask(${task.id})">Editar</button>
                <button class="btn-action btn-delete" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;

    const newText = prompt('Edite o nome da tarefa:', taskToEdit.text);
    if (newText !== null && newText.trim() !== '') {
        taskToEdit.text = newText.trim();
        renderTasks();
    }
}

// Função para excluir uma tarefa
function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
});