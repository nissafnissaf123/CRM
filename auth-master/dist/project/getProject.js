"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", async (req, res, next) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                client: true,
                tasks: true
            }
        });
        res.json({ projects });
    }
    catch (error) {
        next(error.message);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: {
                client: true,
                tasks: true,
            },
        });
        if (!project) {
            return res.status(404).json({ message: "Le projet n'a pas été trouvé" });
        }
        const todoTaskCount = await prisma.task.count({
            where: {
                projectId: String(req.params.id),
                status: 'Todo',
            },
        });
        const doingTaskCount = await prisma.task.count({
            where: {
                projectId: String(req.params.id),
                status: 'Doing',
            },
        });
        const doneTaskCount = await prisma.task.count({
            where: {
                projectId: String(req.params.id),
                status: 'Done',
            },
        });
        const totalTaskCount = todoTaskCount + doingTaskCount + doneTaskCount;
        let progress;
        if (totalTaskCount === 0) {
            progress = 0;
        }
        else {
            progress = Math.round((doneTaskCount / totalTaskCount) * 100);
        }
        project.progress = progress;
        console.log(project);
        res.json({ project });
    }
    catch (error) {
        console.error('Error occurred while counting tasks:', error);
    }
});
router.get("/:id/tasks", async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const tasks = await prisma.task.findMany({
            where: {
                projectId: String(projectId),
            },
        });
        res.json({ tasks });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=getProject.js.map