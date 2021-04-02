<template>
  <div class="table">
    <div class="options">
      <div class="input-field">
        <input
          class="filter_search"
          type="search"
          placeholder="Search"
          :value="searchString"
          @input="debouncedHandler"
        />
        <div class="search-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.1865 14.4716H15.9765L20.2165 18.7316C20.6266 19.1416 20.6266 19.8116 20.2165 20.2216C19.8065 20.6316 19.1366 20.6316 18.7265 20.2216L14.4765 15.9716V15.1816L14.2065 14.9016C12.8065 16.1016 10.8966 16.7216 8.86655 16.3816C6.08652 15.9116 3.86655 13.5916 3.52658 10.7916C3.00656 6.56158 6.5665 3.00158 10.7966 3.52157C13.5965 3.86157 15.9166 6.08157 16.3866 8.86157C16.7265 10.8916 16.1065 12.8016 14.9066 14.2016L15.1865 14.4716ZM5.47653 9.97155C5.47653 12.4615 7.48654 14.4716 9.97653 14.4716C12.4665 14.4716 14.4765 12.4615 14.4765 9.97155C14.4765 7.48156 12.4665 5.47155 9.97653 5.47155C7.48654 5.47155 5.47653 7.48156 5.47653 9.97155Z"
              fill="black"
              fill-opacity="0.54"
            />
          </svg>
        </div>
      </div>
      <div class="button-field" v-if="!formVisible">
        <button class="table-btn btn-add" @click="showForm">Добавить</button>
      </div>
      <div class="button-field" v-else>
        <button class="table-btn btn-add" @click="addUser">
          Добавить в таблицу
        </button>
        <button class="table-btn btn-cancel" @click="hideForm">Отменить</button>
      </div>
    </div>

    <div class="table-container">
      <transition name="info">
        <UserInfo
          :userData="userData"
          :visible="infoVisible"
          :hide="hideInfo"
        />
      </transition>
      <table>
        <thead>
          <tr class="thead">
            <Column
              :sort="sort"
              :handleSort="handleSort"
              width="8%"
              name="id"
            />
            <Column
              :sort="sort"
              :handleSort="handleSort"
              width="15%"
              name="firstName"
            />
            <Column
              :sort="sort"
              :handleSort="handleSort"
              width="20%"
              name="lastName"
            />
            <Column
              :sort="sort"
              :handleSort="handleSort"
              width="30%"
              name="email"
            />
            <Column
              :sort="sort"
              :handleSort="handleSort"
              width="20%"
              name="phone"
            />
          </tr>
        </thead>
        <tbody>
          <tr class="form" v-if="formVisible">
            <td>
              <input
                type="number"
                class="table__input"
                v-model="form.id"
                :class="{
                  invalid:
                    (v$.id.required.$invalid && v$.id.$dirty) ||
                    v$.id.numeric.$invalid,
                  valid: !v$.id.required.$invalid,
                }"
              />
              <span
                class="error__message"
                v-if="v$.id.required.$invalid && v$.id.$dirty"
                >Required</span
              >
            </td>

            <td>
              <input
                type="text"
                class="table__input"
                v-model="form.firstName"
                :class="{
                  invalid:
                    v$.firstName.required.$invalid && v$.firstName.$dirty,
                  valid: !v$.firstName.required.$invalid,
                }"
              />
              <span
                class="error__message"
                v-if="v$.firstName.required.$invalid && v$.firstName.$dirty"
                >Required</span
              >
            </td>
            <td>
              <input
                type="text"
                class="table__input"
                v-model="form.lastName"
                :class="{
                  invalid: v$.lastName.required.$invalid && v$.lastName.$dirty,
                  valid: !v$.lastName.required.$invalid,
                }"
              />
              <span
                class="error__message"
                v-if="v$.lastName.required.$invalid && v$.lastName.$dirty"
                >Required</span
              >
            </td>
            <td>
              <input
                type="text"
                class="table__input"
                v-model="form.email"
                :class="{
                  invalid:
                    (v$.email.required.$invalid && v$.email.$dirty) ||
                    (v$.email.email.$invalid && v$.email.$dirty),
                  valid:
                    !v$.email.required.$invalid && !v$.email.email.$invalid,
                }"
              />
              <span
                class="error__message"
                v-if="v$.email.required.$invalid && v$.email.$dirty"
                >Required</span
              >
              <span
                class="error__message"
                v-if="v$.email.email.$invalid && v$.email.$dirty"
                >Please enter your email correctly</span
              >
            </td>
            <td>
              <input
                type="tel"
                class="table__input"
                v-model="form.phone"
                :class="{
                  invalid:
                    (v$.phone.$dirty && v$.phone.required.$invalid) ||
                    (v$.phone.minLength.$invalid && v$.phone.$dirty),
                  valid:
                    !v$.phone.required.$invalid && !v$.phone.minLength.$invalid,
                }"
              />
              <span
                class="error__message"
                v-if="v$.phone.required.$invalid && v$.phone.$dirty"
                >Required</span
              >
              <span
                class="error__message"
                v-if="v$.phone.minLength.$invalid && v$.phone.$dirty"
                >10 symbols</span
              >
            </td>
          </tr>

          <tr
            v-for="user of displayData"
            :key="user.id + Math.random()"
            @click="onClickRow(user.id, user.firstName)"
          >
            <TableItem
              :id="user.id"
              :firstName="user.firstName"
              :lastName="user.lastName"
              :email="user.email"
              :phone="user.phone"
            />
          </tr>

          <tr v-if="!users.length">
            <td style="text-align: center" colspan="5">No results</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :total="users.length"
        :currentPage="currentPage"
        :limit="limit"
        :onPageChange="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useSort } from "@/composition/sort";
import { useForm } from "@/composition/form";
import { useCurrentUser } from "@/composition/currentUser";
import { debounce } from "@/utils";

import Pagination from "@/components/DataTable/Pagination";
import UserInfo from "@/components/UserInfo";
import Column from "@/components/DataTable/Column";
import TableItem from "@/components/DataTable/TableItem.vue";

export default {
  components: {
    Pagination,
    Column,
    UserInfo,
    TableItem,
  },
  props: {
    users: Array,
    searchString: String,
    searchHandler: Function,
  },
  setup(props) {
    const { sort, sorting, handleSort } = useSort();
    const currentPage = ref(1);
    const limit = 14;

    const onPageChange = (page) => {
      currentPage.value = page;
    };

    const displayData = computed(() => {
      const start = (currentPage.value - 1) * limit;
      const offset = currentPage.value * limit;

      const users = [...props.users];

      return users.sort(sorting).slice(start, offset);
    });

    watch(
      () => sort.key,
      () => {
        sort.isAsc = null;
      }
    );

    watch(
      () => props.users.length <= limit,
      () => (currentPage.value = 1)
    );

    const debouncedHandler = debounce((e) => {
      props.searchHandler(e);
    }, 400);

    return {
      displayData,
      sort,
      handleSort,
      debouncedHandler,
      currentPage,
      limit,
      onPageChange,
      ...useForm(),
      ...useCurrentUser(),
    };
  },
};
</script>

<style lang="scss">
.table-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
table {
  font-size: 18px;
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  border: none;
  overflow: hidden;
}
.table {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
}
.table-btn {
  border: none;
  padding: 10px 20px;
  outline: 0;
  cursor: pointer;
  font-family: "Ubuntu";
  font-size: 12px;
  border-radius: 15px;
}
.btn-add {
  color: #fff;
  background: #36b404;
  border: 1px solid #36b404;
  transition: 0.4s;
  &:hover {
    background: transparent;
    color: #36b404;
    box-shadow: 0 0 10px #36b404;
  }
}
.btn-cancel {
  color: #fff;
  background: #ecce23;
  border: 1px solid #ecce23;
  transition: 0.4s;
  margin-left: 10px;
  &:hover {
    background: transparent;
    color: #ecce23;
    box-shadow: 0 0 10px #ecce23;
  }
}
tr {
  cursor: pointer;
  transition: 0.4s;
  &:not(.thead) {
    border-bottom: 1px solid lightgray;
  }
  &:not(.thead):not(.form):hover {
    background: rgb(241, 241, 241);
  }
}
th {
  text-align: start;
  padding: 10px 15px;
  color: #000;
  background: #ececec;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: darken(#ececec, 10%);
  }
}
td {
  padding: 6px 10px;
  color: #000;
}
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
}

.input-field {
  position: relative;
  width: 40%;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
}

.filter_search {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border-radius: 15px;
  outline: 0;
  border: none;
  transition: 0.2s ease-in;

  &:focus-within {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}

.form td {
  padding: 0 10px 0;
  height: 85px;
}

.table__input {
  width: 100%;
  border: 1px solid lightgrey;
  background: #fff;
  outline: 0;
  border-radius: 5px;
  padding: 5px 0 5px 10px;

  &.valid {
    border: 1px solid rgb(10, 160, 43);
    box-shadow: 0 0 2px rgb(10, 160, 43);
  }
  &.invalid {
    border: 1px solid rgb(255, 0, 0);
    box-shadow: 0 0 2px rgb(255, 0, 0);
  }
}

.error__message {
  color: red;
  font-size: 12px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.info-enter-active,
.info-leave-active {
  transition: all 0.3s ease-out;
}

.info-enter-from,
.info-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>