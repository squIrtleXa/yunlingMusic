// 格式化时间（秒 -> 分:秒）
export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${padZero(mins)}:${padZero(secs)}`
}

// 补零
export function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`
}

// 格式化播放数量
export function formatCount(count) {
  if (!count) return '0'
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1) + '亿'
  }
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count.toString()
}

// 格式化日期
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hours = padZero(d.getHours())
  const minutes = padZero(d.getMinutes())
  const seconds = padZero(d.getSeconds())

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 防抖函数
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 节流函数
export function throttle(func, limit = 300) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 生成随机ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 获取随机颜色
export function getRandomColor() {
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#06b6d4', '#3b82f6'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// 获取首字母
export function getFirstLetter(str) {
  if (!str) return '#'
  const first = str.charAt(0).toUpperCase()
  if (/[A-Z]/.test(first)) return first
  if (/[\u4e00-\u9fa5]/.test(first)) {
    // 简单处理中文首字母，实际项目中应使用 pinyin 库
    const map = {
      '爱': 'A', '八': 'B', '吃': 'C', '的': 'D', '二': 'E',
      '发': 'F', '个': 'G', '好': 'H', '一': 'Y', '就': 'J',
      '看': 'K', '了': 'L', '没': 'M', '你': 'N', '哦': 'O',
      '平': 'P', '七': 'Q', '人': 'R', '是': 'S', '他': 'T',
      '我': 'W', '想': 'X', '有': 'Y', '在': 'Z', '这': 'Z',
      '周': 'Z', '林': 'L', '王': 'W', '李': 'L', '张': 'Z',
      '刘': 'L', '陈': 'C', '杨': 'Y', '黄': 'H', '赵': 'Z',
      '吴': 'W', '徐': 'X', '孙': 'S', '马': 'M', '朱': 'Z',
      '胡': 'H', '郭': 'G', '何': 'H', '高': 'G', '罗': 'L',
      '郑': 'Z', '梁': 'L', '谢': 'X', '宋': 'S', '唐': 'T',
      '许': 'X', '韩': 'H', '冯': 'F', '邓': 'D', '曹': 'C',
      '彭': 'P', '曾': 'Z', '萧': 'X', '田': 'T', '董': 'D',
      '袁': 'Y', '潘': 'P', '于': 'Y', '蒋': 'J', '蔡': 'C',
      '余': 'Y', '杜': 'D', '叶': 'Y', '程': 'C', '苏': 'S',
      '魏': 'W', '吕': 'L', '丁': 'D', '任': 'R', '沈': 'S',
      '姚': 'Y', '卢': 'L', '傅': 'F', '钟': 'Z', '姜': 'J',
      '崔': 'C', '谭': 'T', '廖': 'L', '范': 'F', '汪': 'W',
      '陆': 'L', '金': 'J', '石': 'S', '戴': 'D', '贾': 'J',
      '韦': 'W', '夏': 'X', '邱': 'Q', '方': 'F', '侯': 'H',
      '邹': 'Z', '熊': 'X', '孟': 'M', '秦': 'Q', '白': 'B',
      '江': 'J', '阎': 'Y', '薛': 'X', '尹': 'Y', '段': 'D',
      '雷': 'L', '黎': 'L', '史': 'S', '龙': 'L', '贺': 'H',
      '顾': 'G', '毛': 'M', '郝': 'H', '龚': 'G', '邵': 'S',
      '万': 'W', '钱': 'Q', '严': 'Y', '覃': 'Q', '武': 'W',
      '戚': 'Q', '柳': 'L', '乔': 'Q', '齐': 'Q', '欧阳': 'O'
    }
    // 尝试匹配
    for (let key in map) {
      if (first === key) return map[key]
    }
    // 随机返回一个字母
    return '#'
  }
  return '#'
}

// 深拷贝
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const cloned = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }
}
