<script>
import adsService from "@/services/ads.service";

export default {
  name: "HomePage",
  data() {
    return {};
  },
  methods: {
    openWhatsApp() {
      const phone = '+77026207447';
      const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
      const url = isMobile
          ? `https://wa.me/${phone.replace('+', '')}`
          : `https://web.whatsapp.com/send?phone=${phone.replace('+', '')}`;
      window.open(url, '_blank');
    },
  },
  async mounted() {
    const adsParam = 'contacts';

    if (adsParam && !localStorage.getItem("click")) {
      let adsData = {ads: adsParam};
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
      <div>
        <img @click="openWhatsApp"
             class="app-store-img__phone"
             src="@/assets/images/whatsappbutton.png"
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
