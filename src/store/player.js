import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { mockSongs } from '@/mock/songs'
import { debounce } from '@/utils/format'

export const usePlayerStore = defineStore('player', () => {
  // 状态
  const playlist = ref([]) // 播放列表
  const currentIndex = ref(-1) // 当前播放索引
  const isPlaying = ref(false) // 是否正在播放
  const currentTime = ref(0) // 当前播放时间（秒）
  const duration = ref(0) // 歌曲总时长（秒）
  const playMode = ref('sequence') // 播放模式：sequence顺序, loop单曲循环, random随机
  const volume = ref(0.7) // 音量 0-1
  const isMuted = ref(false) // 是否静音
  const showFullPlayer = ref(false) // 是否显示全屏播放器
  const showPlaylistPanel = ref(false) // 是否显示播放列表面板
  const isBuffering = ref(false) // 是否缓冲中
  const playError = ref(null) // 播放错误信息

  // 计算属性
  const currentSong = computed(() => {
    if (currentIndex.value >= 0 && currentIndex.value < playlist.value.length) {
      return playlist.value[currentIndex.value]
    }
    return null
  })

  const progress = computed(() => {
    if (duration.value > 0) {
      return (currentTime.value / duration.value) * 100
    }
    return 0
  })

  const hasPrevious = computed(() => {
    return playlist.value.length > 0
  })

  const hasNext = computed(() => {
    return playlist.value.length > 0
  })

  // 方法
  // 设置播放列表并播放指定歌曲
  function setPlaylist(songs, index = 0) {
    if (!Array.isArray(songs) || songs.length === 0) return
    playlist.value = [...songs]
    const safeIndex = Math.max(0, Math.min(index, songs.length - 1))
    currentIndex.value = safeIndex
    duration.value = songs[safeIndex].duration || 0
    isPlaying.value = true
    currentTime.value = 0
    playError.value = null
    isBuffering.value = false
  }

  // 添加歌曲到播放列表
  function addToPlaylist(song) {
    if (!song || !song.id) return
    const exists = playlist.value.find(s => s.id === song.id)
    if (!exists) {
      playlist.value.push(song)
    }
  }

  // 移除歌曲
  function removeFromPlaylist(index) {
    if (index < 0 || index >= playlist.value.length) return
    playlist.value.splice(index, 1)
    if (index < currentIndex.value) {
      currentIndex.value--
    } else if (index === currentIndex.value) {
      if (playlist.value.length === 0) {
        currentIndex.value = -1
        isPlaying.value = false
        currentTime.value = 0
        duration.value = 0
      } else {
        currentIndex.value = index >= playlist.value.length ? 0 : index
        duration.value = playlist.value[currentIndex.value]?.duration || 0
        currentTime.value = 0
      }
    }
  }

  // 清空播放列表
  function clearPlaylist() {
    playlist.value = []
    currentIndex.value = -1
    isPlaying.value = false
    currentTime.value = 0
    duration.value = 0
    playError.value = null
  }

  // 播放/暂停
  function togglePlay() {
    if (!currentSong.value) return
    isPlaying.value = !isPlaying.value
    if (isPlaying.value) {
      playError.value = null
    }
  }

  function play() {
    if (currentSong.value) {
      isPlaying.value = true
      playError.value = null
    }
  }

  function pause() {
    isPlaying.value = false
  }

  // 上一首
  function playPrev() {
    if (playlist.value.length === 0) return
    if (playMode.value === 'random') {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * playlist.value.length)
      } while (newIndex === currentIndex.value && playlist.value.length > 1)
      currentIndex.value = newIndex
    } else {
      currentIndex.value = currentIndex.value <= 0 ? playlist.value.length - 1 : currentIndex.value - 1
    }
    currentTime.value = 0
    duration.value = playlist.value[currentIndex.value]?.duration || 0
    isPlaying.value = true
    playError.value = null
    isBuffering.value = true
    // 模拟缓冲结束
    setTimeout(() => {
      isBuffering.value = false
    }, 300)
  }

  // 下一首
  function playNext() {
    if (playlist.value.length === 0) return
    if (playMode.value === 'random') {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * playlist.value.length)
      } while (newIndex === currentIndex.value && playlist.value.length > 1)
      currentIndex.value = newIndex
    } else if (playMode.value === 'loop') {
      currentTime.value = 0
      isPlaying.value = true
      return
    } else {
      currentIndex.value = currentIndex.value >= playlist.value.length - 1 ? 0 : currentIndex.value + 1
    }
    currentTime.value = 0
    duration.value = playlist.value[currentIndex.value]?.duration || 0
    isPlaying.value = true
    playError.value = null
    isBuffering.value = true
    // 模拟缓冲结束
    setTimeout(() => {
      isBuffering.value = false
    }, 300)
  }

  // 设置当前时间
  function setCurrentTime(time) {
    currentTime.value = Math.max(0, Math.min(time, duration.value))
  }

  // 设置进度（百分比）
  function setProgress(percent) {
    if (duration.value > 0) {
      currentTime.value = (percent / 100) * duration.value
    }
  }

  // 切换播放模式
  function togglePlayMode() {
    const modes = ['sequence', 'loop', 'random']
    const currentIdx = modes.indexOf(playMode.value)
    playMode.value = modes[(currentIdx + 1) % modes.length]
  }

  // 设置音量
  function setVolume(vol) {
    volume.value = Math.max(0, Math.min(1, vol))
    if (volume.value > 0) {
      isMuted.value = false
    }
  }

  // 切换静音
  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  // 播放指定索引的歌曲
  function playSong(index) {
    if (index < 0 || index >= playlist.value.length) return
    currentIndex.value = index
    currentTime.value = 0
    duration.value = playlist.value[index]?.duration || 0
    isPlaying.value = true
    playError.value = null
    isBuffering.value = true
    setTimeout(() => {
      isBuffering.value = false
    }, 300)
  }

  // 播放单首歌曲（替换当前播放）
  function playSingleSong(song) {
    if (!song || !song.id) return
    const existsIndex = playlist.value.findIndex(s => s.id === song.id)
    if (existsIndex !== -1) {
      playSong(existsIndex)
    } else {
      playlist.value.push(song)
      currentIndex.value = playlist.value.length - 1
      currentTime.value = 0
      duration.value = song.duration || 0
      isPlaying.value = true
      playError.value = null
    }
  }

  // 切换全屏播放器
  function toggleFullPlayer() {
    showFullPlayer.value = !showFullPlayer.value
  }

  // 切换播放列表面板
  function togglePlaylistPanel() {
    showPlaylistPanel.value = !showPlaylistPanel.value
  }

  // 设置播放错误
  function setPlayError(error) {
    playError.value = error
    isPlaying.value = false
  }

  // 初始化一些歌曲到播放列表（演示用）
  function initDemoPlaylist() {
    if (playlist.value.length === 0) {
      const demoSongs = mockSongs.slice(0, 10)
      playlist.value = demoSongs
      currentIndex.value = 0
      duration.value = demoSongs[0].duration
    }
  }

  return {
    // 状态
    playlist,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    playMode,
    volume,
    isMuted,
    showFullPlayer,
    showPlaylistPanel,
    isBuffering,
    playError,
    // 计算属性
    currentSong,
    progress,
    hasPrevious,
    hasNext,
    // 方法
    setPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    togglePlay,
    play,
    pause,
    playPrev,
    playNext,
    setCurrentTime,
    setProgress,
    togglePlayMode,
    setVolume,
    toggleMute,
    playSong,
    playSingleSong,
    toggleFullPlayer,
    togglePlaylistPanel,
    setPlayError,
    initDemoPlaylist
  }
}, {
  persist: {
    key: 'yunling-music-player',
    paths: ['playlist', 'currentIndex', 'playMode', 'volume', 'isMuted']
  }
})
