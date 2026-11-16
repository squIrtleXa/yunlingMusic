<template>
  <div class="song-list">
    <!-- 列表头部 -->
    <div v-if="showHeader" class="list-header">
      <div class="header-index">#</div>
      <div class="header-title">标题</div>
      <div class="header-duration" v-if="showDuration">时长</div>
      <div class="header-actions">操作</div>
    </div>

    <!-- 歌曲列表 -->
    <div class="list-body">
      <SongItem
        v-for="(song, index) in songs"
        :key="song.id"
        :song="song"
        :index="startIndex + index"
        :show-cover="showCover"
        :show-duration="showDuration"
      />
    </div>

    <!-- 空状态 -->
    <div v-if="songs.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
      <p>暂无歌曲</p>
    </div>
  </div>
</template>

<script setup>
import SongItem from './SongItem.vue'

defineProps({
  songs: {
    type: Array,
    default: () => []
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showCover: {
    type: Boolean,
    default: false
  },
  showDuration: {
    type: Boolean,
    default: true
  },
  startIndex: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="less" scoped>
.song-list {
  background: @bg-primary;
  border-radius: @radius-lg;
  overflow: hidden;
}

.list-header {
  display: flex;
  align-items: center;
  padding: @spacing-sm @spacing-md;
  background: @bg-tertiary;
  font-size: @font-size-xs;
  color: @text-tertiary;
  font-weight: 500;

  .header-index {
    width: 32px;
    text-align: center;
    flex-shrink: 0;
  }

  .header-title {
    flex: 1;
    padding-left: @spacing-md;
  }

  .header-duration {
    min-width: 45px;
    text-align: right;
    flex-shrink: 0;
  }

  .header-actions {
    width: 80px;
    text-align: center;
    flex-shrink: 0;
  }
}

.list-body {
  padding: @spacing-xs 0;
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
  }
}
</style>
