// Model
const model = {
  todos: [],
  addTodo: function (todo) {
    this.todos.push(todo);
  },
  editTodo: function (index, newText) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = newText;
    }
  },
  deleteTodo: function (index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
  },
};

// View
const view = {
  todoList: document.getElementById("todo-list"),
  renderTodo: function (todo, index) {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    todoText.textContent = todo;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Excluir";

    editButton.addEventListener("click", function () {
      controller.editTodo(index);
    });

    deleteButton.addEventListener("click", function () {
      controller.deleteTodo(index);
    });

    todoItem.appendChild(todoText);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    this.todoList.appendChild(todoItem);
  },

  updateTodo: function (index, newText) {
    const todoList = document.getElementById("todo-list");
    const todoItem = todoList.childNodes[index];
    const todoText = todoItem.querySelector("span");
    todoText.textContent = newText;
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      if (todo.trim() !== "") {
        model.addTodo(todo);
        view.renderTodo(todo, model.todos.length - 1);
        todoInput.value = "";
      }
    });
  },

  editTodo: function (index) {
    const newText = prompt("Editar tarefa:", model.todos[index]);
    if (newText !== null) {
      model.editTodo(index, newText);
      view.updateTodo(index, newText); 
    }
  },

  deleteTodo: function (index) {
    if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
      model.deleteTodo(index);
      const todoList = document.getElementById("todo-list");
      todoList.removeChild(todoList.childNodes[index]);
    }
  },
};


controller.init(); 