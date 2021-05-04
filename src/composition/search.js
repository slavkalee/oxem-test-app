import { reactive } from 'vue';

export function useSearch() {
  const search = reactive({
    value: '',
  });

  const setValue = (e) => (search.value = e.target.value);

  return {
    search,
    setValue,
  };
}
