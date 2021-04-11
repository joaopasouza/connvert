import axios from 'axios';

const apiOne = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const apiTwo = axios.create({
  baseURL: 'https://provadev.xlab.digital/api/v1',
  params: {
    uuid: 'ea6e0883-2b37-4c1a-be1f-4c71f19352b9',
  },
});

export { apiOne, apiTwo };
