const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const motivationMessage = document.getElementById('motivation-message');

const motivationQuotes = [
  'Small progress is still progress. Keep going!',
  'One task at a time—you are doing great!',
  'Focus on today. Your future self will thank you!',
  'Consistency beats perfection. You’ve got this!',
  'Every completed task is a win. Celebrate it!'
];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function updateDailyMotivation() {
  const today = getTodayKey();
  const quoteIndex = Number.parseInt(today.replace(/-/g, ''), 10) % motivationQuotes.length;
  const quote = motivationQuotes[quoteIndex];

  motivationMessage.textContent = quote;

  const lastMotivationDate = localStorage.getItem('lastMotivationDate');
  if (lastMotivationDate !== today) {
    localStorage.setItem('lastMotivationDate', today);
    setTimeout(() => {
      window.alert(`Daily motivation: ${quote}`);
    }, 100);
  }
}

function createTaskItem(taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.textContent = taskText;

  checkbox.addEventListener('change', () => {
    label.classList.toggle('completed', checkbox.checked);
  });

  listItem.append(checkbox, label);
  taskList.appendChild(listItem);
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    return;
  }

  createTaskItem(taskText);
  taskInput.value = '';
  taskInput.focus();
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

updateDailyMotivation();
setInterval(updateDailyMotivation, 60 * 60 * 1000);
