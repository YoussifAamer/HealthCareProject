// Automatically calculate and render today's dynamic date in DD/MM/YYYY format
document.addEventListener("DOMContentLoaded", () => {
    const displayDateElem = document.getElementById("display-date");
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    
    displayDateElem.textContent = `${day}/${month}/${year}`;
});

// Function to handle the Fast Booking button action
function bookAppointment(doctorName, timeInputId) {
    const timeInput = document.getElementById(timeInputId);
    
    if (!timeInput.value) {
        alert("Please select a convenient time first / برجاء اختيار الوقت أولاً");
        return;
    }

    showToast(`Booked Successfully with ${doctorName} at ${timeInput.value}`);
}

// Function to generate the bottom-left Toast notification holding 2 seconds duration
function showToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Remove toast after 2 seconds exactly as requested
    setTimeout(() => {
        toast.remove();
    }, 2000);
}