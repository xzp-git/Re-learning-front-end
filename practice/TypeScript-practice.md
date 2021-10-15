## 第一题
以下代码为什么会提示错误，应该如何解决？
```js
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer'
  }
}
```
### 报错原因
- 泛型 `T`由于是在调用该函数的时候才能确定，`T`类型有可能会存在别的类型，因此返回值`{id: u.id, kind: 'customer'}`, 不一定符合泛型`T`。
- 例如 上述列子： `MyUser`的类型符合`User`类型的约束，但是还存在`age`类型，显然函数的返回值，并不满足`MyUser`类型。
### 解决办法
- 让返回值满足泛型`T`
```js
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: 'customer'
  };
}
```
- 在不确定泛型`T`的情况下不推荐类型断言。

## 第二题
本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

```js
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
```
### 答案
- 函数重载
```js
function f(a:string, b:string):string
function f(a:number, b:number):number
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}
```

- 泛型约束
```js
function f<T extends string|number>(a:T, b:T) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}
```