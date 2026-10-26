export interface searchWeather {
    city: string;
    country: string;
}

export interface weatherResult {
    city: string;
    country: string;
    condition: string;
    description: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    searchTime: number;
    iconCode: string;
}

export interface weatherHistory {
    id: string;
    city: string;
    country: string;
    searchTime: number;
}
