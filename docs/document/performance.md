---
outline: deep
---

# 前端性能优化

性能优化相关的一些东西。

## 函数防抖、节流

### 防抖

::: info
函数防抖是指事件被触发n秒后再执行回调处理，如果n秒内再次出发事件，则重新计算时间。<br>
使用场景:
1. 按钮提交，防止按钮短时间内被多次点击提交重复的请求
2. 输入框远程搜索
:::

```js
function debounce(fn, time) {
  let timer = null
  return function() {
    const args = [...arguments]
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}
```

### 节流

::: info
函数节流是指规定时间n内只能有一次事件的回调函数被执行。<br>
使用场景:
1. 滚动事件
2. 动画
3. 缩放事件
:::

```js
function throttle(fn, time) {
  let timer = null
  return function() {
    const args = [...arguments]
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, time)
    }
  }
}
```