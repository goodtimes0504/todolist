<script setup>
// 导入Vue的ref和computed函数
import { ref, computed } from 'vue'
// 导入todo store
import { useTodoStore } from '../stores/todo'

// 创建todo store实例
const todoStore = useTodoStore()
// 创建新待办事项的响应式变量
const newTodo = ref('')
// 创建过滤状态的响应式变量
const filterStatus = ref('all')

// 计算过滤后的待办事项列表
const filteredTodos = computed(() => {
  switch (filterStatus.value) {
    case 'active':
      return todoStore.todos.filter((todo) => !todo.completed)
    case 'completed':
      return todoStore.todos.filter((todo) => todo.completed)
    default:
      return todoStore.todos
  }
})

// 计算完成进度百分比
const progress = computed(() => {
  if (todoStore.todos.length === 0) return 0
  return Math.round(
    (todoStore.todos.filter((t) => t.completed).length / todoStore.todos.length) * 100,
  )
})

// 处理提交新待办事项
function handleSubmit() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<template>
  <!-- 待办事项容器 -->
  <div class="todo-container">
    <!-- 添加待办事项表单 -->
    <form @submit.prevent="handleSubmit" class="todo-form">
      <!-- 输入框 -->
      <input v-model="newTodo" type="text" placeholder="添加新的待办事项..." class="todo-input" />
      <!-- 添加按钮 -->
      <button type="submit" class="add-button">
        <span>添加</span>
      </button>
    </form>

    <!-- 进度条组件 -->
    <div class="progress-bar">
      <!-- 进度文本 -->
      <div class="progress-text">完成进度: {{ progress }}%</div>
      <!-- 进度条轨道 -->
      <div class="progress-track">
        <!-- 进度条填充 -->
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>

    <!-- 过滤按钮组 -->
    <div class="filters">
      <!-- 过滤按钮 -->
      <button
        v-for="filter in ['all', 'active', 'completed']"
        :key="filter"
        @click="filterStatus = filter"
        :class="{ active: filterStatus === filter }"
        class="filter-button"
      >
        {{ filter === 'all' ? '全部' : filter === 'active' ? '进行中' : '已完成' }}
      </button>
    </div>

    <!-- 待办事项列表，带过渡动画 -->
    <TransitionGroup name="list" tag="ul" class="todo-items">
      <!-- 待办事项项目 -->
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <!-- 复选框容器 -->
        <label class="checkbox-container">
          <!-- 复选框输入 -->
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="todoStore.toggleTodo(todo.id)"
          />
          <!-- 自定义复选框样式 -->
          <span class="checkmark"></span>
        </label>
        <!-- 待办事项文本 -->
        <span class="todo-text">{{ todo.text }}</span>
        <!-- 删除按钮 -->
        <button @click="todoStore.deleteTodo(todo.id)" class="delete-button" aria-label="删除">
          ×
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* 待办事项容器样式 */
.todo-container {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 表单样式 */
.todo-form {
  display: flex;
  gap: 12px;
  margin-bottom: 2rem;
}

/* 输入框样式 */
.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  transition: all 0.3s ease;
}

/* 输入框焦点样式 */
.todo-input:focus {
  outline: none;
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 0 2px var(--accent-color);
}

/* 添加按钮样式 */
.add-button {
  padding: 12px 24px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 添加按钮悬停效果 */
.add-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

/* 添加按钮点击效果 */
.add-button:active {
  transform: translateY(0);
}

/* 进度条容器样式 */
.progress-bar {
  margin-bottom: 2rem;
}

/* 进度文本样式 */
.progress-text {
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-size: 0.9rem;
}

/* 进度条轨道样式 */
.progress-track {
  height: 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  overflow: hidden;
}

/* 进度条填充样式 */
.progress-fill {
  height: 100%;
  background: var(--success-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 过滤器容器样式 */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

/* 过滤按钮样式 */
.filter-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 激活状态的过滤按钮样式 */
.filter-button.active {
  background: var(--accent-color);
  color: white;
}

/* 待办事项列表样式 */
.todo-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 待办事项样式 */
.todo-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 8px 0;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
}

/* 待办事项悬停效果 */
.todo-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 复选框容器样式 */
.checkbox-container {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  user-select: none;
}

/* 隐藏原始复选框 */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* 自定义复选框样式 */
.checkmark {
  position: absolute;
  top: -8px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 6px;
  transition: all 0.2s ease;
}

/* 复选框悬停效果 */
.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* 选中状态的复选框样式 */
.checkbox-container input:checked ~ .checkmark {
  background-color: var(--success-color);
}

/* 复选框勾选标记的基础样式 */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* 显示勾选标记 */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* 勾选标记样式 */
.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 待办事项文本样式 */
.todo-text {
  flex: 1;
  margin-left: 12px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

/* 已完成待办事项的文本样式 */
.completed .todo-text {
  color: var(--text-secondary);
  text-decoration: line-through;
}

/* 删除按钮样式 */
.delete-button {
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: var(--danger-color);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

/* 显示删除按钮 */
.todo-item:hover .delete-button {
  opacity: 1;
}

/* 列表项进入和离开动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

/* 列表项进入时的起始状态 */
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

/* 列表项离���时的结束状态 */
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 响应式布局样式 */
@media (max-width: 768px) {
  /* 移动端容器内边距调整 */
  .todo-container {
    padding: 1rem;
  }

  /* 移动端过滤器换行 */
  .filters {
    flex-wrap: wrap;
  }

  /* 移动端过滤按钮样式 */
  .filter-button {
    flex: 1;
    text-align: center;
  }
}
</style>
