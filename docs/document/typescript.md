---
outline: deep
---

# TypeScript

TypeScript --> JavaScript的超集

## any类型、unkown类型、never类型

### any类型

无法明确一个变量的类型时可以使用any类型，any类型属于TypeScript中的顶层类型。当一个变量的类型被设为any时，typescript将不再对其进行类型检查，变量可以被赋值为任意值。同时，any类型的变量可以赋值给其他类型的变量而不会报错（any带来的变量污染问题）。

```js {5,7}
let a: any = 'tom'

let b: number = 1

a = 1 // 不会报错

b = a // 不会报错
```

### unkown类型

同any类型一样，unkown类型表示类型不确定，可能是任意类型，unkown类型也是TypeScript中的顶层类型。unkown类型解决了any类型污染其他变量的问题，unkown类型的变量不能直接赋值给其他类型（除了any类型）的变量。

```js {5}
let a: unkown = 'tom'

let b: number = 1

let c: any = ''

a = b // error

c = a // 不报错
```

不能直接调用unkown类型变量的属性和方法

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

unkown类型的变量只能进行有限的运算，包括比较运算（`==`、`!==`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（`!`）、`typeof`运算和`instanceof`运算，用于其他运算是将会报错。

```js
let a: unkown = 'tom'

1 + a // error
```

unkown类型需要配合类型缩小进行使用，先明确变量的实际类型，再使用。

```js
let a: unkown = 'tom'

if (typeof a === 'string') {
  a.trim() // 不报错
}
```

### never类型

never类型是TypeScript中的底层类型，在typescript中任何类型都包含了never类型。