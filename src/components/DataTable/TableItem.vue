<template>
  <td>{{ id }}</td>
  <td>{{ firstName }}</td>
  <td>{{ lastName }}</td>
  <td>{{ email }}</td>
  <td>{{ phone }}</td>
</template>

<script>
export default {
  props: {
    id: [Number, String],
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
};
</script>

<style lang="scss">
</style>