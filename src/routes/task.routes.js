const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");

const taskSchema = require("../models/task.model");
const { crearTareas } = require("../seed/task.seed");

const router = express.Router();
router.use(bodyParser.json());

// Encabezados de seguridad
router.use(helmet());

// Validación y sanitización de datos
const validateTask = [
    body("title").isString().trim().escape(),
    body("description").isString().trim().escape(),
    body("status").isString().trim().escape()
];

// Ruta Seed (sin validar datos)
router.get("/seed", async (req, res) => {
    try {
        await crearTareas(); // Ejecutar el seed para tareas
        res.status(200).send("Base de datos poblada con tareas de prueba");
    } catch (error) {
        res.status(500).send("Error al poblar la base de datos");
    }
});

// Crear Tarea
router.post("/createTask", validateTask, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const task = new taskSchema(req.body);
        const data = await task.save();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener todas las tareas (con búsqueda opcional por título)
router.get("/getTaskAll", async (req, res) => {
    const { title } = req.query;
    try {
        let data;
        if (title) {
            data = await taskSchema.find({ title: { $regex: title, $options: "i" } });
        } else {
            data = await taskSchema.find();
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener tarea por ID
router.get("/getTaskById/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await taskSchema.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener tareas por estado
router.get("/getTaskByStatus/:status", async (req, res) => {
    const { status } = req.params;
    try {
        const data = await taskSchema.find({ status });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar tarea
router.put("/updateTask/:id", validateTask, async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedTask = await taskSchema.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar tarea
router.delete("/deleteTask/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await taskSchema.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Configuración de CSP
router.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; connect-src 'self' http://localhost:3000 https://back-po5lc1urv-emapauls-projects.vercel.app/api/getTaskAll https://back-task-parte1.vercel.app';"
    );
    next();
});

module.exports = router;
