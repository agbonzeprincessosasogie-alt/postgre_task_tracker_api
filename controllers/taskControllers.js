const taskService = require("../services/taskService");
const userService = require("../services/userService");

const createTask = async(req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const user = await userService.findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const task = await taskService.createTask({
            title,
            description,
            user
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message
        });
    }
};

const getTasks = async(req, res) => {
    try {
        const tasks = await taskService.getTasks();

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message
        });
    }
};

const getTaskById = async(req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching task",
            error: error.message
        });
    }
};

const updateTask = async(req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.id !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this task"
            });
        }

        const { title, description, completed } = req.body;

        if (title !== undefined) {
            task.title = title;
        }

        if (description !== undefined) {
            task.description = description;
        }

        if (completed !== undefined) {
            task.completed = completed;
        }

        const updatedTask = await taskService.updateTask(task);

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
};

const deleteTask = async(req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.id !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this task"
            });
        }

        await taskService.deleteTask(task);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};