---
title: "[WEB技术]vuex所有核心概念完整解析State Getters Mutations Actions"
catalog: true
date: 2018-12-15 15:33:11
subtitle: WEB技术
header-img: 
tags: WEB技术
---

vuex是解决vue组件和组件间相互通信而存在的，vuex理解起来稍微复杂，但一旦看懂则即为好用：

安装：

```
npm install --save vuex

```

引入

```
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

```

vuex的几个参数的介绍

State：储存初始化数据

Getters：对State 里面的数据二次处理（对数据进行过滤类似filter的作用）比如State返回的为一个对象，我们想取对象中一个键的值用这个方法

Mutations：对数据进行计算的方法全部写在里面（类似computed） 在页面中触发时使用this.$store.commit('mutationName') 触发Mutations方法改变state的值

Actions：处理Mutations中已经写好的方法 其直接触发方式是 this.$store.dispatch(actionName)

我们先不急着了解更多先打印下Vuex

```
console.log(Vuex) //Vuex为一个对象里面包含
Vuex ={
    Store:function Store(){},    
    mapActions:function(){},    // 对应Actions的结果集
    mapGetters:function(){},    //对应Getters的结果集
    mapMutations:function(){},  //对应Mutations的结果集
    mapState:function(){},      //对应State的结果集
    install:function install(){}, //暂时不做讲解 
    installed:true //暂时不做讲解
}
//如果我们只需要里面的State时我们可以这样写
import { mapState } from 'vuex';
import { mapGetters, mapMutations } from 'vuex'; //如果需要引用多个时用这种方式处理
```
反复看上面的内容是不是就豁然开朗了接下来我们进行依次举例和用官方的语言描述

State

State负责存储整个应用的状态数据，一般需要在使用的时候在跟节点注入store对象，后期就可以使用this.$store.state直接获取状态

```
//store为实例化生成的
import store from './store' 

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

```

这个store可以理解为一个容器，包含着应用中的state等。实例化生成store的过程是：　　

```

//./store文件
const store = new Vuex.Store({
  state: {   //放置state的值
    count: 0,
    strLength:"abcd234"
  },
  getters: {   //放置getters方法
      strLength: state => state.aString.length
  },
  mutations: {   //放置mutations方法
       mutationName(state) {
          //在这里改变state中的数据
          state.count = 100;
       }
  },
  // 异步的数据操作
  actions: {      //放置actions方法
       actionName({ commit }) {
          //dosomething
         commit('mutationName')
      },
      getSong ({commit}, id) {
          api.getMusicUrlResource(id).then(res => {
            let url = res.data.data[0].url;
        
          })
          .catch((error) => {  // 错误处理
              console.log(error);
          });
      }
  }
});
export default store;

```

后续在组件中使用的过程中，如果想要获取对应的状态你就可以直接使用this.$store.state获取，当然，也可以利用vuex提供的mapState辅助函数将state映射到计算属性中去，如

```

import {mapState} from 'vuex'

export default {  //组件中
  computed: mapState({
    count: state => state.count
  })
}

```

Getters

有些状态需要做二次处理，就可以使用getters。通过this.$store.getters.valueName对派生出来的状态进行访问。或者直接使用辅助函数mapGetters将其映射到本地计算属性中去。

在组件中使用方式

```

import {mapGetters} from 'vuex'

export default {  
computed: mapGetters([
'strLength'
])
}

```

Mutations

Mutations的中文意思是“变化”，利用它可以更改状态，本质就是用来处理数据的函数，其接收唯一参数值state。store.commit(mutationName)是用来触发一个mutation的方法。需要记住的是，定义的mutation必须是同步函数，否则devtool中的数据将可能出现问题，使状态改变变得难以跟踪。

在组件中触发：

```

复制代码
export default {
  methods: {
    handleClick() {
      this.$store.commit('mutationName')
    }
  }
}

```

或者使用辅助函数mapMutations直接将触发函数映射到methods上，这样就能在元素事件绑定上直接使用了。如：

```

import {mapMutations} from 'vuex'
export default {
  methods: mapMutations([
    'mutationName'
  ])
}

```

Actions

Actions也可以用于改变状态，不过是通过触发mutation实现的，重要的是可以包含异步操作。其辅助函数是mapActions与mapMutations类似，也是绑定在组件的methods上的。如果选择直接触发的话，使用this.$store.dispatch(actionName)方法。

在组件中使用

```

import {mapActions} from 'vuex'
//我是一个组件
export default {
  methods: mapActions([
    'actionName',
  ])
}

```

 Plugins

插件就是一个钩子函数，在初始化store的时候引入即可。比较常用的是内置的logger插件，用于作为调试使用。

```
//写在./store文件中
import createLogger from 'vuex/dist/logger'
const store = Vuex.Store({
  ...
  plugins: [createLogger()]
})
```