<script>
import PrimePreloader from "@/components/common/PrimePreloader.vue";
import categorySubcategoriesService from "@/services/category-subcategories.service";

export default {
  name: "CategoriesSubcategoriesView",
  components: {PrimePreloader},
  data() {
    return {
      preloaderLoading: true,
      loading: false,
      buttonLoading: false,
      tableLoading: false,
      categoryOptions: [],
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
    add(data) {
      this.categoryDialog.data = {}
      if (data?.id) {
        this.categoryDialog.data = data
      }
      this.categoryDialog.visible = !this.categoryDialog.visible
    },

    async tabChange() {
      this.loading = true
      this.tableData = []
      if (this.activeTab === 0) {
        const categories = await categorySubcategoriesService.getCategory();
        this.tableData = categories;
        this.categoryOptions = categories;
      } else {
        this.tableData = await categorySubcategoriesService.getSubCategory()
      }
      this.loading = false
    },

    onFileSelect(event) {
      this.activeTab === 1 ?
          this.categoryDialog.data.image = event.files[0]
          : this.categoryDialog.data.mobile_image = event.files[0]
    },

    async saveCreate() {
      this.loading = true
      if (this.categoryDialog.data.id) {
        let form = new FormData
        form.append('id', this.categoryDialog.data.id)
        form.append('name_ru', this.categoryDialog.data.name_ru)
        form.append('name_kz', this.categoryDialog.data.name_kz)
        form.append('is_active', this.categoryDialog.data.is_active ? 1 : 0);
        if (this.activeTab === 1) {
          if (this.categoryDialog.data.image) {
            form.append('image', this.categoryDialog.data.image);
          }
          form.append('category_id', this.categoryDialog.data.category_id);
        } else {
          if (this.categoryDialog.data.mobile_image) {
            form.append('mobile_image', this.categoryDialog.data.mobile_image);
          }
        }
        let res
        this.activeTab === 1 ? res = await categorySubcategoriesService.updateSubCategory(form)
            : res = await categorySubcategoriesService.updateCategory(form)

        this.categoryDialog.visible = !this.categoryDialog.visible
        if (res) {
          if (this.activeTab === 0) {
            const categories = await categorySubcategoriesService.getCategory();
            this.tableData = categories;
            this.categoryOptions = categories;
          } else {
            this.tableData = await categorySubcategoriesService.getSubCategory()
          }
          this.$toast.add({
            severity: "success",
            summary: "Успешно!",
            detail: "Изменения сохранены",
            life: 3000
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Ошибка при сохранении изменений",
            life: 3000
          });
        }
      } else {
        let form = new FormData
        form.append('name_ru', this.categoryDialog.data.name_ru)
        form.append('name_kz', this.categoryDialog.data.name_kz)
        form.append('is_active', this.categoryDialog.data.is_active ? 1 : 0);
        if (this.activeTab === 1) {
          if (this.categoryDialog.data.image) {
            form.append('image', this.categoryDialog.data.image);
          }
          form.append('category_id', this.categoryDialog.data.category_id);
        } else {
          if (this.categoryDialog.data.mobile_image) {
            form.append('mobile_image', this.categoryDialog.data.mobile_image);
          }
        }

        let res
        this.activeTab === 1 ? res = await categorySubcategoriesService.createSubCategory(form)
            : res = await categorySubcategoriesService.createCategory(form)
        this.categoryDialog.visible = !this.categoryDialog.visible
        if (res) {
          if (this.activeTab === 0) {
            const categories = await categorySubcategoriesService.getCategory();
            this.tableData = categories;
            this.categoryOptions = categories;
          } else {
            this.tableData = await categorySubcategoriesService.getSubCategory()
          }
          this.$toast.add({
            severity: "success",
            summary: "Успешно!",
            detail: `${this.activeTab === 1 ? 'Подкатегория создана' : 'Категория создана'}`,
            life: 3000
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: `${this.activeTab === 1 ? 'Ошибка при создании подкатегории' : 'Ошибка при создании категории'}`,
            life: 3000
          });
        }

      }
      this.loading = false
    },

    async onDelete(id) {
      let res
      this.activeTab === 1 ? res = await categorySubcategoriesService.deleteSubCategory(id)
          : res = await categorySubcategoriesService.deleteCategory(id)
      if (res) {
        if (this.activeTab === 0) {
          const categories = await categorySubcategoriesService.getCategory();
          this.tableData = categories;
          this.categoryOptions = categories;
        } else {
          this.tableData = await categorySubcategoriesService.getSubCategory()
        }
        this.$toast.add({
          severity: "success",
          summary: "Успешно!",
          detail: `${this.activeTab === 1 ? 'Подкатегория удалена' : 'Категория удалена'}`,
          life: 3000
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: `${this.activeTab === 1 ? 'Ошибка при удалении подкатегории' : 'Ошибка при удалении категории'}`,
          life: 3000
        });
      }
    },


  },
  computed: {

    isFormValid() {
      return (
          this.categoryDialog.data.name_ru &&
          this.categoryDialog.data.name_kz &&
          (this.activeTab !== 1 || this.categoryDialog.data.category_id)
      );
    },

  },
  async mounted() {
    const categories = await categorySubcategoriesService.getCategory();
    this.tableData = categories;
    this.categoryOptions = categories;
    this.preloaderLoading = false
  }
}
</script>

<template>
  <div class="container">
    <div class="main">


      <TabMenu v-model:activeIndex="activeTab" :model="tabMenuItems" @tabChange="tabChange"/>

      <div class="create-button-section">
        <Button label="Добавить" icon="pi pi-plus" @click="add()" :loading="buttonLoading"/>
      </div>

      <PrimePreloader v-if="preloaderLoading"/>

      <div v-else>
        <DataTable v-if="tableData.length" :value="tableData" class="dataTable" tableStyle="min-width: 50rem"
                   showGridlines
                   stripedRows scrollable responsiveLayout="scroll" :loading="tableLoading" paginator :rows="10">

          <!-- Отображение полей продукта -->
          <Column field="id" header="ID"></Column>
          <Column header="Фото">
            <template #body="{data}">
              <Image v-if="data.image_url && activeTab === 1" :src="data.image_url" width="100" preview/>
              <Image v-if="data.mobile_image_url && activeTab === 0" :src="data.mobile_image_url" width="100" preview/>
            </template>
          </Column>
          <Column field="name_ru" header="Название на русском"></Column>
          <Column field="name_kz" header="Название на казахском"></Column>
          <Column header="Активен">
            <template #body="{data}">
              {{ data.is_active ? 'Да' : 'Нет' }}
            </template>
          </Column>
          <Column v-if="activeTab === 1" field="category.name_ru" header="Категория"></Column>

          <!-- Кнопки действий -->
          <Column header="Действия">
            <template #body="{data}">
              <div class="button-group">
                <Button label="Изменить" icon="pi pi-pencil" severity="warning" class="crud-button" @click="add(data)"/>
                <Button label="Удалить" icon="pi pi-trash" severity="danger" class="crud-button"
                        @click="onDelete(data.id)"/>
              </div>
            </template>
          </Column>
        </DataTable>

      </div>

      <Toast position="bottom-right"/>
    </div>

    <Dialog v-model:visible="categoryDialog.visible" modal :style="{ width: '35%' }"
            :header="categoryDialog.data.id? (activeTab === 0? 'Редактировать категорию' : 'Редактировать подкатегорию')
            : (activeTab === 0? 'Создать категорию' : 'Создать подкатегорию')">
      <div class="dialog">
        <!--        <pre>{{ categoryDialog }}</pre>-->
        <div class="dialog__item">
          <label>Название (RU)</label>
          <InputText v-model="categoryDialog.data.name_ru"/>
        </div>

        <div class="dialog__item">
          <label>Название (KZ)</label>
          <InputText v-model="categoryDialog.data.name_kz"/>
        </div>

        <div class="dialog__item">
          <label>Фото</label>
          <FileUpload mode="basic" name="photo" accept="image/*"
                      :maxFileSize="1000000"
                      @select="onFileSelect($event)" chooseLabel="Фото"/>
        </div>

        <div class="dialog__item">
          <label>Активен?</label>
          <ToggleButton v-model="categoryDialog.data.is_active" onLabel="Вкл" offLabel="Выкл"/>
        </div>

        <div v-if="activeTab === 1" class="dialog__item">
          <label for="subcategory">Категория</label>
          <Dropdown
              v-model="categoryDialog.data.category_id"
              :options="categoryOptions"
              optionLabel="name_ru"
              optionValue="id"
              filter
              placeholder="Выберите подкатегорию"
          />
        </div>

        <Button :label="categoryDialog.data.id? 'Сохранить' :'Создать'" :disabled="!isFormValid || loading"
                @click="saveCreate" :style="{margin: '10px 0 0 0'}"
                :loading="loading"/>
      </div>
    </Dialog>


  </div>
</template>

<style scoped lang="scss">

.main {
  margin-top: 40px;
}

.create-button-section {
  margin-top: 40px;
  margin-bottom: 40px;
}

.dataTable {
  margin-top: 40px;
}

.crud-button {
  margin: 0.2rem 0.4rem;
}


.dialog__item {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
}


</style>