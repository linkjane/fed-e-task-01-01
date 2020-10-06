### 一，简答题
#### 1， webpack的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

### 2，Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
**loaders**: 适用于模块源代码转换，import时可以预处理文件

* l

**plugins**: 插件是可以做任何loader不能做的事情，一个插件也就是一个方法或者带有apply方法的对象，apply方法会被webpack编译器调用，从而可以访问整个编译生命周期
```javascript
    class TestPlugin {
        apply(compiler) {
            compiler.hooks.run.tap('pluginName', compilation => {
                 
            })       
        }          
    }
```
