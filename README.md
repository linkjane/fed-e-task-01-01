# 王木真 ｜ part 1 | 模块1
## 第一题
10， 用var声明变量的作用域是当前执行上下文，此处i和a[6]是一样的执行上下文，此时i已经是10
## 第二题
referenceError， let 声明的变量在被定义时候才初始化，而且是块级作用域，所以提前使用一个不存在的变量会出错
## 第三题
Math.min(...arr)
## 第四题
var作用域是当前执行上下文，会存在变量提升，let和const是块级作用域，不存在变量提升
## 第五题
array funciton 没有自身绑定的this，其中的this指向fn执行时对应的对象obj，所以结果是：20
## 第六题
阻止对象属性名冲突，唯一对象属性名
## 第七题
首先值类型都会复制，然后浅拷贝对于引用类型会只更改指针指向，深拷贝则是创建新的引用类型并递归复制
## 第八题
异步编程：js执行时是单线程，一些任务需要在主线程空闲时候执行，那些任务的执行和书写代码的顺序不同所以称为异步反之和代码书写顺序执行相同的是同步（个人口述）。
event loop：事件循环机制，把一些消息事件放到事件队列中，当主线程执行完毕空闲时候，会取出事件队列中靠前的任务然后压入执行栈中执行，当主线程又空闲时候，又会取出事件队列中靠前的任务，这个过程一直循环直到事件队列中的所有任务完成，所以成功event loop
宏任务，微任务都是异步任务，一次事件循环中，先执行取的微任务再执行宏任务
## 第九题
```javascript
  new Promise(resolve => {
    setTimeout(function() {
      const a = 'hello';
      resolve(a);
    }, 10)
  }).then(a => {
    return New promise(resolve => {
      setTimeout(function(){
        const b = 'lagou';
        resolve({a, b});
      }, 10)
    })
  }).then(({a, b}) => {
    setTimeout(function() {
      const c = 'I love you';
      console.log(a + b + c);
    }, 10)
  })
```
## 第十题
ts是js的超集，
## 第十一题
###优点
* 类型系统对于编程过程和debug会很友好
* 可以更早的使用ecmascript的新语法
* 协作开发时候可以更容易读懂代码
###缺点
* 新的学习成本
* 编写时需要一边编译ts到js一边开发，后期可能会很慢
