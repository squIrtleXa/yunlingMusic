<template>
  <div class="singer-list">
    <div class="container">
      <h1 class="page-title">歌手</h1>

      <!-- 筛选区 -->
      <div class="filter-section">
        <!-- 地区 -->
        <div class="filter-row">
          <span class="filter-label">地区:</span>
          <div class="filter-options">
            <span
              v-for="item in singerCategories.area"
              :key="item.id"
              class="filter-item"
              :class="{ active: activeArea === item.id }"
              @click="activeArea = item.id"
            >
              {{ item.name }}
            </span>
          </div>
        </div>

        <!-- 性别/类型 -->
        <div class="filter-row">
          <span class="filter-label">类型:</span>
          <div class="filter-options">
            <span
              v-for="item in singerCategories.gender"
              :key="item.id"
              class="filter-item"
              :class="{ active: activeGender === item.id }"
              @click="activeGender = item.id"
            >
              {{ item.name }}
            </span>
          </div>
        </div>

        <!-- 首字母 -->
        <div class="filter-row">
          <span class="filter-label">首字母:</span>
          <div class="filter-options initial-options">
            <span
              v-for="item in singerCategories.initial"
              :key="item.id"
              class="filter-item initial-item"
              :class="{ active: activeInitial === item.id }"
              @click="activeInitial = item.id"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- 歌手列表 -->
      <div class="singer-section">
        <div class="section-header">
          <span class="section-title-text">{{ sectionTitle }}</span>
          <span class="singer-count">共 {{ filteredSingers.length }} 位歌手</span>
        </div>

        <div class="singer-grid">
          <SingerCard
            v-for="singer in filteredSingers"
            :key="singer.id"
            :singer="singer"
          />
        </div>

        <div v-if="filteredSingers.length === 0" class="empty-state">
          <p>暂无符合条件的歌手</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SingerCard from '@/components/SingerCard.vue'
import { singerCategories, filterSingers } from '@/mock/singers'

const activeArea = ref('all')
const activeGender = ref('all')
const activeInitial = ref('hot')

const filteredSingers = computed(() => {
  return filterSingers(activeArea.value, activeGender.value, activeInitial.value)
})

const sectionTitle = computed(() => {
  const area = singerCategories.area.find(a => a.id === activeArea.value)?.name || ''
  const gender = singerCategories.gender.find(g => g.id === activeGender.value)?.name || ''
  const initial = singerCategories.initial.find(i => i.id === activeInitial.value)?.name || ''

  if (activeInitial.value === 'hot') {
    return '热门歌手'
  }
  return `${area}${gender}${initial !== '热门' ? ' - ' + initial : ''}`
})
</script>

<style lang="less" scoped>
.singer-list {
  padding: @spacing-xl 0;
}

.filter-section {
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-lg;
  margin-bottom: @spacing-xl;
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: @spacing-md;
  margin-bottom: @spacing-md;

  &:last-child {
    margin-bottom: 0;
  }

  .filter-label {
    font-size: @font-size-sm;
    color: @text-tertiary;
    flex-shrink: 0;
    width: 50px;
    padding-top: 6px;
  }

  .filter-options {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: @spacing-sm;

    &.initial-options {
      gap: 6px;
    }
  }

  .filter-item {
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

    &.initial-item {
      width: 32px;
      height: 32px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @font-size-xs;
    }
  }
}

.singer-section {
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: @spacing-lg;

    .section-title-text {
      font-size: @font-size-xl;
      font-weight: 600;
    }

    .singer-count {
      font-size: @font-size-sm;
      color: @text-tertiary;
    }
  }

  .singer-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
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
  .singer-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: @breakpoint-lg) {
  .singer-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: @breakpoint-md) {
  .singer-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: @spacing-md;
  }
  .singer-list {
    padding: @spacing-lg 0;
  }
}

@media (max-width: @breakpoint-sm) {
  .singer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .filter-row {
    flex-direction: column;
    gap: @spacing-sm;

    .filter-label {
      width: auto;
      padding-top: 0;
    }
  }
}
</style>
