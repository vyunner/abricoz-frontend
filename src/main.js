import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Sidebar from 'primevue/sidebar';
import FocusTrap from 'primevue/focustrap';
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Toast from 'primevue/toast';
import ToastService from "primevue/toastservice";
import PanelMenu from "primevue/panelmenu";
import Dialog from 'primevue/dialog';
import Image from 'primevue/image';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional


const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);

app.directive('focustrap', FocusTrap);

app.component('Button', Button)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Sidebar', Sidebar)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Dropdown', Dropdown)
app.component('Toast', Toast)
app.component('PanelMenu', PanelMenu)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Dialog', Dialog)
app.component('Image', Image)
app.component('AutoComplete', AutoComplete)

app.mount('#app');