import type { weatherHistory, weatherResult } from "@/types/weather";
import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

const MAX_ENTRIES = 10;

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage<weatherHistory[]>('weather:history', []);

    //new search entry is added to the top of the list, and if the list exceeds MAX_ENTRIES, the oldest entry is removed.
    const addEntry = useCallback((report: weatherResult) => {
        const id = `${report.city}-${report.country}`.toLowerCase();
        setHistory((prev) => [
            { id, city: report.city, country: report.country, searchTime: report.searchTime },
            ...prev.filter((entry) => entry.id !== id),
        ].slice(0, MAX_ENTRIES));
    }, [setHistory]);

    const removeHistoryEntry = useCallback((id: string) => {
        setHistory((prev) => prev.filter((entry) => entry.id !== id))
    }, [setHistory]);

    return {
        history,
        addEntry,
        removeHistoryEntry
    };

}