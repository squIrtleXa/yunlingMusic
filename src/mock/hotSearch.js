// 热搜榜数据
export const hotSearchList = [
  { id: 1, keyword: '周杰伦', hot: 2850000, isNew: false, isHot: true },
  { id: 2, keyword: '孤勇者', hot: 2160000, isNew: true, isHot: true },
  { id: 3, keyword: '晴天', hot: 1560000, isNew: false, isHot: true },
  { id: 4, keyword: '起风了', hot: 1380000, isNew: false, isHot: false },
  { id: 5, keyword: '林俊杰', hot: 1250000, isNew: false, isHot: false },
  { id: 6, keyword: '陈奕迅', hot: 1180000, isNew: false, isHot: false },
  { id: 7, keyword: '邓紫棋', hot: 1020000, isNew: true, isHot: false },
  { id: 8, keyword: '薛之谦', hot: 950000, isNew: false, isHot: false },
  { id: 9, keyword: '周深', hot: 870000, isNew: false, isHot: false },
  { id: 10, keyword: '大鱼', hot: 760000, isNew: false, isHot: false }
]

// 获取热搜
export function getHotSearch(limit = 10) {
  return hotSearchList.slice(0, limit)
}
