const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const calculate = document.getElementById('calculate');
const result = document.getElementById('result');

calculate.addEventListener('click', () => {
    result.style.display = 'block';
    // Ensure inputs are present
    if (!day.value || !month.value || !year.value) {
        result.textContent = 'Please fill in all fields.';
        return;
    }

    // Pad month and day to two digits
    const mm = month.value.padStart(2, '0');
    const dd = day.value.padStart(2, '0');
    const birthdate = `${year.value}-${mm}-${dd}`;

    // Check if the birthdate is valid
    const birthDateObj = new Date(birthdate);
    if (isNaN(birthDateObj.getTime())) {
        result.textContent = 'Invalid date entered.';
        return;
    }

    const age = calculateAge(birthDateObj);
    result.textContent = `Your age is ${age.years} years, ${age.months} months, and ${age.days} days.`;

});

// Function to calculate age from birthdate string (format: YYYY-MM-DD)
function calculateAge(birthDate) {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate(); // days in previous month
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}
