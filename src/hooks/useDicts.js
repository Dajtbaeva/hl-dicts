import axios from "axios";
import { ref, computed, watch, onMounted } from "vue";
import { useRatesStore } from "../store/RatesStore";
// import { XMLParser } from "fast-xml-parser";

export function useRates() {
  const ratez = ref([]);
  const { favRatez } = useRatesStore();

  const selectedDay = ref(new Date());
  const selectedDate = computed(() =>
    selectedDay.value.toLocaleString().slice(0, 10)
  );

  const loading = ref(false);
  const URL = "https://nationalbank.kz/rss/get_rates.cfm";
  // const URL = "http://localhost:8010/proxy/rss/get_rates.cfm";
  // used local-cors-proxy package to avoid cors error

  function parseXMLToJSON(xmlString) {
    const parser = new DOMParser().parseFromString(xmlString, "text/xml");
    const tempRatez = [];
    const currentRates = parser.querySelectorAll("item");
    for (const item of currentRates) {
      const rate = {
        fullname: item.querySelector("fullname").textContent,
        title: item.querySelector("title").textContent,
        description: parseFloat(item.querySelector("description").textContent),
        quant: item.querySelector("quant").textContent,
        icon: `https://flagcdn.com/w320/${item
          .querySelector("title")
          .textContent.toLowerCase()
          .slice(0, 2)}.png`,
        isLiked: false,
      };
      if (favRatez) {
        // console.log(favRatez);
        const favRate = favRatez.find((r) => r.title === rate.title);
        if (favRate) {
          rate.isLiked = true;
        }
      }
      // console.log(rate);
      tempRatez.push(rate);
    }
    [...ratez.value] = tempRatez;
    return ratez.value;
  }

  const getRates = async () => {
    try {
      loading.value = true;
      const response = await axios.get(`${URL}`, {
        params: {
          fdate: selectedDate.value,
        },
      });
      ratez.value = parseXMLToJSON(response.data);
    } catch (err) {
      console.log("Error:" + err);
    } finally {
      loading.value = false;
    }
  };

  watch(selectedDate, () => {
    getRates();
  });

  onMounted(getRates);
  return {
    // getDicts,
    // getDictItems,
    // dicts,
    // loading,
  };
}
