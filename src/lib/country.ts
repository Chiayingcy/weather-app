const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ALIASES: Record<string, string> = {
  "UK": "GB",
  "USA": "US",
  "UAE": "AE",
  "KSA": "SA",
};

const validCountryCodes = new Set<string>()
const codesByName = new Map<string, string>()
const countryOptions: { code: string; name: string }[] = []

for (const first of LETTERS) {
    for (const second of LETTERS) {
        const code = first + second;
        const name = regionNames.of(code);
        if(name && name !== code) {
            validCountryCodes.add(code);
            codesByName.set(name.toLowerCase(), code);
            countryOptions.push({ code, name });
        }
    }
}

countryOptions.sort((left, right) => left.name.localeCompare(right.name));

export { countryOptions };

export function getCountryCode(input: string): string | null {
    const value = input.trim().toUpperCase();
 
    if(!value) return null;
    if(value.length === 2) {
        return validCountryCodes.has(value.toUpperCase()) ? value.toUpperCase() : null;
    }
    return ALIASES[value] || codesByName.get(value) || null;

}