/**
 * 全局错误处理
 */

// 错误日志记录
const errorLogs = []
const MAX_LOGS = 50

// 添加错误日志
export function addErrorLog(error, type = 'error', info = '') {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    message: error?.message || String(error),
    stack: error?.stack || '',
    info,
    url: window.location.href
  }

  errorLogs.unshift(log)
  if (errorLogs.length > MAX_LOGS) {
    errorLogs.pop()
  }

  // 开发环境打印详细错误
  if (import.meta.env.DEV) {
    console.error(`[${type.toUpperCase()}]`, error, info)
  }
}

// 获取错误日志
export function getErrorLogs() {
  return [...errorLogs]
}

// 清除错误日志
export function clearErrorLogs() {
  errorLogs.length = 0
}

// 全局错误处理器
export function globalErrorHandler(app) {
  // Vue 组件错误
  app.config.errorHandler = (err, instance, info) => {
    addErrorLog(err, 'vue-error', info)

    // 开发环境直接抛出
    if (import.meta.env.DEV) {
      console.warn('Vue 组件错误:', err, info)
    }
  }

  // 全局未捕获的 Promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    addErrorLog(event.reason, 'promise-rejection', 'unhandledrejection')
    event.preventDefault()
  })

  // 全局 JS 错误
  window.addEventListener('error', (event) => {
    addErrorLog(event.error || event.message, 'js-error', `
      文件名: ${event.filename}
      行号: ${event.lineno}
      列号: ${event.colno}
    `)
  })

  // 资源加载错误
  window.addEventListener('error', (event) => {
    const target = event.target
    if (target && target !== window) {
      const tagName = target.tagName?.toLowerCase()
      const src = target.src || target.href
      if (tagName && ['img', 'script', 'link'].includes(tagName)) {
        addErrorLog(
          new Error(`${tagName} 资源加载失败: ${src}`),
          'resource-error',
          `资源类型: ${tagName}, URL: ${src}`
        )
      }
    }
  }, true)
}

export default {
  install(app) {
    globalErrorHandler(app)
    app.config.globalProperties.$errorLogs = {
      get: getErrorLogs,
      clear: clearErrorLogs,
      add: addErrorLog
    }
  }
}
