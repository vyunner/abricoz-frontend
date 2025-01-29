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

    onDesktopFileSelect(event){
      this.categoryDialog.data.desktop_image = event.files[0]
    },

    onMobileFileSelect(event){
      this.categoryDialog.data.mobile_image = event.files[0]
    },

    editPhoto(){

      const formData = new FormData();
      formData.append('photo', this.categoryDialog.data.desktop_image)
      const formData1 = new FormData();
      formData1.append('photo', this.categoryDialog.data.desktop_image)
    },

    async saveCreate(){
      if (this.categoryDialog.data.id){

      } else {
        let form = {
          name_ru: this.categoryDialog.data.name_ru,
          name_kz: this.categoryDialog.data.name_kz,
        }

        const res = await categorySubcategoriesService.createCategory(form)
        if (res) {
          this.tableData = await categorySubcategoriesService.getCategory();
          this.$toast.add({
            severity: "success",
            summary: "Успешно!",
            detail: "Категория создана",
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Ошибка при создании категории",
          });
        }

      }
    },




  },
  computed: {

    isFormValid() {
      return (
          this.categoryDialog.data.name_ru &&
          this.categoryDialog.data.name_kz
      );
    },

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
          <InputText v-model="categoryDialog.data.name_ru"/>
        </div>

        <div class="dialog__item">
          <label>Название (KZ)</label>
          <InputText v-model="categoryDialog.data.name_kz"/>
        </div>

        <div class="dialog__item">
          <label>Фото {{activeTab === 0? '(для сайта)' : ''}}</label>
          <FileUpload mode="basic" name="photo" accept="image/*"
                      :maxFileSize="1000000" @select="onDesktopFileSelect($event)" chooseLabel="Фото"/>

        </div>

        <div v-if="activeTab === 0" class="dialog__item">
          <label>Фото (для приложения)</label>
          <FileUpload mode="basic" name="photo" accept="image/*"
                      :maxFileSize="1000000" @select="onMobileFileSelect($event)" chooseLabel="Фото"/>
        </div>

        <div v-if="activeTab === 1" class="dialog__item">
          <label for="subcategory">Категория</label>
          <Dropdown
              v-model="categoryDialog.data.category_id"
              :options="subcategories"
              optionLabel="name_ru"
              optionValue="id"
              placeholder="Выберите подкатегорию"
          />
        </div>

        <Button label="Создать" :disabled="!isFormValid || loading" @click="saveCreate" :style="{margin: '10px 0 0 0'}"
                :loading="loading"/>
      </div>
    </Dialog>

    <Toast position="bottom-right" group="br"/>



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