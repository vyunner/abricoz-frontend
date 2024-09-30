<template>
  <router-view/>
</template>

<script>
import {getCookie} from "@/utils/helpers/cookies.helper";

export default {
  async mounted(){
    if (!getCookie('ACCESS_TOKEN')){
      this.$router.push('/auth');
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/bootstrap.css';
</style>