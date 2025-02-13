<template>
  <div>
    <button @click="showPaymentWidget">Оплатить</button>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  data() {
    return {
      isScriptLoaded: false, // Флаг загрузки скрипта
    };
  },
  methods: {
    loadPaymentScript() {
      return new Promise((resolve, reject) => {
        if (this.isScriptLoaded) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://epay.homebank.kz/payform/payment-api.js";
        script.async = true;
        script.onload = () => {
          this.isScriptLoaded = true;
          resolve();
        };
        script.onerror = reject;

        document.body.appendChild(script);
      });
    },
    async showPaymentWidget() {
      try {
        await this.loadPaymentScript(); // Загружаем скрипт, если он ещё не загружен
        if (window.halyk) {
          var createPaymentObject = function(auth, invoiceId, amount) {
            var paymentObject = {
              invoiceId: "11112223",
              backLink: "http://localhost:8080/payment",
              failureBackLink: "http://localhost:8080/payment",
              postLink: "https://api.abricoz.kz/api/epay/success",
              language: "rus",
              description: "Регистрация карты",
              accountId: "qwer",
              terminal: "661b56fc-f3cf-494b-bc8e-0108c484b4aa",
              amount: 0,
              currency: "USD",
              cardSave: true,
              paymentType: "cardVerification",
              ip: "149.27.147.24",
              ipCountry: "KZ",
              ipCity: "Shymkent",
              ipRegion: "Shymkent",
              ipDistrict: "Shymkent",
              ipLatitude: "42.3000",
              ipLongitude: "69.6000",
            };
            paymentObject.auth = auth;
            return paymentObject;
          };

          window.halyk.cardverification(createPaymentObject({
            "access_token": "JGAKFOEXUCOW893V5NRP8Z",
            "expires_in": "1200",
            "refresh_token": "",
            "scope": "payment",
            "token_type": "Bearer"
          }, 11112223, 0)); // Вызов метода для отображения виджета
        } else {
          console.error("Ошибка: halyk не определён");
        }
      } catch (error) {
        console.error("Ошибка загрузки скрипта:", error);
      }
    },
  },
  mounted() {
    this.loadPaymentScript(); // Загружаем скрипт при монтировании
  },
};
</script>
