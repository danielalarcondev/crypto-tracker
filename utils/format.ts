export const formatLargeNumber = (number: number) => {

    const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(number);
};

export const formatPercentageNumber = (percentage: number) => {

    const TWO_DECIMALS = 2;
    const number = Number(percentage);

    if (isNaN(number)) {
        return `${percentage}%`;
    }

    return `${number.toFixed(TWO_DECIMALS)}%`;
};
