<template>
  <div class="user" v-if="visible">
    <div class="close">
      <button class="icon-btn" @click="hide">
        <i class="material-icons">clear</i>
      </button>
    </div>

    <div class="user__name">
      Выбран пользователь <b>{{ user.firstName + " " + user.lastName }}</b>
    </div>
    <div class="user__description">
      <div class="user__description_title">Описание:</div>
      <textarea v-model="user.description" />
    </div>
    <div class="user__address">
      <div class="user__row">
        <div class="user__subtitle">Адрес проживания:</div>
        <div class="user__text">{{ user.address.streetAddress }}</div>
      </div>
      <div class="user__row">
        <div class="user__subtitle">Город:</div>
        <div class="user__text">{{ user.address.city }}</div>
      </div>
      <div class="user__row">
        <div class="user__subtitle">Провинция/Штат:</div>
        <div class="user__text">{{ user.address.state }}</div>
      </div>
      <div class="user__row">
        <div class="user__subtitle">Индекс:</div>
        <div class="user__text">{{ user.address.zip }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    userData: Object,
    visible: Boolean,
    hide: Function,
  },
  setup(props) {
    const store = useStore();

    const user = computed(() => store.getters.getUser(props.userData));

    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  position: fixed;
  right: 25px;
  width: 425px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;

  &__row {
    display: flex;
    margin: 5px 0;
  }
  &__subtitle {
    width: 180px;
  }
  &__text {
    font-weight: bold;
  }
}
.close {
  position: absolute;
  top: 10px;
  right: 0;
}
textarea {
  width: 100%;
  min-height: 150px;
  margin-top: 10px;
  font-family: "Poppins";
  resize: none;
  border: none;
  outline: 0;
  border-radius: 15px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>