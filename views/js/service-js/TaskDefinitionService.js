var TaskDefinitionModel=require('../Model-js/TaskDefinitionModel');

function TaskDefinitionService()
{
    
}
TaskDefinitionService.prototype.addNew = function(TaskDefinition, callback){
    var newTask = new TaskDefinitionModel(TaskDefinition);
    newTask.save(function(err, addedTask){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedTask);
    });
}
TaskDefinitionService.prototype.removeAll = function(callback){
    TaskDefinitionModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm rol tanımları silindi.");
    });
}
 TaskDefinitionService.prototype.remove = function(taskId,callback){
    TaskDefinitionModel.remove({_id:taskId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"rol tanımı silindi.");
    });
}
TaskDefinitionService.prototype.listAll = function(criteria,callback){
    TaskDefinitionModel.find({firmCode : criteria}, function(error, TaskDefinitions){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, TaskDefinitions);
    });
}
module.exports = TaskDefinitionService;