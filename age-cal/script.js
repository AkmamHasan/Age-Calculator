document.addEventListener("DOMContentLoaded", function() {
    const dobMonth = document.getElementById("dob-month");
    const dobDay = document.getElementById("dob-day");
    const dobYear = document.getElementById("dob-year");
    const ageDateMonth = document.getElementById("age-date-month");
    const ageDateDay = document.getElementById("age-date-day");
    const ageDateYear = document.getElementById("age-date-year");
    const recentDateCheckbox = document.getElementById("recent-date");
    const dobYearBtn = document.getElementById("dob-year-btn");
    const ageDateYearBtn = document.getElementById("age-date-year-btn");
    const calculateButton = document.getElementById("calculate-button");
    const resultDiv = document.getElementById("result");

    // Populate dropdowns with options (months, days)

    for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        dobDay.appendChild(option);
        ageDateDay.appendChild(option.cloneNode(true));
    }

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        dobMonth.appendChild(option);
        ageDateMonth.appendChild(option.cloneNode(true));
    }

    dobYearBtn.addEventListener("click", function() {
        dobYear.value = new Date().getFullYear();
    });

    ageDateYearBtn.addEventListener("click", function() {
        ageDateYear.value = new Date().getFullYear();
    });

    recentDateCheckbox.addEventListener("change", function() {
        if (recentDateCheckbox.checked) {
            ageDateMonth.disabled = true;
            ageDateDay.disabled = true;
            ageDateYear.disabled = true;
            ageDateYearBtn.disabled = true;
        } else {
            ageDateMonth.disabled = false;
            ageDateDay.disabled = false;
            ageDateYear.disabled = false;
            ageDateYearBtn.disabled = false;
        }
    });

    calculateButton.addEventListener("click", function() {
        const dob = new Date(dobYear.value, dobMonth.value - 1, dobDay.value);
        let ageDate;

        if (recentDateCheckbox.checked) {
            ageDate = new Date();
        } else {
            ageDate = new Date(ageDateYear.value, ageDateMonth.value - 1, ageDateDay.value);
        }

        const ageInMillis = ageDate - dob;
        const ageInSeconds = ageInMillis / 1000;
        const ageInMinutes = ageInSeconds / 60;
        const ageInHours = ageInMinutes / 60;
        const ageInDays = ageInHours / 24;
        const ageInWeeks = ageInDays / 7;
        const ageInMonths = ageInDays / 30.44;
        const ageInYears = ageInMonths / 12;

        const resultText = `
            <div>
            <div><b>Age:</b></div>
                ${Math.floor(ageInYears)} years, 
                ${Math.floor(ageInMonths) % 12} months, 
                ${Math.floor(ageInDays) % 30} days
            </div>
            <div>or ${Math.floor(ageInMonths)} months, ${Math.floor(ageInDays) % 30} days </div>
            <div>or ${Math.floor(ageInWeeks)} weeks, ${Math.floor(ageInDays) % 7} days </div>
            <div>or ${Math.floor(ageInWeeks)} weeks </div>
            <div>or ${Math.floor(ageInHours)} hours </div>
            <div>or ${Math.floor(ageInMinutes)} minutes </div>
            <div>or ${Math.floor(ageInSeconds)} seconds </div>
        `;

        resultDiv.innerHTML = resultText;
    });
});
