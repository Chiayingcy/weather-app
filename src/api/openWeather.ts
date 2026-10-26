import { getCountryCode } from "@/lib/country";
import type { searchWeather, weatherResult } from "@/types/weather";


const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

//error message from openWeather api
export class WeatherApiError extends Error {
    readonly status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "WeatherApiError";
        this.status = status;
    }
}

interface WeatherApiResponse {
    name: string;
    sys: {
        country: string;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
}

function messageForStatus(status: number): string {
    switch (status) {
        case 401:
            return "Invalid API key. Please check your OpenWeather API key.";
        case 404:
            return "City/Region not found. Please check the city name and country code.";
        case 429:
            return "Too many requests. Please try again later.";
        default:
            return `Unexpected error occurred (status code: ${status}).`;
    }
}

export async function fetchWeather(query: searchWeather, signal?: AbortSignal): Promise<weatherResult> {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new WeatherApiError("OpenWeather API key is not set.");
    }

    const countryInput = query.country.trim();
    const countryCode = countryInput ? getCountryCode(countryInput) : null;
    if(countryInput && countryCode === null) {
        throw new WeatherApiError(`Invalid country name or code: ${query.country}`);
    }

    const params = new URLSearchParams({
        q: countryCode ? `${query.city},${countryCode}` : query.city,
        appid: apiKey,
        units: "metric",
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`, { signal });

    if (!response.ok) {
        throw new WeatherApiError(messageForStatus(response.status), response.status);
    }

    const data: WeatherApiResponse = await response.json();
    const [condition] = data.weather

    return {
        city: data.name,
        country: data.sys.country,
        condition: condition.main,
        description: condition.description,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        searchTime: Date.now(),
        iconCode: condition.icon
    };
}