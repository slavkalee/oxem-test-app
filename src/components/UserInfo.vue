<template>
  <div class="user" v-if="visible">
    <div class="close">
      <button class="icon-btn" @click="setEditable" v-if="!editable">
        <i class="material-icons">edit</i>
      </button>
      <button class="icon-btn" @click="hide">
        <i class="material-icons">clear</i>
      </button>
    </div>

    <div class="user__name">
      Выбран пользователь <b>{{ user.firstName + " " + user.lastName }}</b>
    </div>
    <div class="user__description">
      <div class="user__description_title">Описание:</div>
      <div class="user__text" v-if="!editable && user.description">
        {{ capitalize(user.description) }}
      </div>
      <b v-if="!user.description && !editable">Описания нету</b>
      <textarea
        v-model="inputValues.description"
        v-if="editable"
      />
    </div>
    <div class="user__address">
      <div class="user__row">
        <div class="user__subtitle">Адрес проживания:</div>
        <div class="user__text" v-if="!editable">
          {{ addressInfo(user.address.streetAddress) }}
        </div>
        <input
          type="text"
          class="user__input"
          v-model="inputValues.streetAddress"
          v-if="editable"
        />
      </div>
      <div class="user__row">
        <div class="user__subtitle">Город:</div>
        <div class="user__text" v-if="!editable">
          {{ addressInfo(user.address.city) }}
        </div>
        <input
          type="text"
          class="user__input"
          v-model="inputValues.city"
          v-if="editable"
        />
      </div>
      <div class="user__row">
        <div class="user__subtitle">Провинция/Штат:</div>
        <div class="user__text" v-if="!editable">
          {{ addressInfo(user.address.state) }}
        </div>
        <input
          type="text"
          class="user__input"
          v-model="inputValues.state"
          v-if="editable"
        />
      </div>
      <div class="user__row">
        <div class="user__subtitle">Индекс:</div>
        <div class="user__text" v-if="!editable">
          {{ addressInfo(user.address.zip) }}
        </div>
        <input
          type="text"
          class="user__input"
          v-model="inputValues.zip"
          v-if="editable"
        />
      </div>
    </div>
    <div class="user__actions" v-if="editable">
      <button class="table-btn btn-add" @click="onSubmit">
        Сохранить изменения
      </button>
      <button class="table-btn btn-remove" @click="removeUser">
        Удалить пользователя
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import { useStore } from "vuex";

import { capitalize } from "@/utils";

export default {
  props: {
    userData: Object,
    visible: Boolean,
    hide: Function,
  },
  setup(props) {
    const store = useStore();

    const user = computed(() => store.getters.getUser(props.userData));

    watch(
      () => user.value && user.value,
      () => {
        inputValues.description = props.userData.description;
        inputValues.streetAddress = props.userData.address.streetAddress;
        inputValues.city = props.userData.address.city;
        inputValues.state = props.userData.address.state;
        inputValues.zip = props.userData.address.zip;
      }
    );

    const inputValues = reactive({
      description: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    });

    const removeUser = () => {
      props.hide();
      store.commit("removeUser", user.value);
    };

    const onSubmit = () => {
      editable.value = false;
      console.log(inputValues.description);

      store.commit("changeInfo", {
        user: user.value,
        description: inputValues.description,
        address: {
          streetAddress: inputValues.streetAddress,
          city: inputValues.city,
          state: inputValues.state,
          zip: inputValues.zip,
        },
      });
    };

    const editable = ref(false);
    const setEditable = () => (editable.value = !editable.value);

    watch(
      () => user.value,
      () => {
        editable.value = false;
      }
    );

    const emptySymbol = "--";

    const addressInfo = (address) => (address ? address : emptySymbol);

    return {
      user,
      removeUser,
      onSubmit,
      addressInfo,
      editable,
      setEditable,
      capitalize,
      inputValues,
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  position: fixed;
  right: 25px;
  width: 425px;
  padding: 45px 20px 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;

  &__description_title {
    padding: 15px 0 5px;
  }
  &__address {
    margin-top: 20px;
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
  &__text {
    font-weight: bold;
  }
  &__input {
    border: none;
    outline: 0;
    border-radius: 5px;
    padding: 5px 5px 5px 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    &:focus-within {
      box-shadow: 0 0 8px rgb(12, 119, 12);
    }
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  &:focus-within {
    box-shadow: 0 0 8px rgb(12, 119, 12);
  }
}
</style>