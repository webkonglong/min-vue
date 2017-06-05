# min-vue
模拟了一个vue
看看实现思路就行，千万别想不开 用介个做项目。

引入```html<script src="文件路径.js"></script>```

### html
```html 
<div id="app">
   <h2 v-text="title"></h2>
   <p v-text="name"></p>
   <input v-model="name">
   <div v-onclick="change1" class="change"></div>
   <div v-onclick="change2" class="change"></div>
   <div v-onclick="change3" class="change"></div>
</div> 
```

### css
```css 
  .change {
    width: 100px;
    height: 20px;
    background-color: #abcdef;
    margin-top: 10px;
  }
```

### javascript
```js 
  new Amz({
    el: '#app',
    data: {
     name: 'Amz',
     title: 'Hello Amz!'
    },
    methods: {
     change1 () {
      this.name = "amzamz"
      this.change()
      this.$emit('chufa', 'chufachufa')
     },
     change2 () {
      console.log('change2被点击了')
      this.$on('chufa', argu => {
      console.log(argu)
      })
     },
     change3 () {
      console.log('change3被点击了')
     },
     change () {
      console.log('我来测试函数调用')
     }
    }
  })
```
