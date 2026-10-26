const pad = (num: number) => num.toString().padStart(2, "0");

export const formatTemp = (calcius: number) => `${Math.round(calcius)}°`;

export const formatDateTime = (epochMs: number): string => {
    const date = new Date(epochMs);
    const hours = date.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(hours % 12 || 12)}:${pad(date.getMinutes())} ${meridiem}`;
};

export const toIsoString = (epochMs: number): string => new Date(epochMs).toISOString();