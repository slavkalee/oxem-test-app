<template>
  <div class="container">
    <nav>
      <TabItem
        name="Маленький набор данных"
        :tabId="1"
        :getUsers="getUsers"
        :data="SM_DATA"
        :activeStatus="activeTab"
        :setTabHandler="setTabHandler"
      />
      <TabItem
        name="Большой набор данных"
        :tabId="2"
        :getUsers="getUsers"
        :data="LG_DATA"
        :activeStatus="activeTab"
        :setTabHandler="setTabHandler"
      />
    </nav>
    <DataTable
      v-if="!loading && fetched"
      :users="users"
      :searchString="search.value"
      :searchHandler="setValue"
    />
    <Loader v-if="loading" />
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

import Loader from "@/components/Loader";
import DataTable from "@/components/DataTable/DataTable";
import TabItem from "@/components/TabItem";
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

    const search = reactive({
      value: "",
    });

    const activeTab = ref(0);

    const setTabHandler = (tabId) => activeTab.value = tabId;

    const setValue = (e) => (search.value = e.target.value);

    const SM_DATA =
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    const LG_DATA =
      "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

    function getUsers(url) {
      store.dispatch("fetchUsers", url);
    }

    const users = computed(() =>
      filterBy(store.getters.allUsers, search.value)
    );

    return {
      users,
      getUsers,
      SM_DATA,
      LG_DATA,
      search,
      setValue,
      activeTab,
      setTabHandler,
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
  & path {
    fill: #000;
  }
  &:disabled path {
    fill: #a0a1a3;
  }
}
</style>

