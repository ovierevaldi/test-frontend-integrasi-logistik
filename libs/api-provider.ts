import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiProviderClass {
    apiManager: AxiosInstance | null = null;

    constructor() {
        this.setupApi();
    }    

    setupApi() {
        this.apiManager = axios.create({
            timeout: 2000,
        });

        if (!this.apiManager) {
            console.log('Cannot create api');
        }
    }

    async get(url: string){
        return await this.apiManager?.get(url);
    }

    async getDataUtama(){
        try {
            const response : AxiosResponse | undefined = await this.get('https://api-hub.ilcs.co.id/test/v2/dataUtama?nomor_pengajuan=20120B388FAE20240402000001');
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

const ApiProvider = new ApiProviderClass();

export default ApiProvider;