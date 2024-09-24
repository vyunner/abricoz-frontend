<template>
  <header class="header">
    <Menubar>
      <template #start>
        <div>
          <Button icon="pi pi-bars" @click="menuVisible = true"/>
        </div>
      </template>
      <template #end>
        <Button type="button" icon="pi pi-user" @click="toggle"/>
        <Menu ref="menu" :model="accountItems" :popup="true"/>
      </template>
    </Menubar>

    <Sidebar v-model:visible="menuVisible" header="Меню">
      <PanelMenu :model="menuItems">
      </PanelMenu>
    </Sidebar>
  </header>
</template>

<script>
import {getCookie} from "@/utils/helpers/cookies.helper";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      menuVisible: false,
      accountItems: [{
        icon: 'pi pi-user',
        label: `${getCookie('ROLE')}: ${getCookie('LOGIN')}`,
        items: [
          // {
          //   label: 'Мой профиль',
          //   icon: 'pi pi-user',
          //   to: '/profile',
          // },
          {
            label: 'Выход',
            icon: 'pi pi-fw pi-power-off',
            command: (event) => {
              authService.logout();
            }
          }
        ]
      }],
      menuItems: [
        {
          label: 'Склад',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Заполнение товаров',
            },
          ]
        }
      ],
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
}
</script>

<style lang="scss" scoped>
.menuButton {
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  color: black;
  text-align: left;
  border-color: black;
}
</style>
