import { DataUtamaReport } from '@/types/Data';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiProviderClass {
    apiManager: AxiosInstance | null = null;
    baseUrl: string = '';
    nest_server_url = '';

    constructor(base_url: string, nest_server_url: string) {
        this.baseUrl = base_url;
        this.nest_server_url = nest_server_url;
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

    async getNestJSServer(url: string){
        return await this.apiManager?.get(this.nest_server_url + url);
    }

    async postNestJSServer(url: string, data: any){
        return await this.apiManager?.post(this.nest_server_url + url, data);
    }
    async patchNestJSServer(url: string, data: any){
        return await this.apiManager?.patch(this.nest_server_url + url, data);
    }

    async getFromStockRates(url: string){
        return await this.apiManager?.get(url);
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

    async getExchangeRate(country_code: string = 'USD'){
        try {
            const response: AxiosResponse | undefined = await this.getFromStockRates(`https://v6.exchangerate-api.com/v6/5562fc49030bb9070715964b/latest/${country_code}`);
            if(response)
                return response.data;
            else
                return {error: true};
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    }


    async getDataReportByNomorPengajuan(nomor_pengajuan: string){
        const url = `data-pungutan?nomor_pengajuan=${nomor_pengajuan}`;

        try {
            const response: AxiosResponse | undefined = await this.getNestJSServer(url);
            if(response)
                return response.data;
            else
                return {error: true};
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    }

    async createDataUtamaReport(data: DataUtamaReport){
        try {
            const response: AxiosResponse | undefined = await this.postNestJSServer('data-pungutan', data);

            if(response){
                return response.data;
            }
            else{
                return {error: true}
            }
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    }

    async updateDataUtamaReport(updated_data: {}, _id: string){
        console.log(updated_data, _id)
        try {
            const response: AxiosResponse | undefined = await this.patchNestJSServer(`data-pungutan/${_id}`, updated_data);

            if(response){
                return response.data;
            }
            else{
                return {error: true}
            }
        } catch (error) {
            console.log(error);
            return ({error: true})
        }
    }
}

const ApiProvider = new ApiProviderClass('https://api-hub.ilcs.co.id/', 'http://localhost:3000/');

export default ApiProvider;