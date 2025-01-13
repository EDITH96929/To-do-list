$(document).ready(function () {

    // Update Task Counter
    function updateTaskCount() {
      const activeTasks = $('#task-list li:not(.completed)').length;
      $('#task-count').text(`${activeTasks} task(s) remaining`);
    }
  
    // Show Toast Notification
    function showToast(message, type = 'success') {
      const toast = $('#toast');
      toast.removeClass('bg-green-500 bg-red-500 bg-yellow-500')
           .addClass(type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500')
           .text(message)
           .fadeIn(300);
  
      setTimeout(() => toast.fadeOut(300), 2000);
    }
  
    // Add Task
    $('#add-task').click(function () {
      const taskText = $('#task-input').val().trim();
      if (taskText) {
        const taskItem = `
          <li class="task-item flex justify-between items-center bg-gray-100 px-4 py-2 rounded hover:shadow-lg transition-shadow">
            <span class="task-text">${taskText}</span>
            <div class="actions space-x-2">
              <button class="complete-task bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded">Complete</button>
              <button class="delete-task bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>`;
        
        $('#task-list').append(taskItem);
        $('#task-input').val('');
        showToast('Task added successfully!');
        updateTaskCount();
      } else {
        showToast('Please enter a task!', 'error');
      }
    });
  
    // Complete Task
    $('#task-list').on('click', '.complete-task', function () {
      $(this).closest('li').toggleClass('completed bg-green-100 line-through');
      updateTaskCount();
      showToast('Task marked as complete!');
    });
  
    // Delete Task
    $('#task-list').on('click', '.delete-task', function () {
      $(this).closest('li').fadeOut(300, function () {
        $(this).remove();
        updateTaskCount();
        showToast('Task deleted!');
      });
    });
  
    // Clear All Tasks
    $('#clear-tasks').click(function () {
      $('#task-list').empty();
      updateTaskCount();
      showToast('All tasks cleared!');
    });
  
    // Filter Tasks
    $('.filter-btn').click(function () {
      const filter = $(this).data('filter');
      $('#task-list li').show();
  
      if (filter === 'active') {
        $('#task-list li.completed').hide();
      } else if (filter === 'completed') {
        $('#task-list li:not(.completed)').hide();
      }
    });
  });
  