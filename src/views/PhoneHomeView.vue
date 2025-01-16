<template>
  <div class="lending-container">
    <div class="header">
      <div class="header__logo">
        <img src="@/assets/images/logo.svg" alt="Logo" class="logo"/>
      </div>
      <div class="header__burger" @click="burgerMenu">
        <span style="background-color: #fff"></span>
        <span style="background-color: #fff"></span>
        <span style="background-color: #fff"></span>
      </div>

      <nav class="navigation">
        <a href="#">Главная</a>
        <a href="#">О нас</a>
        <a href="#">Преимущества</a>
        <a href="#">Контакты</a>
      </nav>
    </div>

    <div class="content">
      <div class="text-content">
        <div class="text-content__title" >Супермаркет с бесплатной доставкой</div>
        <div class="app-buttons">
          <a href="https://play.google.com/store/games?hl=ru&pli=1" target="_blank">
            <img class="google-play-img" src="@/assets/images/google%20play.png" alt="Google Play" />
            <img class="google-play-phone-img" src="@/assets/images/google-play-phone.png" alt="Google Play" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank">
            <img class="app-store-img" src="@/assets/images/app%20store.png" alt="App Store" />
            <img class="app-store-phone-img" src="@/assets/images/app-store-phone.png" alt="App Store" />
          </a>
        </div>
      </div>

      <div class="image-content">
        <div class="background-svg">
          <!-- SVG элементы -->
          <img src="@/assets/images/banner%20background.png" alt="Banner Background" class="banner-background" />
          <img src="@/assets/images/sheet3.png" alt="Sheet 3" class="sheet3" />
          <img src="@/assets/images/arrow.svg" alt="Arrow" class="svg1"/>
          <img src="@/assets/images/arrow-phone.svg" alt="Arrow" class="svg1-phone"/>

          <img src="@/assets/images/stars.svg" alt="Stars" class="svg2"/>
        </div>
        <img src="@/assets/images/fruit%20basket.png" alt="Fruit Basket" class="basket-image" />
        <img src="@/assets/images/strawberry.png" alt="Strawberries" class="strawberries" />
        <div class="background-sheet">
          <img src="@/assets/images/sheet1.png" alt="Sheet 1" class="sheet1" />
          <img src="@/assets/images/sheet2.png" alt="Sheet 2" class="sheet2" />
        </div>
      </div>
    </div>

    <div class="lending-advantages">
      <div class="lending-advantages__header">

        <div class="">
          <img src="@/assets/images/sheet%202%20p2.png" alt="Бесплатная доставка" class="lending-card__background-img1">
          <img src="@/assets/images/sheet%201%20p2.png" alt="Бесплатная доставка" class="lending-card__background-img2">
        </div>
        <h1>Наши преимущества</h1>
      </div>
      <div class="lending-card-container">
        <div class="lending-card">
          <div class="lending-card__img">
            <img src="@/assets/images/clock.svg" alt="Бесплатная доставка">
          </div>

          <div>
            <h2 class="lending-card__title">Экономия вашего времени</h2>
            <p class="lending-card__text">Вам больше не придется тратить свое время на длительный поход в супермаркет. Доставим прямо до двери вашей квартиры.</p>
          </div>
        </div>

        <div class="lending-card">
          <div class="lending-card__img">
            <img style="transform: rotate(35deg);" src="@/assets/images/tag.png" alt="Бесплатная доставка">
          </div>
          <div>
            <h2 class="lending-card__title">Доступные цены</h2>
            <p class="lending-card__text">Ваши любимые продукты по ценам, которые радуют.</p>
          </div>
        </div>

        <div class="lending-card">
          <div class="lending-card__img">
            <img src="@/assets/images/lending-sheets.svg" alt="Lending Sheets">
          </div>
          <div>
            <h2 class="lending-card__title">Свежесть продуктов</h2>
            <p class="lending-card__text">Мы бережно собираем ваш заказ перед доставкой, внимательно проверяя срок годности и свежесть.</p>
          </div>
        </div>

        <div class="lending-card">
          <div class="lending-card__img">
            <img src="@/assets/images/gift.svg" alt="Gift">
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

  <div class="contact-card">
    <div class="content-card__images">
      <img src="@/assets/images/sheet%202%20p3.png" alt="Бесплатная доставка" class="contact-card-image3">
      <img src="@/assets/images/sheet%201%20p3.png" alt="Бесплатная доставка" class="contact-card-image2">
      <img src="@/assets/images/fruit%20bowl.png" alt="Бесплатная доставка" class="contact-card-image1">
    </div>
    <div class="contact-card__content">
      <div class="contact-details">
        <h2 style="color: #fff;">Контакты</h2>
        <p><strong style="color: #CCCCCC;">Email:</strong></p>
        <p><a style="color: #fff;">info@abricoz.kz</a></p>
        <p><strong style="color: #CCCCCC;">Номер телефона:</strong></p>
        <p>+7 777 040 44 99 <br> +7 702 620 74 47</p>
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

      <div class="lending-footer__text">
        © 2024 Abricoz. Все права защищены.
      </div>
    </div>
  </div>

</template>

<script>
import Header from "@/components/Header.vue";


export default {
  name: 'PhoneHomeView',
  components: {Header},
  methods: {
    burgerMenu(){

    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Unbounded', Arial, sans-serif;
  color: #333333;
}


.lending-container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
}



@media (min-width: 1440px) {
  .lending-container {
    max-width: 1310px;
  }

  .header {
    display: flex;
    align-items: center;
    margin: 40px;
    padding: 20px 40px 20px 0;
  }

  .header__logo{
    margin-right: 168px;
  }

  .logo {
    width: 154px;
    height: 42px;
  }

  .navigation a {
    margin: 0 44px 0 0;
    text-decoration: none;
    color: #272727;
    font-size: 20px;
  }
  .navigation a:nth-of-type(3) {
    margin: 0 40px 0 5px;
  }
  .navigation a:nth-of-type(4) {
    margin: 0 0 0 27px;
  }

  .navigation a:hover {
    color: #396C03;
  }

  .content {
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 40px 40px 130px ;
  }

  .text-content {
    max-width: 570px;
    padding-top: 87px;
  }

  .text-content__title {
    margin: 0;
    padding: 0;
    color: #333333;
    font-size: 60px;
    line-height: 1.13;
    font-weight: 700;
    background-position: center center;
  }

  .google-play-img {
    width: 203px; height: 60px
  }
  .app-store-img {
    width: 180px;
    height: 60px;
    margin-left: 10px;
  }

  .google-play-phone-img, .app-store-phone-img {
    display: none;
  }

  .app-buttons {
    margin-top: 53px;
  }
  .app-buttons img {
    margin-top: 70px;
    margin-right: 10px;
    height: 40px;
  }

  .image-content {
    position: relative;
    z-index: -1;
  }

  .background-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .background-sheet {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .sheet1 {
    position: absolute;
    top: 419px;
    right: -243px;
    width: 261px;
    height: 260px;
    z-index: 1;
  }
  .sheet2 {
    position: absolute;
    top: 564px;
    right: -128px;
    width: 258px;
    height: 255px;
  }

  .banner-background {
    position: absolute;
    top: -593px;
    right: -884px;
    width: 1394px;
    height: 1400px;
  }
  .sheet3 {
    position: absolute;
    top: 35px;
    right: 177px;
    width: 338px;
    height: 305px;
    transform: rotate(1.5deg);
  }
  .svg1 {
    position: absolute;
    top: 352px;
    right: 645px;
    width: 134px;
    height: 141px;
  }
  .svg1-phone {
    display: none
  }

  .svg2 {
    position: absolute;
    top: 237px;
    right: 684px;
    width: 83px;
    height: 83px;
  }

  .basket-image {
    position: relative;
    margin-top: -14px;
    margin-right: -172px;
    width: 701px;
    height: 638px;
    z-index: 0;
  }

  .strawberries {
    position: absolute;
    top: -88px;
    right: 410px;
    width: 210px;
    height: 272px;
  }


  .lending-advantages{
    padding: 40px;
  }
  .lending-advantages__header{
    margin: 100px 0 0;
  }
  .lending-advantages__header h1{
    font-size: 60px;
    font-family: 'Unbounded',
    Arial, sans-serif
  }
  .lending-card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .lending-card {
    padding-bottom: 40px;
    padding-right: 20px;
    background-color: #f5f7f2;
    border-radius: 16px;
    display: flex;
    align-items: flex-start;
  }

  .lending-card__title{
    color: #3e3e3e;
  }

  .lending-card__background-img1{
    position: absolute;
    top: 1380px;
    right: -160px;
    width: 482px;
    height: 435px;
  }
  .lending-card__background-img2{
    position: absolute;
    top: 960px;
    right: 1640px;
    width: 273px;
    height: 246px;
  }


  .lending-card__text {
    font-size: 15px;
    color: #676666;
  }

  .lending-card__img {
    margin: 40px 30px
  }
  .lending-card__img2 {
    margin: 30px;
  }

  .lending-card h2 {
    margin-top: 40px;
    font-size: 30px;
  }

  .lending-card p {
    margin: 10px 0 0;
  }

  .working-hours {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
  }

  .contact-card{
    width: 1560px;
    margin: 235px auto;
    display: flex;
    justify-content: end;
    padding:  10px;
    background: #195a00;
    border-radius: 50px
  }

  .contact-card-image1 {
    position: absolute;
    top: 1821px;
    right: 893px;
    width: 730px;
    height: 585px;
    z-index: 0;
  }

  .contact-card-image2{
    position: absolute;
    top: 1769px;
    right: 772px;
    width: 493px;
    height: 484px;
  }

  .contact-card-image3{
    position: absolute;
    top: 2058px;
    right: 1406px;
    width: 282px;
    height: 270px;
  }

  .contact-card__content {
    color: #fff;
    margin-right: 350px;
    margin-top: 27px;
  }

  .lending-footer{
    display: flex;
    justify-content: center;
    background: #195a00;
    padding: 80px;
    width: 100%
  }

  .lending-footer__content{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lending-footer__img{
    display: flex;
    justify-content: center;
    margin-bottom: 30px
  }

}


//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- --  --  --  --  --  --  --  --  --  --  --  --  //
//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- --  --  --  --  --  --  --  --  --  --  --  --  //
//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  -- --  --  --  --  --  --  --  --  --  --  --  --  //


@media (max-width: 320px) {
  .lending-container{
    max-width: 280px;
    margin: 0 20px;
    padding: 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin: 0;
    padding: 0;
  }

  .header__burger{
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-direction: column;
    width: 28px;
    height: 20px;
  }

  .header__burger span{
    height: 3px;
    width: 28px;
  }
  .header__burger span:last-child{
    width: 20px;
  }

  .navigation{
    display:none;
  }

  .header__logo{
    display: flex;
    align-items: center;
    margin: 0;
  }

  .logo {
    width: 86px;
    height: 23px;
  }


  .content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin: 254px 0 0;
    padding: 0;
  }

  .text-content {
    width: 100%;
    padding: 0;
  }

  .text-content__title {
    margin: 0;
    padding: 0;
    color: #333333;
    font-size: 32px;
    line-height: 1.31;
    font-weight: 700;
    background-position: center center;
  }

  .app-buttons {
    margin-top: 55px;
    width: 100%;
  }

  .google-play-phone-img, .app-store-phone-img  {
    width: 280px;
    margin: 10px 0 0;
    height: 43px
  }

  .google-play-img, .app-store-img {
    display: none;
  }

  .image-content {
    position: relative;
    z-index: -1;
  }

  .background-svg {
    position: absolute;
    top: -600px;
    left: 0;
    width: 488px;
    height: 497px;
    z-index: 0;
  }
  .background-sheet {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 108px;
    z-index: 1;
  }

  .sheet1 {
    position: absolute;
    top: -384px;
    right: -162px;
    width: 64px;
    height: 64px;
    z-index: 1;
  }
  .sheet2 {
    position: absolute;
    top: -348px;
    right: -138px;
    width: 64px;
    height: 64px;
  }

  .banner-background {
    position: absolute;
    top: -170px;
    right: -30px;
    width: 488px;
    height: 497px;
  }
  .sheet3 {
    position: absolute;
    top: 82px;
    right: 344px;
    width: 120px;
    height: 108px;
    transform: rotate(1.5deg);
  }
  .svg1-phone {
    position: absolute;
    top: 424px;
    right: 264px;
    width: 50px;
    height: 72px;
  }
  .svg1 {
    display:none
  }

  .svg2 {
    position: absolute;
    top: 386px;
    right: 206px;
    width: 61px;
    height: 61px;
  }

  .basket-image {
    position: absolute;
    top: -540px;
    right: -270px;
    width: 248px;
    height: 226px;
    z-index: 0;
  }

  .strawberries {
    position: absolute;
    top: -564px;
    right: -64px;
    width: 72px;
    height: 84px;
  }


  .lending-advantages{
    margin: 140px 0 0;
    padding: 0;
  }
  .lending-advantages__header{
    margin: 100px 0 0;
  }
  .lending-advantages__header h1{
    font-size: 30px;
  }
  .lending-card-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .lending-card {
    max-width: 280px;
    min-height: 170px;
    padding-bottom: 24px;
    padding-right: 20px;
    background-color: #f5f7f2;
    border-radius: 16px;
    display: flex;
    align-items: center;
  }


  .lending-card__title {
    font-size: 20px !important;
    margin: 20px 0 0 !important;
    color: #3e3e3e;
  }

  .lending-card__background-img1{
    position: absolute;
    top: 710px;
    right: -2px;
    width: 78px;
    height: 88px;
    transform: rotate(10deg);
  }
  .lending-card__background-img2{
    position: absolute;
    top: 1550px;
    right: 226px;
    width: 127px;
    height: 140px;
    transform: rotate(-12deg);
  }

  .lending-card__text {
    font-size: 13px;
    color: #676666;
  }

  .lending-card__img {
    margin: 10px
  }

  .lending-card__img img {
    margin-top: 14px;
    width: 45px;
    height: 45px;
  }

  .lending-card p {
    margin: 10px 0 0;
  }

  .working-hours {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
  }


  .contact-card{
    width: 280px;
    margin: 235px auto;
    display: flex;
    background: #195a00;
    border-radius: 36px
  }

  .contact-card-image1 {
    position: absolute;
    top: 2090px;
    right: 34px;
    width: 246px;
    height: 239px;
    z-index: 0;
  }

  .contact-card-image2{
    position: absolute;
    top: 2084px;
    right: -24px;
    width: 198px;
    height: 195px;
    transform: rotate(-12deg);
  }

  .contact-card-image3{
    position: absolute;
    top: 2186px;
    right: 198px;
    width: 113px;
    height: 109px;
  }

  .contact-card__content {
    color: #fff;
    margin: 0;
  }

  .contact-details {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-details h2{
    font-size: 32px;
    margin: 35px 0 0;
  }

  .contact-details p{
    color: #fff;
    font-size: 24px;
    margin: 8px 0 54px;
  }

  .contact-details p:nth-child(2){
    font-size: 16px;
    margin: 24px 0 0 !important;
  }

  .contact-details p:nth-child(3){
    font-size: 24px;
    margin: 8px 0 0;
  }
  .contact-details p:nth-child(4){
    font-size: 16px;
    margin: 20px 0 0 ;
  }

  .lending-footer{
    display: flex;
    justify-content: center;
    background: #195a00;
    padding: 50px 50px;
    width: 100%
  }

  .lending-footer__content{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lending-footer__text{
    display: flex;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }

  .lending-footer__img{
    display: flex;
    justify-content: center;
    margin-bottom: 20px
  }

  .lending-footer__img img{
    height: 50px;
    width: 150px;
  }
}

</style>
