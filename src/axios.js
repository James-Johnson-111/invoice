import axios from 'axios';

const Instance = axios.create( { baseURL: 'https://invoice-85843-default-rtdb.firebaseio.com/' } );

export default Instance;