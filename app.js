document.getElementById('addTask').addEventListener('click', () => {
    const taskName = document.getElementById('taskName').value;
    const category = document.getElementById('category').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
  
    if (taskName) {
      const taskList = document.getElementById('taskList');
      const taskItem = document.createElement('li');
      taskItem.classList.add('task', `${priority.toLowerCase()}-priority`);
      taskItem.setAttribute('draggable', true);
      taskItem.innerHTML = `
        <span>${taskName} - ${category} - Due: ${dueDate} - Priority: ${priority}</span>
        <select onchange="updateStatus(this)">
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
        <option value="didntDo">Didn't Do</option>
        </select>
        <button onclick="deleteTask(this)">Delete</button>
      `;
      taskItem.addEventListener('dragstart', handleDragStart);
      taskItem.addEventListener('dragover', handleDragOver);
      taskItem.addEventListener('drop', handleDrop);
      taskItem.addEventListener('dragend', handleDragEnd);

      document.getElementById('taskName').value = '';
      document.getElementById('category').value = '';
      document.getElementById('dueDate').value = ''; // Clear date input
      document.getElementById('priority').value = '';
   
      taskList.appendChild(taskItem);
      document.getElementById('taskName').value = ''; // Clear input field
    }
  });

  let draggedItem = null;

function updateStatus(selectElement) {
    const taskItem = selectElement.parentElement;
    const status = selectElement.value;
  
    // Remove previous status classes
    taskItem.classList.remove('complete', 'didntDo', 'pending');
  
    // Add new status class based on selection
    taskItem.classList.add(status);
}

function handleDragOver(e) {
  e.preventDefault(); // Prevent default to allow drop
}

function handleDrop(e) {
  e.preventDefault(); // Prevent default behavior
  if (this !== draggedItem) {
    // Insert dragged item before the drop target
    const taskList = document.getElementById('taskList');
    taskList.insertBefore(draggedItem, this);
  }
}

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
  }
  
  function handleDragEnd() {
    this.classList.remove('dragging');
  }
  
  function deleteTask(task) {
    task.parentElement.remove();
  }