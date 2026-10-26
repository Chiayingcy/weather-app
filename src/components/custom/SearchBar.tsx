import { Form } from "@base-ui/react/form";
import { Check, ChevronDown, LoaderCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { searchWeather } from "@/types/weather";
import { countryOptions } from "@/lib/country";
import { Label } from "@/components/ui/label";
import { FloatingLabelInput } from "./FloatingLabelInput";
import { IconButton } from "./IconButton";

interface SearchBarProps {
    onSearch: (query: searchWeather) => void;
    isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [countryQuery, setCountryQuery] = useState('');
    const [countryOpen, setCountryOpen] = useState(false);
    const countryPickerRef = useRef<HTMLDivElement>(null);
    const selectedCountry = countryOptions.find((option) => option.code === country);
    const filteredCountries = countryOptions.filter((option) =>
        `${option.name} ${option.code}`.toLowerCase().includes(countryQuery.trim().toLowerCase()),
    );

    useEffect(() => {
        const closeOnOutsideClick = (event: PointerEvent) => {
            if (!countryPickerRef.current?.contains(event.target as Node)) {
                setCountryOpen(false);
            }
        };

        document.addEventListener('pointerdown', closeOnOutsideClick);
        return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch({ city: city.trim(), country });
    };

    return (
        <Form onSubmit={handleSubmit} className="relative z-50 grid w-full grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-2 sm:gap-3">
            <div className="col-start-1 flex h-15 min-w-0 items-center overflow-visible rounded-[20px] border border-foreground/10 bg-secondary backdrop-blur-md ring-ring/50 transition focus-within:ring-2">
                <div ref={countryPickerRef} className="relative z-20 h-full w-[20%] min-w-19 max-w-45 shrink-0 px-3 pt-5 sm:px-5">
                    <Label htmlFor="country-combobox" className="absolute left-3 top-2 text-[10px] font-normal text-muted-foreground sm:left-5">
                        Country
                    </Label>
                    <button
                        id="country-combobox"
                        type="button"
                        role="combobox"
                        aria-label="Country"
                        aria-haspopup="listbox"
                        aria-expanded={countryOpen}
                        onClick={() => setCountryOpen((open) => !open)}
                        onKeyDown={(event) => {
                            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setCountryOpen(true);
                            }
                        }}
                        className="flex h-7 w-full min-w-0 cursor-pointer items-center justify-between gap-1 border-0 bg-transparent p-0 text-left text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-base"
                    >
                        <span className="truncate">{selectedCountry?.name ?? 'Any'}</span>
                        <ChevronDown aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />
                    </button>
                    {countryOpen && (
                        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl sm:w-80">
                            <div className="sticky top-0 border-b border-border bg-popover p-2">
                                <div className="relative">
                                    <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                                    <input
                                        autoFocus
                                        type="search"
                                        aria-label="Search countries"
                                        placeholder="Search countries"
                                        value={countryQuery}
                                        onChange={(event) => setCountryQuery(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Escape') setCountryOpen(false);
                                        }}
                                        className="h-10 w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 sm:text-base"
                                    />
                                </div>
                            </div>
                            <div role="listbox" aria-label="Countries" className="max-h-[min(55dvh,20rem)] overflow-y-auto p-1">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={!country}
                                    onClick={() => {
                                        setCountry('');
                                        setCountryQuery('');
                                        setCountryOpen(false);
                                    }}
                                    className="flex min-h-10 w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-popover-foreground hover:bg-primary/15 hover:text-foreground focus-visible:bg-primary/20 focus-visible:outline-none aria-selected:bg-primary aria-selected:text-primary-foreground sm:text-base"
                                >
                                    Any country
                                    {!country && <Check aria-hidden="true" className="size-4" />}
                                </button>
                                {filteredCountries.length ? filteredCountries.map(({ code, name }) => (
                                    <button
                                        key={code}
                                        type="button"
                                        role="option"
                                        aria-selected={country === code}
                                        onClick={() => {
                                            setCountry(code);
                                            setCountryQuery('');
                                            setCountryOpen(false);
                                        }}
                                        className="flex min-h-10 w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-popover-foreground hover:bg-primary/15 hover:text-foreground focus-visible:bg-primary/20 focus-visible:outline-none aria-selected:bg-primary aria-selected:text-primary-foreground sm:text-base"
                                    >
                                        <span>{name} <span className="text-muted-foreground">({code})</span></span>
                                        {country === code && <Check aria-hidden="true" className="size-4" />}
                                    </button>
                                )) : (
                                    <p className="px-3 py-3 text-sm text-muted-foreground sm:text-base">No countries found.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div aria-hidden="true" className="h-8 w-px shrink-0 bg-black" />
                <FloatingLabelInput
                    label="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Enter city"
                    autoComplete="address-level2"
                    required
                    pattern=".*\S.*"
                    title="Please enter a city name."
                    className="h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 pt-5 backdrop-blur-none focus-within:ring-0 sm:px-5"
                />
            </div>
            <IconButton type="submit" tone="primary" label="Search" disabled={isLoading} className="col-start-2 size-14 shrink-0 rounded-2xl">
                {isLoading ? <LoaderCircle className="size-7 animate-spin" /> : <Search className="size-7" />}
            </IconButton>
        </Form>
    );
}