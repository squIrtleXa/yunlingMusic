<template>
  <div class="user-page">
    <div class="container">
      <!-- 用户信息卡片 -->
      <div class="user-card">
        <div class="user-avatar">
          <div class="avatar-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div class="level-badge">Lv.{{ userInfo.level }}</div>
        </div>
        <div class="user-info">
          <h2 class="user-name">{{ userInfo.nickname }}</h2>
          <p class="user-signature">{{ userInfo.signature }}</p>
          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-num">{{ favoriteSongs.length }}</span>
              <span class="stat-label">收藏歌曲</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">{{ favoritePlaylists.length }}</span>
              <span class="stat-label">收藏歌单</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">{{ recentPlayed.length }}</span>
              <span class="stat-label">最近播放</span>
            </div>
          </div>
        </div>
      </div>

      <div class="user-content">
        <!-- Tab 切换 -->
        <div class="tab-bar">
          <span
            class="tab-item"
            :class="{ active: activeTab === 'recent' }"
            @click="activeTab = 'recent'"
          >
            最近播放
          </span>
          <span
            class="tab-item"
            :class="{ active: activeTab === 'favorites' }"
            @click="activeTab = 'favorites'"
          >
            我喜欢的音乐
          </span>
          <span
            class="tab-item"
            :class="{ active: activeTab === 'playlists' }"
            @click="activeTab = 'playlists'"
          >
            收藏的歌单
          </span>
        </div>

        <!-- 最近播放 -->
        <div v-show="activeTab === 'recent'" class="tab-content">
          <div class="content-header" v-if="recentPlayed.length > 0">
            <button class="play-all-btn" @click="playAll(recentPlayed)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              播放全部
            </button>
          </div>
          <SongList :songs="recentPlayed" />
          <div v-if="recentPlayed.length === 0" class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <p>暂无播放记录</p>
            <span>去发现更多好音乐吧~</span>
          </div>
        </div>

        <!-- 我喜欢的音乐 -->
        <div v-show="activeTab === 'favorites'" class="tab-content">
          <div class="content-header" v-if="favoriteSongs.length > 0">
            <button class="play-all-btn" @click="playAll(favoriteSongs)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              播放全部
            </button>
          </div>
          <SongList :songs="favoriteSongs" />
          <div v-if="favoriteSongs.length === 0" class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <p>还没有喜欢的音乐</p>
            <span>快去收藏你喜欢的歌曲吧~</span>
          </div>
        </div>

        <!-- 收藏的歌单 -->
        <div v-show="activeTab === 'playlists'" class="tab-content">
          <div class="playlist-grid">
            <PlaylistCard
              v-for="playlist in favoritePlaylists"
              :key="playlist.id"
              :playlist="playlist"
            />
          </div>
          <div v-if="favoritePlaylists.length === 0" class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <p>还没有收藏歌单</p>
            <span>快去发现你喜欢的歌单吧~</span>
          </div>
        </div>
      </div>

      <!-- 关于与版权 -->
      <div class="about-section">
        <div class="about-title">关于云聆音乐</div>
        <div class="about-desc">
          封面图片来源：Unsplash (unsplash.com)，遵循 Unsplash License 可免费使用。
        </div>
        <div class="about-tech">
          <span>技术栈：Vue 3 + Pinia + Vue Router + Vite</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SongList from '@/components/SongList.vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import { useUserStore } from '@/store/user'
import { usePlayerStore } from '@/store/player'

const userStore = useUserStore()
const playerStore = usePlayerStore()

const activeTab = ref('recent')

const userInfo = computed(() => userStore.userInfo)
const favoriteSongs = computed(() => userStore.favoriteSongs)
const favoritePlaylists = computed(() => userStore.favoritePlaylists)
const recentPlayed = computed(() => userStore.recentPlayed)

function playAll(songs) {
  if (songs && songs.length > 0) {
    playerStore.setPlaylist(songs, 0)
  }
}
</script>

<style lang="less" scoped>
.user-page {
  padding: @spacing-xl 0;
}

.user-card {
  display: flex;
  gap: @spacing-2xl;
  align-items: center;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: @radius-xl;
  padding: @spacing-2xl;
  color: white;
  margin-bottom: @spacing-xl;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
}

.user-avatar {
  position: relative;
  flex-shrink: 0;

  .avatar-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid rgba(255, 255, 255, 0.3);

    svg {
      width: 60px;
      height: 60px;
    }
  }

  .level-badge {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #fbbf24;
    color: #92400e;
    padding: 2px @spacing-sm;
    border-radius: @radius-full;
    font-size: @font-size-xs;
    font-weight: 600;
  }
}

.user-info {
  flex: 1;
  position: relative;
  z-index: 1;

  .user-name {
    font-size: @font-size-2xl;
    font-weight: 700;
    margin-bottom: @spacing-sm;
  }

  .user-signature {
    font-size: @font-size-sm;
    opacity: 0.85;
    margin-bottom: @spacing-lg;
  }

  .user-stats {
    display: flex;
    gap: @spacing-2xl;

    .stat-item {
      display: flex;
      flex-direction: column;

      .stat-num {
        font-size: @font-size-xl;
        font-weight: 700;
      }

      .stat-label {
        font-size: @font-size-xs;
        opacity: 0.8;
      }
    }
  }
}

.user-content {
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-lg;
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

.content-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: @spacing-md;

  .play-all-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: @spacing-xs @spacing-md;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: @radius-full;
    font-size: @font-size-sm;

    svg {
      width: 16px;
      height: 16px;
      margin-left: 2px;
    }

    &:hover {
      opacity: 0.9;
    }
  }
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: @spacing-lg;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: @spacing-2xl;
  color: @text-tertiary;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: @spacing-md;
    opacity: 0.5;
  }

  p {
    font-size: @font-size-base;
    color: @text-secondary;
    margin-bottom: @spacing-xs;
  }

  span {
    font-size: @font-size-sm;
  }
}

// 响应式
@media (max-width: @breakpoint-xl) {
  .playlist-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: @breakpoint-lg) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: @breakpoint-md) {
  .user-card {
    flex-direction: column;
    text-align: center;
    gap: @spacing-lg;
    padding: @spacing-xl;
  }

  .user-info {
    .user-stats {
      justify-content: center;
    }
  }

  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: @spacing-md;
  }

  .user-page {
    padding: @spacing-lg 0;
  }
}

@media (max-width: @breakpoint-sm) {
  .playlist-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .user-stats {
    gap: @spacing-lg !important;
  }
}

.about-section {
  margin-top: @spacing-xl;
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-xl @spacing-lg;
  text-align: center;

  .about-title {
    font-size: @font-size-base;
    font-weight: 600;
    color: @text-primary;
    margin-bottom: @spacing-sm;
  }

  .about-desc {
    font-size: @font-size-sm;
    color: @text-secondary;
    line-height: 1.6;
    margin-bottom: @spacing-md;
  }

  .about-tech {
    font-size: @font-size-xs;
    color: @text-tertiary;
    margin-bottom: @spacing-xs;
  }

  .about-footer {
    font-size: @font-size-xs;
    color: @text-tertiary;
    opacity: 0.7;
  }
}
</style>
