<script>
import PrimePreloader from "@/components/common/PrimePreloader.vue";
import categorySubcategoriesService from "@/services/category-subcategories.service";

export default {
  name: "CategoriesSubcategoriesView",
  components: {PrimePreloader},
  data(){
    return {
      loading: true,
      buttonLoading: false,
      tableLoading: false,
      tableData: [],
      activeTab: 0,
      categoryDialog: {
        visible: false,
        data: {},
      },
      tabMenuItems: [
        {label: 'Категории'},
        {label: 'Подкатегории'},
      ],
    }
  },
  methods: {



    add(){
      this.categoryDialog.visible = !this.categoryDialog.visible
    },

    async tabChange() {
      this.loading = true
      this.tableData = []
      this.activeTab === 1?
          this.tableData = await categorySubcategoriesService.getSubCategory()
          : this.tableData = await categorySubcategoriesService.getCategory()
      this.loading = false
    },




  },
  computed: {

  },
  async mounted() {
    this.tableData = await categorySubcategoriesService.getCategory();
    this.loading = false
  }
}
</script>

<template>
  <div class="container">
    <div class="main">


      <TabMenu v-model:activeIndex="activeTab" :model="tabMenuItems" @tabChange="tabChange"/>

      <div class="create-button-section">
        <Button label="Добавить" icon="pi pi-plus" @click="add" :loading="buttonLoading"/>
      </div>

      <PrimePreloader v-if="loading"/>

      <div v-else>
        <DataTable v-if="tableData.length" :value="tableData" class="dataTable" tableStyle="min-width: 50rem" showGridlines
                   stripedRows scrollable responsiveLayout="scroll" :loading="tableLoading" paginator :rows="10">

          <!-- Отображение полей продукта -->
          <Column field="id" header="ID"></Column>
          <Column :header="activeTab === 1? 'Фото' : 'Фото на сайте'">
            <template #body="{data}">
              <Image v-if="data.image_url && activeTab === 1" :src="'https://api.abricoz.kz' + data.image_url" width="100" preview/>
              <Image v-if="data.desktop_image_url && activeTab === 0" :src="'https://api.abricoz.kz' + data.desktop_image_url" width="100" preview/>
            </template>
          </Column>
          <Column v-if="activeTab === 0" header="Фото в приложении">
            <template #body="{data}">
              <Image v-if="data.mobile_image_url && activeTab === 0" :src="'https://api.abricoz.kz' + data.mobile_image_url" width="100" preview/>
            </template>
          </Column>
          <Column field="name_ru" header="Название на русском"></Column>
          <Column field="name_kz" header="Название на казахском"></Column>
          <Column v-if="activeTab === 1" field="category_id" header="Категория"></Column>

          <!-- Кнопки действий -->
          <Column header="Действия">
            <template #body="{data}">
              <div class="button-group">
                <Button label="Изменить" icon="pi pi-pencil" severity="warning" class="crud-button" @click="onEdit(data)"/>
                <Button label="Удалить" icon="pi pi-trash" severity="danger" class="crud-button" @click="onDelete(data.id)"/>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>


    </div>

    <Dialog v-model:visible="categoryDialog.visible" modal :style="{ width: '35%' }"
            :header="categoryDialog.data.id? (activeTab === 0? 'Редактировать категорию' : 'Редактировать подкатегорию')
            : (activeTab === 0? 'Создать категорию' : 'Создать подкатегорию')">
      <div class="dialog">
        <pre>{{ categoryDialog }}</pre>
        <div class="dialog__item">
          <label>Название (RU)</label>
          <InputText v-model="categoryDialog.name_ru"/>
        </div>

        <div class="dialog__item">
          <label>Название (KZ)</label>
          <InputText v-model="categoryDialog.name_kz"/>
        </div>

        <div class="dialog__item">
          <label>Название (EN)</label>
          <InputText v-model="categoryDialog.name_en"/>
        </div>

        <div class="dialog__item">
          <label>Описание (RU)</label>
          <TextArea v-model="categoryDialog.description_ru" autoResize/>
        </div>

        <div class="dialog__item">
          <label>Описание (KZ)</label>
          <TextArea v-model="categoryDialog.description_kz" autoResize/>
        </div>


        <div class="dialog__item">
          <label>Описание (EN)</label>
          <TextArea v-model="categoryDialog.description_en" autoResize/>
        </div>

        <div class="dialog__item">
          <label>Полка</label>
          <InputText v-model="categoryDialog.where"/>
        </div>

        <div class="dialog__item">
          <label>Производитель</label>
          <InputText v-model="categoryDialog.manufacturer"/>
        </div>

        <div class="dialog__item">
          <label>Вес</label>
          <InputText v-model="categoryDialog.weight"/>
        </div>

        <div class="dialog__item">
          <label>Количество</label>
          <InputNumber v-model="categoryDialog.amount"/>
        </div>

        <div class="dialog__item">
          <label>Калории</label>
          <InputNumber v-model="categoryDialog.calories" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Белки</label>
          <InputNumber v-model="categoryDialog.proteins" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Жиры</label>
          <InputNumber v-model="categoryDialog.fats" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Углеводы</label>
          <InputNumber v-model="categoryDialog.carbohydrates" :maxFractionDigits="1"/>
        </div>

        <div class="dialog__item">
          <label>Цена</label>
          <InputNumber v-model="categoryDialog.price"/>
        </div>

        <div class="dialog__item">
          <label>Скидка</label>
          <InputNumber v-model="categoryDialog.discount"/>
        </div>

        <div class="dialog__item">
          <label>Цена со скидкой</label>
          <InputNumber disabled v-model="categoryDialog.price_with_discount"/>
        </div>

        <div class="dialog__item">
          <label>Активен?</label>
          <ToggleButton v-model="categoryDialog.is_active" onLabel="Да" offLabel="Нет"/>
        </div>

        <div class="dialog__item">
          <label for="subcategory">Подкатегория</label>
          <Dropdown
              v-model="categoryDialog.subcategory_id"
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


  </div>
</template>

<style scoped lang="scss">

.main {
  margin-top: 40px;
}

.create-button-section{
  margin-top: 40px;
  margin-bottom: 40px;
}

.dataTable{
  margin-top: 40px;
}

.crud-button{
  margin: 0.2rem 0.4rem;
}



.dialog__item {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
}


</style>