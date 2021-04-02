<template>
  <div class="pagination">
    <button
      class="icon-btn"
      @click="prevPage"
      :disabled="currentPage === 1"
      v-if="total"
    >
      <i class="material-icons arrow">chevron_left</i>
    </button>
    <button
      class="page-number"
      v-for="(page, index) in generatePageRange"
      :key="index"
      @click="selectPage(page)"
      v-show="pageCount > 0"
      :class="{ active: page === currentPage }"
      :disabled="typeof page === 'string'"
    >
      {{ page }}
    </button>
    <button
      class="icon-btn"
      @click="nextPage"
      :disabled="currentPage === pageCount"
      v-if="total"
    >
      <i class="material-icons arrow">chevron_right</i>
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    total: Number,
    limit: Number,
    currentPage: Number,
    onPageChange: Function,
  },
  setup(props) {
    const pageCount = computed(() => {
      return Math.ceil(props.total / props.limit);
    });

    const nextPage = () => {
      props.onPageChange(props.currentPage + 1);
    };
    const prevPage = () => {
      props.onPageChange(props.currentPage - 1);
    };

    const selectPage = (page) => {
      props.onPageChange(page);
    };

    const generatePageRange = computed(() => {
      const delta = 2;

      const range = [];
      for (
        let i = Math.max(2, props.currentPage - delta);
        i <= Math.min(pageCount.value - 1, props.currentPage + delta);
        i += 1
      ) {
        range.push(i);
      }

      if (props.currentPage - delta > 2) {
        range.unshift("...");
      }
      if (props.currentPage + delta < pageCount.value - 1) {
        range.push("...");
      }

      range.unshift(1);
      if (pageCount.value !== 1) range.push(pageCount.value);

      return range;
    });

    return {
      generatePageRange,
      pageCount,
      nextPage,
      prevPage,
      selectPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}
.page-number {
  font-size: 15px;
  outline: 0;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background: rgb(233, 231, 231);
  width: 40px;
  height: 40px;
  margin: 0 3px;
  transition: 0.3s;
  &.active {
    background: #304d74;
    color: #fff;
    box-shadow: 0 0 3px #05152b;
  }
  &:disabled {
    background: transparent;
    border: none;
    color: #000;
    cursor: auto;
    padding: 0;
    font-size: 23px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
}
.icon-btn {
  background: transparent;
  outline: 0;
  border: none;
  cursor: pointer;
  margin: 0 20px;
  & i {
    color: rgb(0, 106, 177);
    font-size: 30px;
  }
  &:disabled i {
    color: #a0a1a3;
  }
}
</style>