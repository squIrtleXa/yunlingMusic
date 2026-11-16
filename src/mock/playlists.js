import { mockSongs } from './songs'

// 歌单分类
export const playlistCategories = [
  { id: 'all', name: '全部' },
  { id: 'hot', name: '热门' },
  { id: 'chinese', name: '华语' },
  { id: 'classical', name: '经典' },
  { id: 'healing', name: '治愈' },
  { id: 'workout', name: '运动' },
  { id: 'folk', name: '民谣' },
  { id: 'love', name: '情歌' },
  { id: 'light', name: '轻音乐' },
  { id: 'ancient', name: '古风' },
  { id: 'new', name: '新歌' },
  { id: 'study', name: '学习' },
  { id: 'sleep', name: '睡眠' },
  { id: 'retro', name: '怀旧' }
]

// 根据ID列表获取歌曲
function getSongsByIds(ids) {
  return ids.map(id => mockSongs.find(s => s.id === id)).filter(Boolean)
}

// 歌单 Mock 数据
export const mockPlaylists = [
  {
    id: 1,
    name: '华语经典老歌 | 一代人的青春回忆',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=800&fit=crop',
    creator: '音乐怀旧馆',
    creatorId: 101,
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    playCount: 12560000,
    favoriteCount: 892000,
    description: '那些年我们一起追过的华语经典，每一首歌都是一段青春回忆。周杰伦、林俊杰、陈奕迅...陪你走过青春岁月的好声音。',
    tags: ['华语', '经典', '怀旧', '青春'],
    songCount: 50,
    createTime: '2023-01-15',
    updateTime: '2024-03-20',
    songs: getSongsByIds([1, 3, 7, 13, 10, 4, 5])
  },
  {
    id: 2,
    name: '深夜治愈系 | 陪你度过漫长夜晚',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=800&fit=crop',
    creator: '深夜电台',
    creatorId: 102,
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    playCount: 8930000,
    favoriteCount: 654000,
    description: '夜深人静的时候，让这些温柔的歌声陪伴你入眠。放下一天的疲惫，在音乐中找寻内心的平静。',
    tags: ['治愈', '深夜', '安静', '伤感'],
    songCount: 35,
    createTime: '2023-03-20',
    updateTime: '2024-04-10',
    songs: getSongsByIds([19, 20, 8, 15, 13, 14, 17])
  },
  {
    id: 3,
    name: '运动健身必备 | 燃脂BGM',
    cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    creator: '健身达人',
    creatorId: 103,
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    playCount: 5670000,
    favoriteCount: 423000,
    description: '动感节奏，激发你的运动潜能！跑步、健身、燃脂必备BGM，让运动更有动力。',
    tags: ['运动', '电子', '燃脂', '跑步'],
    songCount: 40,
    createTime: '2023-05-10',
    updateTime: '2024-05-01',
    songs: getSongsByIds([9, 11, 6, 14, 16, 18, 2])
  },
  {
    id: 4,
    name: '周杰伦精选 | 华语乐坛天花板',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop',
    creator: 'Jay迷俱乐部',
    creatorId: 104,
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    playCount: 15890000,
    favoriteCount: 1256000,
    description: '华语乐坛天王周杰伦经典歌曲全收录。从《晴天》到《青花瓷》，每一首都是青春的记忆。',
    tags: ['华语', '周杰伦', '流行', '经典'],
    songCount: 100,
    createTime: '2022-12-01',
    updateTime: '2024-06-01',
    songs: getSongsByIds([1, 2, 3, 4, 5, 6])
  },
  {
    id: 5,
    name: '陈奕迅精选 | 粤语歌神',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop',
    creator: 'Eason粉丝团',
    creatorId: 105,
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    playCount: 13240000,
    favoriteCount: 987000,
    description: '陈奕迅经典歌曲精选，粤语歌神的深情演绎。《十年》《富士山下》《孤勇者》...每一首都是K房必点。',
    tags: ['华语', '陈奕迅', '粤语', '经典'],
    songCount: 80,
    createTime: '2023-01-20',
    updateTime: '2024-05-15',
    songs: getSongsByIds([11, 12, 13])
  },
  {
    id: 6,
    name: '林俊杰合集 | 行走的CD',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop',
    creator: 'JM粉丝后援会',
    creatorId: 106,
    creatorAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face',
    playCount: 10560000,
    favoriteCount: 765000,
    description: '林俊杰经典歌曲合集，行走的CD不是浪得虚名。《江南》《曹操》《修炼爱情》首首经典。',
    tags: ['华语', '林俊杰', '流行', '情歌'],
    songCount: 70,
    createTime: '2023-02-14',
    updateTime: '2024-04-20',
    songs: getSongsByIds([7, 8, 9, 10])
  },
  {
    id: 7,
    name: '民谣精选 | 诗和远方',
    cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=800&fit=crop',
    creator: '民谣老炮',
    creatorId: 107,
    creatorAvatar: 'https://images.unsplash.com/photo-1519085360751-af87a1e53c1a?w=200&h=200&fit=crop&crop=face',
    playCount: 6780000,
    favoriteCount: 512000,
    description: '每一首民谣都有一个动人的故事，静静聆听那些岁月的声音。一把吉他，一段故事，诗和远方都在歌里。',
    tags: ['民谣', '华语', '治愈', '文艺'],
    songCount: 45,
    createTime: '2023-04-15',
    updateTime: '2024-03-25',
    songs: getSongsByIds([20, 19, 8, 17, 13, 2])
  },
  {
    id: 8,
    name: '情歌对唱 | 甜蜜对唱精选',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop',
    creator: '甜蜜音乐站',
    creatorId: 108,
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    playCount: 7890000,
    favoriteCount: 623000,
    description: '最甜的情歌对唱，和心爱的人一起听。小酒窝长睫毛，是你最美的记号。',
    tags: ['情歌', '对唱', '甜蜜', '浪漫'],
    songCount: 50,
    createTime: '2023-02-10',
    updateTime: '2024-05-20',
    songs: getSongsByIds([10, 8, 6, 17, 15, 14])
  },
  {
    id: 9,
    name: '轻音乐纯音 | 工作学习BGM',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=800&fit=crop',
    creator: '学习委员',
    creatorId: 109,
    creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    playCount: 9230000,
    favoriteCount: 756000,
    description: '轻柔的音乐，让你更加专注高效地学习和工作。适合看书、写作、编程时聆听。',
    tags: ['轻音乐', '学习', '纯音乐', '工作'],
    songCount: 60,
    createTime: '2023-03-05',
    updateTime: '2024-06-10',
    songs: getSongsByIds([19, 4, 7, 20, 1, 2])
  },
  {
    id: 10,
    name: '90后青春回忆 | 那些年的MP3',
    cover: 'https://images.unsplash.com/photo-1506157786150-b34df4f3bcd6?w=800&h=800&fit=crop',
    creator: '青春回忆录',
    creatorId: 110,
    creatorAvatar: 'https://images.unsplash.com/photo-1463452345251-4f241297a2e8?w=200&h=200&fit=crop&crop=face',
    playCount: 11450000,
    favoriteCount: 893000,
    description: '那些年我们用过的MP3，那些年我们抄过的歌词本。90后的青春，都藏在这些歌里。',
    tags: ['怀旧', '90后', '青春', '华语'],
    songCount: 55,
    createTime: '2023-05-20',
    updateTime: '2024-04-15',
    songs: getSongsByIds([1, 3, 7, 13, 10, 9, 2])
  },
  {
    id: 11,
    name: '古风精选 | 中国风歌曲集',
    cover: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=800&fit=crop',
    creator: '国风爱好者',
    creatorId: 111,
    creatorAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face',
    playCount: 6780000,
    favoriteCount: 534000,
    description: '品味中国风音乐的独特魅力，感受传统文化的音乐之美。青花瓷、红颜、烟花易冷...',
    tags: ['国风', '华语', '古典', '中国风'],
    songCount: 40,
    createTime: '2023-03-10',
    updateTime: '2024-04-05',
    songs: getSongsByIds([4, 9, 19, 7, 11])
  },
  {
    id: 12,
    name: '热门新歌榜 | 2024最新流行',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop',
    creator: '新歌速递',
    creatorId: 112,
    creatorAvatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face',
    playCount: 8560000,
    favoriteCount: 645000,
    description: '2024年最新最热门的华语流行歌曲，紧跟音乐潮流，第一时间听到好音乐。',
    tags: ['新歌', '流行', '华语', '热门'],
    songCount: 50,
    createTime: '2024-01-01',
    updateTime: '2024-06-15',
    songs: getSongsByIds([11, 14, 20, 17, 19, 6, 16])
  }
]

// Banner 数据
export const mockBanners = [
  {
    id: 1,
    title: '云灵音乐',
    subtitle: '发现好音乐，遇见好声音',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&h=500&fit=crop',
    target: '/playlist/1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    title: '新歌首发',
    subtitle: '2024最新流行歌曲',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&h=500&fit=crop',
    target: '/playlist/12',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    title: '周杰伦精选',
    subtitle: '华语乐坛天花板',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=500&fit=crop',
    target: '/playlist/4',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 4,
    title: '运动燃脂季',
    subtitle: '健身BGM精选',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=500&fit=crop',
    target: '/playlist/3',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
]

// 根据ID获取歌单
export function getPlaylistById(id) {
  return mockPlaylists.find(p => p.id === parseInt(id))
}

// 获取推荐歌单
export function getRecommendPlaylists(limit = 6) {
  return mockPlaylists.slice(0, limit)
}

// 根据分类获取歌单
export function getPlaylistsByCategory(category, limit = 12) {
  if (category === 'all' || category === 'hot') {
    return mockPlaylists.slice(0, limit)
  }
  return mockPlaylists.filter(p =>
    p.tags.some(tag => tag.includes(category) || category.includes(tag))
  ).slice(0, limit)
}
