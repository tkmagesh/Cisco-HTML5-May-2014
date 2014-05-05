
	var txtTask, ulTaskList;
	window.addEventListener("DOMContentLoaded",init);
	var storage = getTaskStorage();
	window.addEventListener("storage", onStorageChanged);
	function onStorageChanged(storageEvt){
		loadTasksFromStorage();
	}
	function init(){
		document.getElementById("btnAddTask").addEventListener("click",onBtnAddTaskClick);
		document.getElementById("btnRemoveCompleted").addEventListener("click",onBtnRemoveCompletedClick);
		txtTask = document.getElementById("txtTask");
		ulTaskList = document.getElementById("ulTaskList");
		loadTasksFromStorage();
	};

	function loadTasksFromStorage(){
		ulTaskList.innerHTML = "";
		var allTasks = storage.getAllTasks();
		for(var i=0;i<allTasks.length;i++)
			addTaskToList(allTasks[i]);
	}

	function onBtnAddTaskClick(){
		var taskName = txtTask.value;
		/*Persist the task in storage*/
		var task = storage.addTask(taskName);
		addTaskToList(task);
	}
	function addTaskToList(task){
		var newTaskItem = document.createElement("li");
		newTaskItem.setAttribute("data-task-id",task.key);
		newTaskItem.innerHTML = task.taskName;
		newTaskItem.addEventListener("click",onTaskItemClick);
		if (task.isCompleted)
			newTaskItem.classList.add("completed");
		ulTaskList.appendChild(newTaskItem);
	}
	function onTaskItemClick(){
		this.classList.toggle("completed");
		storage.toggleCompletion(this.getAttribute("data-task-id"));
	}
	function onBtnRemoveCompletedClick(){
		for(var i=ulTaskList.children.length-1;i>=0;i--){
			var taskItem = ulTaskList.children[i];
			if (taskItem.classList.contains("completed")){
				/*Remove item from persistence storage*/
				var key = taskItem.getAttribute("data-task-id");
				storage.removeTask(key);

				taskItem.remove();
			}
		}
	}
	