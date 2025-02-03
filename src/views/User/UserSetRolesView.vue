<template>
  <div class="container">
    <InputMask class="card__input" v-model="phone" @click="moveCursorToLastInput"
               @keydown.enter="getUser" mask="+7(999) 999-99-99" placeholder="Номер телефона..."/>
    <Button label="Найти" @click="getUser" :loading="loading"></Button>
    <div class="panel" v-if="user">
      <div class="panel__user">
        ID: {{ user.id }} Номер телефона: {{ user.phone }}
      </div>
      <div class="panel__checkbox" v-for="(role, index) in roles" :key="role.id">
        <Checkbox v-model="postData.role_ids" :value="role.id"></Checkbox>&nbsp;
        <p class="panel__text">{{ role.name }}&nbsp;</p>
      </div>
      <Button class="panel__button" label="Изменить роли" @click="setRoles" :loading="loading"></Button>
    </div>
  </div>

  <Toast position="bottom-right" group="br"/>
</template>

<script>
import userService from "@/services/user.service";

export default {
  name: "UserSetRolesView",
  data() {
    return {
      user: null,
      phone: null,
      roles: [],
      postData: {
        user_id: null,
        role_ids: [] // Связанный массив для ID ролей
      },
      loading: true,
    };
  },
  methods: {
    moveCursorToLastInput(event) {
      const input = event.target;
      const value = this.phone || "";

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
    async getUser() {
      this.loading = true;
      this.phone = `+${this.phone.replace(/\D/g, "")}`
      let res = await userService.getUser(this.phone);
      if (res) {
        this.user = res;
        this.postData.role_ids = this.user.roles.map(role => role.id);
        this.postData.user_id = this.user.id;
      }
      else {
        this.postData.user_id = null;
        this.postData.role_ids = [];
        this.user = null;

        this.$toast.add({
          severity: 'warn',
          summary: 'Что то пошло не так!',
          detail: 'Пользователь не найден.',
          group: 'br',
          life: 3000
        });
      }
      this.loading = false;
    },
    async getRoles() {
      let res = await userService.getRoles();
      if (res) {
        this.roles = res;
      }
    },
    async setRoles() {
      let res = await userService.setRoles(this.postData);
      if (res) {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно!',
          detail: 'Роли успешно изменены.',
          group: 'br',
          life: 3000
        });
      }
      else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Что то пошло не так!',
          detail: 'Не получилось изменить роли',
          group: 'br',
          life: 3000
        });
      }
    },
  },
  async mounted() {
    await this.getRoles();
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}

.panel {
  margin-top: 20px;
}

.panel__text {
  display: inline;
}

.panel__user {
  margin-bottom: 10px;
}

.panel__button {
  margin-top: 10px;
}
</style>
