// scripts.js

// Array to hold user data
let users = [];

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    // Add new user data to array
    users.push({ name, email, age });

    // Reset form and render updated table
    document.getElementById('registrationForm').reset();
    renderTable(users);
});

// Render table function
function renderTable(data) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = ''; // Clear previous table data

    // Loop through users and insert rows
    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.age}</td>`;
        tbody.appendChild(row);
    });
}

// Sort table based on column index (0 = Name, 1 = Email, 2 = Age)
function sortTable(columnIndex) {
    const table = document.getElementById('userTable');
    const rows = Array.from(table.rows).slice(1); // Skip header row
    const isSortedAscending = table.rows[0].cells[columnIndex].classList.contains('sorted-asc');

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText;
        const cellB = rowB.cells[columnIndex].innerText;
        if (columnIndex === 2) {
            // Convert to numbers for age sorting
            return (isSortedAscending ? cellA - cellB : cellB - cellA);
        }
        return (isSortedAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA));
    });

    // Reorder rows
    rows.forEach(row => table.appendChild(row));

    // Toggle sorting class
    table.rows[0].cells[columnIndex].classList.toggle('sorted-asc', !isSortedAscending);
    table.rows[0].cells[columnIndex].classList.toggle('sorted-desc', isSortedAscending);
}

// Filter table by search input or age range
document.getElementById('searchInput').addEventListener('input', filterTable);
document.getElementById('ageFilter').addEventListener('change', filterTable);

function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const ageFilter = document.getElementById('ageFilter').value;

    const filteredUsers = users.filter(user => {
        const matchesName = user.name.toLowerCase().includes(searchInput);
        const matchesAge = !ageFilter || 
            (ageFilter === '18-30' && user.age >= 18 && user.age <= 30) ||
            (ageFilter === '31-40' && user.age >= 31 && user.age <= 40) ||
            (ageFilter === '41-50' && user.age >= 41 && user.age <= 50);

        return matchesName && matchesAge;
    });

    renderTable(filteredUsers);
}
