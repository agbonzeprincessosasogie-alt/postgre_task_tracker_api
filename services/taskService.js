const AppDataSource = require("../config/data-source");

const taskRepository = AppDataSource.getRepository("Task");

const createTask = async(taskData) => {
    return await taskRepository.save(taskData);
};

const getTasks = async() => {
    return await taskRepository.find({
        relations: {
            user: true
        }
    });
};

const getTaskById = async(id) => {
    return await taskRepository.findOne({
        where: {
            id: Number(id)
        },
        relations: {
            user: true
        }
    });
};

const updateTask = async(task) => {
    return await taskRepository.save(task);
};

const deleteTask = async(task) => {
    return await taskRepository.remove(task);
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};