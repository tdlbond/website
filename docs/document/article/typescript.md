---
outline: deep
---

# TypeScript

TypeScript --> JavaScript 的超集

## any 类型、unkown 类型、never 类型

### any 类型

无法明确一个变量的类型时可以使用 any 类型，any 类型属于 TypeScript 中的顶层类型。当一个变量的类型被设为 any 时，typescript 将不再对其进行类型检查，变量可以被赋值为任意值。同时，any 类型的变量可以赋值给其他类型的变量而不会报错（any 带来的变量污染问题）。

```js {5,7}
let a: any = 'tom'

let b: number = 1

a = 1 // 不会报错

b = a // 不会报错
```

### unkown 类型

同 any 类型一样，unkown 类型表示类型不确定，可能是任意类型，unkown 类型也是 TypeScript 中的顶层类型。unkown 类型解决了 any 类型污染其他变量的问题，unkown 类型的变量不能直接赋值给其他类型（除了 any 类型）的变量。

```js {5}
let a: unkown = 'tom'

let b: number = 1

let c: any = ''

a = b // error

c = a // 不报错
```

不能直接调用 unkown 类型变量的属性和方法

```js
let a: unkown = {
  name: 'tom'
}
a.name // error

let b: unkown = 'tom'
b.trim() // error

let c: unkown = (n) => n
c() // error
```

unkown 类型的变量只能进行有限的运算，包括比较运算（`==`、`!==`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（`!`）、`typeof`运算和`instanceof`运算，用于其他运算是将会报错。

```js
let a: unkown = 'tom'

1 + a // error
```

unkown 类型需要配合类型缩小进行使用，先明确变量的实际类型，再使用。

```js
let a: unkown = 'tom'

if (typeof a === 'string') {
  a.trim() // 不报错
}
```

### never 类型

never 类型是 TypeScript 中的底层类型，在 typescript 中任何类型都包含了 never 类型。

## 运算符

### keyof

接受一个对象类型作为参数，返回对象类型所有键名组成的联合类型。

```js

```
