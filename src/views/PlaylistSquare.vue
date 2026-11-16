<template>
  <div class="playlist-square">
    <div class="container">
      <h1 class="page-title">歌单广场</h1>

      <!-- 分类筛选 -->
      <div class="category-section">
        <div class="category-title">歌单分类</div>
        <div class="category-list">
          <span
            v-for="cat in categories"
            :key="cat.id"
            class="category-item"
            :class="{ active: activeCategory === cat.id }"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </span>
        </div>
      </div>

      <!-- 歌单列表 -->
      <div class="playlist-section">
        <div class="section-header">
          <span class="section-title-text">{{ currentCategoryName }}</span>
          <span class="playlist-count">共 {{ filteredPlaylists.length }} 个歌单</span>
        </div>
        <div class="playlist-grid">
          <PlaylistCard
            v-for="playlist in filteredPlaylists"
            :key="playlist.id"
            :playlist="playlist"
          />
        </div>

        <div v-if="filteredPlaylists.length === 0" class="empty-state">
          <p>该分类下暂无歌单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import { playlistCategories, mockPlaylists, getPlaylistsByCategory } from '@/mock/playlists'

const categories = ref(playlistCategories)
const activeCategory = ref('all')

const filteredPlaylists = computed(() => {
  return getPlaylistsByCategory(activeCategory.value, 20)
})

const currentCategoryName = computed(() => {
  const cat = categories.value.find(c => c.id === activeCategory.value)
  return cat ? cat.name : '全部'
})

function selectCategory(id) {
  activeCategory.value = id
}
</script>

<style lang="less" scoped>
.playlist-square {
  padding: @spacing-xl 0;
}

.category-section {
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-lg;
  margin-bottom: @spacing-xl;

  .category-title {
    font-size: @font-size-base;
    font-weight: 600;
    color: @text-primary;
    margin-bottom: @spacing-md;
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: @spacing-sm;
  }

  .category-item {
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

    &.active {
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
    }
  }
}

.playlist-section {
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: @spacing-lg;

    .section-title-text {
      font-size: @font-size-xl;
      font-weight: 600;
    }

    .playlist-count {
      font-size: @font-size-sm;
      color: @text-tertiary;
    }
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
@media (max-width: @breakpoint-xl) {
  .playlist-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

@media (max-width: @breakpoint-lg) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: @breakpoint-md) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: @spacing-md;
  }
  .playlist-square {
    padding: @spacing-lg 0;
  }
}

@media (max-width: @breakpoint-sm) {
  .playlist-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
