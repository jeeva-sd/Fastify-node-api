export function roundToDecimal(num: number, decimalPlaces = 2): number {
    if (isNaN(num)) return NaN;
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatNumberWithCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
