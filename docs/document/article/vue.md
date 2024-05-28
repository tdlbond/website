---
outline: deep
---

# vue

## MVVM

`MVVM`是一种常见软件设计模式，主要通过关注点分离的方式组织代码结构、提高开发效率。<br>
`MVVM`分为`Model`、`View`、`ViewModel`。<br>
`Model`代表数据模型，数据和业务逻辑在`Model`中定义。<br>
`View`代表 UI 视图，负责页面内容的展示。<br>
`ViewModel`负责监听`Model`中数据的改变并且控制视图的更新，处理用户在页面上的交互操作。<br>
`ViewModel`充当`Model`和`View`之间联系的桥梁，两者之间没有直接的联系，`Model`和`ViewModel`之间有着双向绑定的联系，因此`Model`中数据的改变会触发`View`视图的更新，同时`View`中因为用户操作而改变的数据也会在`Model`中被同步。

![MVVM](/images/5.png)

## Vue 的响应式原理

当一个`Vue`实例被创建时，`Vue`会遍历 data 选项中的所有 property，并通过`Object.defineProperty`将这些`property`转换为`getter/setter`，这些`getter/setter`对用户是不可见的，但是在内部它们让`Vue`能够追踪依赖。另外，每一个组件都有一个`watcher`实例，在组件渲染的过程中把接触过的数据`property`记录为依赖，当依赖的`setter`被触发时，会通知`watcher`，从而使它关联的组件重新渲染。

![Vue响应式原理](/images/3.png)

::: tip

1. 由于`Object.defineProperty`是一个无法被 shim 的特性，因此`Vue`不支持 IE8 及以下版本
2. 新的`Vue3`使用`Proxy`进行数据的劫持，提供了更好的性能（IE 已停止维护，没必要再去支持）
   :::

## 双向绑定原理

`Vue`的双向绑定是采用数据劫持结合发布者-订阅模式的方式，通过`Object.defineProperty`劫持各个属性的`getter/setter`，当数据改变时通知订阅者，触发相应的监听回调。具体实现方式：

1. 实现一个数据监听器`Observer`，能够对数据对象的所有属性进行监听，数据改变时通知订阅者
2. 实现一个指令解析器`Compile`，扫描和解析每个元素的指令，根据指令模板替换数据，绑定相应的更新函数
3. 实现一个`Watcher`，作为连接`Observer`和`Compile`之间的桥梁，能够订阅并收到属性改变的通知，执行元素指令绑定的更新函数更新视图
4. `MVVM`入口函数，整合`Observer`、`Compile`和`Watcher`

![双向绑定原理](/images/4.png)

## Vue 组件间的通信方式

1. 父子组件间可以通过`props`、`$emit`，父组件可以设置子组件的 ref 获取子组件数据，子组件则可以通过`$parent`获取父组件数据
2. 兄弟组件之间可通过`EventBus`事件总线传递数据，也可以利用`$parent`的`emit`和`on`
3. 祖先与后代组件之间通过依赖注入的方式`provide`、`inject`
4. 组件间复杂的数据传递利用第三方的状态管理工具，比如`vuex`

## Vue3 底层重写了响应式，Proxy 替换了 Object.defineProperty

### Object.defineProperty

`Vue2`中通过`Object.defineProperty`劫持对象属性的方式去实现响应式，但是该方法存在一些缺陷：<br>

1. 监听不到对象属性的增加和删除，为了处理这种情况增加了`set`、`delete`
2. 数组的 API 方式无法监听，因此在底层代码中重写了数组 API 方法，如`push`，`pop`，`shift`，`unshift`，`sort`，`splice`，`reverse`
3. `Object.defineProperty`只能劫持对象的属性，对于嵌套对象需要进行深层遍历，造成性能问题

### Proxy

`Proxy`是`ES6`中新的特性，可以在语言层面修改对象的某些操作的默认行为，可以对外界的访问进行拦截过滤和改写，它解决了`Object.defineProperty`的缺陷。
