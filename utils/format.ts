export const formatLargeNumber = (number: string) => {

    const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(Number(number));
};

export const formatPercentageNumber = (percentage: string) => {

    const TWO_DECIMALS = 2;
    const number = Number(percentage);

    if (isNaN(number)) {
        return `${percentage}%`;
    }

    return `${number.toFixed(TWO_DECIMALS)}%`;
};
