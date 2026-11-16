<template>
  <article class="singer-card" @click="goToDetail" role="link" tabindex="0" @keydown.enter="goToDetail" :aria-label="'歌手 ' + singer.name">
    <div class="singer-avatar">
      <img v-lazy="singer.avatar" :alt="singer.name + ' 头像'" />
    </div>
    <div class="singer-info">
      <h3 class="singer-name text-ellipsis">{{ singer.name }}</h3>
      <p class="singer-fans" v-if="showFans">
        {{ formatCount(singer.fansCount) }} 粉丝
      </p>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatCount } from '@/utils/format'

const props = defineProps({
  singer: {
    type: Object,
    required: true
  },
  showFans: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()

function goToDetail() {
  router.push(`/singer/${props.singer.id}`)
}
</script>

<style lang="less" scoped>
.singer-card {
  text-align: center;
  cursor: pointer;
  transition: transform @transition-fast;

  &:hover {
    transform: translateY(-4px);

    .singer-avatar img {
      box-shadow: @shadow-lg;
    }

    .singer-name {
      color: @primary-color;
    }
  }

  .singer-avatar {
    width: 100%;
    padding-top: 100%;
    position: relative;
    margin-bottom: @spacing-md;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: all @transition-normal;
      box-shadow: @shadow-sm;
    }
  }

  .singer-info {
    .singer-name {
      font-size: @font-size-sm;
      font-weight: 500;
      color: @text-primary;
      margin-bottom: 4px;
      transition: color @transition-fast;
    }

    .singer-fans {
      font-size: @font-size-xs;
      color: @text-tertiary;
    }
  }
}
</style>
