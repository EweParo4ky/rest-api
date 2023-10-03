import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js';
import axios from 'axios';

console.log(Vue);

// eslint-disable-next-line no-new
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
});

const makeRequest = async (url, method = 'GET', data = null) => {
  try {
    const headers = {};
    if (data) {
      headers['Content-Type'] = 'application/json';
    }
    const resp = await axios({
      url,
      method,
      headers,
      data,
    });
    console.log(resp.data);
  } catch (error) {
    console.warn('Error: ', error.massege);
  }
};

export default makeRequest;
