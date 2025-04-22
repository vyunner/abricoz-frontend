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
import { getCookie } from "@/utils/helpers/cookies.helper";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      menuVisible: false,
      accountItems: [{
        icon: 'pi pi-user',
        label: `${getCookie('ROLE')}: ${getCookie('LOGIN')}`,
        items: [
          {
            label: 'Выход',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              authService.logout();
            }
          }
        ]
      }],
    };
  },
  computed: {
    menuItems() {
      return [
        {
          label: 'Пользователи',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Сотрудники',
              command: () => {
                this.$router.push('/admin/user/get-users-with-roles');
                this.menuVisible = false;
              }
            },
            {
              label: 'Выдача ролей',
              command: () => {
                this.$router.push('/admin/user/set-roles');
                this.menuVisible = false;
              }
            },
          ]
        },
        {
          label: 'Диспетчер',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Прикрепить заказы',
              command: () => {
                this.$router.push('/admin/dispatcher/assign-orders');
                this.menuVisible = false;
              }
            },
            {
              label: 'Открепить заказы',
              command: () => {
                this.$router.push('/admin/dispatcher/unassign-orders');
                this.menuVisible = false;
              }
            },
          ]
        },
        {
          label: 'Склад',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Заполнение товаров',
              command: () => {
                this.$router.push('/admin/warehouse/fill');
                this.menuVisible = false;
              }
            },
            {
              label: 'Категории и Подкатегории',
              command: () => {
                this.$router.push('/admin/warehouse/categories-subcategories');
                this.menuVisible = false;
              }
            },
          ]
        },
        {
          label: 'POS',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Поиск',
              command: () => {
                this.$router.push('/admin/pos/search');
                this.menuVisible = false;
              }
            },
          ]
        },
      ];
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
};
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
