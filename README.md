# vue searchbox mobile

搜索并展示无限滚动列表

## 安装

**yarn:**

```
yarn add vue-searchbox-mobile
```

**npm:**

```
npm install vue-searchbox-mobile
```

## 快速起步

```javascript
 <VueSearchBox
      :dataKey="'id'"
      :dataSources="items"
      :hasMore="hasMore"
      searchPlaceholder="输入药品名搜索"
      @toBottom="loadMore"
      @onItemClick="handleClick"
      @onSearch="handleSearch"
    >
      <template v-slot:handler>
        <Button type="primary">open</Button>
      </template>
      <template v-slot:dataComponent="{ source }">
        <div>{{ source }}</div>
      </template>
      <template v-slot:footer><Loading /></template>
  </VueSearchBox>
```

### 必填 props 说明

| prop        | 类型               | 描述                                       | 必填 |
| ----------- | ------------------ | ------------------------------------------ | ---- |
| dataSources | Array<Object>      | 列表的数据源                               | 是   |
| dataKey     | String ｜ Funcrion | 列表项的 key，需要为列表数据源中的唯一字段 | 是   |

## 无限加载

当列表滚动到底部时，会向上 emit 一个 toBottom 事件，在事件处理函数中加载新数据，并拼接到 dataSources 中。通过添加 footer 插槽，在加载数据的时候加 loading 样式，会自动添加到列表底部，没数据时移除插槽。
