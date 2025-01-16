<template>
  <div class="container">
    <DataTable class="datatable" :value="orders" tableStyle="min-width: 50rem" showGridlines stripedRows
               responsiveLayout="scroll"
               :paginator="true" :rows="20" :loading="loading">
      <Column field="id" header="ID"/>
      <Column field="phone" header="Номер телефона"/>
      <Column header="Адресс">
        <template #body="{data}">
          <p class="text">Улица и дом: {{ data.address_street_and_house }}</p>
          <p class="text">Квартира: {{ data.address_apartment }}</p>
          <p class="text">Подъезд: {{ data.address_entrance }}</p>
          <p class="text">Этаж: {{ data.address_floor }}</p>
          <p class="text">Комментарий к заказу: {{ data.address_comment }}</p>
        </template>
      </Column>
      <Column header="Номер телефона">
        <template #body="{data}">
          <p class="text">Дата: {{ data.delivery_date }}</p>
          <p class="text">Время доставки: {{ data.delivery_interval_name }}</p>
        </template>
      </Column>
      <Column header="Продукты">
        <template #body="{data}">
          <p class="text" v-for="(product, index) in data.products" :key="index">
            {{ product.name_ru }} ({{ product.product_quantity }} x {{ product.weight }})
          </p>
        </template>
      </Column>
      <Column header="Действие">
        <template #body="{data}">
          <Checkbox v-model="selectedOrders" :value="data.id"></Checkbox>
        </template>
      </Column>
    </DataTable>

    <!-- Фиксированная кнопка внизу -->
    <div v-if="ordersSelected" class="fixed-button">
      <Button @click="getCouriers" :loading="loading">Назначить</Button>
    </div>

    <Dialog v-model:visible="visibleDialog" modal header="Список курьеров" :style="{ width: '50%' }">
      <DataTable :value="couriers" tableStyle="min-width: 50rem" showGridlines stripedRows
                 responsiveLayout="scroll"
                 :paginator="true" :rows="20" :loading="loading">

        <Column field="phone" header="Телефон"></Column>
        <Column header="ФИО">
          <template #body="{data}">
            {{data.lastname}} {{data.firstname}}
          </template>
        </Column>
        <Column field="orders_count" header="Кол-во"></Column>
        <Column header="Действие">
          <template #body="{data}">
            <Button label="Назначить" @click="assignOrders(data.id)" :loading="loading" />
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>

  <Toast position="bottom-right" group="br"/>
</template>

<script>
import dispatcherService from "@/services/dispatcher.service";

export default {
  name: "DispatcherAssignOrdersView",
  data() {
    return {
      orders: [],
      couriers: [],
      loading: true,
      selectedOrders: [], // массив для хранения выбранных id заказов
      visibleDialog: false,
    };
  },
  computed: {
    // Проверяем, выбраны ли заказы
    ordersSelected() {
      return this.selectedOrders.length > 0;
    }
  },
  methods: {
    async getUnassignedOrders() {
      let res = await dispatcherService.getUnassignedOrders();
      if (res) {
        this.orders = res;
      }
    },
    async getCouriers() {
      this.loading = true;
      let res = await dispatcherService.getCouriers();
      if (res) {
        this.couriers = res;
      }
      this.loading = false;
      this.visibleDialog = true;
    },
    async assignOrders(user_id) {
      this.loading = true;

      let postData = {
        "user_id": user_id,
        "order_ids": this.selectedOrders
      }

      let res = await dispatcherService.assignOrders(postData);

      if (res) {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно!',
          detail: 'Заказы успешно назначены.',
          group: 'br',
          life: 3000
        });
      }
      else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Что то пошло не так!',
          detail: 'Заказы не назначены.',
          group: 'br',
          life: 3000
        });
      }

      this.selectedOrders = [];
      this.visibleDialog = false;
      await this.getUnassignedOrders();
      this.loading = false;
    }
  },
  async mounted() {
    await this.getUnassignedOrders();
    this.loading = false;
  }
};
</script>

<style lang="scss">
.datatable {
  margin-top: 40px;
}

.text {
  margin: 0 0 5px 0;
  font-size: 14px;
  width: 100%;
}

/* Стили для фиксированной кнопки */
.fixed-button {
  position: fixed;
  bottom: 20px; /* Отступ снизу страницы */
  left: 50%; /* Центровка по горизонтали */
  transform: translateX(-50%); /* Для корректной центровки */
  z-index: 1000; /* Поверх остальных элементов */
}
</style>
