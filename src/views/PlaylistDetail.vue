<template>
  <div class="playlist-detail" v-if="playlist">
    <div class="container">
      <!-- 歌单头部 -->
      <div class="detail-header">
        <div class="playlist-cover">
          <img :src="playlist.cover" :alt="playlist.name" />
          <div class="cover-badge" v-if="playlist.tags && playlist.tags.length">
            {{ playlist.tags[0] }}
          </div>
        </div>
        <div class="playlist-info">
          <div class="playlist-type">歌单</div>
          <h1 class="playlist-title">{{ playlist.name }}</h1>
          <div class="creator-info">
            <div class="creator-avatar">
              <img :src="playlist.creatorAvatar" :alt="playlist.creator" />
            </div>
            <span class="creator-name">{{ playlist.creator }}</span>
          </div>
          <div class="playlist-tags" v-if="playlist.tags">
            <span class="tag" v-for="tag in playlist.tags" :key="tag">{{ tag }}</span>
          </div>
          <p class="playlist-desc" v-if="playlist.description">{{ playlist.description }}</p>
          <div class="playlist-stats">
            <span class="stat-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              {{ formatCount(playlist.playCount) }} 播放
            </span>
            <span class="stat-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {{ formatCount(playlist.playCount / 10) }} 收藏
            </span>
            <span class="stat-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              {{ playlist.songCount }} 首歌曲
            </span>
          </div>
          <div class="action-buttons">
            <button class="btn btn-primary" @click="playAll">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              播放全部
            </button>
            <button class="btn btn-secondary" :class="{ active: isFavorited }" @click="toggleFavorite">
              <svg viewBox="0 0 24 24" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {{ isFavorited ? '已收藏' : '收藏' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 歌曲列表 -->
      <div class="songs-section">
        <div class="section-header">
          <h2 class="section-title">歌曲列表</h2>
          <span class="song-count">共 {{ playlist.songs?.length || 0 }} 首</span>
        </div>
        <SongList :songs="playlist.songs || []" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SongList from '@/components/SongList.vue'
import { getPlaylistById } from '@/mock/playlists'
import { usePlayerStore } from '@/store/player'
import { useUserStore } from '@/store/user'
import { formatCount } from '@/utils/format'

const route = useRoute()
const playerStore = usePlayerStore()
const userStore = useUserStore()

const playlist = ref(null)

const isFavorited = computed(() => {
  return playlist.value ? userStore.isFavoritePlaylist(playlist.value.id) : false
})

function playAll() {
  if (playlist.value && playlist.value.songs && playlist.value.songs.length > 0) {
    playerStore.setPlaylist(playlist.value.songs, 0)
  }
}

function toggleFavorite() {
  if (playlist.value) {
    userStore.toggleFavoritePlaylist(playlist.value)
  }
}

onMounted(() => {
  const id = route.params.id
  playlist.value = getPlaylistById(id)
})
</script>

<style lang="less" scoped>
.playlist-detail {
  padding: @spacing-xl 0;
}

.detail-header {
  display: flex;
  gap: @spacing-2xl;
  margin-bottom: @spacing-2xl;
  background: @bg-primary;
  border-radius: @radius-xl;
  padding: @spacing-2xl;
}

.playlist-cover {
  position: relative;
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  border-radius: @radius-lg;
  overflow: hidden;
  box-shadow: @shadow-xl;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-badge {
    position: absolute;
    top: @spacing-md;
    left: @spacing-md;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px @spacing-sm;
    border-radius: @radius-sm;
    font-size: @font-size-xs;
  }
}

.playlist-info {
  flex: 1;
  display: flex;
  flex-direction: column;

  .playlist-type {
    font-size: @font-size-sm;
    color: @text-tertiary;
    margin-bottom: @spacing-sm;
  }

  .playlist-title {
    font-size: @font-size-3xl;
    font-weight: 700;
    color: @text-primary;
    margin-bottom: @spacing-md;
    line-height: 1.3;
  }

  .creator-info {
    display: flex;
    align-items: center;
    gap: @spacing-sm;
    margin-bottom: @spacing-md;

    .creator-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .creator-name {
      font-size: @font-size-sm;
      color: @text-secondary;
    }
  }

  .playlist-tags {
    display: flex;
    flex-wrap: wrap;
    gap: @spacing-sm;
    margin-bottom: @spacing-md;

    .tag {
      padding: 4px @spacing-sm;
      background: fade(@primary-color, 10%);
      color: @primary-color;
      border-radius: @radius-sm;
      font-size: @font-size-xs;
    }
  }

  .playlist-desc {
    font-size: @font-size-sm;
    color: @text-secondary;
    line-height: 1.6;
    margin-bottom: @spacing-lg;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .playlist-stats {
    display: flex;
    gap: @spacing-xl;
    margin-bottom: @spacing-lg;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: @font-size-sm;
      color: @text-tertiary;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: @spacing-md;
    margin-top: auto;

    .btn {
      display: flex;
      align-items: center;
      gap: @spacing-sm;
      padding: @spacing-sm @spacing-lg;
      border-radius: @radius-full;
      font-size: @font-size-sm;
      font-weight: 500;
      transition: all @transition-fast;

      svg {
        width: 18px;
        height: 18px;
      }

      &.btn-primary {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;

        svg {
          margin-left: 2px;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: @shadow-lg;
        }
      }

      &.btn-secondary {
        background: @bg-tertiary;
        color: @text-secondary;

        &:hover {
          background: fade(@primary-color, 10%);
          color: @primary-color;
        }

        &.active {
          background: fade(@accent-color, 10%);
          color: @accent-color;
        }
      }
    }
  }
}

.songs-section {
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: @spacing-md;

    .section-title {
      font-size: @font-size-xl;
      font-weight: 600;
    }

    .song-count {
      font-size: @font-size-sm;
      color: @text-tertiary;
    }
  }
}

// 响应式
@media (max-width: @breakpoint-md) {
  .detail-header {
    flex-direction: column;
    gap: @spacing-lg;
    padding: @spacing-lg;
  }

  .playlist-cover {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .playlist-info {
    text-align: center;

    .playlist-title {
      font-size: @font-size-2xl;
    }

    .creator-info {
      justify-content: center;
    }

    .playlist-tags {
      justify-content: center;
    }

    .playlist-stats {
      justify-content: center;
    }

    .action-buttons {
      justify-content: center;
    }
  }

  .playlist-detail {
    padding: @spacing-lg 0;
  }
}
</style>
