import { ref } from 'vue';

export function useCurrentUser() {
  const infoVisible = ref(false);

  const userData = ref({})

  const showInfo = () => (infoVisible.value = true);
  const hideInfo = () => (infoVisible.value = false);

  const onClickRow = (user) => {
    userData.value = user;
    showInfo();
  };

  return {
    userData,
    onClickRow,
    infoVisible,
    hideInfo,
  };
}
