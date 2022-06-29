# Vue scroll list

横向滚动列表，带无限滚动，滚动导航功能

tips：长按导航箭可以切换连续滚动

![image-20201218162322496](data:image/png;base64,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)



## 安装



**yarn:**

```
yarn add @ylz/vue-scroll-list
```

**npm:**

```
npm install @ylz/vue-scroll-list
```



## 快速起步

```javascript
 <VueScrollList

      :dataSources="items"

      :dataComponent="Item"

      :dataKey="'id'"

 />
```

### 必填 props 说明

| prop          | 类型               | 描述                                      | 必填 |
| ------------- | ------------------ | ----------------------------------------- | ---- |
| dataSources   | Array<Object>      | 列表的数据源                              | 是   |
| dataComponent | Vue Component      | 单个列表项的组件                          | 是   |
| dataKey       | String ｜ Funcrion | 列表项的key，需要为列表数据源中的唯一字段 | 是   |



## 无限加载

但列表滚动到底部时，会向上 emit 一个 toBottom 事件，在事件处理函数中加载新数据，并拼接到 dataSources 中。通过添加 footer 插槽，在加载数据的时候加loading样式，会自动添加到列表底部，没数据时移除插槽。

```javascript
<template>
	<VueScrollList
      :dataKey="'id'"
      :dataSources="items"
      :dataComponent="Item"
      :bottomThreshold="200"
      @toBottom="loadMore"
    >
      // 通过添加footer插槽，在加载数据的时候加loading样式
      <div slot="footer" class="loading-spinner">Loading...</div> 
    </VueScrollList>
</template>

<script>
export default {
  // ...
  data() {
    return {
      items: getData(50),
      Item: ListItem,
    }
  },
  methods: {
    loadMore() {
      const newData = getData(20)
      this.items = this.items.concat(newData)
    },
  },
}
</script>
```



### slot

```javascript
 <VueScrollList
      :dataKey="'id'"
      :dataSources="items"
      :dataComponent="Item"
      :containerClass="'time-line-items-wrapper'"
      :bottomThreshold="200"
      @toBottom="loadMore"
    >
      <div slot="footer" class="loading-spinner"><Loading /></div>
      <div slot="leftArrow">👈</div>
      <div slot="rightArrow">👉</div>
 </VueScrollList>
```



| slot name  | 描述                                     | 必填 |
| ---------- | ---------------------------------------- | ---- |
| footer     | 列表底部插槽，一般在无限加载场景使用     | 否   |
| leftArrow  | 左导航按键的插槽，自定义左导航按键的样式 | 否   |
| rightArrow | 右导航按键的插槽，自定义右导航按键的样式 | 否   |



## 其他props

| props           | 类型   | 描述                                 | 必填 | 默认值 |
| --------------- | ------ | ------------------------------------ | ---- | ------ |
| scrollOffset    | Number | 点击左右导航箭头时移动的距离（像素） | 否   | 200    |
| bottomThreshold | Number | 触发toBottom事件的阈值（像素）       | 否   | 100    |
| containerClass  | String | 自定义滚动容器的 class               | 否   |        |


