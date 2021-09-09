<template>
  <v-app>
    <v-main>
      <router-view>
        <LogIn/>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import LogIn from './components/LogIn.vue';

export default {
  name: 'App',

  components: {
    LogIn,
  },

  data: () => ({
    //
  }),
};
</script>
