import { defineStore } from "pinia";
import axios from "axios";
import { onMounted, ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const dicts = ref({});
  const infos = ref({});
  const loading = ref(false);
  const URL =
    "https://products.halyklife.kz/api/v1/test/insis/Arm/api/Dictionary/GetDictionaryList";

  const URL2 =
    "https://products.halyklife.kz/api/v1/test/insis/Arm/api/Dictionary/GetDictionaryItems/DicInsuredEventCancelReason";

  const getDicts = async () => {
    try {
      loading.value = true;
      const response = await axios.get(`${URL}`);
      const response2 = await axios.get(`${URL2}`);
      dicts.value = response.data;
      console.log(dicts);
      console.log(typeof dicts);
      console.log(dicts.value);

      infos.value = response2.data;
      console.log(infos);
      console.log(typeof infos);
      console.log(infos.value);
    } catch (err) {
      console.log("Your error from UserStore: " + err);
    } finally {
      loading.value = false;
    }
  };

  const getDictItems = async () => {
    try {
      loading.value = true;
      const response = await axios.get(`${URL2}`);
      infos.value = response.data;
      console.log(infos);
      console.log(infos.value);
    } catch (err) {
      console.log("Your error from UserStore: " + err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(getDicts);
  return {
    getDicts,
    getDictItems,
    dicts,
    loading,
  };
});
