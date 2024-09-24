<template>
  <Header />
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="blue" />
      </div>
      <div class="col-2">
        <div class="black" />
      </div>
      <div class="col-12">
        <div class="red" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: 'HomeView',
  components: {Header},
}
</script>

<style lang="scss" scoped>
</style>
