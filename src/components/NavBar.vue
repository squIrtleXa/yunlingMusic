<template>
  <header class="navbar">
    <div class="container nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <span class="logo-icon">♪</span>
        <span class="logo-text">云灵音乐</span>
      </router-link>

      <!-- 导航菜单 - PC端 -->
      <nav class="nav-menu">
        <router-link to="/" class="nav-item" exact-active-class="active">首页</router-link>
        <router-link to="/playlist" class="nav-item" active-class="active">歌单</router-link>
        <router-link to="/singers" class="nav-item" active-class="active">歌手</router-link>
        <router-link to="/user" class="nav-item" active-class="active">我的</router-link>
      </nav>

      <!-- 搜索框 -->
      <div class="search-box">
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="搜索音乐、歌手、歌单"
          @keyup.enter="handleSearch"
        />
        <span class="search-icon" @click="handleSearch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </span>
      </div>

      <!-- 用户头像 -->
      <router-link to="/user" class="user-avatar">
        <div class="avatar-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </router-link>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn" @click="showMobileMenu = !showMobileMenu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <transition name="slide-down">
      <div v-if="showMobileMenu" class="mobile-menu">
        <router-link to="/" class="mobile-nav-item" @click="showMobileMenu = false">首页</router-link>
        <router-link to="/playlist" class="mobile-nav-item" @click="showMobileMenu = false">歌单</router-link>
        <router-link to="/singers" class="mobile-nav-item" @click="showMobileMenu = false">歌手</router-link>
        <router-link to="/user" class="mobile-nav-item" @click="showMobileMenu = false">我的</router-link>
        <div class="mobile-search">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索音乐、歌手、歌单"
            @keyup.enter="handleMobileSearch"
          />
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const searchKeyword = ref('')
const showMobileMenu = ref(false)

function handleSearch() {
  if (searchKeyword.value.trim()) {
    userStore.addSearchHistory(searchKeyword.value.trim())
    router.push(`/search?keyword=${encodeURIComponent(searchKeyword.value.trim())}`)
  }
}

function handleMobileSearch() {
  handleSearch()
  showMobileMenu.value = false
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: @header-height;
  background: @bg-primary;
  box-shadow: @shadow-sm;
  z-index: 100;
}

.nav-container {
  height: 100%;
  display: flex;
  align-items: center;
  gap: @spacing-lg;
}

.logo {
  display: flex;
  align-items: center;
  gap: @spacing-sm;
  font-size: @font-size-xl;
  font-weight: 700;
  color: @primary-color;
  text-decoration: none;

  .logo-icon {
    font-size: 28px;
  }

  .logo-text {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.nav-menu {
  display: flex;
  gap: @spacing-lg;

  .nav-item {
    position: relative;
    color: @text-secondary;
    font-size: @font-size-base;
    padding: @spacing-sm 0;
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
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, @primary-color, @secondary-color);
        border-radius: 1px;
      }
    }
  }
}

.search-box {
  flex: 1;
  max-width: 400px;
  position: relative;
  margin-left: auto;

  input {
    width: 100%;
    height: 40px;
    padding: 0 40px 0 @spacing-md;
    background: @bg-tertiary;
    border-radius: @radius-full;
    font-size: @font-size-sm;
    transition: all @transition-fast;

    &:focus {
      background: @bg-primary;
      box-shadow: 0 0 0 2px @primary-light;
    }
  }

  .search-icon {
    position: absolute;
    right: @spacing-md;
    top: 50%;
    transform: translateY(-50%);
    color: @text-tertiary;
    cursor: pointer;
    transition: color @transition-fast;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: @primary-color;
    }
  }
}

.user-avatar {
  .avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: @radius-full;
    background: linear-gradient(135deg, @primary-light, @secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    svg {
      width: 22px;
      height: 22px;
    }
  }
}

.mobile-menu-btn {
  display: none;
  padding: @spacing-sm;
  color: @text-secondary;

  svg {
    width: 24px;
    height: 24px;
  }
}

.mobile-menu {
  display: none;
  background: @bg-primary;
  border-top: 1px solid @border-light;
  padding: @spacing-md;
}

.mobile-nav-item {
  display: block;
  padding: @spacing-md;
  color: @text-secondary;
  font-size: @font-size-base;
  border-radius: @radius-md;

  &:hover, &.router-link-active {
    background: @bg-tertiary;
    color: @primary-color;
  }
}

.mobile-search {
  margin-top: @spacing-md;

  input {
    width: 100%;
    height: 40px;
    padding: 0 @spacing-md;
    background: @bg-tertiary;
    border-radius: @radius-md;
    font-size: @font-size-sm;
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all @transition-normal;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 响应式
@media (max-width: @breakpoint-lg) {
  .nav-menu {
    display: none;
  }

  .search-box {
    max-width: 300px;
  }
}

@media (max-width: @breakpoint-md) {
  .search-box,
  .user-avatar {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
    margin-left: auto;
  }

  .mobile-menu {
    display: block;
  }

  .nav-container {
    gap: @spacing-sm;
  }
}
</style>
