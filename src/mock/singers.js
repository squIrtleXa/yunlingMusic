import { mockSongs } from './songs'

// 歌手筛选分类
export const singerCategories = {
  area: [
    { id: 'all', name: '全部' },
    { id: 'china', name: '华语' },
    { id: 'western', name: '欧美' },
    { id: 'japan', name: '日本' },
    { id: 'korea', name: '韩国' },
    { id: 'other', name: '其他' }
  ],
  gender: [
    { id: 'all', name: '全部' },
    { id: 'male', name: '男歌手' },
    { id: 'female', name: '女歌手' },
    { id: 'band', name: '乐队组合' }
  ],
  initial: [
    { id: 'hot', name: '热门' },
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' },
    { id: 'E', name: 'E' },
    { id: 'F', name: 'F' },
    { id: 'G', name: 'G' },
    { id: 'H', name: 'H' },
    { id: 'I', name: 'I' },
    { id: 'J', name: 'J' },
    { id: 'K', name: 'K' },
    { id: 'L', name: 'L' },
    { id: 'M', name: 'M' },
    { id: 'N', name: 'N' },
    { id: 'O', name: 'O' },
    { id: 'P', name: 'P' },
    { id: 'Q', name: 'Q' },
    { id: 'R', name: 'R' },
    { id: 'S', name: 'S' },
    { id: 'T', name: 'T' },
    { id: 'U', name: 'U' },
    { id: 'V', name: 'V' },
    { id: 'W', name: 'W' },
    { id: 'X', name: 'X' },
    { id: 'Y', name: 'Y' },
    { id: 'Z', name: 'Z' },
    { id: '#', name: '#' }
  ]
}

// 歌手 Mock 数据
export const mockSingers = [
  {
    id: 1,
    name: '周杰伦',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'Z',
    fansCount: 52300000,
    description: '周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行乐男歌手、音乐人、演员、导演、编剧，毕业于淡江中学。被誉为"华语乐坛天王"，其音乐融合中西方元素，开创了中国风歌曲的先河。',
    albumCount: 15,
    songCount: 200,
    mvCount: 80
  },
  {
    id: 2,
    name: '林俊杰',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'L',
    fansCount: 45000000,
    description: '林俊杰（JJ Lin），1981年3月27日出生于新加坡，华语流行乐男歌手、词曲创作者、音乐制作人。凭借超强的现场演唱实力被誉为"行走的CD"。',
    albumCount: 14,
    songCount: 180,
    mvCount: 70
  },
  {
    id: 3,
    name: '陈奕迅',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'C',
    fansCount: 50000000,
    description: '陈奕迅（Eason Chan），1974年7月27日出生于香港，华语流行乐男歌手、演员。被誉为"粤语歌神"，以其深情独特的嗓音演唱了无数经典金曲。',
    albumCount: 30,
    songCount: 300,
    mvCount: 150
  },
  {
    id: 4,
    name: '邓紫棋',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'female',
    initial: 'D',
    fansCount: 35000000,
    description: '邓紫棋（G.E.M.），1991年8月16日出生于上海，华语流行乐女歌手、词曲创作人、音乐制作人。以强大的现场实力和创作才华著称，被誉为"巨肺小天后"。',
    albumCount: 10,
    songCount: 150,
    mvCount: 60
  },
  {
    id: 5,
    name: '薛之谦',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'X',
    fansCount: 45000000,
    description: '薛之谦（Joker Xue），1983年7月17日出生于上海，华语流行乐男歌手、音乐制作人、演员。以深情的薛氏情歌和幽默搞笑的性格深受歌迷喜爱。',
    albumCount: 12,
    songCount: 100,
    mvCount: 50
  },
  {
    id: 6,
    name: '周深',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'Z',
    fansCount: 28000000,
    description: '周深，1992年9月29日出生于湖南邵阳，中国内地男歌手，毕业于乌克兰利沃夫国立立谢科音乐科学院。以空灵纯净的嗓音和超强的语言天赋闻名。',
    albumCount: 8,
    songCount: 120,
    mvCount: 45
  },
  {
    id: 7,
    name: '买辣椒也用券',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'female',
    initial: 'M',
    fansCount: 5800000,
    description: '买辣椒也用券，中国内地女歌手，以一首翻唱《起风了》走红网络，其独特的嗓音和真挚的情感表达深受年轻听众喜爱。',
    albumCount: 3,
    songCount: 25,
    mvCount: 8
  },
  {
    id: 8,
    name: '李荣浩',
    avatar: 'https://images.unsplash.com/photo-1519085360751-af87a1e53c1a?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'L',
    fansCount: 22000000,
    description: '李荣浩，1985年7月11日出生于安徽省蚌埠市，中国内地流行乐男歌手、词曲创作人、音乐制作人、演员。以独特的音乐风格和小眼魅力著称。',
    albumCount: 8,
    songCount: 90,
    mvCount: 40
  },
  {
    id: 9,
    name: '王力宏',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'W',
    fansCount: 38000000,
    description: '王力宏（Wang Leehom），1976年5月17日出生于美国纽约罗切斯特，华语流行乐男歌手、音乐人、影视演员、导演。精通多种乐器，是华语乐坛的音乐才子。',
    albumCount: 16,
    songCount: 180,
    mvCount: 75
  },
  {
    id: 10,
    name: '陶喆',
    avatar: 'https://images.unsplash.com/photo-1463452345251-4f241297a2e8?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'male',
    initial: 'T',
    fansCount: 18000000,
    description: '陶喆（David Zee Tao），1969年7月11日出生于香港，华语流行乐男歌手、词曲创作人、音乐制作人。被誉为"华语R&B教父"，将R&B音乐引入华语乐坛。',
    albumCount: 8,
    songCount: 100,
    mvCount: 45
  },
  {
    id: 11,
    name: '田馥甄',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'female',
    initial: 'T',
    fansCount: 25000000,
    description: '田馥甄（Hebe Tien），1983年3月30日出生于台湾省新竹县，华语流行乐女歌手、演员，S.H.E组合成员。以清新脱俗的气质和独特的唱腔深受喜爱。',
    albumCount: 6,
    songCount: 80,
    mvCount: 35
  },
  {
    id: 12,
    name: '孙燕姿',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=face',
    area: 'china',
    gender: 'female',
    initial: 'S',
    fansCount: 30000000,
    description: '孙燕姿（Stefanie Sun），1978年7月23日出生于新加坡，华语流行乐女歌手、音乐制作人。以独特的嗓音和积极向上的音乐风格成为华语天后。',
    albumCount: 13,
    songCount: 150,
    mvCount: 65
  },
  {
    id: 13,
    name: '五月天',
    avatar: 'https://images.unsplash.com/photo-1529139320443-c440e1b8a20c?w=400&h=400&fit=crop',
    area: 'china',
    gender: 'band',
    initial: 'W',
    fansCount: 60000000,
    description: '五月天（Mayday），中国台湾摇滚乐团，由温尚翊（怪兽）、陈信宏（阿信）、石锦航（石头）、蔡升晏（玛莎）、刘谚明（冠佑）组成。被誉为"华语第一天团"。',
    albumCount: 12,
    songCount: 200,
    mvCount: 100
  },
  {
    id: 14,
    name: '苏打绿',
    avatar: 'https://images.unsplash.com/photo-1522199733630-454b3c755a88?w=400&h=400&fit=crop',
    area: 'china',
    gender: 'band',
    initial: 'S',
    fansCount: 28000000,
    description: '苏打绿（Sodagreen），中国台湾乐团，由吴青峰、谢馨仪、史俊威、刘家凯、何景扬、龚钰祺组成。以清新独特的音乐风格和主唱吴青峰的空灵嗓音著称。',
    albumCount: 10,
    songCount: 120,
    mvCount: 55
  }
]

// 专辑 Mock 数据
export const mockAlbums = [
  { id: 1, name: '叶惠美', singerId: 1, singer: '周杰伦', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop', publishTime: '2003-07-31', songCount: 11 },
  { id: 2, name: '魔杰座', singerId: 1, singer: '周杰伦', cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=600&fit=crop', publishTime: '2008-10-15', songCount: 11 },
  { id: 3, name: '七里香', singerId: 1, singer: '周杰伦', cover: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop', publishTime: '2004-08-03', songCount: 10 },
  { id: 4, name: '我很忙', singerId: 1, singer: '周杰伦', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', publishTime: '2007-11-02', songCount: 10 },
  { id: 5, name: '十一月的萧邦', singerId: 1, singer: '周杰伦', cover: 'https://images.unsplash.com/photo-1507400492013-162706d8d3ab?w=600&h=600&fit=crop', publishTime: '2005-11-01', songCount: 12 },
  { id: 6, name: '周杰伦的床边故事', singerId: 1, singer: '周杰伦', cover: 'https://images.unsplash.com/photo-1518199256141-674b26d0c569?w=600&h=600&fit=crop', publishTime: '2016-06-24', songCount: 10 },
  { id: 7, name: '第二天堂', singerId: 2, singer: '林俊杰', cover: 'https://images.unsplash.com/photo-1547981609-4b6b06c54322?w=600&h=600&fit=crop', publishTime: '2004-06-04', songCount: 12 },
  { id: 8, name: '因你而在', singerId: 2, singer: '林俊杰', cover: 'https://images.unsplash.com/photo-1516589712422-181c6e2d4d0f?w=600&h=600&fit=crop', publishTime: '2013-03-13', songCount: 12 },
  { id: 9, name: '曹操', singerId: 2, singer: '林俊杰', cover: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=600&fit=crop', publishTime: '2006-02-17', songCount: 11 },
  { id: 10, name: 'JJ陆', singerId: 2, singer: '林俊杰', cover: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=600&fit=crop', publishTime: '2008-10-18', songCount: 14 },
  { id: 11, name: '孤勇者', singerId: 3, singer: '陈奕迅', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop', publishTime: '2021-11-08', songCount: 1 },
  { id: 12, name: "What's Going On...?", singerId: 3, singer: '陈奕迅', cover: 'https://images.unsplash.com/photo-1490806020466-119275972e3e?w=600&h=600&fit=crop', publishTime: '2006-11-23', songCount: 10 },
  { id: 13, name: '黑白灰', singerId: 3, singer: '陈奕迅', cover: 'https://images.unsplash.com/photo-1506157786150-b34df4f3bcd6?w=600&h=600&fit=crop', publishTime: '2003-04-15', songCount: 10 },
  { id: 14, name: '光年之外', singerId: 4, singer: '邓紫棋', cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop', publishTime: '2016-12-30', songCount: 1 },
  { id: 15, name: 'Xposed', singerId: 4, singer: '邓紫棋', cover: 'https://images.unsplash.com/photo-1514432324613-527a9a468ad4?w=600&h=600&fit=crop', publishTime: '2012-07-05', songCount: 10 },
  { id: 16, name: '另一个童话', singerId: 4, singer: '邓紫棋', cover: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&h=600&fit=crop', publishTime: '2018-08-16', songCount: 3 },
  { id: 17, name: '绅士', singerId: 5, singer: '薛之谦', cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop', publishTime: '2015-06-05', songCount: 10 },
  { id: 18, name: '意外', singerId: 5, singer: '薛之谦', cover: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&h=600&fit=crop', publishTime: '2013-11-11', songCount: 10 },
  { id: 19, name: '大鱼', singerId: 6, singer: '周深', cover: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=600&fit=crop', publishTime: '2016-05-18', songCount: 1 },
  { id: 20, name: '起风了', singerId: 7, singer: '买辣椒也用券', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop', publishTime: '2017-02-22', songCount: 1 }
]

// 根据ID获取歌手
export function getSingerById(id) {
  return mockSingers.find(s => s.id === parseInt(id))
}

// 获取歌手的热门歌曲
export function getSingerHotSongs(singerId, limit = 10) {
  return mockSongs.filter(s => s.artistId === parseInt(singerId)).slice(0, limit)
}

// 获取歌手的专辑
export function getSingerAlbums(singerId) {
  return mockAlbums.filter(a => a.singerId === parseInt(singerId))
}

// 获取热门歌手
export function getHotSingers(limit = 10) {
  return mockSingers.slice(0, limit)
}

// 根据条件筛选歌手
export function filterSingers(area = 'all', gender = 'all', initial = 'hot') {
  let result = [...mockSingers]

  if (area !== 'all') {
    result = result.filter(s => s.area === area)
  }

  if (gender !== 'all') {
    result = result.filter(s => s.gender === gender)
  }

  if (initial !== 'hot') {
    if (initial === '#') {
      result = result.filter(s => !/[A-Z]/.test(s.initial))
    } else {
      result = result.filter(s => s.initial === initial)
    }
  }

  return result
}

// 搜索歌手
export function searchSingers(keyword) {
  if (!keyword) return []
  const lower = keyword.toLowerCase()
  return mockSingers.filter(singer =>
    singer.name.toLowerCase().includes(lower)
  )
}
