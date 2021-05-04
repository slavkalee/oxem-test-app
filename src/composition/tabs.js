import { ref } from 'vue';

export function useTabs() {
  const activeTab = ref(0);

  const setTabHandler = (tabId) => (activeTab.value = tabId);

  return {
    activeTab,
    setTabHandler,
  };
}
