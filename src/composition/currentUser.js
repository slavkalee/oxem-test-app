import { reactive, ref } from 'vue';

export function useCurrentUser() {
  const infoVisible = ref(false);

  const userData = reactive({
    id: null,
    name: null,
  });

  const showInfo = () => (infoVisible.value = true);
  const hideInfo = () => (infoVisible.value = false);

  const onClickRow = (id, name) => {
    userData.id = id;
    userData.name = name;
    showInfo();
  };

  return {
    userData,
    onClickRow,
    infoVisible,
    hideInfo,
  };
}
