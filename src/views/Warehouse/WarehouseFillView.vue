<template>
  <div class="container">
    <div class="main">
      <TabMenu v-model:activeIndex="activeTab" :model="tabMenuItems"/>

      <div v-if="activeTab === 0" class="input-group">
        <InputText placeholder="Введите название..." v-model="searchTerm" @keyup.enter="onSearch"/>
        <Button label="Поиск" icon="pi pi-search" @click="onSearch" :loading="loading"/>
        <Button label="Создать" icon="pi pi-plus-circle" :style="{ margin: '0 0 0 10px' }"
                @click="createProductVisible = true" severity="success" :loading="loading"/>
      </div>

      <div v-if="activeTab === 1" class="input-group">
        <Dropdown class="input-group__dropdown" v-model="searchSubCategoryId" optionLabel="name_ru" optionValue="id" :options="subcategories"
            placeholder="Укажите подкатегорию"  @keyup.enter="onSearchBySubCategory"/>
        <Button label="Поиск" icon="pi pi-search" @click="onSearchBySubCategory" :loading="loading"/>
      </div>

      <DataTable v-if="products.length" :value="products" class="dataTable" tableStyle="min-width: 50rem" showGridlines
                 stripedRows scrollable responsiveLayout="scroll" :loading="loading">

        <!-- Отображение полей продукта -->
        <Column field="id" header="ID" frozen></Column>
        <Column header="Фото" frozen>
          <template #body="{data}">
            <Image v-if="data.photo_url" :src="'https://api.abricoz.kz' + data.photo_url" width="100" preview/>
          </template>
        </Column>
        <Column field="name_ru" header="Название" frozen></Column>
        <Column v-if="activeTab === 1" header="Описание">
          <template #body="{data}">
            <div class="product-description" @click="toggleText(data)">
              <p :class="{'collapsed': data.isCollapsed}">
                {{data.description_ru}}
              </p>
            </div>
          </template>
        </Column>
        <Column v-if="activeTab === 1" header="Калораж">
          <template #body="{data}">
            <p class="text">Калории: {{ data.calories }}</p>
            <p class="text">Белки: {{ data.proteins }}</p>
            <p class="text">Жиры: {{ data.fats }}</p>
            <p class="text">Углеводы: {{ data.carbohydrates }}</p>
          </template>
        </Column>
        <Column field="subcategory.name_ru" header="Подкатегория"></Column>
        <Column field="manufacturer" header="Производитель"></Column>
        <Column header="Цена">
          <template #body="{data}">
            <p class="text">Цена: {{ data.price }} тг</p>
            <p class="text">Скидка: {{ data.discount }}%</p>
            <p class="text">Цена со скидкой: {{ data.price_with_discount }} тг</p>
          </template>
        </Column>
        <Column v-if="activeTab === 1" header="Колличество продаж">
          <template #body="{data}">
            <p >{{data.total_sales}} продаж</p>
          </template>
        </Column>
        <Column header="Осталось">
          <template #body="{data}">{{ data.amount }} x {{ data.weight }}</template>
        </Column>
        <Column v-if="activeTab === 1" field="where" header="Полка"></Column>
        <Column header="Статус">
          <template #body="{data}">
            <p v-if="data.is_active">Да</p>
            <p v-else>Нет</p>
          </template>
        </Column>

        <!-- Кнопки действий -->
        <Column header="Действия">
          <template #body="{data}">
            <div class="button-group">
              <Button label="Склад" class="p-button-text" @click="editWarehouse(data)"/>
              <Button label="Изменить" class="p-button-text" @click="onEdit(data)"/>
              <Button label="Удалить" class="p-button-text p-button-danger" @click="onDelete(data.id)"/>
              <FileUpload mode="basic" name="photo" accept="image/*"
                          :maxFileSize="1000000" auto @select="onFileSelect($event, data.id)" chooseLabel="Фото"/>
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Диалоговое окно для редактирования продукта -->
      <Dialog v-model:visible="editProductVisible" modal header="Изменить продукт" :style="{ width: '35%' }">
        <div class="dialog">
          <div class="dialog__item">
            <label>Название (RU)</label>
            <InputText v-model="editedProduct.name_ru"/>
          </div>

          <div class="dialog__item">
            <label>Название (KZ)</label>
            <InputText v-model="editedProduct.name_kz"/>
          </div>

          <div class="dialog__item">
            <label>Описание (RU)</label>
            <TextArea v-model="editedProduct.description_ru" autoResize/>
          </div>

          <div class="dialog__item">
            <label>Описание (KZ)</label>
            <TextArea v-model="editedProduct.description_kz" autoResize/>
          </div>

          <div class="dialog__item">
            <label>Полка</label>
            <InputText v-model="editedProduct.where"/>
          </div>

          <div class="dialog__item">
            <label>Производитель</label>
            <InputText v-model="editedProduct.manufacturer"/>
          </div>

          <div class="dialog__item">
            <label>Вес</label>
            <InputText v-model="editedProduct.weight"/>
          </div>

          <div class="dialog__item">
            <label>Калории</label>
            <InputNumber v-model="editedProduct.calories" :maxFractionDigits="1"/>
          </div>

          <div class="dialog__item">
            <label>Белки</label>
            <InputNumber v-model="editedProduct.proteins" :maxFractionDigits="1"/>
          </div>

          <div class="dialog__item">
            <label>Жиры</label>
            <InputNumber v-model="editedProduct.fats" :maxFractionDigits="1"/>
          </div>

          <div class="dialog__item">
            <label>Углеводы</label>
            <InputNumber v-model="editedProduct.carbohydrates" :maxFractionDigits="1"/>
          </div>

          <div class="dialog__item">
            <label>Цена</label>
            <InputNumber v-model="editedProduct.price"/>
          </div>

          <div class="dialog__item">
            <label>Скидка</label>
            <InputNumber v-model="editedProduct.discount"/>
          </div>

          <div class="dialog__item">
            <label>Цена со скидкой</label>
            <InputNumber disabled v-model="editedProduct.price_with_discount"/>
          </div>

          <div class="dialog__item">
            <label>Активен?</label>
            <ToggleButton v-model="editedProduct.is_active" onLabel="Да" offLabel="Нет" true-value="1" false-value="0"/>
          </div>


          <div class="dialog__item">
            <label for="subcategory">Подкатегория</label>
            <Dropdown
                v-model="editedProduct.subcategory_id"
                :options="subcategories"
                optionLabel="name_ru"
                optionValue="id"
                placeholder="Выберите подкатегорию"
            />
          </div>

          <Button label="Сохранить" icon="pi pi-check" @click="onSave" :loading="loading"/>
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

    <Dialog v-model:visible="createProductVisible" modal header="Создать продукт" :style="{ width: '35%' }">
      <div class="dialog">
        <pre>{{ createProduct }}</pre>
        <div class="dialog__item">
          <label>Название (RU)</label>
          <InputText v-model="createProduct.name_ru"/>
        </div>

        <div class="dialog__item">
          <label>Название (KZ)</label>
          <InputText v-model="createProduct.name_kz"/>
        </div>

        <div class="dialog__item">
          <label>Название (EN)</label>
          <InputText v-model="createProduct.name_en"/>
        </div>

        <div class="dialog__item">
          <label>Описание (RU)</label>
          <TextArea v-model="createProduct.description_ru" autoResize/>
        </div>

        <div class="dialog__item">
          <label>Описание (KZ)</label>
          <TextArea v-model="createProduct.description_kz" autoResize/>
        </div>


        <div class="dialog__item">
          <label>Описание (EN)</label>
          <TextArea v-model="createProduct.description_en" autoResize/>
        </div>

        <div class="dialog__item">
          <label>Полка</label>
          <InputText v-model="createProduct.where"/>
        </div>

        <div class="dialog__item">
          <label>Производитель</label>
          <InputText v-model="createProduct.manufacturer"/>
        </div>

        <div class="dialog__item">
          <label>Вес</label>
          <InputText v-model="createProduct.weight"/>
        </div>

        <div class="dialog__item">
          <label>Количество</label>
          <InputNumber v-model="createProduct.amount"/>
        </div>

        <div class="dialog__item">
          <label>Калории</label>
          <InputNumber v-model="createProduct.calories" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Белки</label>
          <InputNumber v-model="createProduct.proteins" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Жиры</label>
          <InputNumber v-model="createProduct.fats" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Углеводы</label>
          <InputNumber v-model="createProduct.carbohydrates" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Цена</label>
          <InputNumber v-model="createProduct.price"/>
        </div>

        <div class="dialog__item">
          <label>Скидка</label>
          <InputNumber v-model="createProduct.discount"/>
        </div>

        <div class="dialog__item">
          <label>Цена со скидкой</label>
          <InputNumber disabled v-model="createProduct.price_with_discount"/>
        </div>

        <div class="dialog__item">
          <label>Активен?</label>
          <ToggleButton v-model="createProduct.is_active" onLabel="Да" offLabel="Нет"/>
        </div>

        <div class="dialog__item">
          <label for="subcategory">Подкатегория</label>
          <Dropdown
              v-model="createProduct.subcategory_id"
              :options="subcategories"
              optionLabel="name_ru"
              optionValue="id"
              placeholder="Выберите подкатегорию"
          />
        </div>

        <Button label="Создать" :disabled="!isFormValid || loading" @click="onCreate" :style="{margin: '10px 0 0 0'}"
                :loading="loading"/>
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
      // isCollapsed: false,
      activeTab: 0,
      amountChange: 0,
      adjustAmount: 0,
      searchTerm: "",
      searchSubCategoryId: null,
      products: [],
      tabMenuItems: [
        {label: 'Поиск по названию'},
        {label: 'Поиск по подкатегории'},
      ],
      editedProduct: {},
      editProductVisible: false,
      editWarehouseVisible: false,
      createProductVisible: false,
      subcategories: [],
      brandSuggestions: [],
      countrySuggestions: [],
      loading: null,
      createProduct: {
        price: 0,
        discount: 0,
        price_with_discount: 0,
        amount: 0,
        is_active: 0, // Значение по умолчанию для переключателя "Активен?"
      },
    };
  },
  computed: {
    // Проверяем, заполнены ли все необходимые поля для создания продукта
    isFormValid() {
      return (
          this.createProduct.name_ru &&
          this.createProduct.name_kz &&
          this.createProduct.name_en &&
          this.createProduct.description_ru &&
          this.createProduct.description_kz &&
          this.createProduct.description_en &&
          this.createProduct.where &&
          this.createProduct.manufacturer &&
          this.createProduct.weight &&
          this.createProduct.calories != null &&
          this.createProduct.proteins != null &&
          this.createProduct.fats != null &&
          this.createProduct.carbohydrates != null &&
          this.createProduct.price != null &&
          this.createProduct.discount != null &&
          this.createProduct.is_active != null &&
          this.createProduct.subcategory_id != null
      );
    },
  },
  watch: {
    // Следим за изменениями цены и скидки для обновления цены со скидкой
    "createProduct.price": "updatePriceWithDiscountCreateProduct",
    "createProduct.discount": "updatePriceWithDiscountCreateProduct",
    "editedProduct.price": "updatePriceWithDiscountEditProduct",
    "editedProduct.discount": "updatePriceWithDiscountEditProduct",
  },
  methods: {
    toggleText(data) {
      data.isCollapsed = !data.isCollapsed;
    },


    async onFileSelect(event, productId) {
      this.loading = true;
      const file = event.files[0];

      if (file) {
        const formData = new FormData();
        formData.append('photo', file);

        let res = await warehouseService.addPhotoProduct(formData, productId);
        if (res) {
          this.$toast.add({
            severity: "success",
            summary: "Успешно",
            detail: "Фото было успешно загружено",
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Что то пошло не так",
            detail: "Не удалось загрузить фото",
          });
        }
        await this.onSearch();
        this.loading = false;
      }
    },
    async editWarehouse(data) {
      console.log(data);
      this.adjustAmount = data.amount;
      this.editedProduct = data;
      this.editWarehouseVisible = true;
    },
    async addAmount() {
      this.loading = true;
      this.editedProduct.amount += this.amountChange;

      let res = await warehouseService.updateProduct(
          this.editedProduct.id,
          this.editedProduct
      );
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

        let res = await warehouseService.updateProduct(
            this.editedProduct.id,
            this.editedProduct
        );
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

      let res = await warehouseService.updateProduct(
          this.editedProduct.id,
          this.editedProduct
      );
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
    async onSearchBySubCategory() {
      this.loading = true;
      if (!this.searchSubCategoryId) {
        this.$toast.add({
          severity: "warn",
          summary: "Предупреждение",
          detail: "Укажите подкатегорию товара для поиска",
        });
      } else {
        this.products = []
        const result = await warehouseService.searchBySubCategory(this.searchSubCategoryId);
        if (result) {
          this.products = result.products.map(product => {
            return {
              ...product,
              isCollapsed: false
            }
          })
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Ошибка при поиске товаров",
          });
        }
      }
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
      } else {
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
      }
      this.loading = false;
    },
    async onEdit(product) {
      console.log(product);
      this.editedProduct = product;
      this.editProductVisible = true;
    },
    async onSave() {
      this.loading = true;
      const result = await warehouseService.updateProduct(
          this.editedProduct.id,
          this.editedProduct
      );
      if (result) {
        this.$toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Продукт успешно обновлен",
        });
        this.editProductVisible = false;
        await this.onSearch();
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Ошибка при обновлении продукта",
        });
      }
      this.loading = false;
    },
    async onDelete(id) {
      this.loading = true;
      const confirmed = confirm(
          `Вы уверены, что хотите удалить продукт ID: ${id}?`
      );
      if (confirmed) {
        const success = await warehouseService.deleteProduct(id);
        if (success) {
          await this.onSearch();
          this.$toast.add({
            severity: "success",
            summary: "Удалено",
            detail: `Продукт ID: ${id} успешно удален`,
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Ошибка при удалении продукта",
          });
        }
      }
      this.loading = false;
    },
    async searchBrands(event) {
      const query = event.query;

      if (query.length > 3) {
        const brands = await warehouseService.getBrands(query);
        this.brandSuggestions = brands;
      }
    },
    async searchCountries(event) {
      const query = event.query;
      const countries = await warehouseService.getCountries(query);
      this.countrySuggestions = countries;
    },
    // Метод для обновления цены со скидкой
    updatePriceWithDiscountCreateProduct() {
      let price = this.createProduct.price || 0;
      let discount = this.createProduct.discount || 0;
      let discountedPrice = price - (price * discount) / 100;
      this.createProduct.price_with_discount = Math.round(discountedPrice);
    },
    updatePriceWithDiscountEditProduct() {
      let price = this.editedProduct.price || 0;
      let discount = this.editedProduct.discount || 0;
      let discountedPrice = price - (price * discount) / 100;
      this.editedProduct.price_with_discount = Math.round(discountedPrice);
    },
    // Метод для создания нового продукта
    async onCreate() {
      this.loading = true;

      // Отправляем данные на сервер
      const result = await warehouseService.createProduct(this.createProduct);
      if (result) {
        this.$toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Продукт успешно создан",
        });
        this.createProductVisible = false;
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Ошибка при создании продукта",
        });
      }
      this.loading = false;
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
.product-description {
  max-width: 400px; /* Пример ограничения ширины, можете менять по вашему усмотрению */
}

.product-description p {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Показываем 3 строки текста */
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.product-description p.collapsed {
  -webkit-line-clamp: unset; /* Если раскрыли, показываем весь текст */
}

.more {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}


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
  margin: 20px 0;
}

.input-group__dropdown{
  width: 230px;
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

.dialog__item {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
}
</style>
