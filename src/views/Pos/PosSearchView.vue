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

    <!-- Диалог: редактирование -->
    <Dialog header="Редактировать товар" v-model:visible="editProductDialog" modal :style="{ width: '600px' }">
      <div v-if="product">
        <div class="field">
          <label>Название (RU)</label>
          <InputText v-model="product.name_ru" @paste="handlePaste" />
        </div>
        <div class="field">
          <label>Описание (RU)</label>
          <Textarea v-model="product.description_ru" @paste="handlePaste" autoResize rows="3" />
        </div>
        <div class="field">
          <label>Цена</label>
          <InputNumber v-model="product.price" @paste="handlePaste" />
        </div>
        <div class="field">
          <label>Закупочная цена</label>
          <InputNumber v-model="product.price_cost" @paste="handlePaste" />
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="editProductDialog = false" />
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
          <label>Изменить "в продажу"</label>
          <div class="field__change-row">
            <InputNumber v-model="changeAmount" />
            <Button icon="pi pi-plus" @click="change('amount', +changeAmount)" />
            <Button icon="pi pi-minus" @click="change('amount', -changeAmount)" />
          </div>
        </div>

        <div class="field">
          <label>Изменить "на складе"</label>
          <div class="field__change-row">
            <InputNumber v-model="changeStock" />
            <Button icon="pi pi-plus" @click="change('stock_quantity', +changeStock)" />
            <Button icon="pi pi-minus" @click="change('stock_quantity', -changeStock)" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import posService from "@/services/pos.service";

export default {
  name: "PosSearchView",
  data() {
    return {
      useBarcode: true,
      query: "",
      result: null,
      product: null,
      productFoundDialog: false,
      editProductDialog: false,
      inventoryDialog: false,
      changeAmount: 1,
      changeStock: 1,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.searchInput?.$el?.querySelector('input');
      if (input) input.focus();
    });
  },
  methods: {
    async search() {
      const mode = this.useBarcode ? "barcode" : "name";
      const queryParam = `${mode}=${encodeURIComponent(this.query)}`;
      const response = await posService.searchProduct(queryParam);

      if (response && typeof response === "object") {
        this.product = { ...response };
        this.productFoundDialog = true;
      } else {
        this.result = `Товар не найден по ${mode}`;
      }

      this.query = "";
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
    async change(field, delta) {
      if (!this.product?.id) return;
      try {
        await posService.updateInventory(this.product.id, { field, delta });
        const updated = await posService.searchProduct(`id=${this.product.id}`);
        if (updated) this.product = updated;
      } catch (e) {
        console.error("Ошибка при обновлении:", e);
      }
    },
    handlePaste(e) {
      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData("text");

      if (pastedText.includes('\t')) {
        e.preventDefault();
        const parts = pastedText.split('\t');
        if (parts.length > 0) this.product.name_ru = parts[0] || '';
        if (parts.length > 1) this.product.description_ru = parts[1] || '';
        if (parts.length > 2) this.product.price = parseFloat(parts[2]) || 0;
        if (parts.length > 3) this.product.price_cost = parseFloat(parts[3]) || 0;
      }
    }
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
</style>
