<template>
  <article class="song-item" :class="{ active: isActive }" role="listitem">
    <!-- 序号 -->
    <div class="item-index" aria-hidden="true">
      <span v-if="!isActive" class="index-num">{{ index }}</span>
      <span v-else class="playing-icon" :aria-label="'正在播放'">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
      </span>
    </div>

    <!-- 歌曲封面（可选） -->
    <div v-if="showCover" class="item-cover">
      <img v-lazy="song.cover" :alt="song.name + ' 封面'" />
    </div>

    <!-- 歌曲信息 -->
    <div class="item-info" @dblclick="handleDoubleClick" role="button" tabindex="0" @keydown.enter="handlePlay" :aria-label="'播放 ' + song.name">
      <div class="item-name text-ellipsis">
        <span class="name-text">{{ song.name }}</span>
        <span v-if="song.alias" class="alias text-ellipsis"> - {{ song.alias }}</span>
      </div>
      <div class="item-sub text-ellipsis">
        <router-link :to="`/singer/${song.artistId}`" class="artist-link" @click.stop :aria-label="'查看歌手 ' + song.artist">
          {{ song.artist }}
        </router-link>
        <span class="divider"> - </span>
        <span class="album">{{ song.album }}</span>
      </div>
    </div>

    <!-- 时长 -->
    <div v-if="showDuration" class="item-duration" :aria-label="'时长 ' + formatTime(song.duration)">
      {{ formatTime(song.duration) }}
    </div>

    <!-- 操作按钮 -->
    <div class="item-actions">
      <button
        class="action-btn favorite-btn"
        :class="{ active: isFavorited }"
        @click.stop="toggleFavorite"
        :title="isFavorited ? '取消收藏' : '收藏'"
        :aria-label="isFavorited ? '取消收藏' : '收藏'"
      >
        <svg viewBox="0 0 24 24" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <button class="action-btn play-btn" @click.stop="handlePlay" title="播放" aria-label="播放">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '@/store/player'
import { useUserStore } from '@/store/user'
import { formatTime } from '@/utils/format'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  index: {
    type: [Number, String],
    default: 1
  },
  showCover: {
    type: Boolean,
    default: false
  },
  showDuration: {
    type: Boolean,
    default: true
  }
})

const playerStore = usePlayerStore()
const userStore = useUserStore()

const isActive = computed(() => {
  return playerStore.currentSong?.id === props.song.id
})

const isFavorited = computed(() => {
  return userStore.isFavoriteSong(props.song.id)
})

function handlePlay() {
  playerStore.playSingleSong(props.song)
  userStore.addToRecentPlayed(props.song)
}

function handleDoubleClick() {
  handlePlay()
}

function toggleFavorite() {
  userStore.toggleFavoriteSong(props.song)
}
</script>

<style lang="less" scoped>
.song-item {
  display: flex;
  align-items: center;
  gap: @spacing-md;
  padding: @spacing-sm @spacing-md;
  border-radius: @radius-md;
  transition: background @transition-fast;
  cursor: pointer;

  &:hover {
    background: @bg-tertiary;

    .item-actions {
      opacity: 1;
    }
  }

  &.active {
    .item-name .name-text {
      color: @primary-color;
    }
  }

  .item-index {
    width: 32px;
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

  .item-cover {
    width: 48px;
    height: 48px;
    border-radius: @radius-sm;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-info {
    flex: 1;
    min-width: 0;

    .item-name {
      font-size: @font-size-sm;
      color: @text-primary;
      margin-bottom: 4px;
      display: flex;
      gap: @spacing-xs;

      .alias {
        color: @text-tertiary;
        font-weight: normal;
      }
    }

    .item-sub {
      font-size: @font-size-xs;
      color: @text-tertiary;

      .artist-link {
        color: @text-tertiary;

        &:hover {
          color: @primary-color;
        }
      }

      .divider {
        margin: 0 2px;
      }
    }
  }

  .item-duration {
    font-size: @font-size-sm;
    color: @text-tertiary;
    flex-shrink: 0;
    min-width: 45px;
    text-align: right;
  }

  .item-actions {
    display: flex;
    align-items: center;
    gap: @spacing-xs;
    opacity: 0;
    transition: opacity @transition-fast;
    flex-shrink: 0;

    .action-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: @text-secondary;

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background: rgba(99, 102, 241, 0.1);
        color: @primary-color;
      }

      &.play-btn {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;

        svg {
          margin-left: 2px;
        }

        &:hover {
          transform: scale(1.05);
        }
      }

      &.favorite-btn.active {
        color: @accent-color;
      }
    }
  }
}

@keyframes sound-wave {
  0%, 100% { height: 6px; }
  50% { height: 14px; }
}

@media (max-width: @breakpoint-sm) {
  .song-item {
    padding: @spacing-sm;
    gap: @spacing-sm;

    .item-actions {
      opacity: 1;
    }

    .item-sub {
      .divider, .album {
        display: none;
      }
    }
  }
}
</style>
