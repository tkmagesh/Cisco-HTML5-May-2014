function getTaskStorage(){
		var storage = window.localStorage;
		return {
			addTask : function(taskName){
				var key = new Date().getTime().toString();
				var newTask = {key : key, taskName : taskName, isCompleted: false}
				storage.setItem(key,window.JSON.stringify(newTask));
				return newTask;
			},
			removeTask : function(key){
				storage.removeItem(key);
			},
			toggleCompletion : function(key){
				var task = window.JSON.parse(storage.getItem(key));
				task.isCompleted = !task.isCompleted;
				storage.setItem(task.key, window.JSON.stringify(task));
			},
			getAllTasks : function(){
				var result = [];
				for(var i=0;i<storage.length;i++){
					var key = storage.key(i);
					var taskAsString = storage.getItem(key);
					result.push(window.JSON.parse(taskAsString));
				}
				return result;
			}
		}
	}