// 从pinia中导入defineStore函数
import { defineStore } from 'pinia'
// 从vue中导入ref响应式API
import { ref } from 'vue'

// 定义并导出todo store
export const useTodoStore = defineStore('todo', () => {
  // 定义todos数组用于存储所有待办事项
  const todos = ref([])
  // 定义nextId用于生成唯一id
  const nextId = ref(1)

  // 添加新的待办事项
  function addTodo(text) {
    todos.value.push({
      id: nextId.value++, // 使用自增id
      text, // 待办事项内容
      completed: false, // 初始状态为未完成
    })
  }

  // 切换待办事项的完成状态
  function toggleTodo(id) {
    // 查找指定id的待办事项
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      // 切换完成状态
      todo.completed = !todo.completed
    }
  }

  // 删除指定的待办事项
  function deleteTodo(id) {
    // 查找待办事项的索引
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index > -1) {
      // 从数组中删除该待办事项
      todos.value.splice(index, 1)
    }
  }

  // 返回store的公共接口
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
})
