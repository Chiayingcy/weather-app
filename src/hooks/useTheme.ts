import { flushSync } from 'react-dom'
import { useCallback, useEffect, useState } from 'react'
import { runThemeTransition } from '@/lib/viewTransition'

export type Theme = 'light' | 'dark'

function isTheme(value: unknown): value is Theme {
    return value === 'light' || value === 'dark'
}

function getInitialTheme(): Theme {
    try {
        const storedTheme = localStorage.getItem('weather:theme') ?? localStorage.getItem('theme')
        if (storedTheme !== null) {
            const parsedTheme: unknown = JSON.parse(storedTheme)
            if (isTheme(parsedTheme)) return parsedTheme
        }
    } catch {
        // Fall back to the system preference when stored data is unavailable or invalid.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeClass(theme: Theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        applyThemeClass(theme)
        localStorage.setItem('weather:theme', JSON.stringify(theme))
    }, [theme])

    const toggleTheme = useCallback(() => {
        const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
        runThemeTransition(() => {
            flushSync(() => {
                setTheme(nextTheme)
                applyThemeClass(nextTheme)
            })
        })
    }, [theme])

    return [theme, toggleTheme] as const
}