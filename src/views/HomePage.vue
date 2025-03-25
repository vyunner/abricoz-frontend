<script>

export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      isAndroid: false,
      isiOS: false,
    };
  },
  methods: {
    downloadAndroid() {
      window.location.href = "https://play.google.com/store/apps/details?id=com.abricoz.app";
    },
    downloadiOS() {
      window.location.href = "https://apps.apple.com/app/id6670238244";
    },
  },
  mounted() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      this.isAndroid = true;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      this.isiOS = true;
    }
  },
};
</script>

<template>
  <div class="container">
    <div class="download-block">
      <div v-if="isAndroid">
        <h1>Скачать приложение</h1>
        <img @click="downloadAndroid" class="google-play-img__phone"
             src="@/assets/images/google-play-phone.png" alt=""/>
      </div>
      <div v-else-if="isiOS">
        <h1>Скачать приложение</h1>
        <img @click="downloadiOS" class="app-store-img__phone"
             src="@/assets/images/app-store-phone.png"
             alt=""/>
      </div>
      <div v-else>
        <h1>Скачать приложение</h1>
        <img @click="downloadAndroid" class="google-play-img__phone"
             src="@/assets/images/google-play-phone.png" alt=""/>
        <img @click="downloadiOS" class="app-store-img__phone"
             src="@/assets/images/app-store-phone.png"
             alt=""/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  text-align: center;
  overflow: hidden; /* убрать возможный скролл */
  padding: 16px;     /* чтобы элементы не прилипали к краям */
  box-sizing: border-box;
}

.download-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transform: translateY(-20px);
  max-width: 100%;
}

h1 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.app-store-img__phone,
.google-play-img__phone {
  width: 100%;
  max-width: 364px;
  height: 55px;
  display: block;
  cursor: pointer;
}
</style>
