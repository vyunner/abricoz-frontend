<template>
  <h3 v-if="error">Что-то пошло не так</h3>
  <h3 v-else>Подождите...</h3>
</template>

<script>
import epayService from "@/services/epay.service";

export default {
  data() {
    return {
      error: false,
    };
  },
  methods: {
    async loadPaymentScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://epay.homebank.kz/payform/payment-api.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });
    },
    async redirectPaymentPage() {
      try {
        let user_id = this.$route.query.user_id;
        if (!user_id) {
          this.error = true;
          return;
        }

        let data = await epayService.getSaveCardToken(user_id);
        const [lat, lon] = data.ip_info.loc.split(",");

        if (window.halyk) {
          var createPaymentObject = function (auth, invoiceId, amount) {
            var paymentObject = {
              invoiceId: data.invoice_id,
              backLink: "https://abricoz.kz/success",
              failureBackLink: "https://abricoz.kz/failure",
              postLink: "https://api.abricoz.kz/api/epay/success",
              language: "rus",
              description: "Регистрация карты",
              accountId: data.invoice_id,
              terminal: "661b56fc-f3cf-494b-bc8e-0108c484b4aa",
              amount: 0,
              currency: "USD",
              cardSave: true,
              paymentType: "cardVerification",
              ip: data.ip_info.ip,
              ipCountry: data.ip_info.country,
              ipCity: data.ip_info.city,
              ipRegion: data.ip_info.region,
              ipDistrict: data.ip_info.city,
              ipLatitude: lat,
              ipLongitude: lon,
            };

            paymentObject.auth = auth;
            return paymentObject;
          };

          // console.log(createPaymentObject(data.token, data.invoice_id, 0));
          window.halyk.cardverification(createPaymentObject(data.token, data.invoice_id, 0));
        } else {
          console.error("Ошибка: halyk не определён");
          this.error = true;
        }
      } catch (error) {
        console.error("Ошибка загрузки скрипта:", error);
        this.error = true;
      }
    },
  },
  async mounted() {
    if (!this.$route.query.user_id) {
      this.error = true;
      return;
    }
    await this.loadPaymentScript();
    await this.redirectPaymentPage();
  },
};
</script>