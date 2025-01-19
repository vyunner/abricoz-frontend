<template>

  <div class="container">
    <div class="main-page">
      <!-- Header -->
      <header class="header">
        <div class="header__logo">
          <img src="@/assets/images/logo.svg" alt="Logo" />
        </div>

        <div class="header__burger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav class="navigation">
          <a href="#">Главная</a>
          <a href="#">О нас</a>
          <a href="#">Преимущества</a>
          <a href="#">Контакты</a>
        </nav>
      </header>

      <!-- Content Section -->
      <section class="content">
        <div class="text-content">
          <div class="text-content__title" >Онлайн-супермаркет с бесплатной доставкой</div>
          <div class="app-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.abricoz.app&hl=ru" target="_blank"><img style="width: 203px; height: 60px" src="@/assets/images/google%20play.png" alt="Google Play" /></a>
            <a href="https://apps.apple.com/kz/app/abricoz-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2/id6670238244" target="_blank"><img style="width: 180px; height: 60px; margin-left: 10px;" src="@/assets/images/app%20store.png" alt="App Store" /></a>
          </div>
        </div>

        <div class="image-content">
          <div class="background-svg">
            <!-- SVG элементы -->
            <img src="@/assets/images/banner%20background.png" alt="Banner Background" class="banner-background" />
            <img src="@/assets/images/sheet3.png" alt="Sheet 3" class="sheet3" />
            <img src="@/assets/images/arrow.svg" alt="Arrow" class="svg1"/>
            <img src="@/assets/images/stars.svg" alt="Stars" class="svg2"/>
          </div>
          <img src="@/assets/images/fruit%20basket.png" alt="Fruit Basket" class="basket-image" />
          <img src="@/assets/images/strawberry.png" alt="Strawberries" class="strawberries" />
          <div class="background-sheet">
            <img src="@/assets/images/sheet1.png" alt="Sheet 1" class="sheet1" />
            <img src="@/assets/images/sheet2.png" alt="Sheet 2" class="sheet2" />
          </div>
        </div>
      </section>

      <div style="padding: 40px">
        <div style="margin: 100px 0 0">

          <div class="">
            <img src="@/assets/images/sheet%202%20p2.png" alt="Бесплатная доставка" class="lending-card__background-img1">
            <img src="@/assets/images/sheet%201%20p2.png" alt="Бесплатная доставка" class="lending-card__background-img2">
          </div>
          <h1 style="font-size: 60px; font-family: 'Unbounded', Arial, sans-serif">Наши преимущества</h1>
        </div>
        <div class="lending-card-container">
          <div class="lending-card">
            <div class="lending-card__img">
              <img style="width: 90px; height: 90px; " src="@/assets/images/clock.svg" alt="Бесплатная доставка">
            </div>

            <div>
              <h2 class="lending-card__title">Экономия вашего времени</h2>
              <p class="lending-card__text">Вам больше не придется тратить свое время на длительный поход в супермаркет. Доставим прямо до двери вашей квартиры.</p>
            </div>
          </div>

          <div class="lending-card">
            <div class="lending-card__img2">
              <img style="width: 90px; height: 90px; transform: rotate(35deg); " src="@/assets/images/tag.png" alt="Бесплатная доставка">
            </div>
            <div>
              <h2 class="lending-card__title">Доступные цены</h2>
              <p class="lending-card__text">Ваши любимые продукты по ценам, которые радуют.</p>
            </div>
          </div>

          <div class="lending-card">
            <div class="lending-card__img">
              <img style="width: 90px; height: 90px; " src="@/assets/images/lending-sheets.svg" alt="Lending Sheets">
            </div>
            <div>
              <h2 class="lending-card__title">Свежесть продуктов</h2>
              <p class="lending-card__text">Мы бережно собираем ваш заказ перед доставкой, внимательно проверяя срок годности и свежесть.</p>
            </div>
          </div>

          <div class="lending-card">
            <div class="lending-card__img">
              <img style="width: 90px; height: 90px; " src="@/assets/images/gift.svg" alt="Gift">
            </div>
            <div>
              <h2 class="lending-card__title">Бесплатная доставка</h2>
              <p class="lending-card__text">Мы доставим ваш заказ бесплатно, без скрытых комиссий.<br>&nbsp;<br>Рабочие часы с 9:00 до 22:00.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="contact-card">
    <div class="content-card__images">
      <img src="@/assets/images/sheet%202%20p3.png" alt="Бесплатная доставка" class="contact-card-image3">
      <img src="@/assets/images/sheet%201%20p3.png" alt="Бесплатная доставка" class="contact-card-image2">
      <img src="@/assets/images/fruit%20bowl.png" alt="Бесплатная доставка" class="contact-card-image1">
    </div>
    <div class="contact-card__content">
      <div class="contact-details">
        <h2 style="font-size: 60px; margin: 0;">Контакты</h2>
        <p style="font-size: 20px; margin: 10px 0 6px"><strong style="color: #CCCCCC;">Email:</strong></p>
        <p style="margin: 0"><a style="font-size: 32px; color: #fff;" href="#">info@abricoz.kz</a></p>
        <p style="font-size: 20px; color: #CCCCCC; margin: 30px 0 10px"><strong>Номер телефона:</strong></p>
        <p style="font-size: 32px; margin: 0 0 37px">+7 777 040 44 99 <br> +7 702 620 74 47</p>
        <p></p>
      </div>
    </div>
  </div>


  <div class="lending-footer">
    <div class="lending-footer__content">
      <div class="lending-footer__img">
        <img src="@/assets/images/footer-logo.svg" alt="Footer Logo" >
      </div>

      <div class="lending-footer__img">
        <img src="@/assets/images/inst-logo.svg" alt="Inst Logo" >
      </div>

      <div style="color: #fff">
        © 2024 Abricoz. Все права защищены.
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
