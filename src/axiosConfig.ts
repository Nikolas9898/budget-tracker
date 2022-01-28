import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: ''
});

// Where you would set stuff like your 'Authorization' header, etc ... TODO
// instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;

// Also add/ configure interceptors && all the other cool stuff TODO

// instance.interceptors.request... TODO

export default instance;
