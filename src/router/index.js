import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', keepAlive: true }
  },
  {
    path: '/playlist',
    name: 'PlaylistSquare',
    component: () => import('@/views/PlaylistSquare.vue'),
    meta: { title: '歌单广场', keepAlive: true }
  },
  {
    path: '/playlist/:id',
    name: 'PlaylistDetail',
    component: () => import('@/views/PlaylistDetail.vue'),
    meta: { title: '歌单详情' }
  },
  {
    path: '/singers',
    name: 'SingerList',
    component: () => import('@/views/SingerList.vue'),
    meta: { title: '歌手', keepAlive: true }
  },
  {
    path: '/singer/:id',
    name: 'SingerDetail',
    component: () => import('@/views/SingerDetail.vue'),
    meta: { title: '歌手详情' }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue'),
    meta: { title: '我的' }
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('@/views/Player.vue'),
    meta: { title: '播放器' }
  },
  // 404 页面 - 必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 滚动行为优化
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的滚动位置（浏览器前进/后退），恢复位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果目标路由有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // 考虑固定头部高度
      }
    }
    // 否则滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 路由加载状态
let isLoading = false

router.beforeEach((to, from, next) => {
  isLoading = true
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 云灵音乐` : '云灵音乐'
  next()
})

router.afterEach(() => {
  isLoading = false
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
  // 路由加载失败时刷新页面
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    window.location.reload()
  }
})

export default router
