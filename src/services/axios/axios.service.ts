import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { AxiosConfig } from './types';

class AxiosService {
    private static instance: AxiosService;
    private axiosInstance: AxiosInstance;
    private pendingRequests: Map<string, CancelTokenSource>;

    private constructor({ baseURL, timeOut }: AxiosConfig) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: timeOut ?? 20000,
        });
        this.pendingRequests = new Map<string, CancelTokenSource>();
        this.setupInterceptors();
    }

    public static getInstance(config: AxiosConfig): AxiosService {
        if (!this.instance) {
            this.instance = new AxiosService(config);
        }
        return this.instance;
    }

    public setAuthToken(token: string): void {
        this.axiosInstance.defaults.headers.common['x-key'] = token;
    }

    private addPendingRequest(config: AxiosRequestConfig): void {
        const url = `${config.url}&${config.method}`;
        const source = axios.CancelToken.source();

        if (!this.pendingRequests.has(url)) {
            this.pendingRequests.set(url, source);
        }
    }

    private removePendingRequest(config: AxiosRequestConfig): void {
        const url = `${config.url}&${config.method}`;

        if (this.pendingRequests.has(url)) {
            const source = this.pendingRequests.get(url);
            source?.cancel();
            this.pendingRequests.delete(url);
        }
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(
            (config: any) => {
                this.removePendingRequest(config);
                this.addPendingRequest(config);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                this.removePendingRequest(response.config);
                return response.data;
            },
            (error) => {
                this.removePendingRequest(error.config);
                return Promise.reject(error);
            }
        );
    }

    updateConfig(config: AxiosConfig): void {
        this.axiosInstance.defaults.baseURL = config.baseURL;
        this.axiosInstance.defaults.timeout = config.timeOut ?? 20000;
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<unknown> {
        return await this.axiosInstance.get<T>(url, config);
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<unknown> {
        return await this.axiosInstance.post<T>(url, data, config);
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<unknown> {
        return await this.axiosInstance.put<T>(url, data, config);
    }

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<unknown> {
        return await this.axiosInstance.patch<T>(url, data, config);
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<unknown> {
        return await this.axiosInstance.delete<T>(url, config);
    }
}

export { AxiosService };
