function startForm() {
    document.getElementById('hero-section').classList.add('hidden');
    document.getElementById('wizard-section').classList.remove('hidden');
}

function nextStep(stepNumber) {
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.add('hidden'));
    document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
    
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        if (index < stepNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function runAnalysis() {
    document.getElementById('wizard-section').classList.add('hidden');
    
    const loadingSection = document.getElementById('loading-section');
    loadingSection.classList.remove('hidden');
    
    const statusText = document.getElementById('loading-status');
    const progressFill = document.getElementById('loading-progress');
    const percentText = document.getElementById('loading-percentage');
    
    const statusMessages = [
        { progress: 30, msg: "Analyzing Nutrition & Hydration Indexes..." },
        { progress: 60, msg: "Evaluating Movement Patterns & Resting Cycles..." },
        { progress: 100, msg: "Compiling Complete Habit Wellness Score..." }
    ];
    
    let currentStage = 0;
    let currentPct = 0;
    
    const interval = setInterval(() => {
        if (currentPct < statusMessages[currentStage].progress) {
            currentPct += 1;
            progressFill.style.width = currentPct + '%';
            percentText.innerText = currentPct + '%';
            statusText.innerText = statusMessages[currentStage].msg;
        } else {
            if (currentStage < statusMessages.length - 1) {
                currentStage++;
            } else {
                clearInterval(interval);
                calculateRealHabitMetrics();
            }
        }
    }, 15); 
}

function calculateRealHabitMetrics() {
    // Read input elements values directly
    const sleep = parseInt(document.getElementById('input-sleep').value);
    const water = parseFloat(document.getElementById('input-water').value);
    
    const diet = document.querySelector('input[name="diet"]:checked').value;
    const fastfood = document.querySelector('input[name="fastfood"]:checked').value;
    const activity = document.querySelector('input[name="activity"]:checked').value;
    const screentime = document.querySelector('input[name="screentime"]:checked').value;

    // Sub-category Scores calculations
    let nutritionScore = 100;
    let fitnessScore = 100;
    let sleepScore = 100;

    // 1. Calculate Nutrition Profile
    if (diet === 'average') nutritionScore -= 15;
    if (diet === 'poor') nutritionScore -= 35;
    if (fastfood === 'sometimes') nutritionScore -= 15;
    if (fastfood === 'often') nutritionScore -= 30;
    if (water < 2.5) nutritionScore -= 15;
    if (water < 1.5) nutritionScore -= 15;

    // 2. Calculate Fitness Profile
    if (activity === 'moderate') fitnessScore -= 15;
    if (activity === 'low') fitnessScore -= 40;
    if (screentime === 'medium') fitnessScore -= 10;
    if (screentime === 'high') fitnessScore -= 25;

    // 3. Calculate Sleep / Recovery Profile
    if (sleep < 8 || sleep > 10) sleepScore -= 15; // standard target window deviations
    if (sleep < 6) sleepScore -= 25;
    if (screentime === 'high') sleepScore -= 15; // Blue light exposure side-effect penalty

    // Force values within logical visual presentation boundaries
    nutritionScore = Math.max(nutritionScore, 10);
    fitnessScore = Math.max(fitnessScore, 10);
    sleepScore = Math.max(sleepScore, 10);

    // Total aggregate score calculation
    let overallScore = Math.round((nutritionScore + fitnessScore + sleepScore) / 3);

    // Output values cleanly back into the interface view
    document.getElementById('score-num').innerText = overallScore + "%";
    document.getElementById('habit-val-nutrition').innerText = nutritionScore + "%";
    document.getElementById('habit-val-fitness').innerText = fitnessScore + "%";
    document.getElementById('habit-val-sleep').innerText = sleepScore + "%";

    // Dynamic Text Elements updates based on actual performance tiers
    const statusLabel = document.querySelector('#results-section h4');
    if (overallScore >= 80) {
        statusLabel.innerText = "Excellent Routine Balance";
        statusLabel.style.color = "var(--green)";
    } else if (overallScore >= 50) {
        statusLabel.innerText = "Moderate Lifestyle Imbalances Observed";
        statusLabel.style.color = "var(--amber)";
    } else {
        statusLabel.innerText = "Needs Immediate Routine Tuning";
        statusLabel.style.color = "var(--red)";
    }

    // Dynamic Advice Cards configuration logic checks
    const recNutr = document.getElementById('rec-nutrition');
    if (nutritionScore < 70) {
        recNutr.innerText = "Consider pacing down on fast food trips. Swapping out soda/juice targets for an extra 1L of refreshing water daily supports clean mental stamina during test periods.";
    } else {
        recNutr.innerText = "Superb nutritional framework! Staying consistently topped off on fresh meals and good hydration works miracles for natural energy reserves.";
    }

    const recFit = document.getElementById('rec-movement');
    if (fitnessScore < 70) {
        recFit.innerText = "Extended computer or study desk screen blocks can reduce core posture integrity. Build in brief active stretching intervals or brisk walking loops every 2 hours.";
    } else {
        recFit.innerText = "Stellar movement commitment profile. Combining structured workout exercises alongside structural walking cycles shapes high metabolic output tracks.";
    }

    // Switch view sections out cleanly
    document.getElementById('loading-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');

    // Smoothly animate the fill width bars
    setTimeout(() => {
        document.getElementById('meter-fill-nutrition').style.width = nutritionScore + "%";
        document.getElementById('meter-fill-fitness').style.width = fitnessScore + "%";
        document.getElementById('meter-fill-sleep').style.width = sleepScore + "%";
    }, 100);
}