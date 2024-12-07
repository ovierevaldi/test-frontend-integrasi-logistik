import { ExchangeRates, Kurs } from '@/types/Data';
import { v4 as uuidv4 } from 'uuid';

const generateUUID = (): string => {
    return uuidv4(); 
};

const getDateInString = () : string => {
    return new Date().toISOString().substring(0,10);
}

const ConvertCurrency = (currency: string, value: number) : string => {
    // Format as US Dollars
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
    }).format(value);
  
};

export const getSelectedExchangeRates = (
    rates: ExchangeRates,
    kursList: Kurs[]
): Partial<ExchangeRates> => {
    const selectedRates: Partial<ExchangeRates> = {};
    kursList.forEach(kurs => {
        const code = kurs.code as keyof ExchangeRates;
        if (code in rates) {
            selectedRates[code] = rates[code];
        }
    });
    return selectedRates;
};


export {generateUUID, getDateInString, ConvertCurrency};