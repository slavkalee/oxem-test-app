<template>
  <button class="tab__item" @click="getUsers(data)">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: String,
    data: String,
    getUsers: Function,
  },
};
</script>

<style lang="scss" scoped>
.tab__item {
  font-family: "Ubuntu";
  letter-spacing: 1px;
  padding: 20px 25px;
  background: #fff;
  border: 1px solid #304d74;
  border-top: none;
  color: #304d74;
  font-weight: bold;
  outline: 0;
  &.active {
    color: #fff;
    background: #304d74;
  }
  &:first-child {
    border-bottom-left-radius: 15px;
  }
  &:last-child {
    border-bottom-right-radius: 15px;
    border-left: none;
  }
}
</style>