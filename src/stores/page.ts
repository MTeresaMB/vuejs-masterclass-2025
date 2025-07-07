import { acceptHMRUpdate, defineStore } from "pinia";

export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
    description: '',
    keywords: ''
  })

  return { pageData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot));
}
