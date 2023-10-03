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

new Vue({
  el: '#app',
  data() {
    return {
      form: {
        name: '',
        value: '',
      },
      contacts: [],
    };
  },
  methods: {
    createContact() {
      const { ...contact } = this.form;
      console.log(contact);
      this.contacts.push({ ...contact, id: Date.now(), marked: false });
      this.form.name = '';
      this.form.value = '';
    },
    markContact(id) {
      const contact = this.contacts.find((cont) => cont.id === id);
      contact.marked = true;
    },
    removeContact(id) {
      this.contacts = this.contacts.filter((cont) => cont.id !== id);
    },
  },
  async mounted() {
    const data = await makeRequest('api/contacts');
    console.log('data in mounted*****', data);
    this.contacts = [...data];
  },
});

export default makeRequest;
