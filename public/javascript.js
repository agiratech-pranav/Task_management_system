const errorMessage = document.getElementById('error-message');
// const axios = require('axios');
// Dynamically choose fetch URL
const fetchUrl =
  window.location.hostname === 'localhost' && window.location.port === '3000'
    ? '/tasks'
    : 'http://localhost:3000/tasks';

// Fetch tasks and populate table
fetch(fetchUrl)
  .then(res => {
    if (!res.ok) {
      console.log('HTTP Status:', res.status, res.statusText);
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => {
    const table = document.getElementById('taskTable');
    if (data.length === 0) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'No tasks found.';
      return;
    }

    data.forEach(task => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.Description}</td>
        <td>${task.status}</td>
        <td>${new Date(task.created_at).toLocaleString()}</td>
      `;
    });
  })
  .catch(err => {
    console.error('Error fetching tasks:', err);
    errorMessage.style.display = 'block';
  });

// Enable form fields for editing
function edit() {
  const inputs = document.querySelectorAll("#readonly_form input");
  inputs.forEach(input => {
    input.removeAttribute("readonly");
    input.style.backgroundColor = "#fff";
  });
}

// Set form fields to readonly
function save() {
  const inputs = document.querySelectorAll("#readonly_form input");
  inputs.forEach(input => {
    input.setAttribute("readonly", "readonly");
  });
}

async function save_task() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('Description').value;
  const status = document.getElementById('status').value;

  const taskData = {
    title: title,
    description: description,
    status: status
  };

  try {
    const response = await fetch('http://localhost:3000/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text(); // Or use response.json() if applicable
    console.log('Server response:', result);
    
    alert('Task added successfully!');
    location.reload(); // Refresh to show updated task list

  } catch (error) {
    console.error('Error saving task:', error);
    alert('Failed to save task.');
  }
}

// const add_button=document.getElementById("add_task_button");
// add_button.addEventListener("click", function(){
//   add_button.style.backgroundColor="green";
// })

function update_task() {
    const id = document.getElementById("id").value;
    const status = document.getElementById("status").value;

    fetch('http://localhost:3000/update-task', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id :id, status: status })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to update task.");
    });
}