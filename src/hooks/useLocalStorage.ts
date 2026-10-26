import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        try{
            const raw = localStorage.getItem(key);

            if(raw !== null) {
                return JSON.parse(raw) as T;
            }
        } catch(e) {
            console.error(`Error reading localStorage key "${key}":`, e);
        }

        return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
})

useEffect(() => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
        console.error(`Error writing localStorage key "${key}":`, e);
    }
}, [key, value]);

return [value, setValue] as const;
}