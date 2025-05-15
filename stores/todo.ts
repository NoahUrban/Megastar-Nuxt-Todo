import { defineStore } from 'pinia';
import type { Todo } from '~/models/todo'

// export interface Todo {
//   id: number
//   task: string
//   user: number
//   completed: boolean
//   dropdown: boolean
// }


// Created Todo model and imported, finish tomorrow
export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [] as Todo[],
    id: 0,
    tabs: ['Open', 'Closed'],
    activeTab: 'Open',
    filteredTodos: [] as Todo[],
    addTodoForm: false,
    editTodoForm: false,
    currentTodo: null as Todo | null,
  }),
  actions: {
    async fetchTodos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        const data = await response.json()
        this.todoList = data.map((todo: any) => ({
          id: todo.id,
          task: todo.title,
          user: todo.userId,
          completed: todo.completed,
          dropdown: false,
        }))
        this.filterTodosByTab(this.activeTab)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },
    addTodo(todo: Omit<Todo, 'id' | 'dropdown'>) {
      this.todoList.push({ ...todo, id: this.id++, dropdown: false })
      this.filterTodosByTab(this.activeTab)
    },
    editTodo(idToFind: number) {
      this.currentTodo = this.todoList.find(todo => todo.id === idToFind) || null
      this.triggerEditTodoForm()
    },
    toggleCompleted(idToFind: number) {
      const todo = this.todoList.find(todo => todo.id === idToFind)
      if (todo) {
        todo.completed = !todo.completed
        setTimeout(() => this.filterTodosByTab(this.activeTab), 700)
      }
    },
    toggleDropdown(idToFind: number) {
      const todo = this.todoList.find(todo => todo.id === idToFind)
      this.todoList.forEach(t => {
        if (t.dropdown && t.id !== idToFind) t.dropdown = false
      })
      if (todo) {
        todo.dropdown = !todo.dropdown
      }
    },
    updateActiveTab(tab: string) {
      this.activeTab = tab
      this.filterTodosByTab(tab)
      this.closeAllDropdowns()
    },
    filterTodosByTab(tab: string) {
      this.filteredTodos = this.todoList.filter(todo =>
        tab === 'Open' ? !todo.completed : todo.completed
      )
    },
    searchTodos(query: string) {
      if (query) {
        this.filteredTodos = this.todoList.filter(todo =>
          todo.task.toLowerCase().includes(query.toLowerCase())
        )
      } else {
        this.filterTodosByTab(this.activeTab)
      }
    },
    triggerAddTodoForm() {
      this.addTodoForm = !this.addTodoForm
    },
    triggerEditTodoForm() {
      this.editTodoForm = !this.editTodoForm
    },
    updateTodo(currentTodo: Todo) {
      const todo = this.todoList.find(todo => todo.id === currentTodo.id)
      if (todo) {
        Object.assign(todo, currentTodo)
        this.filterTodosByTab(this.activeTab)
      }
      this.triggerEditTodoForm()
    },
    closeAllDropdowns() {
      this.todoList.forEach(todo => {
        if (todo.dropdown) todo.dropdown = false
      })
    },
  }
})
