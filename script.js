const addShiftBtn = document.getElementById('add-shift');
const shiftList = document.getElementById('shift-list');
const totalHoursEl = document.getElementById('total-hours');

let shifts = JSON.parse(localStorage.getItem('shifts')) || [];
let totalHours = 0;

// Function to display shifts
function displayShifts() {
  shiftList.innerHTML = '';
  totalHours = 0;

  shifts.forEach((shift, index) => {
    const li = document.createElement('li');
    li.textContent = `${shift.date}: ${shift.startTime} - ${shift.endTime} (${shift.duration.toFixed(2)} hrs)`;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.onclick = () => {
      shifts.splice(index, 1);
      saveShifts();
      displayShifts();
    };

    li.appendChild(deleteBtn);
    shiftList.appendChild(li);

    totalHours += shift.duration;
  });

  totalHoursEl.textContent = totalHours.toFixed(2);
}

// Save shifts to localStorage
function saveShifts() {
  localStorage.setItem('shifts', JSON.stringify(shifts));
}

// Add new shift
addShiftBtn.addEventListener('click', () => {
  const date = document.getElementById('shift-date').value;
  const startTime = document.getElementById('start-time').value;
  const endTime = document.getElementById('end-time').value;

  if (!date || !startTime || !endTime) {
    alert("Please fill all fields!");
    return;
  }

  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  const duration = (end - start) / (1000 * 60 * 60);

  if (duration <= 0) {
    alert("End time must be after start time!");
    return;
  }

  shifts.push({ date, startTime, endTime, duration });
  saveShifts();
  displayShifts();

  // Clear inputs
  document.getElementById('shift-date').value = '';
  document.getElementById('start-time').value = '';
  document.getElementById('end-time').value = '';
});

// Display shifts on page load
displayShifts();
