<template>
  <article class="playlist-card card" @click="goToDetail" role="link" tabindex="0" @keydown.enter="goToDetail" :aria-label="'歌单 ' + playlist.name">
    <div class="card-cover">
      <img v-lazy="playlist.cover" :alt="playlist.name + ' 封面'" />
      <div class="cover-mask">
        <div class="play-count" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>{{ formatCount(playlist.playCount) }}</span>
        </div>
        <button class="play-btn" @click.stop="handlePlay" :aria-label="'播放歌单 ' + playlist.name" title="播放全部">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="card-info">
      <h3 class="card-title text-ellipsis-2">{{ playlist.name }}</h3>
      <div class="card-creator" v-if="showCreator">
        <span class="creator-name text-ellipsis">{{ playlist.creator }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/store/player'
import { formatCount } from '@/utils/format'

const props = defineProps({
  playlist: {
    type: Object,
    required: true
  },
  showCreator: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
const playerStore = usePlayerStore()

function goToDetail() {
  router.push(`/playlist/${props.playlist.id}`)
}

function handlePlay() {
  if (props.playlist.songs && props.playlist.songs.length > 0) {
    playerStore.setPlaylist(props.playlist.songs, 0)
  }
}
</script>

<style lang="less" scoped>
.playlist-card {
  cursor: pointer;
  overflow: hidden;
  transition: all @transition-normal;

  &:hover {
    .card-cover .cover-mask {
      opacity: 1;
    }

    .card-title {
      color: @primary-color;
    }
  }

  .card-cover {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform @transition-slow;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .cover-mask {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 50%);
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: @spacing-md;
      opacity: 0;
      transition: opacity @transition-normal;

      .play-count {
        display: flex;
        align-items: center;
        gap: 4px;
        color: white;
        font-size: @font-size-sm;

        svg {
          width: 16px;
          height: 16px;
        }
      }

      .play-btn {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: @shadow-lg;

        svg {
          width: 18px;
          height: 18px;
          margin-left: 2px;
        }

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .card-info {
    padding: @spacing-md;

    .card-title {
      font-size: @font-size-sm;
      font-weight: 500;
      color: @text-primary;
      line-height: 1.4;
      margin-bottom: @spacing-xs;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-creator {
      .creator-name {
        font-size: @font-size-xs;
        color: @text-tertiary;
      }
    }
  }
}
</style>
