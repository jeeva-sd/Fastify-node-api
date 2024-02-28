import { AxiosService } from './axios.service';
import { AxiosConfig } from './types';

// Configs
const jsonPlaceholderConfig: AxiosConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeOut: 20000
};

// Instances
const jsonHttp = AxiosService.getInstance(jsonPlaceholderConfig);

export { jsonHttp };