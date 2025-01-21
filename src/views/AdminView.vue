<template>
<!--  <PrimePreloader class="col-12 md:col-8" v-if="loading"/>-->

  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import PrimePreloader from "@/components/common/PrimePreloader.vue";
import {getCookie} from "@/utils/helpers/cookies.helper";

export default {
  name: 'AdminView',
  data() {
    return {

    }
  },

  components: {Header, PrimePreloader},
  async mounted(){
    if (!getCookie('ACCESS_TOKEN')){
      this.$router.push('/auth');
    }
  }
}


</script>

<style lang="scss" scoped>

</style>
