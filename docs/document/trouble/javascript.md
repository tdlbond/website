---
outline: deep
---

### JSON.stringify

在实际开发过程中，对于数据结构简单、属性类型不是复杂对象的对象进行深拷贝时，在不使用第三方工具库的情况下，`JSON.parse` 和 `JSON.stringify` 是我们常用的处理手段。但是对`JSON.stringify`不熟悉的话，实际使用中会出现一些让人意想不到的结果，比如当属性的值是`undefined`时，在序列化时会被忽略掉。在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)上有关于`JSON.stringify`的具体的描述。

```js
let a = { name: 'tom', age: undefined }
console.log(JSON.stringify(a)) // '{"name": "tom"}'
```

### 在页面上操作 PDF、音频资源等下载时没有按预期下载，而是打开了一个新的页面

关于资源的下载，通常后端接口会有两种处理方式，一种是直接返回资源在服务器中的位置，另一种是返回文件流数据。当我们以第一种方式处理 PDF、音频的下载时，并不会按照我们的预期生成下载文件，浏览器会打开新页面显示这些资源。如何处理呢？一种方法是我们拿到后端接口返回的下载地址，利用资源地址重新发起请求，并以流的形式接收数据，然后利用`URL`对象的`createObjectURL`方法生成新的下载地址完成下载。

```js {3,4,16}
// 通用下载方法
function downloadData(val, fileName) {
  const isBlob = val instanceof Blob
  const url = isBlob ? window.URL.createObjectURL(val) : val
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  isBlob && window.URL.revokeObjectURL(url)
}

const pdfUrl = 'xxx'
axios.get(pdfUrl, { responseType: 'blob' }).then((res) => {
  downloadData(res.data)
})
```
