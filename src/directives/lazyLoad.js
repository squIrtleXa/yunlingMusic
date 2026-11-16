/**
 * 图片懒加载指令 v-lazy
 * 使用 Intersection Observer API 实现
 */

// 默认占位图（1x1 透明像素）
const defaultPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f1f5f9" width="200" height="200"/%3E%3C/svg%3E'

// 默认加载失败兜底图
const defaultError = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f1f5f9" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14" font-family="sans-serif"%3E加载失败%3C/text%3E%3C/svg%3E'

// Intersection Observer 实例缓存
let observer = null

// 图片元素与加载状态的映射
const imageMap = new WeakMap()

// 创建 Intersection Observer
function createObserver() {
  if (observer) return observer

  if (!('IntersectionObserver' in window)) {
    // 不支持 IntersectionObserver 时直接加载所有图片
    observer = null
    return null
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        loadImage(img)
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px 0px', // 提前 50px 开始加载
    threshold: 0.01
  })

  return observer
}

// 加载图片
function loadImage(img) {
  const state = imageMap.get(img)
  if (!state || state.loaded) return

  const src = state.src
  const tempImg = new Image()

  tempImg.onload = () => {
    img.src = src
    img.classList.add('lazy-loaded')
    img.classList.remove('lazy-loading')
    state.loaded = true
  }

  tempImg.onerror = () => {
    img.src = state.error || defaultError
    img.classList.add('lazy-error')
    img.classList.remove('lazy-loading')
    state.loaded = true
    state.error = true
  }

  tempImg.src = src
}

export const lazyLoad = {
  mounted(el, binding) {
    const src = binding.value
    if (!src) return

    // 保存原始 src 和状态
    imageMap.set(el, {
      src,
      loaded: false,
      error: false,
      placeholder: binding.arg?.placeholder || defaultPlaceholder,
      errorImg: binding.arg?.error || defaultError
    })

    // 设置占位图
    el.src = defaultPlaceholder
    el.classList.add('lazy-image', 'lazy-loading')

    const obs = createObserver()
    if (obs) {
      obs.observe(el)
    } else {
      // 降级方案：直接加载
      loadImage(el)
    }
  },

  updated(el, binding) {
    const newSrc = binding.value
    const oldSrc = binding.oldValue

    if (newSrc !== oldSrc) {
      const state = imageMap.get(el)
      if (state) {
        state.src = newSrc
        state.loaded = false
        state.error = false
      } else {
        imageMap.set(el, {
          src: newSrc,
          loaded: false,
          error: false
        })
      }

      el.classList.remove('lazy-loaded', 'lazy-error')
      el.classList.add('lazy-loading')
      el.src = defaultPlaceholder

      const obs = createObserver()
      if (obs) {
        observer.observe(el)
      } else {
        loadImage(el)
      }
    }
  },

  unmounted(el) {
    const obs = createObserver()
    if (obs) {
      observer.unobserve(el)
    }
    imageMap.delete(el)
  }
}

// 全局注册函数
export function setupLazyLoad(app) {
  app.directive('lazy', lazyLoad)
}

export default lazyLoad
