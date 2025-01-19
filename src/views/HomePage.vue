<script>
export default {
  name: "HomePage",
}
</script>

<template>

  <section class="header-background">
    <div class="header-background__basket">
      <img class="strawberry" src="@/assets/images/strawberry.png" alt=""/>
      <img class="sheet3" src="@/assets/images/sheet3.png" alt=""/>
      <img class="basket" src="@/assets/images/fruit%20basket.png" alt=""/>
      <img class="sheet2" src="@/assets/images/sheet2.png" alt=""/>
      <img class="sheet1" src="@/assets/images/sheet1.png" alt=""/>
    </div>
    <img class="header-background__banner" src="@/assets/images/banner%20background.png" alt=""/>
  </section>

  <header id="header">
    <div class="lending-container">

      <div class="header-content">

        <img class="header-content__logo" src="@/assets/images/logo.svg" alt="">

        <nav>
          <a href="#">Главная</a>
          <a href="#header"> О нас</a>
          <a href="#advantages">Преимущества</a>
          <a href="#contact" > Контакты</a>
        </nav>

        <div class="header-content__burger">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  </header>

  <section class="about-background">
    <img class="arrow" src="@/assets/images/arrow.svg" alt="">
    <img class="arrow-phone" src="@/assets/images/arrow-phone.svg" alt="">
    <img class="stars" src="@/assets/images/stars.svg" alt="">
  </section>

  <main>

    <div class="lending-container">

      <div class="about-content">
        <div class="about-content__title">Онлайн-супермаркет с бесплатной доставкой<br> в Актобе</div>

        <div class="about-content__buttons">
          <a href="https://play.google.com/store/games?hl=ru&pli=1" target="_blank">
            <img class="google-play-img" src="@/assets/images/google%20play.png" alt="" />
            <img class="google-play-img__phone" src="@/assets/images/google-play-phone.png" alt="" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank">
            <img class="app-store-img" src="@/assets/images/app%20store.png" alt="" />
            <img class="app-store-img__phone" src="@/assets/images/app-store-phone.png" alt="" />
          </a>
        </div>

      </div>

    </div>

  </main>


  <section class="advantages" id="advantages">
    <div class="lending-container">

      <div class="advantages-content">

        <div class="advantages-content__title">
          Наши преимущества
        </div>

        <div class="advantages-content__cards">

          <div class="advantages-content__card">
            <div class="advantages-content__card-icon" >
              <img src="@/assets/images/clock.svg" alt="">
            </div>
            <div class="advantages-content__card-content">
              <h2 class="advantages-content__card-title">Экономия вашего времени</h2>
              <p class="advantages-content__card-text">Вам больше не придется тратить свое время на длительный поход в супермаркет. Доставим прямо до двери вашей квартиры.</p>
            </div>
          </div>

          <div class="advantages-content__card">
            <div class="advantages-content__card-icon">
              <img style="transform: rotate(35deg);" src="@/assets/images/tag.png" alt="">
            </div>
            <div class="advantages-content__card-content">
              <h2 class="advantages-content__card-title">Доступные цены</h2>
              <p class="advantages-content__card-text">Ваши любимые продукты по ценам, которые радуют.</p>
            </div>
          </div>

          <div class="advantages-content__card">
            <div class="advantages-content__card-icon">
              <img src="@/assets/images/lending-sheets.svg" alt="">
            </div>
            <div class="advantages-content__card-content">
              <h2 class="advantages-content__card-title">Свежесть продуктов</h2>
              <p class="advantages-content__card-text">Мы бережно собираем ваш заказ перед доставкой, внимательно проверяя срок годности и свежесть.</p>
            </div>
          </div>

          <div class="advantages-content__card">
            <div class="advantages-content__card-icon">
              <img src="@/assets/images/gift.svg" alt="">
            </div>
            <div class="advantages-content__card-content">
              <h2 class="advantages-content__card-title">Бесплатная доставка</h2>
              <p class="advantages-content__card-text">Мы доставим ваш заказ бесплатно, без скрытых комиссий. <br> <br>Рабочие часы с 9:00 до 22:00.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>

  <section id="contact" style="margin-top: 100px;"></section>

  <section class="contact-background">
    <div class="contact-background">
      <div class="contact-card-background">

      </div>
      <div class="contact-background__bowl">
        <img src="@/assets/images/sheet%202%20p3.png" alt="" class="contact-card-image3">
        <img src="@/assets/images/sheet%201%20p3.png" alt="" class="contact-card-image2">
        <img src="@/assets/images/fruit%20bowl.png" alt="" class="contact-card-image1">
      </div>
      <div class="contact-background__bowl2">
        <img src="@/assets/images/sheet%202%20p3.png" alt="" class="contact-card-image3">
        <img src="@/assets/images/sheet%201%20p3.png" alt="" class="contact-card-image2">
        <img src="@/assets/images/fruit%20bowl.png" alt="" class="contact-card-image1">
      </div>
    </div>
  </section>


  <section class="contact">
    <div class="lending-container">
      <div class="contact-content">
        <div class="contact-content__info">
          <h2>Контакты</h2>
          <p><strong>Email:</strong></p>
          <p><a href="#">info@abricoz.kz</a></p>
          <p><strong>Номер телефона:</strong></p>
          <p>+7 777 040 44 99 <br> +7 702 620 74 47</p>
        </div>
      </div>
    </div>
  </section>


  <footer class="footer" id="footer">
    <div class="lending-container">
      <div class="lending-footer__content">
        <div class="lending-footer__img">
          <img src="@/assets/images/footer-logo.svg" alt="Footer Logo" >
        </div>

        <div class="lending-footer__img">
          <img src="@/assets/images/inst-logo.svg" alt="Inst Logo" >
        </div>

        <div class="lending-footer__text" style="color: #fff">
          © 2024 Abricoz. Все права защищены.
        </div>
      </div>
    </div>
  </footer>

</template>

<style scoped lang="scss">
*{
  font-family: 'Unbounded', Arial, sans-serif;
}

html, body {
  font-size: 20px !important;
  overflow: auto;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5 {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.lending-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}




//*  --  --  --  --  --    HEADER BACKGROUND    --  --  --  --  --  *//

.header-background, {
  position: relative;
  top: 0;
  left: 0;
  z-index: -1;
}

.header-background__basket, {
  position: relative;
  top: 0;
  left: 50vw;
  z-index: 1;
}

.header-background__banner, .strawberry, .sheet1, .sheet2, .sheet3, .basket {
  position: absolute;
}

.header-background__banner {
  top: -440px;
  left: 55vw;
  width: 1376px;
  height: 1400px;
  object-fit: cover;
}

.sheet1{
  top: 574px;
  left: 572px;
  width: 261px;
  height: 260px;
}

.sheet2{
  top: 716px;
  left: 462px;
  width: 258px;
  height: 255px;
}

.sheet3{
  top: 190px;
  left: 78px;
  width: 338px;
  height: 305px;
}

.basket{
  top: 140px;
  left: 60px;
  width: 701px;
  height: 638px;
}

.strawberry{
  top: 67px;
  left: -22px;
  width: 200px;
  height: 270px;
}



//*  --  --  --  --  --    HEADER    --  --  --  --  --  *//

header{
  margin: 54px 0 0;
}

.header-content {
  display: flex;
  align-items: center;
  height: 55px;
}

.header-content__logo {
  width: 154px;
  height: 42px;
  margin-right: 158px;
}

nav a{
  color: #272727;
  font-size: 20px;
  font-family: 'Unbounded', Arial, sans-serif !important;
  text-decoration: none;
  margin-right: 40px;
}
nav a:hover {
  color: #396C03;
}

.header-content__burger{
  display: none;
}


//*  --  --  --  --  --    MAIN BACKGROUND    --  --  --  --  --  *//

.about-background {
  position: relative;
  top: 300px;
  left: 48vw;
  z-index: -1;
}

.stars, .arrow-phone, .arrow {
  position: absolute;
}

.stars {
  top: 100px;
  left: -160px;
  width: 83px;
  height: 83px;
}

.arrow {
  top: 214px;
  left: -163px;
  width: 134px;
  height: 141px;
}



//*  --  --  --  --  --    MAIN    --  --  --  --  --  *//

main {
  margin-top: 180px;
  margin-bottom: 266px;
}

.about-content{
  display: flex;
  flex-direction: column;
  width: 570px;
}

.about-content__title {
  color: #333333;
  font-weight: 700;
  line-height: 68px;
  font-size: 54px;
  margin-bottom: 124px;
}

.about-content__buttons{
  display: flex;
  align-items: center;
  flex-direction: row;
}

.google-play-img {
  width: 203px;
  height: 60px;
}

.app-store-img {
  margin-left: 20px;
  width: 180px;
  height: 60px;
}


.arrow-phone, .app-store-img__phone,  .google-play-img__phone {
  display: none;
}


//*  --  --  --  --  --    ADVANTAGES    --  --  --  --  --  *//
.advantages {
  padding: 140px 0 0;
  margin: 0;
}

.advantages-content__title{
  color: #333333;
  font-size: 60px;
  line-height: 68px;
  font-weight: 700;
}

.advantages-content__cards {
  margin-top: 57px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.advantages-content__card {
  padding-bottom: 30px;
  padding-right: 20px;
  background-color: #f5f7f2;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
}

.advantages-content__card-title {
  color: #3e3e3e;
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 25px;
}

.advantages-content__card-text {
  color: #676666;
  font-size: 15px;
}

.advantages-content__card-icon img{
  margin: 30px;
  width: 90px;
  height: 90px;
}


//*  --  --  --  --  --    CONTACT    --  --  --  --  --  *//
.contact {
  margin: 275px auto 375px;
}

.contact-content{
  display: flex;
  justify-content: end;
}

.contact-content__info{
  margin-right: 10vw;
}

.contact-content__info h2{
  color: #fff;
  padding-top: 20px;
  font-size: 60px;
}

.contact-content__info p{
  color: #CCCCCC;
  font-size: 20px;
}
.contact-content__info p:nth-child(2){
  margin: 20px 0 10px;
}
.contact-content__info p:nth-child(3){
  margin: 0;
}
.contact-content__info p:nth-child(4){
  margin: 30px 0 10px;
}
.contact-content__info strong{
  margin-bottom: 0;
}

.contact-content__info p:last-child{
  margin-top: 0;
  color: #fff;
  font-size: 32px;
}
.contact-content__info a{
  color: #fff;
  font-size: 32px;
}

.contact-background{
  width: 100%;
  margin: 380px 0;
  top: -10px;
  left: 0;
  position: relative;
  z-index: -1;
}

.contact-background__bowl{
  width: 100%;
  max-width: 1200px;
  top: -120px;
  left: 14vw;
  position: relative;
  z-index: 0;
}

.contact-background__bowl2{
  visibility: hidden;
  width: 100%;
  max-width: 1200px;
  top: -120px;
  left: 14vw;
  position: relative;
  z-index: 0;
}

.contact-card-background{
  position: absolute;
  background-color: #195a00;
  border-radius: 50px;
  top: 0;
  right: 10vw;
  width: 1560px;
  height: 369px;
  z-index: -1;
}

.contact-card-image1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 730px;
  height: 585px;
  z-index: -1;
}

.contact-card-image2{
  position: absolute;
  top: -50PX;
  left: 360px;
  width: 493px;
  height: 484px;
  z-index: -1;
}

.contact-card-image3{
  position: absolute;
  top: 242PX;
  left: -70PX;
  width: 282px;
  height: 270px;
  z-index: -1;
}


//*  --  --  --  --  --    FOOTER    --  --  --  --  --  *//
.footer {
  background: #195a00;
  padding: 70px 0 60px;
}

.lending-footer__content{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}


.lending-footer__text{
  text-align: center;
}

@media (max-width: 1440px) {
  .contact-background__bowl{
    left: 6%;
  }

  .contact-card-background {
    right:0;
    width: 100%;
    max-width: 1280px;
  }
}

//*  --  --  --  --  --    MEDIA MAX-WIDTH 1200PX    --  --  --  --  --  *//
@media (max-width: 1200px) {
  .lending-container {
    width: 100%;
    max-width: 956px;
    margin: 0 auto;
  }

  .header-content__logo {
    margin-right: 92px;
  }

  .header-background, {
    top: 0;
    left: 0;
    transform: scale(0.8);
  }

  .header-background__banner{
    top: -320px;
    left: 56vw;
  }

  .about-content{
    width: 470px;
  }

  .about-content__title{
    font-size: 50px;
  }

  .about-background {
    left: 60vw;
  }

  .app-store-img {
    margin-left: 16px;
  }

  .arrow-phone, .app-store-img__phone,  .google-play-img__phone {
    display: none;
  }

  .about-content{
    padding-top: 70px;
    width: 540px;
  }

  .stars {
    top: 160px;
    left: -160px;
  }

  .arrow {
    top: 274px;
    left: -190px;
  }


  .advantages-content__card-title {
    font-size: 20px;
    margin-top: 36px;
    margin-bottom: 12px;
  }

  .advantages-content__card-text {
    font-size: 15px;
  }

  .advantages-content__card-icon img{
    margin: 30px 20px 20px 30px;
    width: 60px;
    height: 60px;
  }

  .contact-background__bowl{
    top: -60px;
    left: -5.5vw;
    transform: scale(0.78);
  }

  .contact-card-background {
    right:0;
    width: 100%;
    max-width: 1280px;
  }


}


//*  --  --  --  --  --    MEDIA MAX-WIDTH 992PX    --  --  --  --  --  *//
@media (max-width: 1020px) {
  .about-background {
    left: 64vw;
  }
}



@media (max-width: 992px) {
  .lending-container {
    width: 100%;
    max-width: 856px;
    margin: 0 auto;
  }

  .header-content__logo {
    margin-right: 64px;
  }

  main {
    margin-bottom: 100px;
  }

  .about-content__title{
    font-size: 50px;
  }

  nav a{
    color: #272727;
    font-size: 18px;
    text-decoration: none;
    margin-right: 20px;
  }

  .about-background {
    left: 65vw;
  }

  .stars {
    top: 30px;
    left: -240px;
  }

  .app-store-img {
    margin-left: 12px;
  }

  .advantages {
    padding: 80px 0 0;
  }

  .advantages-content{
    padding: 0 60px
  }

  .advantages-content__title{
    width: 384px;
    margin: 0 auto;
    font-size: 30px
  }

  .contact-background__bowl{
    top: 0;
    left: -15vw;
    transform: scale(0.6) rotate(-16deg);
  }

  .contact {
    margin: 150px 0 340px;
  }

  .contact-background {
    margin: 250px 0;
  }


}

@media (max-width: 980px) {
  .contact {
    margin: 100px 0 400px;
  }

  .contact-background {
    margin: 200px 0;
  }

  .contact-content{
    justify-content: center;
  }

  .contact-content__info{
    margin-right: 0;
  }

  .contact-card-background{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 380px;
    z-index: -1;
  }

  .contact-background__bowl{
    top: 220px;
    left: -20vw;
    transform: scale(0.6) rotate(50deg);
  }

  .contact-background__bowl2{
    visibility: visible;
    position: absolute;
    top: 100px;
    left: 26vw;
    transform: scale(0.6) rotate(-120deg);
  }

  .contact-card-image3{
    top: -30PX;
    left: -20px;
    transform: rotate(40deg);
  }

  .contact-content__info h2{
    text-align: center;
    color: #fff;
    padding-top: 20px;
    font-size: 32px;
  }

  .contact-content__info p{
    text-align: center;
    color: #CCCCCC;
    font-size: 20px;
  }
  //.contact-content__info p:nth-child(2){
  //  margin: 20px 0 10px;
  //}
  //.contact-content__info p:nth-child(3){
  //  margin: 0;
  //}
  //.contact-content__info p:nth-child(4){
  //  margin: 30px 0 10px;
  //}
  //.contact-content__info strong{
  //  margin-bottom: 0;
  //}

  .contact-content__info p:last-child{
    margin-top: 0;
    color: #fff;
    font-size: 26px;
  }
  .contact-content__info a{
    color: #fff;
    font-size: 26px;
  }



}



//*  --  --  --  --  --    MEDIA MAX-WIDTH 896PX    --  --  --  --  --  *//
@media (max-width: 896px) {

  .lending-container {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }

  .about-content {
    max-width: 470px;
    margin: 0 auto;
  }

  main {
    margin-top: 400px;
  }

  nav a{
    font-size: 14px;
  }

  .header-content {
    justify-content: space-evenly;
  }

  .about-content__title{
    line-height: 57px;
    font-size: 50px;
    margin-bottom: 104px;
  }

  .header-background{
    top: 20px;
    left: -24vw;
    transform: scale(0.5);
  }

  .header-background__banner{
    top: -430px;
    left: 50vw;
    transform: rotate(-4deg);
  }

  nav a:hover {
    color: #fff;
  }

  .about-background{
    left: 64vw;
  }

  .stars {
    top: 220px;
    left: 1vw;
  }

  .arrow {
    top: 300px;
    left: 42px;
  }


  .advantages-content__cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .contact-background__bowl{
    top: 290px;
    left: 3vw;
    transform: scale(0.5);
  }

  .contact-card-background{
    top: 0;
    left: 0;
    margin: 0 auto;
    max-width: 460px;
  }

  .contact-background__bowl2{
    visibility: hidden;
  }


}

//*  --  --  --  --  --    MEDIA MAX-WIDTH 768PX    --  --  --  --  --  *//
@media (max-width: 768px) {
  .about-content__title{
    font-size: 50px;
  }
  .lending-container {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
  }

  .nav a{
    color: #272727;
    font-size: 14px;
    text-decoration: none;
    margin-right: 20px;
  }

  .header-content {
    justify-content: space-evenly;
  }

  .header-content__logo {
    margin-right: 16px;
  }

  nav a:nth-child(1):hover {
    color: #fff;
  }

  .stars {
    top: 220px;
    left: 1vw;
  }
  .arrow {
    top: 300px;
    left: 68px;
  }

  .contact-background__bowl{
    top: 300px;
    left: -2vw;
    transform: scale(0.5);
  }

  .contact-card-background{
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 460px;
    height: 480px;
    z-index: -1;
  }

  .about-background{
    top: 314px;
    left: 63vw;
  }

}


//*  --  --  --  --  --    MEDIA MAX-WIDTH 640PX    --  --  --  --  --  *//
@media (max-width: 640px) {
  body {
    padding: 0 20px;
  }

  .lending-container {
    width: 100%;
    padding: 0 20px;
    margin: 0 auto;
  }

  .header-content__logo {
    height: 32px;
    margin-right: 170px;
  }

  .header-background{
    top: 20px;
    left: -40vw;
    transform: scale(0.45);
  }

  .header-background__banner{
    top: -430px;
    left: 70vw;
  }

  .sheet2{
    top: 646px;
    left: 542px;
    width: 258px;
    height: 255px;
    transform: scale(0.7);
  }

  .sheet1{
    top: 550px;
    left: 592px;
    width: 261px;
    height: 260px;
    transform: scale(0.7);
  }

  header {
    width: 100%;
    margin: 0;
  }

  .header-content {
    height: 80px;
    justify-content: space-between;
  }

  .header-content nav{
    display: none;
  }

  .header-content__burger{
    display: flex;
    align-items: end;
    flex-direction: column;
  }

  .header-content__burger span{
    background-color: #fff;
    margin-bottom: 5px;
    width: 28px;
    height: 3px;
  }

  .header-content__burger span:nth-child(3){
    background-color: #fff;
    margin-bottom: 5px;
    width: 22px;
    height: 3px;
  }

  .stars {
    top: 220px;
    left: 5vw;
  }

  //.strawberry{
  //  top: 67px;
  //  left: -122px;
  //  width: 200px;
  //  height: 270px;
  //}

  .about-content__buttons{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .app-store-img__phone, .google-play-img__phone{
    width: 364px;
    height: 55px;
    display: block;
  }

  .arrow-phone{
    display: block;
    position: absolute;
    top: 280px;
    left: -30px;
    width: 65px;
    height: 95px;

  }

  .arrow, .google-play-img, .app-store-img {
    display: none;
  }

  .contact-card-background{
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 420px;
    height: 480px;
    z-index: -1;
  }

  .contact-background__bowl{
    top: 300px;
    left: -5vw;
    transform: scale(0.5);
  }

  .about-content__title{
    width: 325px
  }


}

@media (max-width: 576px) {
  main {
    margin-top: 280px;
  }

  .about-content__title{
    margin-left: 10px;
    font-size: 32px;
    font-weight: 600;
    line-height: 44px;
  }


  .lending-container {
    max-width: 540px;
  }

  .advantages {
    padding: 0;
  }
  .advantages-content {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .advantages-content__cards{
    margin: 20px 0 0 ;
  }

  .advantages-content__card{
    padding: 0 20px 20px 0
  }
  .advantages-content__card img{
    margin: 30px;
  }

  .about-content, .advantages-content__title {
    font-size: 24px;
    max-width: 540px;
    width: 100%;
  }

  .stars {
    top: 130px;
    left: 50px;
  }

  .arrow-phone{
    top: 186px;
    left: -6px;
    transform: rotate(-6deg);
  }

  .contact-background__bowl{
    top: 300px;
    left: -14vw;
    transform: scale(0.4);
  }

  .about-background {
    left: 60vw;
  }
}

//*  --  --  --  --  --    MEDIA MAX-WIDTH 360PX    --  --  --  --  --  *//
@media (max-width: 364px) {

  .contact-card-background{
      border-radius: 34px;
  }

  .footer {
    padding: 40px 0;
  }

  .lending-footer__text{
    font-size: 14px;
    text-align: center;
  }

  .about-background {
    left: 60vw;
  }


}

</style>