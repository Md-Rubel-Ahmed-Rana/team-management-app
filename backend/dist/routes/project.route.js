"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const project_controller_1 = require("@/controllers/project.controller");
const projectCacheMiddleware_1 = __importDefault(require("@/middlewares/projectCacheMiddleware"));
const validateRequest_1 = __importDefault(require("@/middlewares/validateRequest"));
const project_validation_1 = require("@/validations/project.validation");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", (0, validateRequest_1.default)(project_validation_1.ProjectValidationSchema.createZodSchema), project_controller_1.ProjectController.createProject);
router.get("/", projectCacheMiddleware_1.default.all, project_controller_1.ProjectController.getAllProjects);
router.get("/my-projects/:userId", projectCacheMiddleware_1.default.myProjects, project_controller_1.ProjectController.myProjects);
router.get("/assigned-projects/:memberId", projectCacheMiddleware_1.default.assignedProjects, project_controller_1.ProjectController.assignedProjects);
router.patch("/update/:id", (0, validateRequest_1.default)(project_validation_1.ProjectValidationSchema.updateZodSchema), project_controller_1.ProjectController.updateProject);
router.get("/single/:id", project_controller_1.ProjectController.getSingleProjectById);
router.delete("/delete/:id", project_controller_1.ProjectController.deleteProject);
router.post("/add-member/:projectId/:memberId", project_controller_1.ProjectController.addMember);
router.post("/remove-member/:projectId/:memberId", project_controller_1.ProjectController.removeMember);
router.post("/send-leave-request/:projectId/:memberId", project_controller_1.ProjectController.sendLeaveRequest);
router.post("/cancel-leave-request/:projectId/:memberId", project_controller_1.ProjectController.cancelLeaveRequest);
router.post("/reject-leave-request/:projectId/:memberId", project_controller_1.ProjectController.rejectLeaveRequest);
router.post("/accept-leave-request/:projectId/:memberId", project_controller_1.ProjectController.acceptLeaveRequest);
exports.ProjectRoutes = router;
