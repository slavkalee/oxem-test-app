<template>
  <div class="container">
    <nav>
      <TabItem
        name="Маленькие данные"
        :tabId="1"
        :getUsers="getUsers"
        :data="SM_DATA"
        :activeStatus="activeTab"
        :setTabHandler="setTabHandler"
      />
      <TabItem
        name="Большие данные"
        :tabId="2"
        :getUsers="getUsers"
        :data="LG_DATA"
        :activeStatus="activeTab"
        :setTabHandler="setTabHandler"
      />
    </nav>
    <transition name="table">
      <DataTable
        v-if="!loading && fetched"
        :users="users"
        :searchString="search.value"
        :searchHandler="setValue"
      />
    </transition>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Loader from "@/components/Loader";
import DataTable from "@/components/DataTable/DataTable";
import TabItem from "@/components/TabItem";
import { useSearch } from "@/composition/search";
import { useTabs } from "@/composition/tabs";
import { filterBy } from "@/utils";

export default {
  name: "App",
  components: {
    Loader,
    DataTable,
    TabItem,
  },
  setup() {
    const store = useStore();
    const { search, setValue } = useSearch();

    const SM_DATA =
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    const LG_DATA =
      "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

    function getUsers(url) {
      store.dispatch("fetchUsers", url);
    }

    return {
      getUsers,
      SM_DATA,
      LG_DATA,
      search,
      setValue,
      ...useTabs(),
      users: computed(() => filterBy(store.getters.allUsers, search.value)),
      loading: computed(() => store.getters.loading),
      fetched: computed(() => store.getters.fetched),
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Poppins", "Ubuntu";
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  background: rgb(250, 248, 248);
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 0 25px;
  width: 950px;
  height: 100vh;
  margin: 0 auto;
}
nav {
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
}

input {
  font-family: "Poppins";
}

.icon-btn {
  background: transparent;
  outline: 0;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  padding: 0;
  & path {
    fill: #000;
  }
  &:disabled path {
    fill: #a0a1a3;
  }
}
.table-enter-active,
.table-leave-active {
  transition: all 0.4s ease-out;
}

.table-enter-from,
.table-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>

