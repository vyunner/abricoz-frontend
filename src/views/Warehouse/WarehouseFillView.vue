<template>
  <div class="container">
    <div class="main">
      <div class="input-group">
        <InputText
            placeholder="Введите название..."
            v-model="searchTerm"
            @keyup.enter="onSearch"
        />
        <Button
            label="Поиск"
            icon="pi pi-search"
            @click="onSearch"
            :loading="loading"
        />
      </div>

      <DataTable v-if="products.length" :value="products" class="dataTable" tableStyle="min-width: 50rem" showGridlines
                 stripedRows responsiveLayout="scroll" :loading="loading">

        <!-- Отображение полей продукта -->
        <Column field="id" header="ID"></Column>
        <Column header="Фото">
          <template #body="{data}">
            <Image :src="'https://api.abricoz.kz' + data.photo_url" width="100" preview/>
          </template>
        </Column>
        <Column field="name_ru" header="Название"></Column>
        <Column field="subcategory.name_ru" header="Подкатегория"></Column>
        <Column field="brand.name" header="Бренд"></Column>
        <Column field="country.name" header="Страна"></Column>
        <Column header="Цена">
          <template #body="{data}">
            <p class="text">Цена: {{ data.price }} тг</p>
            <p class="text">Скидка: {{ data.discount }}%</p>
            <p class="text">Цена со скидкой: {{ data.price_with_discount }} тг</p>
          </template>
        </Column>
        <Column header="Осталось">
          <template #body="{data}">{{ data.amount }} x {{ data.weight }}</template>
        </Column>

        <!-- Кнопки действий -->
        <Column header="Действия">
          <template #body="{data}">
            <div class="button-group">
              <Button label="Склад" class="p-button-text" @click="editWarehouse(data)"/>
              <Button label="Изменить" class="p-button-text" @click="onEdit(data)"/>
              <Button label="Удалить" class="p-button-text p-button-danger" @click="onDelete(data)"/>
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Диалоговое окно для редактирования продукта -->
      <Dialog v-model:visible="editProductVisible" modal header="Изменить продукт" :style="{ width: '35%' }">
        <pre>{{ editedProduct }}</pre>
        <div class="p-fluid">
          <div class="p-field">
            <label for="name_ru">Название (RU)</label>
            <InputText v-model="editedProduct.name_ru" id="name_ru"/>
          </div>

          <div class="p-field">
            <label for="subcategory">Подкатегория</label>
            <Dropdown
                v-model="editedProduct.subcategory_id"
                :options="subcategories"
                optionLabel="name_ru"
                optionValue="id"
                placeholder="Выберите подкатегорию"
            />
          </div>

          <div class="p-field">
            <label for="brand">Бренд</label>
            <AutoComplete
                v-model="editedProduct.brand_id"
                :suggestions="brandSuggestions"
                @complete="searchBrands"
                optionLabel="name"
                field="name"
                placeholder="Введите бренд"
            />
          </div>

          <div class="p-field">
            <label for="country">Страна</label>
            <AutoComplete
                v-model="editedProduct.country"
                :suggestions="countrySuggestions"
                @complete="searchCountries"
                field="name"
                placeholder="Введите страну"
            />
          </div>

          <div class="p-field">
            <Button label="Сохранить" icon="pi pi-check" @click="onSave"/>
          </div>
        </div>
      </Dialog>
    </div>

    <Dialog v-model:visible="editWarehouseVisible" modal header="Изменить склад" :style="{ width: '35%' }">
      <div class="amount">
        <InputNumber v-model="amountChange"/>
        <Button class="amount__button" @click="addAmount" :loading="loading" label="Добавить"/>
        <Button class="amount__button" @click="subtractAmount" :loading="loading" label="Отнять"/>
      </div>
      <div class="amount">
        <InputNumber v-model="adjustAmount"/>
        <Button class="amount__button" @click="editAmount" :loading="loading" label="Изменить количество"/>
      </div>
    </Dialog>

    <Toast position="bottom-right"/>
  </div>
</template>

<script>
import warehouseService from "@/services/warehouse.service";
import dispatcherService from "@/services/dispatcher.service";

export default {
  name: "WarehouseSearchView",
  data() {
    return {
      amountChange: 0,
      adjustAmount: 0,

      searchTerm: "",
      products: [],
      editedProduct: {},
      editProductVisible: false,
      editWarehouseVisible: false,
      subcategories: [],
      brandSuggestions: [],
      countrySuggestions: [],
      loading: null,
    };
  },
  methods: {
    async editWarehouse(data) {
      console.log(data)
      this.adjustAmount = data.amount;
      this.editedProduct = data;
      this.editWarehouseVisible = true;
    },
    async addAmount() {
      this.loading = true;
      this.editedProduct.amount += this.amountChange;

      let res = await warehouseService.updateProduct(this.editedProduct.id, this.editedProduct);
      if (res) {
        this.$toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Продукт успешно обновлен.",
        });

        await this.onSearch();
      }

      this.amountChange = 0;
      this.editWarehouseVisible = false;
      this.loading = false;
    },
    async subtractAmount() {
      this.loading = true;

      if (this.editedProduct.amount - this.amountChange >= 0) {
        this.editedProduct.amount -= this.amountChange;

        let res = await warehouseService.updateProduct(this.editedProduct.id, this.editedProduct);
        if (res) {
          this.$toast.add({
            severity: "success",
            summary: "Успех",
            detail: "Продукт успешно обновлен.",
          });

          await this.onSearch();
        }
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Остаток на складе будет меньше нуля.",
        });
      }

      this.amountChange = 0;
      this.editWarehouseVisible = false;
      this.loading = false;
    },
    async editAmount() {
      this.loading = true;

      this.editedProduct.amount = this.adjustAmount;

      let res = await warehouseService.updateProduct(this.editedProduct.id, this.editedProduct);
      if (res) {
        this.$toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Продукт успешно обновлен.",
        });

        await this.onSearch();
      }

      this.editWarehouseVisible = false;
      this.loading = false;
    },


    async onSearch() {
      this.loading = true;
      if (this.searchTerm.trim() === "") {
        this.$toast.add({
          severity: "warn",
          summary: "Предупреждение",
          detail: "Введите название товара для поиска",
        });
        return;
      }
      const result = await warehouseService.search(this.searchTerm);
      if (result) {
        this.products = result;
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Ошибка при поиске товаров",
        });
      }
      this.loading = false;
    },
    async onEdit(product) {
      console.log(product)
      this.editedProduct = product;
      this.editProductVisible = true;
    },
    async onSave() {
      const updatedProduct = await warehouseService.updateProduct(this.editedProduct.id, this.editedProduct);
      if (updatedProduct) {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.$set(this.products, index, updatedProduct);
        }
        this.$toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Продукт успешно обновлен",
        });
        this.editProductVisible = false;
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Ошибка при обновлении продукта",
        });
      }
    },
    async onDelete(product) {
      const confirmed = confirm(`Вы уверены, что хотите удалить продукт ID: ${product.id}?`);
      if (confirmed) {
        const success = await warehouseService.deleteProduct(product.id);
        if (success) {
          this.products = this.products.filter(p => p.id !== product.id);
          this.$toast.add({
            severity: "success",
            summary: "Удалено",
            detail: `Продукт ID: ${product.id} успешно удален`,
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Ошибка при удалении продукта",
          });
        }
      }
    },
    async searchBrands(event) {
      const query = event.query;

      if (query.length > 3){
        const brands = await warehouseService.getBrands(query);
        this.brandSuggestions = brands;
      }
    },
    async searchCountries(event) {
      const query = event.query;
      const countries = await warehouseService.getCountries(query);
      this.countrySuggestions = countries;
    },
  },
  async mounted() {
    this.loading = true;
    this.subcategories = await warehouseService.getSubcategories();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-direction: column; /* Вертикальное расположение */
  justify-content: center; /* Выравнивание элементов по вертикали */
  align-items: center; /* Выравнивание элементов по горизонтали */
}

.main {
  margin-top: 40px;
}

.input-group {
  margin-bottom: 20px;
}

.text {
  margin: 0;
}

.amount {
  margin-bottom: 10px;
  display: inline-block;
  width: 100%;
}

.amount__button {
  margin-left: 10px;
}
</style>
