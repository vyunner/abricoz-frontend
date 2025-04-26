<template>
  <div class="container">
    <div class="pos-search">
      <div class="pos-search__row pos-search__row--switch">
        <InputSwitch v-model="useBarcode" />
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
          <Image v-if="prod.photo_url" :src="prod.photo_url" width="100" />
          <div class="product-name">{{ prod.name_ru }} {{ prod.weight }}</div>
        </div>
      </div>

      <div v-if="result" class="pos-search__result">
        <strong>Результат:</strong> {{ result }}
      </div>
    </div>

    <!-- Диалоги -->
    <Dialog header="Продукт найден" v-model:visible="productFoundDialog" modal>
      <div class="dialog__image-wrapper">
        <Image v-if="product.photo_url" :src="product.photo_url" width="80%" preview />
      </div>
      <template #footer>
        <Button label="Изменить" icon="pi pi-pencil" @click="openEditDialog" />
        <Button label="Инвентаризация" icon="pi pi-box" @click="openInventoryDialog" />
      </template>
    </Dialog>

    <Dialog header="Товар не найден" v-model:visible="productNotFoundDialog" modal>
      <p>Товар не найден. Создать товар с этим штрихкодом?</p>
      <template #footer>
        <Button label="Нет" icon="pi pi-times" @click="productNotFoundDialog = false" />
        <Button label="Да" icon="pi pi-check" @click="openCreateProductDialog" />
      </template>
    </Dialog>

    <Dialog header="Создание нового товара" v-model:visible="createProductDialog" modal :style="{ width: '600px' }">
      <div v-if="isLoadingPhoto" class="dialog__loader">
        Загрузка фото... Пожалуйста, подождите
      </div>

      <div v-else>
        <div class="field">
          <label>Штрихкод</label>
          <InputText v-model="newProductBarcode" disabled />
        </div>

        <div v-if="!product?.photo_url" class="field">
          <label>Загрузить фото товара</label>
          <input type="file" @change="handleImageUpload" accept="image/*" />
        </div>

        <div v-else>
          <div class="dialog__image-wrapper">
            <Image :src="product.photo_url" width="300" preview />
          </div>

          <div
              class="field"
              v-for="field in editableFields.filter(f => f.model !== 'barcode')"
              :key="field.label"
          >
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
      </div>

      <template #footer>
        <Button
            v-if="product?.photo_url"
            label="Создать товар"
            icon="pi pi-check"
            @click="createProduct"
            :disabled="isLoadingPhoto"
        />
      </template>
    </Dialog>

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
        <Button label="Сохранить" icon="pi pi-check" @click="saveProduct" />
      </template>
    </Dialog>

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
          <label>Изменить "в продажу"</label>
          <div class="field__change-row">
            <InputNumber v-model="changeAmount" />
            <Button icon="pi pi-plus" @click="change('amount', +changeAmount)" :disabled="loadingChange" />
            <Button icon="pi pi-minus" @click="change('amount', -changeAmount)" :disabled="loadingChange" />
          </div>
        </div>

        <div class="field">
          <label>Изменить "на складе"</label>
          <div class="field__change-row">
            <InputNumber v-model="changeStock" />
            <Button icon="pi pi-plus" @click="change('stock_quantity', +changeStock)" :disabled="loadingChange" />
            <Button icon="pi pi-minus" @click="change('stock_quantity', -changeStock)" :disabled="loadingChange" />
          </div>
        </div>
      </div>
    </Dialog>

    <Toast position="bottom-right" />
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
      productNotFoundDialog: false,
      createProductDialog: false,
      newProductBarcode: '',
      changeAmount: 1,
      changeStock: 1,
      loadingChange: false,
      isLoadingPhoto: false,
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
          this.productNotFoundDialog = true;
          this.newProductBarcode = this.query;
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
        await posService.updateProduct(this.product, this.product.id);
        this.toast.add({ severity: "success", summary: "Сохранено", detail: "Товар успешно обновлён", life: 3000 });
        this.editProductDialog = false;
      } catch (e) {
        this.toast.add({ severity: "error", summary: "Ошибка", detail: "Не удалось обновить товар", life: 3000 });
      }
    },
    async change(field, delta) {
      if (!this.product?.id || !["amount", "stock_quantity"].includes(field) || this.loadingChange) return;
      this.loadingChange = true;
      try {
        const updated = await posService.changeProductAmount({ product_id: this.product.id, [field]: delta });
        this.product = updated;
        this.toast.add({ severity: "success", summary: "Обновлено", detail: `Поле ${field} изменено`, life: 3000 });
      } catch (e) {
        this.toast.add({ severity: "error", summary: "Ошибка", detail: "Не удалось обновить товар", life: 3000 });
      } finally {
        this.loadingChange = false;
      }
    },
    openCreateProductDialog() {
      this.productNotFoundDialog = false;
      this.createProductDialog = true;
      this.product = null;
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('photo', file);

      this.isLoadingPhoto = true;

      try {
        const response = await posService.uploadProductPhoto(formData);
        const { photo_url, name_ru, name_kz, description_ru, description_kz } = response;

        this.product = {
          photo_url,
          barcode: this.newProductBarcode,
          name_ru,
          name_kz,
          description_ru,
          description_kz,
          manufacturer: '',
          where: '',
          weight: '',
          price: 0,
          discount: 0,
          price_with_discount: 0,
          price_cost: 0,
          amount: 0,
          stock_quantity: 0,
          calories: null,
          proteins: null,
          fats: null,
          carbohydrates: null,
          is_active: true,
          subcategory_id: null,
        };

        this.toast.add({ severity: "success", summary: "Фото загружено", detail: "Изображение отправлено", life: 3000 });
      } catch (e) {
        this.toast.add({ severity: "error", summary: "Ошибка", detail: "Не удалось загрузить фото", life: 3000 });
      } finally {
        this.isLoadingPhoto = false;
      }
    },
    async createProduct() {
      try {
        await posService.createProduct(this.product);
        this.toast.add({ severity: "success", summary: "Успех", detail: "Товар создан", life: 3000 });
        this.createProductDialog = false;
        this.product = null;
      } catch (e) {
        this.toast.add({ severity: "error", summary: "Ошибка", detail: "Не удалось создать товар", life: 3000 });
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
.dialog__loader {
  text-align: center;
  font-weight: bold;
  padding: 2rem;
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
