<template>
  <img
    ref="imgRef"
    :src="imgSrc"
    :alt="alt"
    :class="['lazy-image', { 'lazy-loaded': loaded, 'lazy-error': hasError }]"
    @error="handleError"
    @load="handleLoad"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  // 占位图
  placeholder: {
    type: String,
    default: ''
  },
  // 加载失败图
  errorImg: {
    type: String,
    default: ''
  },
  // 懒加载阈值（提前多少像素加载）
  threshold: {
    type: Number,
    default: 50
  }
})

const emit = defineEmits(['load', 'error'])

const imgRef = ref(null)
const loaded = ref(false)
const hasError = ref(false)
const imgSrc = ref('')

// 默认占位图
const defaultPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f1f5f9" width="200" height="200"/%3E%3C/svg%3E'

// 默认错误图
const defaultErrorImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f1f5f9" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14" font-family="sans-serif"%3E加载失败%3C/text%3E%3C/svg%3E'

let observer = null

function loadImage() {
  if (loaded.value || hasError.value) return

  const tempImg = new Image()

  tempImg.onload = () => {
    imgSrc.value = props.src
    loaded.value = true
    emit('load', tempImg)
  }

  tempImg.onerror = () => {
    imgSrc.value = props.errorImg || defaultErrorImg
    hasError.value = true
    emit('error', new Error(`图片加载失败: ${props.src}`))
  }

  tempImg.src = props.src
}

function setupObserver() {
  if (!('IntersectionObserver' in window)) {
    // 不支持则直接加载
    loadImage()
    return
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage()
        observer.disconnect()
      }
    })
  }, {
    rootMargin: `${props.threshold}px 0px`,
    threshold: 0.01
  })

  if (imgRef.value) {
    observer.observe(imgRef.value)
  }
}

function handleLoad() {
  loaded.value = true
}

function handleError() {
  if (imgSrc.value !== props.errorImg && imgSrc.value !== defaultErrorImg) {
    imgSrc.value = props.errorImg || defaultErrorImg
    hasError.value = true
    emit('error', new Error(`图片加载失败: ${props.src}`))
  }
}

watch(() => props.src, () => {
  loaded.value = false
  hasError.value = false
  imgSrc.value = props.placeholder || defaultPlaceholder

  if (observer) {
    observer.disconnect()
  }

  if (imgRef.value) {
    setupObserver()
  }
})

onMounted(() => {
  imgSrc.value = props.placeholder || defaultPlaceholder
  setupObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style lang="less" scoped>
.lazy-image {
  transition: opacity 0.3s ease, filter 0.3s ease;
  opacity: 0.6;
  filter: blur(2px);

  &.lazy-loaded {
    opacity: 1;
    filter: blur(0);
  }

  &.lazy-error {
    opacity: 0.8;
    filter: blur(0);
  }
}
</style>
