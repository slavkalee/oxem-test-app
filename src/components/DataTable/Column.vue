<template>
  <th :width="width" @click="handleSort(`${name}`)">
    {{ name }}
    <i class="material-icons arrow" v-if="sort.isAsc && sort.key === name"
      >arrow_drop_up
    </i>
    <i class="material-icons arrow" v-if="!sort.isAsc && sort.key === name"
      >arrow_drop_down
    </i>
  </th>
</template>

<script>
export default {
  props: {
    name: String,
    width: String,
    sort: Object,
    handleSort: Function,
  },
};
</script>

<style lang="scss" scoped>
th {
  position: relative;
}
.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>