import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiProviderClass {
    apiManager: AxiosInstance | null = null;
    baseUrl: string = '';

    constructor(base_url: string) {
        this.baseUrl = base_url;
        this.setupApi();
    }    

    setupApi() {
        this.apiManager = axios.create({
            baseURL: this.baseUrl,
            timeout: 2000,
        });

        if (!this.apiManager) {
            console.log('Cannot create api');
        }
    }

    async get(url: string){
        return await this.apiManager?.get(this.baseUrl +  url);
    }

    async getDataUtama(nomor_pengajuan: string){
        try {
            const response : AxiosResponse | undefined = await this.get(`test/v2/dataUtama?nomor_pengajuan=${nomor_pengajuan}`);
            if(response)
                return response.data;
            else
                return {error: true};
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    };

    async getDataEntitas(id_aju: string){
        try {
            const response : AxiosResponse | undefined = await this.get(`test/v2/dataEntitas?id_aju=${id_aju}`);
            if(response)
                return response.data;
            else
                return {error: true};
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    }


    async getDataPungutan(id_aju: string){
        try {
            const response: AxiosResponse | undefined = await this.get(`test/v2/dataPungutan?id_aju=${id_aju}`);
            if(response)
                return response.data;
            else
                return {error: true};
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    }
}

const ApiProvider = new ApiProviderClass('https://api-hub.ilcs.co.id/');

export default ApiProvider;