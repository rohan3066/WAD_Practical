document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();

    const employeeForm = document.getElementById('employeeForm');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const formTitle = document.getElementById('formTitle');

    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('employeeId').value;
        const employeeData = {
            name: document.getElementById('name').value,
            department: document.getElementById('department').value,
            designation: document.getElementById('designation').value,
            salary: parseInt(document.getElementById('salary').value),
            joiningDate: document.getElementById('joiningDate').value
        };

        try {
            let response;
            if (id) {
                // Update employee
                response = await fetch(`/api/employees/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(employeeData)
                });
            } else {
                // Add new employee
                response = await fetch('/api/employees', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(employeeData)
                });
            }

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                resetForm();
                fetchEmployees();
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred');
        }
    });

    cancelBtn.addEventListener('click', () => {
        resetForm();
    });

    async function fetchEmployees() {
        try {
            const response = await fetch('/api/employees');
            const employees = await response.json();
            const tbody = document.getElementById('employeeTableBody');
            tbody.innerHTML = '';

            employees.forEach(employee => {
                const row = document.createElement('tr');
                const formattedDate = new Date(employee.joiningDate).toISOString().split('T')[0];
                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.designation}</td>
                    <td>${employee.salary}</td>
                    <td>${formattedDate}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editEmployee('${employee._id}', '${employee.name}', '${employee.department}', '${employee.designation}', ${employee.salary}, '${formattedDate}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${employee._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to fetch employees');
        }
    }

    window.editEmployee = (id, name, department, designation, salary, joiningDate) => {
        document.getElementById('employeeId').value = id;
        document.getElementById('name').value = name;
        document.getElementById('department').value = department;
        document.getElementById('designation').value = designation;
        document.getElementById('salary').value = salary;
        document.getElementById('joiningDate').value = joiningDate;
        formTitle.textContent = 'Update Employee';
        submitBtn.textContent = 'Update Employee';
        cancelBtn.style.display = 'inline-block';
    };

    window.deleteEmployee = async (id) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            try {
                const response = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    fetchEmployees();
                } else {
                    alert(data.error);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred');
            }
        }
    };

    window.initEmployees = async () => {
        try {
            const response = await fetch('/api/init-employees');
            const data = await response.json();
            alert(data.message);
            fetchEmployees();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to initialize employees');
        }
    };

    function resetForm() {
        document.getElementById('employeeForm').reset();
        document.getElementById('employeeId').value = '';
        formTitle.textContent = 'Add New Employee';
        submitBtn.textContent = 'Add Employee';
        cancelBtn.style.display = 'none';
    }
});