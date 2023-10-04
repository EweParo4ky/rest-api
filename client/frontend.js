/* eslint-disable no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js';
import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';

console.log(Vue);

// eslint-disable-next-line consistent-return
const makeRequest = async (url, method = 'GET', data = null) => {
  try {
    const headers = {};
    let body;
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    const resp = await axios({
      url,
      method,
      headers,
      data: body,
    });
    console.log('DATA', resp.data);
    return resp.data;
  } catch (error) {
    console.warn('Error: ', error.massege);
  }
};

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('loader', {
  template: `
    <div style="display: flex;justify-content: center;align-item: center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
    `,
});

new Vue({
  el: '#app',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        value: '',
      },
      contacts: [],
    };
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form;
      contact.value = `+7 ${contact.value}`;

      const newContact = await makeRequest('/api/contacts', 'POST', contact);

      this.contacts.push(newContact);
      this.form.name = '';
      this.form.value = '';
    },
    async markContact(id) {
      const contact = this.contacts.find((cont) => cont.id === id);
      const updated = await makeRequest(`api/contacts/${id}`, 'PUT', {
        ...contact,
        marked: true,
      });
      contact.marked = updated.marked;
    },
    async removeContact(id) {
      await makeRequest(`api/contacts/${id}`, 'DELETE');
      this.contacts = this.contacts.filter((cont) => cont.id !== id);
    },
  },
  async mounted() {
    this.loading = true;
    const data = await makeRequest('api/contacts');
    console.log('data in mounted*****', data);
    this.contacts = data;
    this.loading = false;
  },
});

export default makeRequest;
