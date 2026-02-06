document.getElementById('generate-btn').addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const numberElements = document.querySelectorAll('.number');
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        const numDiv = numberElements[index];
        numDiv.textContent = number;
        numDiv.style.backgroundColor = getColorForNumber(number);
        numDiv.style.color = 'white';
    });
});

function getColorForNumber(number) {
    if (number <= 10) return '#f44336'; // Red
    if (number <= 20) return '#ff9800'; // Orange
    if (number <= 30) return '#ffc107'; // Amber
    if (number <= 40) return '#4caf50'; // Green
    return '#2196f3'; // Blue
}
