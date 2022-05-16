export const validateDAC = (field: string): boolean => {
    const fieldNumbers = field.split('');
    const verificationDigitCandidate = fieldNumbers.pop();
    const reversedFieldNumbers = fieldNumbers.reverse();
    let multiplicationFactor = 2;
    const lineResult: number[] = [];
    for (const fieldNumber of reversedFieldNumbers) {
        const result = parseInt(fieldNumber) * multiplicationFactor;
        lineResult.push(result);
        multiplicationFactor = multiplicationFactor === 2 ? 1 : 2;
    }
    const reversedResult = lineResult.reverse();
    const sumResult = reversedResult
        .join()
        .replace(/,/g, '')
        .split('')
        .reduce((total, current) => total + parseInt(current), 0);
    const rest = sumResult % 10;
    let dac = rest;
    if (rest > 0) {
        dac = 10 - rest;
    }
    return dac === parseInt(verificationDigitCandidate!);
};
