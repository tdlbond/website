---
outline: deep
---
# JavaScript八股文

一些无聊但是得懂的八股文，巴拉巴拉巴拉

## JavaScript中的数据类型

JavaScript有8种数据类型，Undefined、Null、Boolean、Number、String、Symbol、BigInt、Object，前7种属于原始数据类型，Object属于引用数据类型，其中Symbol和BigInt是ES6新增的数据类型。

![An image](/images/1.png)

### Symbol

在ES5中对象的属性名都是字符串，这就容易造成属性名重复的冲突，为了解决这个问题，ES6引入了新的原始数据类型Symbol，它是一个独一无二的值。

```js
const s1 = Symbol() // Symbol()
const s2 = Symbol('tom') // Symbol(tom)
const s3 = Symbol('tom') // Symbol(tom)

s2 === s3 // false

s1.toString() // "Symbol()"

s2.description // "tom"

// Symbol值不能与其他类型的值进行运算，但是可以转换为字符串和布尔值，不能转换成数值。
'tom' + s2 // 报错
`tom ${s2}` // 报错
Number(s2) // 报错

// Symbol值作为对象属性被遍历时，不会出现在for in、for of循环中，也不会被Object.keys(), Object.getOwnPropertyNames(), JSON.stringify()返回，可以通过Object.getOwnPropertySymbols()，Reflect.ownKeys()返回

// Symbol.for，Symbol.keyFor，Symbol.for接受一个字符串作为参数，在全局环境下查找是否有以该参数作为名称的Symbol值，有的话直接返回，没有的话创建一个新的值，并注册到全局环境中，Symbol.keyFor会在全局环境中查找被注册的Symbol.for创建的值，找不到返回undefined
const foo = Symbol.for('foo')
const bar = Symbol.for('foo')
foo === bar // true
Symbol.keyFor(s3) // undefined
Symbol.keyFor(foo) // "foo"
```

### BigInt

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用BigInt 可以安全地存储和操作大整数，即使这个数已经超出了Number 能够表示的安全整数范围。

### 原始数据类型、引用数据类型在内存中的位置

原始数据类型存储在栈中，引用数据类型存储在堆中。<br>
当我们的代码被执行时，原始数据类型的数据直接在当前执行上下文的变脸环境中，而引用类型的数据存放在堆中，然后生成一个指向该对象在堆中位置的指针

### 判断数据类型

1. typeof
2. instanceof
3. constructor
4. Object.prototype.toString.call