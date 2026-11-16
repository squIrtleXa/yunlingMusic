<template>
  <div class="skeleton" :class="{ 'skeleton-text': type === 'text', 'skeleton-circle': type === 'circle' }" :style="styleObj">
    <div class="skeleton-inner"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 类型：rect 矩形, circle 圆形, text 文本
  type: {
    type: String,
    default: 'rect'
  },
  // 宽度
  width: {
    type: [String, Number],
    default: '100%'
  },
  // 高度
  height: {
    type: [String, Number],
    default: '20px'
  },
  // 圆角
  radius: {
    type: [String, Number],
    default: '4px'
  },
  // 动画
  animated: {
    type: Boolean,
    default: true
  },
  // 行数（文本类型时使用）
  rows: {
    type: Number,
    default: 1
  }
})

const styleObj = computed(() => {
  const style = {}
  if (props.type !== 'text') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    style.borderRadius = props.type === 'circle' ? '50%' : (typeof props.radius === 'number' ? `${props.radius}px` : props.radius)
  }
  return style
})
</script>

<style lang="less" scoped>
.skeleton {
  display: block;
  background: @bg-tertiary;
  position: relative;
  overflow: hidden;

  .skeleton-inner {
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  &.skeleton-text {
    height: 1em;
    border-radius: 4px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
      width: 60%;
    }
  }

  &.skeleton-circle {
    border-radius: 50%;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
