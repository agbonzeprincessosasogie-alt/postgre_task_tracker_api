const AppDataSource = require("../config/data-source");


const createTask = async(req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const taskRepository =
            AppDataSource.getRepository("Task");

        const userRepository =
            AppDataSource.getRepository("User");

        const user =
            await userRepository.findOneBy({
                id: req.user.id
            });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const newTask = taskRepository.create({
            title,
            description,
            user
        });

        const savedTask =
            await taskRepository.save(newTask);

        res.status(201).json(savedTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getTasks = async(req, res) => {
    try {
        const taskRepository =
            AppDataSource.getRepository("Task");

        const tasks =
            await taskRepository.find({
                relations: {
                    user: true
                }
            });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getTaskById = async(req, res) => {
    try {
        const taskRepository =
            AppDataSource.getRepository("Task");

        const task =
            await taskRepository.findOne({
                where: {
                    id: Number(req.params.id)
                },
                relations: {
                    user: true
                }
            });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateTask = async(req, res) => {
    try {
        const taskRepository =
            AppDataSource.getRepository("Task");

        const task =
            await taskRepository.findOne({
                where: {
                    id: Number(req.params.id)
                },
                relations: {
                    user: true
                }
            });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.id !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to update this task"
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

        const updatedTask =
            await taskRepository.save(task);

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteTask = async(req, res) => {
    try {
        const taskRepository =
            AppDataSource.getRepository("Task");

        const task =
            await taskRepository.findOne({
                where: {
                    id: Number(req.params.id)
                },
                relations: {
                    user: true
                }
            });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.id !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this task"
            });
        }

        await taskRepository.remove(task);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
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