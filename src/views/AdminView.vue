<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: 'AdminView',
  components: {Header},
}


</script>

<style lang="scss" scoped>

</style>
