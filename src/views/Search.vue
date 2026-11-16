<template>
  <div class="search-page">
    <div class="container">
      <!-- 搜索框 -->
      <div class="search-section">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            v-model="keyword"
            placeholder="搜索音乐、歌手、歌单"
            @keyup.enter="handleSearch"
            @input="handleInput"
          />
          <button v-if="keyword" class="clear-btn" @click="clearKeyword">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 搜索建议/结果 -->
      <div v-if="!keyword" class="search-default">
        <!-- 热搜榜 -->
        <div class="hot-search-section">
          <div class="section-header">
            <h2 class="section-title">热搜榜</h2>
            <span class="hot-badge">HOT</span>
          </div>
          <div class="hot-list">
            <div
              v-for="(item, index) in hotSearchList"
              :key="item.id"
              class="hot-item"
              @click="searchKeyword(item.keyword)"
            >
              <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
              <span class="hot-keyword text-ellipsis">{{ item.keyword }}</span>
              <span class="hot-tags">
                <span v-if="item.isHot" class="tag hot">热</span>
                <span v-if="item.isNew" class="tag new">新</span>
              </span>
              <span class="hot-count">{{ formatCount(item.hot) }}</span>
            </div>
          </div>
        </div>

        <!-- 搜索历史 -->
        <div class="history-section" v-if="searchHistory.length > 0">
          <div class="section-header">
            <h2 class="section-title">搜索历史</h2>
            <button class="clear-history" @click="clearHistory">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              清空
            </button>
          </div>
          <div class="history-tags">
            <div
              v-for="item in searchHistory"
              :key="item"
              class="history-tag"
              @click="searchKeyword(item)"
            >
              <span class="text-ellipsis">{{ item }}</span>
              <button class="remove-tag" @click.stop="removeHistory(item)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div v-else class="search-results">
        <!-- Tab 切换 -->
        <div class="result-tabs">
          <span
            class="tab-item"
            :class="{ active: activeTab === 'songs' }"
            @click="activeTab = 'songs'"
          >
            歌曲 ({{ songResults.length }})
          </span>
          <span
            class="tab-item"
            :class="{ active: activeTab === 'singers' }"
            @click="activeTab = 'singers'"
          >
            歌手 ({{ singerResults.length }})
          </span>
          <span
            class="tab-item"
            :class="{ active: activeTab === 'playlists' }"
            @click="activeTab = 'playlists'"
          >
            歌单 ({{ playlistResults.length }})
          </span>
        </div>

        <!-- 歌曲结果 -->
        <div v-show="activeTab === 'songs'" class="tab-content">
          <SongList :songs="songResults" />
          <div v-if="songResults.length === 0" class="empty-state">
            <p>暂无相关歌曲</p>
          </div>
        </div>

        <!-- 歌手结果 -->
        <div v-show="activeTab === 'singers'" class="tab-content">
          <div class="singer-grid">
            <SingerCard
              v-for="singer in singerResults"
              :key="singer.id"
              :singer="singer"
            />
          </div>
          <div v-if="singerResults.length === 0" class="empty-state">
            <p>暂无相关歌手</p>
          </div>
        </div>

        <!-- 歌单结果 -->
        <div v-show="activeTab === 'playlists'" class="tab-content">
          <div class="playlist-grid">
            <PlaylistCard
              v-for="playlist in playlistResults"
              :key="playlist.id"
              :playlist="playlist"
            />
          </div>
          <div v-if="playlistResults.length === 0" class="empty-state">
            <p>暂无相关歌单</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SongList from '@/components/SongList.vue'
import SingerCard from '@/components/SingerCard.vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import { hotSearchList } from '@/mock/hotSearch'
import { searchSongs } from '@/mock/songs'
import { searchSingers } from '@/mock/singers'
import { mockPlaylists } from '@/mock/playlists'
import { useUserStore } from '@/store/user'
import { formatCount } from '@/utils/format'

const route = useRoute()
const userStore = useUserStore()

const keyword = ref('')
const activeTab = ref('songs')

const searchHistory = computed(() => userStore.searchHistory)

const songResults = computed(() => searchSongs(keyword.value))
const singerResults = computed(() => searchSingers(keyword.value))
const playlistResults = computed(() => {
  if (!keyword.value) return []
  const lower = keyword.value.toLowerCase()
  return mockPlaylists.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.tags.some(t => t.toLowerCase().includes(lower))
  )
})

function handleSearch() {
  if (keyword.value.trim()) {
    userStore.addSearchHistory(keyword.value.trim())
  }
}

function handleInput() {
  // 实时搜索
}

function clearKeyword() {
  keyword.value = ''
}

function searchKeyword(kw) {
  keyword.value = kw
  userStore.addSearchHistory(kw)
}

function clearHistory() {
  if (confirm('确定要清空搜索历史吗？')) {
    userStore.clearSearchHistory()
  }
}

function removeHistory(kw) {
  userStore.removeSearchHistory(kw)
}

onMounted(() => {
  const queryKeyword = route.query.keyword
  if (queryKeyword) {
    keyword.value = decodeURIComponent(queryKeyword)
    handleSearch()
  }
})
</script>

<style lang="less" scoped>
.search-page {
  padding: @spacing-xl 0;
}

.search-section {
  margin-bottom: @spacing-2xl;
}

.search-input-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;

  .search-icon {
    position: absolute;
    left: @spacing-md;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: @text-tertiary;
  }

  input {
    width: 100%;
    height: 52px;
    padding: 0 50px 0 48px;
    background: @bg-primary;
    border-radius: @radius-full;
    font-size: @font-size-base;
    box-shadow: @shadow-sm;
    transition: all @transition-fast;

    &:focus {
      box-shadow: 0 0 0 3px fade(@primary-color, 20%);
    }
  }

  .clear-btn {
    position: absolute;
    right: @spacing-md;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: @text-tertiary;
    background: @bg-tertiary;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: @text-secondary;
    }
  }
}

.search-default {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: @spacing-2xl;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: @spacing-md;

  .section-title {
    font-size: @font-size-xl;
    font-weight: 600;
  }

  .hot-badge {
    background: linear-gradient(135deg, #f43f5e, #f97316);
    color: white;
    padding: 2px @spacing-sm;
    border-radius: @radius-sm;
    font-size: @font-size-xs;
    font-weight: 600;
  }

  .clear-history {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: @font-size-sm;
    color: @text-tertiary;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: @accent-color;
    }
  }
}

.hot-search-section {
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-lg;
}

.hot-list {
  .hot-item {
    display: flex;
    align-items: center;
    gap: @spacing-md;
    padding: @spacing-sm 0;
    cursor: pointer;
    border-bottom: 1px solid @border-light;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      .hot-keyword {
        color: @primary-color;
      }
    }

    .hot-rank {
      width: 24px;
      font-size: @font-size-sm;
      font-weight: 600;
      color: @text-tertiary;
      text-align: center;

      &.top {
        color: #f97316;
      }
    }

    .hot-keyword {
      flex: 1;
      font-size: @font-size-sm;
      color: @text-primary;
      transition: color @transition-fast;
    }

    .hot-tags {
      display: flex;
      gap: 4px;

      .tag {
        padding: 2px 6px;
        border-radius: 2px;
        font-size: 10px;
        font-weight: 600;

        &.hot {
          background: #fee2e2;
          color: #dc2626;
        }

        &.new {
          background: #dcfce7;
          color: #16a34a;
        }
      }
    }

    .hot-count {
      font-size: @font-size-xs;
      color: @text-tertiary;
      min-width: 60px;
      text-align: right;
    }
  }
}

.history-section {
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-lg;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: @spacing-sm;
}

.history-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: @spacing-xs @spacing-md;
  background: @bg-tertiary;
  border-radius: @radius-full;
  font-size: @font-size-sm;
  color: @text-secondary;
  cursor: pointer;
  transition: all @transition-fast;

  &:hover {
    background: fade(@primary-color, 10%);
    color: @primary-color;
  }

  .remove-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    color: @text-tertiary;

    svg {
      width: 14px;
      height: 14px;
    }

    &:hover {
      color: @accent-color;
    }
  }
}

.search-results {
  .result-tabs {
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

  .singer-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: @spacing-lg;
  }

  .playlist-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: @spacing-lg;
  }
}

.empty-state {
  text-align: center;
  padding: @spacing-2xl;
  color: @text-tertiary;
}

// 响应式
@media (max-width: @breakpoint-lg) {
  .search-default {
    grid-template-columns: 1fr;
  }

  .search-results {
    .singer-grid {
      grid-template-columns: repeat(6, 1fr);
    }
    .playlist-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media (max-width: @breakpoint-md) {
  .search-results {
    .singer-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .playlist-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .search-page {
    padding: @spacing-lg 0;
  }
}

@media (max-width: @breakpoint-sm) {
  .search-results {
    .singer-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .playlist-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
