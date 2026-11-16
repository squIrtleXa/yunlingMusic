<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1 class="error-title">页面未找到</h1>
        <p class="error-desc">抱歉，您访问的页面不存在或已被移除。</p>
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            返回首页
          </router-link>
          <button class="btn btn-secondary" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            返回上一页
          </button>
        </div>
        <div class="music-decoration">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style lang="less" scoped>
.not-found {
  min-height: calc(100vh - @header-height - @playbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: @spacing-2xl 0;
}

.not-found-content {
  text-align: center;
  position: relative;

  .error-code {
    font-size: 120px;
    font-weight: 800;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: @spacing-lg;
    animation: bounce 2s ease-in-out infinite;
  }

  .error-title {
    font-size: @font-size-2xl;
    font-weight: 600;
    color: @text-primary;
    margin-bottom: @spacing-sm;
  }

  .error-desc {
    font-size: @font-size-base;
    color: @text-tertiary;
    margin-bottom: @spacing-2xl;
  }

  .error-actions {
    display: flex;
    gap: @spacing-md;
    justify-content: center;

    .btn {
      display: inline-flex;
      align-items: center;
      gap: @spacing-sm;
      padding: @spacing-sm @spacing-lg;
      border-radius: @radius-full;
      font-size: @font-size-sm;
      font-weight: 500;
      transition: all @transition-fast;

      svg {
        width: 18px;
        height: 18px;
      }

      &.btn-primary {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;

        &:hover {
          transform: translateY(-2px);
          box-shadow: @shadow-lg;
        }
      }

      &.btn-secondary {
        background: @bg-tertiary;
        color: @text-secondary;

        &:hover {
          background: fade(@primary-color, 10%);
          color: @primary-color;
        }
      }
    }
  }

  .music-decoration {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    opacity: 0.1;
    z-index: -1;

    svg {
      position: absolute;
      width: 80px;
      height: 80px;
      color: @primary-color;

      &:nth-child(1) {
        top: -60px;
        left: -120px;
        animation: float 3s ease-in-out infinite;
      }

      &:nth-child(2) {
        top: -80px;
        left: 0;
        animation: float 3s ease-in-out infinite 0.5s;
      }

      &:nth-child(3) {
        top: -60px;
        left: 120px;
        animation: float 3s ease-in-out infinite 1s;
      }
    }
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

@media (max-width: @breakpoint-md) {
  .not-found-content {
    .error-code {
      font-size: 80px;
    }

    .error-title {
      font-size: @font-size-xl;
    }

    .error-actions {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
