<template>
  <div id="app">
    <SearchBox
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
    </SearchBox>
  </div>
</template>

<script>
import { getData } from './mockData';
import SearchBox from './components/SearchBox/index.vue';
import { Button } from 'vant';
import Loading from './components/Loading.vue';

export default {
  name: 'App',
  data() {
    return {
      items: [],
      hasMore: true,
    };
  },
  components: {
    Button,
    SearchBox,
    Loading,
  },
  methods: {
    loadMore() {
      // 加载更多(分页)数据
      const newData = getData(10);
      this.items = this.items.concat(newData);
    },
    handleClick({ data, closeModal }) {
      console.log('click data:', data);
      console.log('关闭弹窗的方法 -->', closeModal);
    },
    handleSearch(value) {
      console.log('-----search------', value);
      // 拿到搜索词，发起请求
      if (!value) {
        this.items = [];
        return;
      }
      const newData = getData(50);
      this.items = newData;
    },
  },
};
</script>

<style lang="scss" scoped></style>
