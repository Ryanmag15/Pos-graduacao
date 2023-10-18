$(document).ready(function () {
    // Carregar tarefas do Armazenamento Local ao iniciar
    loadTasks();

    // Adicionar tarefa quando o usuário pressionar Enter
    $('#taskInput').on('keypress', function (e) {
        if (e.which === 13) {
            const taskText = $(this).val();
            if (taskText.trim() !== '') {
                addTask(taskText);
                $(this).val('');
            }
        }
    });

    $("#addTaskButton").click(function() {
        const taskText = $("#taskInput").val();
        if (taskText.trim() !== '') {
            addTask(taskText);
            $("#taskInput").val('');
        }
    });
    
    
    // Adicionar tarefa
    function addTask(taskText) {
        const task = {
            id: new Date().getTime(),
            text: taskText
        };

        saveTask(task);
        appendTaskToList(task);
    }

    // Salvar tarefa no Armazenamento Local
    function saveTask(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Obter tarefas do Armazenamento Local
    function getTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks;
    }

    // Carregar tarefas na lista
    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => appendTaskToList(task));
    }

    // Anexar tarefa à lista
    function appendTaskToList(task) {
        const $taskList = $('#taskList');
        const $taskItem = $('<li>')
            .addClass('list-group-item')
            .append(task.text)
            .append($('<span class="float-right text-danger delete-task">X</span>'))
            .data('task-id', task.id);
        
        $taskList.append($taskItem);
    }

    // Remover tarefa quando o usuário clica no ícone "X"
    $('#taskList').on('click', '.delete-task', function () {
        const taskId = $(this).parent().data('task-id');
        removeTask(taskId);
        $(this).parent().remove();
    });

    // Remover tarefa do Armazenamento Local
    function removeTask(taskId) {
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
