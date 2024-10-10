<template>
  <div class="container">
    <DataTable class="datatable" :value="couriers" tableStyle="min-width: 50rem" showGridlines stripedRows
               responsiveLayout="scroll"
               :paginator="true" :rows="20" :loading="loading">
      <Column field="id" header="ID"/>
      <Column field="phone" header="Телефон"/>
      <Column header="ФИО">
        <template #body="{data}">{{ data.lastname }} {{ data.firstname }}</template>
      </Column>
      <Column header="Действие">
        <template #body="{data}">
          <Button @click="checkOrders(data.orders, data.id)" label="Посмотреть заказы"/>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="visibleDialog" modal header="Заказы курьера" :style="{ width: '80%' }">
      <DataTable :value="currentOrders" tableStyle="min-width: 50rem" showGridlines stripedRows
                 responsiveLayout="scroll"
                 :paginator="true" :rows="20" :loading="loading">
        <Column field="id" header="ID"/>
        <Column field="order_status_name" header="Статус"/>
        <Column header="Адресс">
          <template #body="{data}">
            <p class="text">Улица и дом: {{ data.address_street_and_house }}</p>
            <p class="text">Квартира: {{ data.address_apartment }}</p>
            <p class="text">Подъезд: {{ data.address_entrance }}</p>
            <p class="text">Этаж: {{ data.address_floor }}</p>
            <p class="text">Комментарий к заказу: {{ data.address_comment }}</p>
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
            <Checkbox v-model="postData.order_ids" :value="data.id" />
          </template>
        </Column>
      </DataTable>

      <div v-if="postData.order_ids.length > 0" class="fixed-button">
        <Button @click="unassignOrders" :loading="loading" label="Отвязать заказы от курьера" />
      </div>
    </Dialog>
  </div>

  <Toast position="bottom-right" group="br"/>
</template>

<script>
import dispatcherService from "@/services/dispatcher.service";

export default {
  name: "DispatcherUnassignOrdersView",
  data() {
    return {
      couriers: [],
      currentOrders: [],
      visibleDialog: false,
      loading: false,
      postData: {
        "user_id": null,
        "order_ids": []
      },
    };
  },
  computed: {},
  methods: {
    async getAssignedOrders() {
      let res = await dispatcherService.getAssignedOrders();
      if (res) {
        this.couriers = res;
      }
    },
    checkOrders(orders, user_id) {
      this.postData.user_id = user_id;
      this.postData.order_ids = [];
      this.currentOrders = orders;
      this.visibleDialog = true;
    },
    async unassignOrders() {
      this.loading = true;
      let res = await dispatcherService.unassignOrders(this.postData)

      if (res) {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешно!',
          detail: 'Заказы успешно отвязаны от курьера.',
          group: 'br',
          life: 3000
        });
      }
      else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Что то пошло не так!',
          detail: 'Не получилось отвязать заказы от курьера.',
          group: 'br',
          life: 3000
        });
      }

      this.visibleDialog = false;
      await this.getAssignedOrders();
      this.loading = false;
    }
  },
  async mounted() {
    this.loading = true;
    await this.getAssignedOrders();
    this.loading = false;
  }
};
</script>

<style lang="scss">
.datatable {
  margin-top: 40px;
}

.order {
  display: flex;
  justify-content: space-between;
}

.text {
  margin: 0 0 5px 0;
  font-size: 14px;
  width: 100%;
}

.fixed-button {
  position: fixed;
  bottom: 20px; /* Отступ снизу страницы */
  left: 50%; /* Центровка по горизонтали */
  transform: translateX(-50%); /* Для корректной центровки */
  z-index: 1000; /* Поверх остальных элементов */
}
</style>