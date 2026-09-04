const express = require("express");

const router = express.Router();

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskControllers");

const authMiddleware = require("../middleware/authMiddleware");


router.get("/", getTasks);

router.get("/:id", getTaskById);


router.post(
    "/",
    authMiddleware,
    createTask
);

router.put(
    "/:id",
    authMiddleware,
    updateTask
);

router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);


module.exports = router;