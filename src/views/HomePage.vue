<script>

import adsService from "@/services/ads.service";

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
  async mounted() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      this.isAndroid = true;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      this.isiOS = true;
    }

    const adsParam = this.$route.query.ads;

    if (adsParam && !localStorage.getItem("click")) {
      let adsData = {'ads': adsParam}
      const success = await adsService.click(adsData);
      if (success) {
        localStorage.setItem("click", adsParam);
      }
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
        <h1>Instagram:</h1>
        <a href="https://www.instagram.com/abricoz_kz">
          <img class="app-store-img__phone"
               src="@/assets/images/instagrambutton.png"
               alt=""/>
        </a>
      </div>
      <div v-else>
        <h1>Скачать приложение</h1>
        <img @click="downloadAndroid" class="google-play-img__phone"
             src="@/assets/images/google-play-phone.png" alt=""/>
        <img @click="downloadiOS" class="app-store-img__phone"
             src="@/assets/images/app-store-phone.png"
             alt=""/>
        <h1>Instagram:</h1>
        <img class="app-store-img__phone"
             src="@/assets/images/instagrambutton.png"
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
  padding: 16px; /* чтобы элементы не прилипали к краям */
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
  margin: 10px 0 8px 0;
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
