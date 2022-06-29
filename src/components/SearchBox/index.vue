<template>
  <div class="searchbox-container">
    <div class="popup-handler-container" @click="togglePopup">
      <section class="no-clickable">
        <slot name="handler"><button>choose</button></slot>
      </section>
    </div>
    <Popup v-model="showModal" position="bottom" :style="{ height: '100%' }">
      <div class="popup-container">
        <section class="search-box">
          <div class="search-field">
            <Search v-model="searchText" :placeholder="searchPlaceholder" @input="handleSearch" />
          </div>
          <div class="search-list">
            <div
              v-for="source in dataSources"
              :key="source[dataKey]"
              class="item-wrapper"
              @click="handleItemClick(toJS(source))"
            >
              <slot name="dataComponent" v-bind:source="source"></slot>
            </div>
            <slot name="footer" v-if="hasMore && dataSources.length"></slot>
          </div>
        </section>
        <section class="button-group">
          <Button type="primary" block @click="togglePopup">关闭</Button>
        </section>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup, Button, Search } from 'vant';
import throttle from 'lodash.throttle';
import { toJS } from '../../utils';

export default {
  name: 'SearchBox',
  components: {
    Popup,
    Button,
    Search,
  },
  props: {
    dataSources: {
      type: Array,
      required: true,
      default: function() {
        return [];
      },
    },
    dataKey: {
      type: [String, Function],
      required: true,
    },
    bottomThreshold: {
      type: Number,
      default: 200,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    searchPlaceholder: {
      type: String,
      default: '请输入搜索',
    },
  },
  data() {
    return {
      showModal: false,
      searchText: '',
      bottom: false,
      containerRef: null,
    };
  },
  methods: {
    togglePopup() {
      this.showModal = !this.showModal;
    },
    handleSearch(value) {
      this.$emit('onSearch', value);
    },
    handleItemClick(itemData) {
      this.$emit('onItemClick', { data: itemData, closeModal: this.togglePopup });
    },
    toJS(src) {
      return toJS(src);
    },
    getContainerHeight() {
      if (this.containerRef) {
        const containerHeight = this.containerRef.getBoundingClientRect().height;
        return containerHeight;
      } else {
        return 0;
      }
    },
    async getContentHeight(itemLen = 0) {
      await this.$nextTick();
      const itemWrapper = document.querySelector('.item-wrapper');
      if (itemWrapper) {
        const itemHeight = itemWrapper.getBoundingClientRect().height;
        return itemHeight * itemLen;
      } else {
        return 0;
      }
    },
    async isContentReachBottom() {
      const containerHeight = this.getContainerHeight();

      const contentHeight = await this.getContentHeight(this.dataSources.length);

      return containerHeight <= contentHeight;
    },
    scrollHandler() {
      this.bottom = this.bottomVisible();
    },
    bottomVisible() {
      const scrollTop = this.containerRef.scrollTop;
      const visible = this.containerRef.getBoundingClientRect().height;
      const scrollHeight = this.containerRef.scrollHeight;
      const bottomOfElm = visible + scrollTop >= scrollHeight - this.bottomThreshold;
      return bottomOfElm;
    },
    emitToBottom: throttle(function emitEvent() {
      if (this.hasMore) {
        this.$emit('toBottom');
      }
    }, 150),
  },
  watch: {
    showModal(modalOpen) {
      if (modalOpen) {
        this.$nextTick(() => {
          this.containerRef = document.querySelector('.search-list');
          // 检查初始化的内容列表是否太短，未触及底部
          this.containerRef.addEventListener('scroll', this.scrollHandler);
        });
      }
    },
    bottom(newVal) {
      if (newVal) {
        this.emitToBottom();
      }
    },
    dataSources: {
      async handler(newVal, oldValue) {
        // 如果有新数据加入，需要把是否达到底部的标志手动重置：当用户快速迅猛地滑动到底，此时如果新数据只有一条，bottom属性可能不会经历从false到true的过程，直接就一只是true，那就不会 emit 新的 toBottom 事件，整个画面就卡住了
        if (newVal.length > oldValue.length) {
          this.bottom = false;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
div.popup-handler-container {
  .no-clickable {
    pointer-events: none;
  }
}

.popup-container {
  position: relative;
  height: 100vh;
  width: 100%;

  section.search-box {
    height: calc(100% - 52px);

    .search-field {
      height: 44px;
    }

    .search-list {
      height: calc(100% - 44px);
      overflow-y: scroll;
    }
  }

  section.button-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
  }
}
</style>
