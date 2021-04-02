import { reactive } from 'vue';

export function useSort() {
  const sort = reactive({
    isAsc: null,
    key: null,
  });

  const handleSort = (colName) => {
    sort.isAsc = !sort.isAsc;
    sort.key = colName;
  };

  const sorting = (a, b) => {
    if (a[sort.key] < b[sort.key]) {
      return sort.isAsc ? 1 : -1;
    }

    if (a[sort.key] > b[sort.key]) {
      return sort.isAsc ? -1 : 1;
    }

    return 0;
  };

  return {
    sort,
    handleSort,
    sorting,
  };
}
