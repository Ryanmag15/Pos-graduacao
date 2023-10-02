// Model
const model = {
  todos: [],
  addTodo: function (todo) {
    this.todos.push({ text: todo, done: false });
  },
  editTodo: function (index, newText) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].text = newText;
    }
  },
  deleteTodo: function (index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
  },
  sortTodos: function () {
    this.todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });
  },
  toggleDone: function (index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].done = !this.todos[index].done;
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
    const doneButton = document.createElement("button");

    todoText.textContent = todo.text;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Excluir";
    doneButton.textContent = todo.done ? "Desfazer" : "Feito";

    todoItem.appendChild(todoText);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoItem.appendChild(doneButton);

    editButton.addEventListener("click", function () {
      controller.editTodo(index);
    });

    deleteButton.addEventListener("click", function () {
      controller.deleteTodo(index);
    });

    doneButton.addEventListener("click", function () {
      controller.toggleDone(index);
      view.updateTodoStatus(index, todo.done);
    });

    this.todoList.appendChild(todoItem);
  },

  updateTodoStatus: function (index, done) {
    const todoItem = this.todoList.childNodes[index];
    if (todoItem) {
      todoItem.classList.toggle("done", done);
    }
  },

  updateTodoText: function (index, text) {
    const todoItem = this.todoList.childNodes[index];
    if (todoItem) {
      const todoText = todoItem.querySelector("span");
      todoText.textContent = text;
    }
  },

  clearTodoList: function () {
    this.todoList.innerHTML = ""; 
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    const sortButton = document.getElementById("sort-button");

    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      if (todo.trim() !== "") {
        model.addTodo(todo);
        view.renderTodo({ text: todo, done: false }, model.todos.length - 1);
        todoInput.value = "";
      }
    });

    sortButton.addEventListener("click", function () {
      controller.sortTodos();
    });
  },

  editTodo: function (index) {
    const newText = prompt("Editar tarefa:", model.todos[index].text);
    if (newText !== null) {
      model.editTodo(index, newText);
      view.updateTodoText(index, newText);
    }
  },

  deleteTodo: function (index) {
    if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
      model.deleteTodo(index);
      view.clearTodoList();
      model.todos.forEach(function (todo, index) {
        view.renderTodo(todo, index);
      });
    }
  },

  sortTodos: function () {
    model.sortTodos();
    view.clearTodoList();
    model.todos.forEach(function (todo, index) {
      view.renderTodo(todo, index);
    });
  },

  toggleDone: function (index) {
    model.toggleDone(index);
    view.updateTodoStatus(index, model.todos[index].done);
  },
};

controller.init();