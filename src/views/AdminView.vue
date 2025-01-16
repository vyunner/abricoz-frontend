<template>

  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import {getCookie} from "@/utils/helpers/cookies.helper";

export default {
  name: 'AdminView',
  components: {Header},
  async mounted(){
    if (!getCookie('ACCESS_TOKEN')){
      this.$router.push('/auth');
    }
  }
}


</script>

<style lang="scss" scoped>

</style>
