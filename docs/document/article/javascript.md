---
outline: deep
---

# JavaScript 基础知识

巴拉巴拉巴拉。

## JavaScript 中的数据类型

JavaScript 有 8 种数据类型，Undefined、Null、Boolean、Number、String、Symbol、BigInt、Object，前 7 种属于原始数据类型，Object 属于引用数据类型，其中 Symbol 和 BigInt 是 ES6 新增的数据类型。

![JavaScript数据类型](/images/1.png)

### Symbol

在 ES5 中对象的属性名都是字符串，这就容易造成属性名重复的冲突，为了解决这个问题，ES6 引入了新的原始数据类型 Symbol，它是一个独一无二的值。

```js
const s1 = Symbol() // Symbol()
const s2 = Symbol('tom') // Symbol(tom)
const s3 = Symbol('tom') // Symbol(tom)

console.log(s2 === s3) // false

s1.toString() // "Symbol()"

s2.description // "tom"

// Symbol值不能与其他类型的值进行运算，但是可以转换为字符串和布尔值，不能转换成数值。
'tom' +
  s2 // 报错
  `tom ${s2}` // 报错
Number(s2) // 报错
```

::: info Symbol.for，Symbol.keyFor
Symbol.for 接受一个字符串作为参数，在全局环境下查找是否有以该参数作为名称的 Symbol 值，有的话直接返回，没有的话创建一个新的值，并注册到全局环境中，Symbol.keyFor 会在全局环境中查找被注册的 Symbol.for 创建的值，找不到返回 undefined。

```js
const foo = Symbol.for('foo')
const bar = Symbol.for('foo')
foo === bar // true
Symbol.keyFor(s3) // undefined
Symbol.keyFor(foo) // "foo"
```

:::

::: info
Symbol 值作为对象属性被遍历时，不会出现在 for in、for of 循环中，也不会被 Object.keys(), Object.getOwnPropertyNames(), JSON.stringify()返回，可以通过 Object.getOwnPropertySymbols()，Reflect.ownKeys()返回。
:::

### BigInt

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

### 原始数据类型、引用数据类型在内存中的位置

原始数据类型存储在栈中，引用数据类型存储在堆中。<br>
当我们的代码被执行时，原始数据类型的数据直接在当前执行上下文的变脸环境中，而引用类型的数据存放在堆中，然后生成一个指向该对象在堆中位置的指针。

### 判断数据类型

::: info typeof
typeof 可以用于检测原始数据的类型（除了 null），null 和其他引用数据类型会返回 object

```js
typeof undefined // undefined
typeof true // boolean
typeof 1 // number
typeof 'tom' // string
let a = Symbol()
typeof a // symbol
typeof 1n // bigint
typeof null // object
// typeof 引用数据类型 object
```

:::
::: info instanceof
instanceof 可以用于判断对象的类型（通过原型链），不能用于原始数据类型
:::
::: info constructor
constructor 有两个作用，一是判断数据类型，二是构造函数原型通过 constructor 指向构造函数，第二点需要注意的是，[如果重写了原型并且没有显示的添加 constructor 指向构造函数，constructor 将不能正确判断数据类型](#改变构造函数的指向)
:::
::: info Object.prototype.toString.call
Object.prototype.toString.call
:::

## 创建对象

### 工厂模式

工厂模式的问题，不能确定对象的类型

```js {2,7}
function createPerson(name) {
  const o = new Object()
  o.name = name
  o.sayName = function () {
    console.log(this.name)
  }
  return o
}
const person1 = createPerson('tom')
```

### 构造函数模式

构造函数模式解决了工厂模式不能识别对象类型的问题，但是其也不是完美的，构造函数内部的方法会在实例对象中重复创建。

```js {9,10}
function Person(name) {
  this.name = name
  this.sayName = function () {
    console.log(this.name)
  }
}
const person1 = new Person('tom')

console.log(person1.constructor === Person) // true
console.log(person1 instanceof Person) // true
```

::: info 构造函数使用 new 进行实例化，内部执行操作：

1. 创建一个新的对象
2. 将该对象的[[prototype]]指向构造函数的 prototype 属性
3. 将构造函数内部的 this 指向该对象
4. 执行构造函数内部的代码
5. 返回该对象
   :::

### 原型模式

在 JavaScript 中每一个函数都会创建一个 prototype 属性，该属性指向的对象就是构造函数实例化对象的原型。在原型上定义的属性和方法，实例对象通过原型链都是可以访问的，这就解决了构造函数模式内部方法在实例对象中重复定义的问题。但是原型模式也并非完美，原型模式的问题在于原型上的属性在实例中也是共享的，即一个实例修改了原型的属性会影响其他实例。

```js
function Person() {}
Person.prototype.name = 'tom'
Person.prototype.sayName = function () {
  console.log(this.name)
}
const person1 = new Person()
const person2 = new Person()
console.log(person1.sayName === person2.sayName) // true
```

::: info
构造函数、原型对象、实例之间的关系，构造函数的 prototype 指向原型对象，原型对象在默认情况下会自动获得一个 constructor 属性，指回构造函数，在构造函数实例化对象的过程中我们知道，实例对象会有一个[[Prototype]]指向原型对象，由于原型对象的 constructor 是共享的，因此间接的实例对象也能通过 constructor 指向构造函数。由此可知，构造函数与原型之间是直接的联系，实例与构造函数之间没有直接的联系。
:::

![构造函数、原型、实例对象的管理](/images/2.png)

#### 原型的判断方法

isPrototypeOf、getPrototypeOf

```js {8,9}
function Person() {}
Person.prototype.name = 'tom'
Person.prototype.sayName = function () {
  console.log(this.name)
}
const person1 = new Person()

console.log(Person.prototype.isPrototypeOf(person1)) // true
console.log(Object.getPrototypeOf(person1) === Person.prototype) // true
```

#### 改变构造函数的指向

::: info
通过 **Obj.prototype.xxx = xxx** 添加属性显得繁琐，利用字面量可以快速直观的批量定义属性和方法。但是利用字面量会产生一个问题，那就是改变了原型的 cunstructor 的指向，实例对象通过 constructor 也随之改变（在利用字面量重写原型之前实例化的对象不受影响），因为字面量语法相当于重写了原型对象，通过在字面量中显示的添加 cunstructor 重新指向构造函数。
:::

```js {7}
function Person() {}
// 在重写原型之前实例化对象
const person1 = new Person()
console.log(person1.constructor === Person) // true
// 重写原型
Person.prototype = {
  cunstructor: Person // 显示的添加constructor指向Person
  name: 'tom',
  sayName: function() {
    console.log(this.name)
  }
}
const person2 = new Person
```

### 组合使用构造函数模式和原型模式

组合构造函数模式和原型模式是创建自定义类型的最常见的方式，集两种模式之长，构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。

```js
function Person(name) {
  this.name = name
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    console.log(this.name)
  }
}
const person1 = new Person('tom')
const person2 = new Person('jerry')
console.log(person1.name) // tom
console.log(person2.name) // jerry
console.log(person1.sayName === person2.sayName) // true
```

### 动态原型模式

### 寄生构造函数模式

### 稳妥构造函数模式

## 继承

### 原型链

原型链是 ECMAScript 中的主要继承方式，其基本思想是通过原型继承多个引用类型的属性和方法。具体实现方法是将构造函数的原型赋值为另一个要继承的构造函数的实例对象。

::: tip
所有引用类型都继承自 Object，这也是为什么自定义类型能够继承包括`toString()`、`valueOf()`在内的所有默认方法的原因。
:::

```js {11}
function SuperType() {
  this.super = 'super'
}
SuperType.prototype.getSuper = function () {
  console.log(this.super)
}

function SubType() {
  this.sub = 'sub'
}
SubType.prototype = new SuperType()
SubType.prototype.getSub = function () {
  console.log(this.sub)
}

const sub1 = new SubType()
console.log(sub1.getSuper()) // super
console.log(sub1.getSub()) // sub
console.log(sub1 instanceof SubType) // true
console.log(sub1 instanceof SuperType) // true
console.log(SubType.prototype.isPrototypeOf(sub1)) // true
```

:::danger 原型链的问题

- 继承的原型上存在引用类型值的问题，会在所有实例间共享
- 子类型在实例化的过程中不能给父类型的构造函数传参
  :::

### 盗用构造函数

在子类构造函数中调用父类构造函数，即在子类中通过 call 或 apply 调用父构造函数，使得父构造函数在子类构造函数中运行。

```js {6}
function SuperType(name) {
  this.name = name
}
function SubType(name, age) {
  // 调用父构造函数
  SuperType.call(this, name)
  this.age = age
}
const sub1 = new SubType('tom', 1)
console.log(sub1.name) // tom
console.log(sub1.age) // 1
```

:::danger 盗用构造函数的问题
盗用构造函数的问题即构造函数模式创建自定义对象的问题，构造函数中方法会在实例中重复创建。
:::

### 组合继承（伪经典继承）

组合继承综合了原型链继承和盗用构造函数，继承了两者的优点，通过原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性。

```js {10,14}
function SuperType(name) {
  this.name = name
}
SuperType.prototype.getSuper = function () {
  console.log(this.name)
}

function SubType(name, age) {
  // 盗用构造函数
  SuperType.call(this, name)
  this.age = age
}
// 原型链继承
SubType.prototype = new SuperType()
SubType.prototype.getSub = function () {
  console.log(this.age)
}

const sub1 = new SubType('tom', 1)
const sub2 = new SubType('jerry', 2)
console.log(sub1.getSuper()) // tom
console.log(sub1.getSub()) // 1
console.log(sub2.getSuper()) // jerry
console.log(sub2.getSub()) // 2
```

### 原型式继承

### 寄生式继承

### 寄生式组合继承

## encodeURI 和 encodeURIComponent 的区别

:::info encodeURI
用作对一个完整的 URI 进行编码，不会对其中的 ASCII 码、数字和标点符号进行处理。<br>
使用场景，需要获取一个可用的 URL 地址时：

```js
let url = 'https://test/hello world'
console.log(encodeURI(url)) // https://test/hello%20world
```

:::

:::info encodeURIComponent
对 URI 的组成部分进行编码（协议、域名、路劲、参数、查询字符串等），在 encodeURI 中不会被编码的符号会被编码。<br>
使用场景，需要对 URL 的参数进行编码时：

```js
let param = 'https://test/hello world'
let url = `https://test/info?param=${encodeURIComponent(param)}`
console.log(url) // https://test/info?param=https%3A%2F%2Ftest%2Fhello%20world
```

:::

## 如何获取安全的 undefined

由于`undefined`是一个标识符，即可以用作变量，也可以作为值。通过`void 0`获取安全的`undefined`。

```js
var undefined = 1
var test = undefined // [!code --]
var test = void 0 // [!code ++]
```

## Object.is()与==、===的区别

1. `==`在进行判断时，如果两边类型不一致会进行类型转换后再比较
2. `===`在进行判断时，如果两边类型不一致不会进行转性转换
3. `Object.is()`基本等同于`===`，它处理了一些特殊的情况，比如`-0`和`+0`不再相等，两个`NaN`是相等的

## 常见的导致内存泄漏的操作

1. 使用未声明的变量而创建的全局变量
2. 未及时销毁的计时器和回调函数
3. 保留已被删除 DOM 的引用
4. 闭包

## 标准内置对象---Array

### 静态方法 Array.from()

`Array.from()`从可迭代或类数组的对象创建一个新的浅拷贝的数组实例。

## js 脚本延时加载的方法

1. 将`script`标签放在`body`标签的底部
2. 使用 js 动态创建`script`标签加载 js
3. 利用`setTimeout`延时加载
4. 在`script`便签上添加`defer`或者`async`属性，`defer`和`async`属性可以让`script`异步加载，两者的区别是，`async`加载完成后会立即执行，如果此时页面未渲染完成将被阻塞，`defer`会等到页面渲染完成后再执行脚本，另外多个`script`添加了`async`属性无法保证执行的先后顺序，`defer`理论上可以保证顺序执行

## 尾调用

尾调用的概念，外部函数的返回值是一个内部函数的返回值
