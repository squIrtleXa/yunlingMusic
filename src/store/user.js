import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockPlaylists } from '@/mock/playlists'
import { mockSongs } from '@/mock/songs'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref({
    id: 1,
    nickname: '音乐爱好者',
    avatar: '',
    level: 8,
    signature: '音乐是灵魂的语言'
  })

  const favoriteSongs = ref([]) // 收藏的歌曲
  const favoritePlaylists = ref([]) // 收藏的歌单
  const recentPlayed = ref([]) // 最近播放
  const searchHistory = ref([]) // 搜索历史

  // 计算属性
  const isLoggedIn = computed(() => !!userInfo.value.id)

  // 方法
  // 添加收藏歌曲
  function toggleFavoriteSong(song) {
    const index = favoriteSongs.value.findIndex(s => s.id === song.id)
    if (index === -1) {
      favoriteSongs.value.unshift(song)
    } else {
      favoriteSongs.value.splice(index, 1)
    }
  }

  // 检查是否已收藏歌曲
  function isFavoriteSong(songId) {
    return favoriteSongs.value.some(s => s.id === songId)
  }

  // 添加收藏歌单
  function toggleFavoritePlaylist(playlist) {
    const index = favoritePlaylists.value.findIndex(p => p.id === playlist.id)
    if (index === -1) {
      favoritePlaylists.value.unshift(playlist)
    } else {
      favoritePlaylists.value.splice(index, 1)
    }
  }

  // 检查是否已收藏歌单
  function isFavoritePlaylist(playlistId) {
    return favoritePlaylists.value.some(p => p.id === playlistId)
  }

  // 添加到最近播放
  function addToRecentPlayed(song) {
    const index = recentPlayed.value.findIndex(s => s.id === song.id)
    if (index !== -1) {
      recentPlayed.value.splice(index, 1)
    }
    recentPlayed.value.unshift(song)
    // 最多保留100首
    if (recentPlayed.value.length > 100) {
      recentPlayed.value = recentPlayed.value.slice(0, 100)
    }
  }

  // 添加搜索历史
  function addSearchHistory(keyword) {
    if (!keyword.trim()) return
    const index = searchHistory.value.findIndex(k => k === keyword.trim())
    if (index !== -1) {
      searchHistory.value.splice(index, 1)
    }
    searchHistory.value.unshift(keyword.trim())
    // 最多保留20条
    if (searchHistory.value.length > 20) {
      searchHistory.value = searchHistory.value.slice(0, 20)
    }
  }

  // 清空搜索历史
  function clearSearchHistory() {
    searchHistory.value = []
  }

  // 删除单个搜索历史
  function removeSearchHistory(keyword) {
    const index = searchHistory.value.indexOf(keyword)
    if (index !== -1) {
      searchHistory.value.splice(index, 1)
    }
  }

  // 初始化演示数据
  function initDemoData() {
    if (favoriteSongs.value.length === 0) {
      favoriteSongs.value = mockSongs.slice(0, 5)
    }
    if (favoritePlaylists.value.length === 0) {
      favoritePlaylists.value = mockPlaylists.slice(0, 3)
    }
    if (recentPlayed.value.length === 0) {
      recentPlayed.value = mockSongs.slice(2, 8)
    }
  }

  return {
    // 状态
    userInfo,
    favoriteSongs,
    favoritePlaylists,
    recentPlayed,
    searchHistory,
    // 计算属性
    isLoggedIn,
    // 方法
    toggleFavoriteSong,
    isFavoriteSong,
    toggleFavoritePlaylist,
    isFavoritePlaylist,
    addToRecentPlayed,
    addSearchHistory,
    clearSearchHistory,
    removeSearchHistory,
    initDemoData
  }
}, {
  persist: {
    key: 'yunling-music-user',
    paths: ['userInfo', 'favoriteSongs', 'favoritePlaylists', 'recentPlayed', 'searchHistory']
  }
})
