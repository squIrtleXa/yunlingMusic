<template>
  <div class="playlist-panel" @click.stop>
    <div class="panel-header">
      <span class="panel-title">播放列表 ({{ playlist.length }})</span>
      <div class="panel-actions">
        <button class="clear-btn" @click="handleClear">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          清空
        </button>
        <button class="close-btn" @click="closePanel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="panel-content">
      <div
        v-for="(song, index) in playlist"
        :key="song.id"
        class="playlist-item"
        :class="{ active: index === currentIndex }"
        @click="playSong(index)"
      >
        <div class="item-index">
          <span v-if="index !== currentIndex" class="index-num">{{ index + 1 }}</span>
          <span v-else class="playing-icon">
            <span class="bar bar1"></span>
            <span class="bar bar2"></span>
            <span class="bar bar3"></span>
          </span>
        </div>
        <div class="item-info">
          <div class="item-name text-ellipsis">{{ song.name }}</div>
          <div class="item-artist text-ellipsis">{{ song.artist }}</div>
        </div>
        <div class="item-duration">{{ formatTime(song.duration) }}</div>
        <button class="item-remove" @click.stop="removeSong(index)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div v-if="playlist.length === 0" class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <p>播放列表为空</p>
        <span>去添加喜欢的歌曲吧~</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '@/store/player'
import { formatTime } from '@/utils/format'

const playerStore = usePlayerStore()

const playlist = computed(() => playerStore.playlist)
const currentIndex = computed(() => playerStore.currentIndex)

function playSong(index) {
  playerStore.playSong(index)
}

function removeSong(index) {
  playerStore.removeFromPlaylist(index)
}

function handleClear() {
  if (confirm('确定要清空播放列表吗？')) {
    playerStore.clearPlaylist()
  }
}

function closePanel() {
  playerStore.togglePlaylistPanel()
}
</script>

<style lang="less" scoped>
.playlist-panel {
  position: absolute;
  bottom: @playbar-height;
  right: 0;
  width: 380px;
  max-height: 500px;
  background: @bg-primary;
  border-radius: @radius-lg @radius-lg 0 0;
  box-shadow: @shadow-xl;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: @spacing-md @spacing-lg;
  border-bottom: 1px solid @border-light;

  .panel-title {
    font-size: @font-size-base;
    font-weight: 600;
    color: @text-primary;
  }

  .panel-actions {
    display: flex;
    align-items: center;
    gap: @spacing-sm;

    .clear-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: @font-size-xs;
      color: @text-tertiary;
      padding: 4px @spacing-sm;
      border-radius: @radius-sm;

      svg {
        width: 14px;
        height: 14px;
      }

      &:hover {
        background: @bg-tertiary;
        color: @accent-color;
      }
    }

    .close-btn {
      padding: 4px;
      color: @text-tertiary;

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        color: @text-secondary;
      }
    }
  }
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: @spacing-sm 0;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: @spacing-md;
  padding: @spacing-sm @spacing-lg;
  cursor: pointer;
  transition: background @transition-fast;

  &:hover {
    background: @bg-tertiary;

    .item-remove {
      opacity: 1;
    }
  }

  &.active {
    background: fade(@primary-color, 10%);

    .item-name {
      color: @primary-color;
    }
  }

  .item-index {
    width: 24px;
    text-align: center;
    flex-shrink: 0;

    .index-num {
      font-size: @font-size-sm;
      color: @text-tertiary;
    }

    .playing-icon {
      display: inline-flex;
      align-items: flex-end;
      gap: 2px;
      height: 16px;

      .bar {
        width: 3px;
        background: @primary-color;
        border-radius: 2px;
        animation: sound-wave 1s ease-in-out infinite;

        &.bar1 { height: 8px; animation-delay: 0s; }
        &.bar2 { height: 14px; animation-delay: 0.2s; }
        &.bar3 { height: 6px; animation-delay: 0.4s; }
      }
    }
  }

  .item-info {
    flex: 1;
    min-width: 0;

    .item-name {
      font-size: @font-size-sm;
      color: @text-primary;
      margin-bottom: 2px;
    }

    .item-artist {
      font-size: @font-size-xs;
      color: @text-tertiary;
    }
  }

  .item-duration {
    font-size: @font-size-xs;
    color: @text-tertiary;
    flex-shrink: 0;
  }

  .item-remove {
    opacity: 0;
    padding: 4px;
    color: @text-tertiary;
    flex-shrink: 0;
    transition: opacity @transition-fast;

    svg {
      width: 14px;
      height: 14px;
    }

    &:hover {
      color: @accent-color;
    }
  }
}

@keyframes sound-wave {
  0%, 100% { height: 6px; }
  50% { height: 14px; }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: @spacing-2xl;
  color: @text-tertiary;

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: @spacing-md;
  }

  p {
    font-size: @font-size-base;
    margin-bottom: @spacing-xs;
    color: @text-secondary;
  }

  span {
    font-size: @font-size-sm;
  }
}

// 响应式
@media (max-width: @breakpoint-md) {
  .playlist-panel {
    width: 100%;
    right: 0;
    left: 0;
    border-radius: @radius-lg @radius-lg 0 0;
  }
}
</style>
