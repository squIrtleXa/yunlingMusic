<template>
  <transition name="fade">
    <div v-if="showFullPlayer && currentSong" class="full-player">
      <!-- 背景模糊 -->
      <div class="player-bg">
        <img :src="currentSong.cover" :alt="currentSong.name" />
        <div class="bg-mask"></div>
      </div>

      <!-- 顶部栏 -->
      <div class="player-header">
        <button class="back-btn" @click="closeFullPlayer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div class="song-info">
          <h2 class="song-name text-ellipsis">{{ currentSong.name }}</h2>
          <p class="song-artist text-ellipsis">{{ currentSong.artist }}</p>
        </div>
        <button class="more-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      <!-- 中间封面 -->
      <div class="player-cover-wrapper">
        <div class="cover-disc" :class="{ playing: isPlaying }">
          <img :src="currentSong.cover" :alt="currentSong.name" />
          <div class="disc-center"></div>
        </div>
      </div>

      <!-- 歌词区域 -->
      <div class="lyrics-container">
        <div class="lyrics-scroll" ref="lyricsScrollRef">
          <div
            v-for="(line, index) in displayLyrics"
            :key="index"
            class="lyric-line"
            :class="{ active: index === currentLyricIndex }"
          >
            {{ line.text }}
          </div>
        </div>
      </div>

      <!-- 底部控制 -->
      <div class="player-controls">
        <!-- 进度条 -->
        <div class="progress-section">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="handleProgressClick">
            <div class="progress-bg">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              <div class="progress-thumb" :style="{ left: progress + '%' }"></div>
            </div>
          </div>
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <!-- 控制按钮 -->
        <div class="control-buttons">
          <button class="ctrl-btn mode-btn" @click="togglePlayMode">
            <svg v-if="playMode === 'sequence'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 10h14l-3-3"/>
              <path d="M3 14h14l-3 3"/>
              <path d="M21 6v12"/>
            </svg>
            <svg v-else-if="playMode === 'loop'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 2l4 4-4 4"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <path d="M7 22l-4-4 4-4"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 3h5v5"/>
              <path d="M4 20L21 3"/>
              <path d="M21 16v5h-5"/>
              <path d="M15 15l6 6"/>
              <path d="M4 4l5 5"/>
            </svg>
          </button>

          <button class="ctrl-btn prev-btn" @click="playPrev">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <button class="ctrl-btn play-btn" @click="togglePlay">
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>

          <button class="ctrl-btn next-btn" @click="playNext">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>

          <button class="ctrl-btn playlist-btn" @click="togglePlaylist">
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

        <!-- 音量控制 -->
        <div class="volume-section">
          <button class="vol-btn" @click="toggleMute">
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
          <div class="vol-slider" @click="handleVolumeClick">
            <div class="vol-bg">
              <div class="vol-fill" :style="{ width: (isMuted ? 0 : volume * 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 播放列表侧栏 -->
      <transition name="slide-right">
        <div v-if="showSidePlaylist" class="side-playlist">
          <div class="side-header">
            <span>播放列表 ({{ playlist.length }})</span>
            <button @click="showSidePlaylist = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="side-content">
            <div
              v-for="(song, index) in playlist"
              :key="song.id"
              class="side-song-item"
              :class="{ active: index === currentIndex }"
              @click="playSong(index)"
            >
              <span class="side-song-name text-ellipsis">{{ song.name }}</span>
              <span class="side-song-artist text-ellipsis">{{ song.artist }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { usePlayerStore } from '@/store/player'
import { formatTime } from '@/utils/format'

const playerStore = usePlayerStore()

const showFullPlayer = computed(() => playerStore.showFullPlayer)
const currentSong = computed(() => playerStore.currentSong)
const isPlaying = computed(() => playerStore.isPlaying)
const progress = computed(() => playerStore.progress)
const currentTime = computed(() => playerStore.currentTime)
const duration = computed(() => playerStore.duration)
const playMode = computed(() => playerStore.playMode)
const volume = computed(() => playerStore.volume)
const isMuted = computed(() => playerStore.isMuted)
const playlist = computed(() => playerStore.playlist)
const currentIndex = computed(() => playerStore.currentIndex)

const showSidePlaylist = ref(false)
const lyricsScrollRef = ref(null)

// 歌词数据
const displayLyrics = computed(() => {
  if (currentSong.value && currentSong.value.lyrics) {
    return currentSong.value.lyrics
  }
  return [{ time: 0, text: '暂无歌词' }]
})

// 当前歌词索引
const currentLyricIndex = computed(() => {
  const lyrics = displayLyrics.value
  if (!lyrics || lyrics.length === 0) return 0
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime.value >= lyrics[i].time) {
      return i
    }
  }
  return 0
})

// 歌词滚动
watch(currentLyricIndex, () => {
  nextTick(() => {
    if (lyricsScrollRef.value) {
      const activeLine = lyricsScrollRef.value.querySelector('.lyric-line.active')
      if (activeLine) {
        const containerHeight = lyricsScrollRef.value.clientHeight
        const lineTop = activeLine.offsetTop
        const lineHeight = activeLine.offsetHeight
        lyricsScrollRef.value.scrollTop = lineTop - containerHeight / 2 + lineHeight / 2
      }
    }
  })
})

function closeFullPlayer() {
  playerStore.toggleFullPlayer()
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

function togglePlaylist() {
  showSidePlaylist.value = !showSidePlaylist.value
}

function playSong(index) {
  playerStore.playSong(index)
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
</script>

<style lang="less" scoped>
.full-player {
  position: fixed;
  inset: 0;
  z-index: 200;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.player-bg {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(40px) brightness(0.4);
    transform: scale(1.2);
  }

  .bg-mask {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
}

.player-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: @spacing-lg;
  gap: @spacing-md;

  .back-btn,
  .more-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    flex-shrink: 0;

    svg {
      width: 22px;
      height: 22px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .song-info {
    flex: 1;
    text-align: center;

    .song-name {
      font-size: @font-size-xl;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .song-artist {
      font-size: @font-size-sm;
      opacity: 0.7;
    }
  }
}

.player-cover-wrapper {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .cover-disc {
    width: 280px;
    height: 280px;
    position: relative;
    border-radius: 50%;
    background: #111;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .disc-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: #222;
      border-radius: 50%;
      border: 4px solid #333;
    }

    &.playing {
      animation: rotate 20s linear infinite;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: repeating-radial-gradient(
        circle at center,
        transparent 0,
        transparent 4px,
        rgba(255, 255, 255, 0.03) 4px,
        rgba(255, 255, 255, 0.03) 5px
      );
    }
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.lyrics-container {
  position: relative;
  z-index: 1;
  height: 150px;
  overflow: hidden;
  padding: 0 @spacing-xl;

  .lyrics-scroll {
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .lyric-line {
    text-align: center;
    padding: 8px 0;
    font-size: @font-size-base;
    color: rgba(255, 255, 255, 0.5);
    transition: all @transition-fast;

    &.active {
      color: white;
      font-size: @font-size-lg;
      font-weight: 600;
    }
  }
}

.player-controls {
  position: relative;
  z-index: 1;
  padding: @spacing-lg @spacing-xl @spacing-2xl;

  .progress-section {
    display: flex;
    align-items: center;
    gap: @spacing-md;
    margin-bottom: @spacing-lg;

    .time {
      font-size: @font-size-xs;
      opacity: 0.7;
      font-variant-numeric: tabular-nums;
      min-width: 40px;
    }

    .progress-bar {
      flex: 1;
      height: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        .progress-thumb {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }

    .progress-bg {
      position: relative;
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }

    .progress-fill {
      height: 100%;
      background: white;
      border-radius: 2px;
    }

    .progress-thumb {
      position: absolute;
      top: 50%;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
      transition: all @transition-fast;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }

  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: @spacing-xl;
    margin-bottom: @spacing-lg;

    .ctrl-btn {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 24px;
        height: 24px;
      }

      &:hover {
        opacity: 0.8;
      }

      &.play-btn {
        width: 64px;
        height: 64px;
        background: white;
        border-radius: 50%;
        color: #333;

        svg {
          width: 30px;
          height: 30px;
          margin-left: 3px;
        }

        &:hover {
          transform: scale(1.05);
          opacity: 1;
        }
      }

      &.prev-btn svg,
      &.next-btn svg {
        width: 32px;
        height: 32px;
      }
    }
  }

  .volume-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: @spacing-sm;

    .vol-btn {
      color: white;
      opacity: 0.8;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        opacity: 1;
      }
    }

    .vol-slider {
      width: 100px;
      height: 16px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .vol-bg {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }

    .vol-fill {
      height: 100%;
      background: white;
      border-radius: 2px;
    }
  }
}

.side-playlist {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 320px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  z-index: 10;
  display: flex;
  flex-direction: column;

  .side-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @spacing-md @spacing-lg;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: @font-size-base;
    font-weight: 600;

    button {
      color: white;
      opacity: 0.7;
      padding: 4px;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  .side-content {
    flex: 1;
    overflow-y: auto;
    padding: @spacing-sm 0;
  }

  .side-song-item {
    padding: @spacing-sm @spacing-lg;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      .side-song-name {
        color: @primary-light;
      }
    }

    .side-song-name {
      font-size: @font-size-sm;
      margin-bottom: 2px;
    }

    .side-song-artist {
      font-size: @font-size-xs;
      opacity: 0.6;
    }
  }
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform @transition-normal;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity @transition-normal;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式
@media (max-width: @breakpoint-md) {
  .player-cover-wrapper .cover-disc {
    width: 220px;
    height: 220px;
  }

  .player-controls {
    padding: @spacing-lg @spacing-lg @spacing-xl;

    .control-buttons {
      gap: @spacing-lg;
    }
  }

  .lyrics-container {
    padding: 0 @spacing-lg;
  }
}

@media (max-width: @breakpoint-sm) {
  .player-cover-wrapper .cover-disc {
    width: 180px;
    height: 180px;
  }

  .volume-section {
    display: none !important;
  }

  .side-playlist {
    width: 100%;
  }
}
</style>
