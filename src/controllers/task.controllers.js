import Task from "../models/task.models.js";

export const getTask = async (req, res) => {
    try {
        const task = await Task.find({
            user: req.user.id //usuario asginado a la tarea
        }).populate('user')
        res.json(task);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un error"});
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body

        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id, //usuario asginado a la tarea
        })
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un error"});
    }
};

export const getTasks = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if (!task) return res.status(404).json({ message: "No se encontro una Tarea" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"});
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: "No se encontro una Tarea" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: "Tarea no eliminada"});
    }
};

export const updatedTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).json({ message: "No se encontro una Tarea" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({message: "Tarea no actualizada"});
    }
};
