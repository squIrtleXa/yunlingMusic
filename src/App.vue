<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <PlayBar />
    <FullPlayer />

    <!-- 全局错误提示 -->
    <transition name="fade">
      <div v-if="globalError" class="global-error-tip" @click="dismissError">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>{{ globalError }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onErrorCaptured } from 'vue'
import NavBar from '@/components/NavBar.vue'
import PlayBar from '@/components/PlayBar.vue'
import FullPlayer from '@/components/FullPlayer.vue'
import { usePlayerStore } from '@/store/player'

const playerStore = usePlayerStore()
const globalError = ref('')
let errorTimer = null

// 显示错误提示
function showError(message) {
  globalError.value = message
  if (errorTimer) clearTimeout(errorTimer)
  errorTimer = setTimeout(() => {
    globalError.value = ''
  }, 3000)
}

// 关闭错误提示
function dismissError() {
  globalError.value = ''
  if (errorTimer) {
    clearTimeout(errorTimer)
    errorTimer = null
  }
}

// 组件错误捕获
onErrorCaptured((err, instance, info) => {
  console.error('组件错误:', err, info)
  showError('页面出现错误，请刷新重试')
  return false
})

// 键盘快捷键
function handleKeydown(e) {
  // 如果是在输入框中，不触发快捷键
  const target = e.target
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    return
  }

  // 空格键：播放/暂停
  if (e.code === 'Space') {
    e.preventDefault()
    playerStore.togglePlay()
    return
  }

  // 右箭头：下一首
  if (e.code === 'ArrowRight' && !e.shiftKey) {
    e.preventDefault()
    playerStore.playNext()
    return
  }

  // 左箭头：上一首
  if (e.code === 'ArrowLeft' && !e.shiftKey) {
    e.preventDefault()
    playerStore.playPrev()
    return
  }

  // 上箭头：音量+
  if (e.code === 'ArrowUp') {
    e.preventDefault()
    const newVolume = Math.min(1, playerStore.volume + 0.1)
    playerStore.setVolume(newVolume)
    return
  }

  // 下箭头：音量-
  if (e.code === 'ArrowDown') {
    e.preventDefault()
    const newVolume = Math.max(0, playerStore.volume - 0.1)
    playerStore.setVolume(newVolume)
    return
  }

  // M 键：静音切换
  if (e.code === 'KeyM') {
    e.preventDefault()
    playerStore.toggleMute()
    return
  }

  // Escape 键：关闭全屏播放器
  if (e.code === 'Escape') {
    if (playerStore.showFullPlayer) {
      playerStore.toggleFullPlayer()
    }
    if (playerStore.showPlaylistPanel) {
      playerStore.togglePlaylistPanel()
    }
    return
  }

  // L 键：喜欢/取消喜欢
  if (e.code === 'KeyL') {
    e.preventDefault()
    // 这里可以通过事件总线或其他方式通知，暂不实现
    return
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (errorTimer) {
    clearTimeout(errorTimer)
  }
})
</script>

<style lang="less" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.global-error-tip {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: @spacing-sm;
  padding: @spacing-sm @spacing-lg;
  background: #fee2e2;
  color: #dc2626;
  border-radius: @radius-md;
  box-shadow: @shadow-md;
  z-index: 1000;
  cursor: pointer;
  font-size: @font-size-sm;
  max-width: 90vw;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &:hover {
    background: #fecaca;
  }
}
</style>
