<template>
  <div class="banner">
    <div class="banner-container">
      <transition-group name="slide" tag="div" class="banner-slides">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="banner-slide"
          :class="{ active: currentIndex === index }"
          v-show="currentIndex === index"
          @click="goTo(banner.target)"
        >
          <div class="banner-bg" :style="{ background: banner.gradient }"></div>
          <div class="banner-content">
            <h2 class="banner-title">{{ banner.title }}</h2>
            <p class="banner-subtitle">{{ banner.subtitle }}</p>
            <button class="banner-btn">立即收听</button>
          </div>
        </div>
      </transition-group>

      <!-- 左右箭头 -->
      <button class="banner-arrow prev" @click="prev" v-if="banners.length > 1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="banner-arrow next" @click="next" v-if="banners.length > 1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      <!-- 指示器 -->
      <div class="banner-dots" v-if="banners.length > 1">
        <span
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 4000
  }
})

const router = useRouter()
const currentIndex = ref(0)
let timer = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.banners.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.banners.length) % props.banners.length
}

function goToSlide(index) {
  currentIndex.value = index
}

function goTo(target) {
  if (target) {
    router.push(target)
  }
}

function startAutoPlay() {
  if (!props.autoplay || props.banners.length <= 1) return
  stopAutoPlay()
  timer = setInterval(next, props.interval)
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style lang="less" scoped>
.banner {
  margin-bottom: @spacing-xl;
}

.banner-container {
  position: relative;
  border-radius: @radius-xl;
  overflow: hidden;
  height: 320px;
}

.banner-slides {
  width: 100%;
  height: 100%;
}

.banner-slide {
  position: absolute;
  inset: 0;
  cursor: pointer;

  .banner-bg {
    position: absolute;
    inset: 0;
  }

  .banner-content {
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    z-index: 2;
    max-width: 400px;

    .banner-title {
      font-size: @font-size-4xl;
      font-weight: 700;
      margin-bottom: @spacing-sm;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .banner-subtitle {
      font-size: @font-size-lg;
      margin-bottom: @spacing-lg;
      opacity: 0.9;
    }

    .banner-btn {
      padding: @spacing-sm @spacing-lg;
      background: white;
      color: @primary-color;
      border-radius: @radius-full;
      font-weight: 600;
      font-size: @font-size-sm;
      box-shadow: @shadow-md;
      transition: all @transition-fast;

      &:hover {
        transform: translateY(-2px);
        box-shadow: @shadow-lg;
      }
    }
  }
}

.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 3;
  transition: all @transition-fast;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.prev {
    left: @spacing-lg;
  }

  &.next {
    right: @spacing-lg;
  }
}

.banner-dots {
  position: absolute;
  bottom: @spacing-lg;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: @spacing-sm;
  z-index: 3;

  .dot {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: all @transition-fast;

    &.active {
      width: 24px;
      border-radius: 4px;
      background: white;
    }

    &:hover {
      background: white;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// 响应式
@media (max-width: @breakpoint-md) {
  .banner-container {
    height: 200px;
    border-radius: @radius-lg;
  }

  .banner-slide {
    .banner-content {
      left: @spacing-lg;
      right: @spacing-lg;
      max-width: none;

      .banner-title {
        font-size: @font-size-2xl;
      }

      .banner-subtitle {
        font-size: @font-size-sm;
        margin-bottom: @spacing-md;
      }

      .banner-btn {
        padding: @spacing-xs @spacing-md;
        font-size: @font-size-xs;
      }
    }
  }

  .banner-arrow {
    width: 36px;
    height: 36px;

    svg {
      width: 20px;
      height: 20px;
    }

    &.prev {
      left: @spacing-sm;
    }

    &.next {
      right: @spacing-sm;
    }
  }
}

@media (max-width: @breakpoint-sm) {
  .banner-container {
    height: 160px;
  }

  .banner-slide .banner-content {
    .banner-title {
      font-size: @font-size-xl;
    }
    .banner-subtitle {
      display: none;
    }
  }
}
</style>
