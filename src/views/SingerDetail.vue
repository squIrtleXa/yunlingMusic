<template>
  <div class="singer-detail" v-if="singer">
    <!-- 歌手头部 -->
    <div class="singer-header">
      <div class="header-bg"></div>
      <div class="container header-content">
        <div class="singer-avatar">
          <img :src="singer.avatar" :alt="singer.name" />
        </div>
        <div class="singer-info">
          <h1 class="singer-name">{{ singer.name }}</h1>
          <div class="singer-stats">
            <span class="stat-item">{{ formatCount(singer.fansCount) }} 粉丝</span>
            <span class="stat-divider">|</span>
            <span class="stat-item">{{ singer.songCount }} 首歌曲</span>
            <span class="stat-divider">|</span>
            <span class="stat-item">{{ singer.albumCount }} 张专辑</span>
          </div>
          <p class="singer-desc">{{ singer.description }}</p>
          <div class="action-buttons">
            <button class="btn btn-primary" @click="playAll">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              播放热门歌曲
            </button>
            <button class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              关注
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container detail-content">
      <!-- Tab 切换 -->
      <div class="tab-bar">
        <span
          class="tab-item"
          :class="{ active: activeTab === 'songs' }"
          @click="activeTab = 'songs'"
        >
          热门歌曲
        </span>
        <span
          class="tab-item"
          :class="{ active: activeTab === 'albums' }"
          @click="activeTab = 'albums'"
        >
          专辑
        </span>
      </div>

      <!-- 热门歌曲 -->
      <div v-show="activeTab === 'songs'" class="tab-content">
        <SongList :songs="hotSongs" />
      </div>

      <!-- 专辑列表 -->
      <div v-show="activeTab === 'albums'" class="tab-content">
        <div class="album-grid">
          <div
            v-for="album in albums"
            :key="album.id"
            class="album-card card"
          >
            <div class="album-cover">
              <img :src="album.cover" :alt="album.name" />
            </div>
            <div class="album-info">
              <h3 class="album-name text-ellipsis">{{ album.name }}</h3>
              <p class="album-date">{{ album.publishTime }}</p>
            </div>
          </div>
        </div>

        <div v-if="albums.length === 0" class="empty-state">
          <p>暂无专辑</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SongList from '@/components/SongList.vue'
import { getSingerById, getSingerHotSongs, getSingerAlbums } from '@/mock/singers'
import { usePlayerStore } from '@/store/player'
import { formatCount } from '@/utils/format'

const route = useRoute()
const playerStore = usePlayerStore()

const singer = ref(null)
const hotSongs = ref([])
const albums = ref([])
const activeTab = ref('songs')

function playAll() {
  if (hotSongs.value.length > 0) {
    playerStore.setPlaylist(hotSongs.value, 0)
  }
}

onMounted(() => {
  const id = route.params.id
  singer.value = getSingerById(id)
  hotSongs.value = getSingerHotSongs(id, 20)
  albums.value = getSingerAlbums(id)
})
</script>

<style lang="less" scoped>
.singer-detail {
  padding-bottom: @spacing-xl;
}

.singer-header {
  position: relative;
  padding: @spacing-2xl 0;
  margin-bottom: @spacing-xl;
  overflow: hidden;

  .header-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    opacity: 0.9;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1.5" fill="white" opacity="0.1"/><circle cx="40" cy="70" r="2.5" fill="white" opacity="0.1"/><circle cx="60" cy="30" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="80" r="2" fill="white" opacity="0.1"/></svg>');
      background-size: 200px 200px;
    }
  }

  .header-content {
    position: relative;
    z-index: 1;
    display: flex;
    gap: @spacing-2xl;
    align-items: center;
    color: white;
  }

  .singer-avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 4px solid rgba(255, 255, 255, 0.3);
    box-shadow: @shadow-xl;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .singer-info {
    flex: 1;

    .singer-name {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: @spacing-md;
    }

    .singer-stats {
      display: flex;
      align-items: center;
      gap: @spacing-md;
      margin-bottom: @spacing-md;
      font-size: @font-size-sm;
      opacity: 0.9;

      .stat-divider {
        opacity: 0.5;
      }
    }

    .singer-desc {
      font-size: @font-size-sm;
      line-height: 1.6;
      opacity: 0.85;
      margin-bottom: @spacing-lg;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .action-buttons {
      display: flex;
      gap: @spacing-md;

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
          background: white;
          color: @primary-color;

          svg {
            margin-left: 2px;
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: @shadow-lg;
          }
        }

        &.btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);

          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }
  }
}

.detail-content {
  position: relative;
  z-index: 1;
}

.tab-bar {
  display: flex;
  gap: @spacing-xl;
  margin-bottom: @spacing-lg;
  border-bottom: 1px solid @border-light;

  .tab-item {
    position: relative;
    padding: @spacing-md 0;
    font-size: @font-size-base;
    color: @text-secondary;
    cursor: pointer;
    transition: color @transition-fast;

    &:hover {
      color: @primary-color;
    }

    &.active {
      color: @primary-color;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, @primary-color, @secondary-color);
        border-radius: 1px;
      }
    }
  }
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: @spacing-lg;
}

.album-card {
  cursor: pointer;
  overflow: hidden;

  &:hover {
    .album-name {
      color: @primary-color;
    }
  }

  .album-cover {
    width: 100%;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
    border-radius: @radius-md @radius-md 0 0;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform @transition-normal;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .album-info {
    padding: @spacing-md;

    .album-name {
      font-size: @font-size-sm;
      font-weight: 500;
      color: @text-primary;
      margin-bottom: 4px;
      transition: color @transition-fast;
    }

    .album-date {
      font-size: @font-size-xs;
      color: @text-tertiary;
    }
  }
}

.empty-state {
  text-align: center;
  padding: @spacing-2xl;
  color: @text-tertiary;
}

// 响应式
@media (max-width: @breakpoint-xl) {
  .album-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: @breakpoint-lg) {
  .album-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: @breakpoint-md) {
  .singer-header {
    padding: @spacing-xl 0;

    .header-content {
      flex-direction: column;
      text-align: center;
      gap: @spacing-lg;
    }

    .singer-avatar {
      width: 140px;
      height: 140px;
    }

    .singer-info {
      .singer-name {
        font-size: 28px;
      }

      .singer-stats {
        justify-content: center;
      }

      .action-buttons {
        justify-content: center;
      }
    }
  }

  .album-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: @spacing-md;
  }
}

@media (max-width: @breakpoint-sm) {
  .album-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
