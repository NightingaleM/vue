import { inBrowser } from './env'

export let mark
export let measure
/**
 * window.performance实际上是一个浏览器的方法，
 */
if (process.env.NODE_ENV !== 'production') { // 如果不是生产环境，则什么都不做
  const perf = inBrowser && window.performance // 如果是浏览器环境，perf则是window.performance
  /* istanbul ignore if */
  if ( // 一路判定下来这些方法是不是浏览器所支持的
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag) // 打标记
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag) // 计算两个标记间代码的性能
      perf.clearMarks(startTag) // 清除标记
      perf.clearMarks(endTag) // 清除标记
      // perf.clearMeasures(name)
    }
  }
}
