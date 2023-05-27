import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const dicts = ref({});
  const loading = ref(false);
  const URL =
    "https://products.halyklife.kz/api/v1/test/insis/Arm/api/Dictionary/GetDictionaryList";

  const getDicts = async () => {
    try {
      loading.value = true;
      const response = await axios.get(`${URL}`);
      dicts.value = response.data;
      console.log(dicts);
      console.log(dicts.value.target[2]);
    } catch (err) {
      console.log("Error from SearchStore: " + err);
    } finally {
      loading.value = false;
    }
  };

  return {
    getDicts,
    dicts,
  };
});
