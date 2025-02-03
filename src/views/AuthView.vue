<template>
  <div class="container">
    <div class="card">
      <div class="card__content">
        <h1 class="card__title">Добро пожаловать!</h1>

        <div class="card__field" v-if="!showCodeInput">
          <p class="card__text">Номер телефона:</p>
          <InputMask class="card__input" v-model="user_data.phone" @click="moveCursorToLastInput"
                     @keydown.enter="code" mask="+7(999) 999-99-99" placeholder="+7" autofocus/>

        </div>

        <div class="card__field" v-if="showCodeInput">
          <p class="card__text">Код авторизации:</p>
          <InputText
              class="card__input"
              id="password"
              v-model="user_data.code"
              type="password"
              @keyup.enter="login"
          />
        </div>

        <Button
            v-if="!showCodeInput"
            class="card__button"
            @click="code"
            type="button"
            :loading="loading"
            label="Отправить код"
        />
        <Button
            v-if="showCodeInput"
            class="card__button"
            @click="login"
            type="button"
            :loading="loading"
            label="Войти"
        />
      </div>
    </div>
    <Toast position="bottom-right" group="br"/>
  </div>
</template>

<script>
import authService from "@/services/auth.service";

export default {
  name: "AuthView",
  data() {
    return {
      loading: false,
      showCodeInput: false,
      user_data: {
        phone: '',
        code: null,
      },
    };
  },
  methods: {
    moveCursorToLastInput(event) {
      const input = event.target;
      const value = this.user_data.phone || "";

      if (value) {
        const digitCount = value.replace(/[^0-9]/g, "").length; // Количество введенных цифр
        const lastInputIndex = Math.min(2 + digitCount + (digitCount > 3 ? 2 : 0) + (digitCount > 7 ? 1 : 0) + (digitCount > 9 ? 1 : 0), value.length);

        setTimeout(() => {
          input.setSelectionRange(lastInputIndex, lastInputIndex);
        }, 0);
      } else {
        setTimeout(() => {
          input.setSelectionRange(3, 3);
        }, 0);
      }
    },

    async code() {
      this.loading = true;
      this.user_data.phone = `+${this.user_data.phone.replace(/\D/g, "")}`
      if (await authService.code(this.user_data)) {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно!',
          detail: 'Код авторизации отправлен в смс.',
          group: 'br',
          life: 3000
        });
        this.showCodeInput = true;
      } else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Что то пошло не так!',
          detail: 'Неправильный логин или пароль.',
          group: 'br',
          life: 3000
        });
      }
      this.loading = false;
    },

    async login() {
      this.loading = true;
      this.user_data.phone = `+${this.user_data.phone.replace(/\D/g, "")}`
      if (await authService.login(this.user_data)) {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно!',
          detail: 'Вы успешно авторизовались.',
          group: 'br',
          life: 3000
        });

        this.$router.push('/admin');
      } else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Что то пошло не так!',
          detail: 'Неправильный код авторизации.',
          group: 'br',
          life: 3000
        });
      }
      this.loading = false;
    },
  },
  async mounted() {
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: grey;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 40px 20px 40px;
  width: 100%;
  max-width: 400px;
}

.card__title {
  margin: 0;
  text-align: center;
}

.card__text {
  margin: 0 0 10px 0;
}

.reg {
  margin-top: 20px;
  text-align: center;
}

.card__text-blue {
  cursor: pointer;
  color: blue;
}

.card__content {
}

.card__button {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  width: 100%;
}

.card__field {
  margin-top: 20px;
}

.card__icon {
  font-size: 1.2rem;
}

.card__input {
  width: 100%;
}

.card__checkbox-group {
}

.card__checkbox {
  margin: 0;
}

.card__button {
  margin-top: 0.5rem;
}
</style>
