import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-app-bigburger-default-rtdb.firebaseio.com/'
});

export default instance; 