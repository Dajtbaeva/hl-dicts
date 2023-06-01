<script>
import HelloWorld from "./components/HelloWorld.vue";
import { useUserStore } from "./store/UserStore";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const page = ref();
    const { getDicts, getDictItems, movies } = useUserStore();
    onMounted(getDicts);
    return { movies, page };
  },
};
</script>

<template>
  <v-row style="margin: 0 100px">
    <v-col cols="10">
      <h2 style="color: #a1b1cb">Discover movies!</h2>
    </v-col>
  </v-row>
  <v-pagination
    v-model="page"
    :length="9"
    :total-visible="6"
    rounded="circle"
    style="color: #a1b1cb"
  >
  </v-pagination>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
