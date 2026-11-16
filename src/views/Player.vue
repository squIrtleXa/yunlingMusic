<template>
  <div class="player-page">
    <FullPlayer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import FullPlayer from '@/components/FullPlayer.vue'
import { usePlayerStore } from '@/store/player'

const playerStore = usePlayerStore()

onMounted(() => {
  // 确保全屏播放器显示
  if (!playerStore.showFullPlayer) {
    playerStore.toggleFullPlayer()
  }
})
</script>

<style lang="less" scoped>
.player-page {
  position: fixed;
  inset: 0;
  background: #000;
}
</style>
