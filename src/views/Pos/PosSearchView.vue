<template>
  <div class="container">
    <div class="pos-search">
      <div class="pos-search__row pos-search__row--switch">
        <InputSwitch v-model="useBarcode"/>
        <label class="pos-search__label">
          {{ useBarcode ? 'Поиск по штрихкоду' : 'Поиск по названию' }}
        </label>
      </div>

      <div class="pos-search__row pos-search__row--input">
        <InputText
            ref="searchInput"
            v-model="query"
            placeholder="Введите штрихкод или название"
            @keydown.enter="search"
            class="pos-search__input"
        />
        <Button
            label="Поиск"
            icon="pi pi-search"
            @click="search"
            class="pos-search__button"
        />
      </div>

      <div v-if="productList.length && !useBarcode" class="product-list">
        <div
            v-for="prod in productList"
            :key="prod.id"
            class="product-card"
            @click="selectProduct(prod)"
        >
          <Image v-if="prod.photo_url" :src="prod.photo_url" width="100"/>
          <div class="product-name">{{ prod.name_ru }} {{ prod.weight}}</div>
        </div>
      </div>

      <div v-if="result" class="pos-search__result">
        <strong>Результат:</strong> {{ result }}
      </div>
    </div>

    <!-- Диалог: продукт найден -->
    <Dialog header="Продукт найден" v-model:visible="productFoundDialog" modal>
      <div class="dialog__image-wrapper">
        <Image v-if="product.photo_url" :src="product.photo_url" width="80%" preview />
      </div>
      <template #footer>
        <Button label="Изменить" icon="pi pi-pencil" @click="openEditDialog" />
        <Button label="Инвентаризация" icon="pi pi-box" @click="openInventoryDialog" />
      </template>
    </Dialog>

    <!-- Диалог: редактировать -->
    <Dialog header="Редактировать товар" v-model:visible="editProductDialog" modal :style="{ width: '600px' }">
      <div v-if="product">
        <div class="field">
          <label>ID</label>
          <InputNumber v-model="product.id" disabled />
        </div>
        <div class="field" v-for="field in editableFields" :key="field.label">
          <label>{{ field.label }}</label>
          <component :is="field.type" v-model="product[field.model]" v-bind="field.props" />
        </div>
        <div class="field">
          <label>Подкатегория</label>
          <Dropdown
              v-model="product.subcategory_id"
              :options="subcategories"
              optionLabel="name_ru"
              optionValue="id"
              placeholder="Выберите подкатегорию"
              filter
              class="w-full"
          />
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="saveProduct"/>
      </template>
    </Dialog>

    <!-- Диалог: инвентаризация -->
    <Dialog header="Инвентаризация" v-model:visible="inventoryDialog" modal :style="{ width: '500px' }">
      <div v-if="product">
        <div class="field">
          <label>В продажу (сейчас)</label>
          <InputNumber :modelValue="product.amount" disabled />
        </div>
        <div class="field">
          <label>Осталось на складе (сейчас)</label>
          <InputNumber :modelValue="product.stock_quantity" disabled />
        </div>

        <div class="field">
          <label>Изменить \"в продажу\"</label>
          <div class="field__change-row">
            <InputNumber v-model="changeAmount" />
            <Button icon="pi pi-plus" @click="change('amount', +changeAmount)" :disabled="loadingChange" />
            <Button icon="pi pi-minus" @click="change('amount', -changeAmount)" :disabled="loadingChange" />
          </div>
        </div>

        <div class="field">
          <label>Изменить \"на складе\"</label>
          <div class="field__change-row">
            <InputNumber v-model="changeStock" />
            <Button icon="pi pi-plus" @click="change('stock_quantity', +changeStock)" :disabled="loadingChange" />
            <Button icon="pi pi-minus" @click="change('stock_quantity', -changeStock)" :disabled="loadingChange" />
          </div>
        </div>

        <div class="field" v-for="field in priceFields" :key="field.label">
          <label>{{ field.label }}</label>
          <InputNumber v-model="product[field.model]" />
        </div>

        <div class="field__change-row" style="justify-content: flex-end">
          <Button
              label="Изменить цены"
              icon="pi pi-check"
              severity="info"
              @click="changePrices"
              :disabled="loadingChange"
          />
        </div>
      </div>
    </Dialog>

    <Toast position="bottom-right"/>
  </div>
</template>

<script>
import posService from "@/services/pos.service";
import { useToast } from "primevue/usetoast";

export default {
  name: "PosSearchView",
  data() {
    return {
      useBarcode: true,
      query: "",
      result: null,
      product: null,
      productList: [],
      productFoundDialog: false,
      editProductDialog: false,
      inventoryDialog: false,
      changeAmount: 1,
      changeStock: 1,
      loadingChange: false,
      subcategories: [],
      toast: null,
      editableFields: [
        { label: "Штрихкод", model: "barcode", type: "InputText" },
        { label: "Название (RU)", model: "name_ru", type: "InputText" },
        { label: "Название (KZ)", model: "name_kz", type: "InputText" },
        { label: "Описание (RU)", model: "description_ru", type: "Textarea", props: { autoResize: true, rows: 3 } },
        { label: "Описание (KZ)", model: "description_kz", type: "Textarea", props: { autoResize: true, rows: 3 } },
        { label: "Производитель", model: "manufacturer", type: "InputText" },
        { label: "Полка", model: "where", type: "InputText" },
        { label: "Вес", model: "weight", type: "InputText" },
        { label: "Цена", model: "price", type: "InputNumber" },
        { label: "Скидка (%)", model: "discount", type: "InputNumber" },
        { label: "Цена со скидкой", model: "price_with_discount", type: "InputNumber" },
        { label: "Закупочная цена", model: "price_cost", type: "InputNumber" },
        { label: "Количество на продаже", model: "amount", type: "InputNumber" },
        { label: "Остаток на складе", model: "stock_quantity", type: "InputNumber" },
        { label: "Калории", model: "calories", type: "InputNumber", props: { maxFractionDigits: 1 } },
        { label: "Белки", model: "proteins", type: "InputNumber", props: { maxFractionDigits: 1 } },
        { label: "Жиры", model: "fats", type: "InputNumber", props: { maxFractionDigits: 1 } },
        { label: "Углеводы", model: "carbohydrates", type: "InputNumber", props: { maxFractionDigits: 1 } },
        { label: "Активен", model: "is_active", type: "InputSwitch" },
      ],
      priceFields: [
        { label: "Цена", model: "price" },
        { label: "Скидка (%)", model: "discount" },
        { label: "Цена со скидкой", model: "price_with_discount" },
        { label: "Закупочная цена", model: "price_cost" },
      ]
    };
  },
  mounted() {
    this.toast = useToast();
    this.loadSubcategories();
    this.$nextTick(() => {
      const input = this.$refs.searchInput?.$el?.querySelector("input");
      if (input) input.focus();
    });
  },
  methods: {
    async loadSubcategories() {
      try {
        this.subcategories = await posService.getSubcategories();
      } catch (e) {
        console.error("Ошибка загрузки подкатегорий:", e);
      }
    },
    async search() {
      const mode = this.useBarcode ? "barcode" : "name";
      const queryParam = `${mode}=${encodeURIComponent(this.query)}`;
      const response = await posService.searchProduct(queryParam);

      if (mode === "barcode") {
        if (response && typeof response === "object") {
          response.is_active = Boolean(response.is_active);
          this.product = { ...response };
          this.productFoundDialog = true;
        } else {
          this.result = `Товар не найден по ${mode}`;
        }
      } else {
        if (Array.isArray(response)) {
          this.productList = response;
        } else {
          this.result = "Ничего не найдено";
          this.productList = [];
        }
      }

      this.query = "";
    },
    selectProduct(prod) {
      this.product = { ...prod, is_active: Boolean(prod.is_active) };
      this.productList = [];
      this.productFoundDialog = true;
    },
    openEditDialog() {
      this.productFoundDialog = false;
      this.editProductDialog = true;
    },
    openInventoryDialog() {
      this.productFoundDialog = false;
      this.inventoryDialog = true;
      this.changeAmount = 1;
      this.changeStock = 1;
    },
    async saveProduct() {
      try {
        const updated = await posService.updateProduct(this.product, this.product.id);
        this.product = updated;
        this.toast.add({
          severity: "success",
          summary: "Сохранено",
          detail: "Товар успешно обновлён",
          life: 3000,
        });
        this.editProductDialog = false;
      } catch (e) {
        console.error("Ошибка обновления:", e);
        this.toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Не удалось обновить товар",
          life: 3000,
        });
      }
    },
    async change(field, delta) {
      if (!this.product?.id || !["amount", "stock_quantity"].includes(field) || this.loadingChange) return;

      this.loadingChange = true;
      const payload = { product_id: this.product.id, [field]: delta };

      try {
        const updated = await posService.changeProductAmount(payload);
        this.product = updated;
        this.toast.add({
          severity: "success",
          summary: "Обновлено",
          detail: `Поле ${field} изменено на ${delta > 0 ? "+" : ""}${delta}`,
          life: 3000,
        });
      } catch (e) {
        this.toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Не удалось обновить товар",
          life: 3000,
        });
      } finally {
        this.loadingChange = false;
      }
    },
    async changePrices() {
      if (!this.product?.id || this.loadingChange) return;

      this.loadingChange = true;
      const { price, discount, price_with_discount, price_cost } = this.product;

      try {
        const updated = await posService.changeProductAmount({
          product_id: this.product.id,
          price,
          discount,
          price_with_discount,
          price_cost
        });
        this.product = updated;
        this.toast.add({
          severity: "success",
          summary: "Цены обновлены",
          detail: "Цены успешно обновлены",
          life: 3000,
        });
      } catch (e) {
        this.toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Не удалось обновить цены",
          life: 3000,
        });
      } finally {
        this.loadingChange = false;
      }
    },
  },
};
</script>

<style scoped>
.pos-search {
  margin-top: 10px;
}
.pos-search__row {
  margin-bottom: 1rem;
}
.pos-search__row--switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.pos-search__row--input {
  display: flex;
  gap: 0.5rem;
}
.pos-search__result {
  margin-top: 1rem;
}
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.field__change-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.dialog__image-wrapper {
  text-align: center;
  margin-bottom: 1rem;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
}
.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  width: 150px;
  text-align: center;
  border-radius: 4px;
  transition: 0.2s;
}
.product-card:hover {
  background: #f5f5f5;
}
.product-name {
  margin-top: 5px;
  font-weight: bold;
}
</style>
