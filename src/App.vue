<script>
import { useUserStore } from "./store/UserStore";
import { onMounted } from "vue";

export default {
  setup() {
    const { getDicts, getDictItems, dicts, loading } = useUserStore();
    // onMounted(getDicts);
    // getDicts();
    return { dicts, loading };
  },
};
</script>

<template> 
  <v-container fluid>
    <h3 align="center">Dictionaries</h3>
    <v-list>
      <v-list-item
        v-for="[k, v] of Object.entries(dicts)"
        :key="k"
        class="border px-5"
      >
        <v-list-item-content> {{ k }}: {{ v }} </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
