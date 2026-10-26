import { fetchWeather, WeatherApiError } from "@/api/openWeather";
import type { searchWeather, weatherResult } from "@/types/weather";
import { useCallback, useEffect, useRef, useState } from "react";

interface weatherSearchState {
    status: 'idle' | 'loading' | 'success' | 'error';
    data: weatherResult | null;
    error: string | null;
}

const initialState: weatherSearchState = {
    status: 'idle',
    data: null,
    error: null,
};

export function useWeatherSearch() {
    const [state, setState] = useState<weatherSearchState>(initialState);
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, []);

    const searchWeather = useCallback(async (query: searchWeather) => {

    //slow response simulation
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState((prev)=> ({ ...prev, status: 'loading', error: null }))
    try {
        const data = await fetchWeather(query, controller.signal);
        setState({ status: 'success', data, error: null });
        return data;
    } catch (e) {
        if (controller.signal.aborted) {
            return null;
        }
        const errorMessage = e instanceof WeatherApiError ? e.message : 'An unknown error occurred';
        setState({ status: 'error', data: null, error: errorMessage });
        return null;
    }
},[])

    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, status: prev.data ? 'success' : 'idle', error: null }));
    }, []);

    return {
        ...state,
        searchWeather,
        clearError,
    };

}