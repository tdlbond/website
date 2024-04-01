---
outline: deep
---
# JavaScript八股文

一些无聊但是得懂的八股文，巴拉巴拉巴拉。

## JavaScript中的数据类型

JavaScript有8种数据类型，Undefined、Null、Boolean、Number、String、Symbol、BigInt、Object，前7种属于原始数据类型，Object属于引用数据类型，其中Symbol和BigInt是ES6新增的数据类型。

![JavaScript数据类型](/images/1.png)

### Symbol

在ES5中对象的属性名都是字符串，这就容易造成属性名重复的冲突，为了解决这个问题，ES6引入了新的原始数据类型Symbol，它是一个独一无二的值。

```js
const s1 = Symbol() // Symbol()
const s2 = Symbol('tom') // Symbol(tom)
const s3 = Symbol('tom') // Symbol(tom)

console.log(s2 === s3) // false

s1.toString() // "Symbol()"

s2.description // "tom"

// Symbol值不能与其他类型的值进行运算，但是可以转换为字符串和布尔值，不能转换成数值。
'tom' + s2 // 报错
`tom ${s2}` // 报错
Number(s2) // 报错
```

::: info Symbol.for，Symbol.keyFor
Symbol.for接受一个字符串作为参数，在全局环境下查找是否有以该参数作为名称的Symbol值，有的话直接返回，没有的话创建一个新的值，并注册到全局环境中，Symbol.keyFor会在全局环境中查找被注册的Symbol.for创建的值，找不到返回undefined。
```js
const foo = Symbol.for('foo')
const bar = Symbol.for('foo')
foo === bar // true
Symbol.keyFor(s3) // undefined
Symbol.keyFor(foo) // "foo"
```
:::

::: info
Symbol值作为对象属性被遍历时，不会出现在for in、for of循环中，也不会被Object.keys(), Object.getOwnPropertyNames(), JSON.stringify()返回，可以通过Object.getOwnPropertySymbols()，Reflect.ownKeys()返回。
:::

### BigInt

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用BigInt 可以安全地存储和操作大整数，即使这个数已经超出了Number 能够表示的安全整数范围。

### 原始数据类型、引用数据类型在内存中的位置

原始数据类型存储在栈中，引用数据类型存储在堆中。<br>
当我们的代码被执行时，原始数据类型的数据直接在当前执行上下文的变脸环境中，而引用类型的数据存放在堆中，然后生成一个指向该对象在堆中位置的指针。

### 判断数据类型

::: info typeof
typeof可以用于检测原始数据的类型（除了null），null和其他引用数据类型会返回object
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
instanceof可以用于判断对象的类型（通过原型链），不能用于原始数据类型
:::
::: info constructor
constructor有两个作用，一是判断数据类型，二是构造函数原型通过constructor指向构造函数，第二点需要注意的是，[如果重写了原型并且没有显示的添加constructor指向构造函数，constructor将不能正确判断数据类型](#改变constructor的指向)
:::
::: info Object.prototype.toString.call
Object.prototype.toString.call
:::

### 如何获取安全的undefined

由于`undefined`是一个标识符，即可以用作变量，也可以作为值。通过`void 0`获取安全的`undefined`。

```js
var undefined = 1
var test = undefined // [!code --]
var test = void 0 // [!code ++]
```

### Object.is()与"=="、"==="的区别

1. `==`在进行判断时，如果两边类型不一致会进行类型转换后再比较
2. `===`在进行判断时，如果两边类型不一致不会进行转性转换
3. `Object.is()`基本等同于`===`，它处理了一些特殊的情况，比如`-0`和`+0`不再相等，两个NaN是相等的

## 创建对象

### 工厂模式

工厂模式的问题，不能确定对象的类型

```js {2,7}
function createPerson(name) {
  const o = new Object()
  o.name = name
  o.sayName = function() {
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
  this.sayName = function() {
    console.log(this.name)
  }
}
const person1 = new Person('tom')

console.log(person1.constructor === Person) // true
console.log(person1 instanceof Person) // true
```

::: info 构造函数使用new进行实例化，内部执行操作：
1. 创建一个新的对象
2. 将该对象的[[prototype]]指向构造函数的prototype属性
3. 将构造函数内部的this指向该对象
4. 执行构造函数内部的代码
5. 返回该对象
:::

### 原型模式

在JavaScript中每一个函数都会创建一个prototype属性，该属性指向的对象就是构造函数实例化对象的原型。在原型上定义的属性和方法，实例对象通过原型链都是可以访问的，这就解决了构造函数模式内部方法在实例对象中重复定义的问题。但是原型模式也并非完美，原型模式的问题在于原型上的属性在实例中也是共享的，即一个实例修改了原型的属性会影响其他实例。

```js
function Person() {}
Person.prototype.name = 'tom'
Person.prototype.sayName = function() {
  console.log(this.name)
}
const person1 = new Person()
const person2 = new Person()
console.log(person1.sayName === person2.sayName) // true
```

::: info
构造函数、原型对象、实例之间的关系，构造函数的prototype指向原型对象，原型对象在默认情况下会自动获得一个constructor属性，指回构造函数，在构造函数实例化对象的过程中我们知道，实例对象会有一个[[Prototype]]指向原型对象，由于原型对象的constructor是共享的，因此间接的实例对象也能通过constructor指向构造函数。由此可知，构造函数与原型之间是直接的联系，实例与构造函数之间没有直接的联系。
:::

![构造函数、原型、实例对象的管理](/images/2.png)

#### 原型的判断方法

isPrototypeOf、getPrototypeOf

```js {8,9}
function Person() {}
Person.prototype.name = 'tom'
Person.prototype.sayName = function() {
  console.log(this.name)
}
const person1 = new Person()

console.log(Person.prototype.isPrototypeOf(person1)) // true
console.log(Object.getPrototypeOf(person1) === Person.prototype) // true
```

#### 改变constructor的指向

::: info
通过 **Obj.prototype.xxx = xxx** 添加属性显得繁琐，利用字面量可以快速直观的批量定义属性和方法。但是利用字面量会产生一个问题，那就是改变了原型的cunstructor的指向，实例对象通过constructor也随之改变（在利用字面量重写原型之前实例化的对象不受影响），因为字面量语法相当于重写了原型对象，通过在字面量中显示的添加cunstructor重新指向构造函数。
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

#### 原型链

原型链是ECMAScript中的主要继承方式，其基本思想是通过原型继承多个引用类型的属性和方法。具体实现方法是将构造函数的原型赋值为另一个要继承的构造函数的实例对象。

::: tip
所有引用类型都继承自Object，这也是为什么自定义类型能够继承包括toString()、valueOf()在内的所有默认方法的原因。
:::

### 组合使用构造函数模式和原型模式

组合构造函数模式和原型模式是创建自定义类型的最常见的方式，集两种模式之长，构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。

```js
function Person(name) {
  this.name = name
}
Person.prototype = {
  constructor: Person,
  sayName: function() {
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

<script setup>
// function Person(name) {
//   this.name = name
// }

// const p1 = new Person('tom')
// console.dir(Person)
// console.log(p1.constructor)
// function Person() {}
// Person.prototype.name = 'tom'
// Person.prototype.sayName = function() {
//   console.log(this.name)
// }

// const p1 = new Person()
// console.dir(Person)
// console.log(p1)

function Animal() {}
// Animal.prototype.name = 'cat'
Animal.prototype = {
  name: 'cat'
}
const a1 = new Animal()
console.log(Animal.prototype)
console.log(Animal.prototype.constructor)
console.log(a1)
console.log(a1 instanceof Animal)
</script>