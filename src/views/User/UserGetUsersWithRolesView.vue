<template>
  <div class="container">
    <DataTable :value="users" tableStyle="min-width: 50rem" showGridlines stripedRows responsiveLayout="scroll" :paginator="true" :rows="20" :loading="loading">
      <Column field="id" header="ID"></Column>
      <Column field="phone" header="Номер телефона"></Column>
      <Column header="Роли">
        <template #body="{data}">
          <span v-for="(role, index) in data.roles" :key="index">{{role.name}}&nbsp;</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import authService from "@/services/auth.service";
import teamService from "@/services/team.service";
import axios from "axios";
import userService from "@/services/user.service";

export default {
  name: "UserGetUsersWithRolesView",
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  methods: {
    async getUsersWithRoles(){
      let res = await userService.getUsersWithRoles();
      if (res){
        this.users = res;
      }
    }
  },
  async mounted() {
    await this.getUsersWithRoles();
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
}
</style>
