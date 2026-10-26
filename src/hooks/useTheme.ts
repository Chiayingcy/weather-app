import { flushSync } from "react-dom";
import { useCallback, useEffect } from "react";
import type { Point } from "@/lib/viewTransition";
import { runCircularReveal } from "@/lib/viewTransition";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark";

const getSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const useTheme = () => {
    const [theme, setTheme] = useLocalStorage<Theme>("theme", getSystemTheme());

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = useCallback((origin?: Point) => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        runCircularReveal(() => {
            flushSync(() => {
                setTheme(nextTheme);
                document.documentElement.classList.toggle("dark", nextTheme === "dark");
            });
        }, origin);
    }, [setTheme, theme]);

    return [theme, toggleTheme] as const;
}