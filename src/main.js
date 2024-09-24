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
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Dropdown', Dropdown)
app.component('Toast', Toast)
app.component('PanelMenu', PanelMenu)

app.mount('#app');