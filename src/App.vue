<script setup>
// 导入TodoList组件
import TodoList from './components/TodoList.vue'
</script>

<template>
  <!-- 主容器 -->
  <div class="container">
    <!-- 标题 -->
    <h1>待办清单</h1>
    <!-- TodoList组件 -->
    <TodoList />
  </div>
</template>

<style>
/* 导入Inter字体 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* CSS变量定义 */
:root {
  --primary-bg: #f5f5f7; /* 主背景色 */
  --card-bg: rgba(255, 255, 255, 0.8); /* 卡片背景色 */
  --text-primary: #1d1d1f; /* 主要文字颜色 */
  --text-secondary: #86868b; /* 次要文字颜色 */
  --accent-color: #0071e3; /* 强调色 */
  --danger-color: #ff3b30; /* 危险色 */
  --success-color: #34c759; /* 成功色 */
}

/* 全局body样式 */
body {
  background-color: var(--primary-bg);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

/* 容器样式 */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 标题样式 */
h1 {
  text-align: center;
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1d1d1f 0%, #434343 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
