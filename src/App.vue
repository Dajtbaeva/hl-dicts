<script>
import { useUserStore } from "./store/UserStore";
import { onMounted } from "vue";

export default {
  setup() {
    const { getDicts, getDictItems, dicts, loading } = useUserStore();
    // onMounted(getDicts);
    return { dicts, loading };
  },
};
</script>

<template>
  <!-- <v-container fluid>
    <div v-if="!loading">
      <div v-for="dict of Object.values(dicts)" :key="dict">
        {{ dict }}
      </div>
    </div>
    <h3 align="center" style="color: black" v-else>Loading...</h3>
  </v-container> -->
  <v-container fluid>
    <v-list>
      <v-list-item v-for="dict of Object.values(dicts)" :key="dict">
        <v-list-item-content> {{ dict }} </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<style scoped></style>
