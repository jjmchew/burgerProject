import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-42b1c.firebaseio.com/'
});

export default instance;
