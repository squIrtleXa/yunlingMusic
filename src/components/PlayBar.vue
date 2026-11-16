<template>
  <footer class="playbar" v-if="currentSong">
    <!-- 进度条（可点击跳转） -->
    <div class="progress-bar" @click="handleProgressClick">
      <div class="progress-bg">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        <div class="progress-thumb" :style="{ left: progress + '%' }"></div>
      </div>
    </div>

    <div class="playbar-content">
      <!-- 左侧：歌曲信息 -->
      <div class="song-info" @click="openFullPlayer" role="button" tabindex="0" @keydown.enter="openFullPlayer" aria-label="打开全屏播放器">
        <div class="song-cover">
          <img v-lazy="currentSong.cover" :alt="currentSong.name + ' 封面'" />
          <div class="cover-play-icon" v-if="isPlaying && !isBuffering">
            <span class="bar bar1"></span>
            <span class="bar bar2"></span>
            <span class="bar bar3"></span>
          </div>
          <div v-if="isBuffering" class="buffering-icon" aria-label="缓冲中">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          </div>
        </div>
        <div class="song-detail">
          <div class="song-name text-ellipsis">{{ currentSong.name }}</div>
          <div class="song-artist text-ellipsis">{{ currentSong.artist }}</div>
        </div>
        <button class="favorite-btn" :class="{ active: isFavorited }" @click.stop="toggleFavorite">
          <svg viewBox="0 0 24 24" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <!-- 中间：播放控制 -->
      <div class="play-controls">
        <button class="control-btn mode-btn" @click="togglePlayMode" :title="playModeText">
          <!-- 顺序播放 -->
          <svg v-if="playMode === 'sequence'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 10h14l-3-3"/>
            <path d="M3 14h14l-3 3"/>
            <path d="M21 6v12"/>
          </svg>
          <!-- 单曲循环 -->
          <svg v-else-if="playMode === 'loop'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 2l4 4-4 4"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <path d="M7 22l-4-4 4-4"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          <!-- 随机播放 -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 3h5v5"/>
            <path d="M4 20L21 3"/>
            <path d="M21 16v5h-5"/>
            <path d="M15 15l6 6"/>
            <path d="M4 4l5 5"/>
          </svg>
        </button>

        <button class="control-btn prev-btn" @click="playPrev">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button class="control-btn play-btn" @click="togglePlay" :aria-label="isPlaying ? '暂停' : '播放'" :title="isPlaying ? '暂停' : '播放'">
          <svg v-if="isBuffering" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <svg v-else-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>

        <button class="control-btn next-btn" @click="playNext">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>

        <button class="control-btn playlist-btn" @click="togglePlaylistPanel" :class="{ active: showPlaylistPanel }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- 右侧：时间和音量 -->
      <div class="right-controls">
        <span class="time-text">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>

        <div class="volume-control">
          <button class="volume-btn" @click="toggleMute">
            <svg v-if="!isMuted && volume > 0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
            <svg v-else-if="!isMuted && volume > 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          </button>
          <div class="volume-slider" @click="handleVolumeClick">
            <div class="volume-bg">
              <div class="volume-fill" :style="{ width: (isMuted ? 0 : volume * 100) + '%' }"></div>
              <div class="volume-thumb" :style="{ left: (isMuted ? 0 : volume * 100) + '%' }"></div>
            </div>
          </div>
        </div>

        <button class="fullscreen-btn" @click="openFullPlayer" title="全屏播放器">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 播放列表面板 -->
    <PlaylistPanel v-if="showPlaylistPanel" />
  </footer>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePlayerStore } from '@/store/player'
import { useUserStore } from '@/store/user'
import { formatTime } from '@/utils/format'
import PlaylistPanel from './PlaylistPanel.vue'

const playerStore = usePlayerStore()
const userStore = useUserStore()

const currentSong = computed(() => playerStore.currentSong)
const isPlaying = computed(() => playerStore.isPlaying)
const progress = computed(() => playerStore.progress)
const currentTime = computed(() => playerStore.currentTime)
const duration = computed(() => playerStore.duration)
const playMode = computed(() => playerStore.playMode)
const volume = computed(() => playerStore.volume)
const isMuted = computed(() => playerStore.isMuted)
const showPlaylistPanel = computed(() => playerStore.showPlaylistPanel)

const isFavorited = computed(() => {
  return currentSong.value ? userStore.isFavoriteSong(currentSong.value.id) : false
})

const playModeText = computed(() => {
  const map = {
    sequence: '顺序播放',
    loop: '单曲循环',
    random: '随机播放'
  }
  return map[playMode.value]
})

// 模拟播放进度
let playTimer = null
const isDragging = ref(false)

function startPlaySimulation() {
  if (playTimer) clearInterval(playTimer)
  playTimer = setInterval(() => {
    if (playerStore.isPlaying && !isDragging.value) {
      const newTime = playerStore.currentTime + 1
      if (newTime >= playerStore.duration) {
        playerStore.playNext()
      } else {
        playerStore.setCurrentTime(newTime)
      }
    }
  }, 1000)
}

function handleProgressClick(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = ((e.clientX - rect.left) / rect.width) * 100
  playerStore.setProgress(percent)
}

function handleVolumeClick(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  playerStore.setVolume(percent)
}

function togglePlay() {
  playerStore.togglePlay()
}

function playPrev() {
  playerStore.playPrev()
}

function playNext() {
  playerStore.playNext()
}

function togglePlayMode() {
  playerStore.togglePlayMode()
}

function toggleMute() {
  playerStore.toggleMute()
}

function togglePlaylistPanel() {
  playerStore.togglePlaylistPanel()
}

function toggleFavorite() {
  if (currentSong.value) {
    userStore.toggleFavoriteSong(currentSong.value)
  }
}

function openFullPlayer() {
  playerStore.toggleFullPlayer()
}

onMounted(() => {
  playerStore.initDemoPlaylist()
  userStore.initDemoData()
  startPlaySimulation()
})

onUnmounted(() => {
  if (playTimer) {
    clearInterval(playTimer)
  }
})
</script>

<style lang="less" scoped>
.playbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: @playbar-height;
  background: @bg-primary;
  border-top: 1px solid @border-light;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 99;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  cursor: pointer;

  &:hover {
    .progress-bg {
      height: 4px;
    }
    .progress-thumb {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

.progress-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: @bg-tertiary;
  transition: height @transition-fast;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, @primary-color, @secondary-color);
  border-radius: 2px;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: @primary-color;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
  transition: all @transition-fast;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.4);
}

.playbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 @spacing-lg;
  max-width: @container-max-width;
  margin: 0 auto;
  gap: @spacing-lg;
}

.song-info {
  display: flex;
  align-items: center;
  gap: @spacing-md;
  width: 280px;
  cursor: pointer;

  .song-cover {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: @radius-md;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cover-play-icon {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;

      .bar {
        width: 3px;
        background: white;
        border-radius: 2px;
        animation: sound-wave 1s ease-in-out infinite;

        &.bar1 {
          height: 12px;
          animation-delay: 0s;
        }
        &.bar2 {
          height: 20px;
          animation-delay: 0.2s;
        }
        &.bar3 {
          height: 8px;
          animation-delay: 0.4s;
        }
      }
    }
  }

  .song-detail {
    flex: 1;
    min-width: 0;

    .song-name {
      font-size: @font-size-sm;
      font-weight: 500;
      color: @text-primary;
      margin-bottom: 2px;
    }

    .song-artist {
      font-size: @font-size-xs;
      color: @text-tertiary;
    }
  }

  .favorite-btn {
    padding: @spacing-xs;
    color: @text-tertiary;

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover, &.active {
      color: @accent-color;
    }
  }
}

@keyframes sound-wave {
  0%, 100% { height: 8px; }
  50% { height: 20px; }
}

// 缓冲旋转动画
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s linear infinite;
}

.buffering-icon {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }
}

.play-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: @spacing-md;
  flex: 1;

  .control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: @text-secondary;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: @primary-color;
    }

    &.play-btn {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      border-radius: 50%;
      color: white;
      box-shadow: @shadow-md;

      svg {
        width: 22px;
        height: 22px;
        margin-left: 2px;
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: @shadow-lg;
      }
    }

    &.prev-btn svg,
    &.next-btn svg {
      width: 24px;
      height: 24px;
    }

    &.mode-btn svg,
    &.playlist-btn svg {
      width: 22px;
      height: 22px;
    }

    &.playlist-btn.active {
      color: @primary-color;
    }
  }
}

.right-controls {
  display: flex;
  align-items: center;
  gap: @spacing-md;
  width: 280px;
  justify-content: flex-end;

  .time-text {
    font-size: @font-size-xs;
    color: @text-tertiary;
    font-variant-numeric: tabular-nums;
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: @spacing-sm;

    .volume-btn {
      color: @text-secondary;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        color: @primary-color;
      }
    }

    .volume-slider {
      width: 80px;
      height: 16px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        .volume-thumb {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }

    .volume-bg {
      position: relative;
      width: 100%;
      height: 2px;
      background: @bg-tertiary;
      border-radius: 2px;
    }

    .volume-fill {
      height: 100%;
      background: @primary-color;
      border-radius: 2px;
    }

    .volume-thumb {
      position: absolute;
      top: 50%;
      width: 10px;
      height: 10px;
      background: @primary-color;
      border-radius: 50%;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
      transition: all @transition-fast;
    }
  }

  .fullscreen-btn {
    color: @text-secondary;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: @primary-color;
    }
  }
}

// 响应式
@media (max-width: @breakpoint-md) {
  .playbar-content {
    padding: 0 @spacing-md;
    gap: @spacing-sm;
  }

  .song-info {
    width: auto;
    flex: 1;

    .favorite-btn {
      display: none;
    }
  }

  .right-controls {
    width: auto;

    .time-text,
    .volume-control,
    .fullscreen-btn {
      display: none;
    }
  }

  .play-controls {
    gap: @spacing-sm;

    .control-btn.mode-btn,
    .control-btn.playlist-btn {
      display: none;
    }
  }
}

@media (max-width: @breakpoint-sm) {
  .song-detail {
    display: none;
  }

  .play-controls {
    flex: 1;
  }
}
</style>
