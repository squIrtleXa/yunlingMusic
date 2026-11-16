<template>
  <div class="home-page">
    <div class="container">
      <!-- Banner 轮播 -->
      <Banner :banners="banners" />

      <!-- 推荐歌单 -->
      <section class="section">
        <div class="section-title">
          <span>推荐歌单</span>
          <router-link to="/playlist" class="more">更多 ></router-link>
        </div>
        <div class="playlist-grid">
          <PlaylistCard
            v-for="playlist in recommendPlaylists"
            :key="playlist.id"
            :playlist="playlist"
          />
        </div>
      </section>

      <!-- 热门歌手 -->
      <section class="section">
        <div class="section-title">
          <span>热门歌手</span>
          <router-link to="/singers" class="more">更多 ></router-link>
        </div>
        <div class="singer-grid">
          <SingerCard
            v-for="singer in hotSingers"
            :key="singer.id"
            :singer="singer"
          />
        </div>
      </section>

      <!-- 最新歌曲 -->
      <section class="section">
        <div class="section-title">
          <span>最新歌曲</span>
          <button class="more play-all" @click="playAll">
            播放全部
          </button>
        </div>
        <div class="songs-section">
          <div class="songs-grid">
            <div v-for="(song, index) in newSongs" :key="song.id" class="song-item">
              <SongItem
                :song="song"
                :index="index + 1"
                :show-cover="true"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Banner from '@/components/Banner.vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import SingerCard from '@/components/SingerCard.vue'
import SongItem from '@/components/SongItem.vue'
import { mockBanners, getRecommendPlaylists } from '@/mock/playlists'
import { getHotSingers } from '@/mock/singers'
import { mockSongs } from '@/mock/songs'
import { usePlayerStore } from '@/store/player'

const playerStore = usePlayerStore()

const banners = ref(mockBanners)
const recommendPlaylists = ref(getRecommendPlaylists(6))
const hotSingers = ref(getHotSingers(8))
const newSongs = ref(mockSongs.slice(0, 10))

function playAll() {
  playerStore.setPlaylist(newSongs.value, 0)
}
</script>

<style lang="less" scoped>
.home-page {
  padding: @spacing-xl 0;
}

.section {
  margin-bottom: @spacing-2xl;
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: @spacing-lg;
}

.singer-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: @spacing-lg;
}

.songs-section {
  background: @bg-primary;
  border-radius: @radius-lg;
  padding: @spacing-md;
}

.songs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: @spacing-xs;
}

.song-item {
  border-radius: @radius-md;

  &:hover {
    background: @bg-tertiary;
  }
}

.play-all {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: @font-size-sm;
  color: @primary-color;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
}

// 响应式
@media (max-width: @breakpoint-xl) {
  .playlist-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .singer-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: @breakpoint-lg) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .singer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: @breakpoint-md) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: @spacing-md;
  }
  .singer-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: @spacing-md;
  }
  .songs-grid {
    grid-template-columns: 1fr;
  }
  .home-page {
    padding: @spacing-lg 0;
  }
}

@media (max-width: @breakpoint-sm) {
  .playlist-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .singer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
