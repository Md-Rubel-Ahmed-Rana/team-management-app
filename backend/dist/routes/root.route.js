"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoutes = void 0;
const express_1 = require("express");
const user_route_1 = require("./user.route");
const team_route_1 = require("./team.route");
const invitation_route_1 = require("./invitation.route");
const payment_route_1 = require("./payment.route");
const plan_route_1 = require("./plan.route");
const project_route_1 = require("./project.route");
const task_route_1 = require("./task.route");
const teamLeaveRequest_route_1 = require("./teamLeaveRequest.route");
const projectLeaveRequest_route_1 = require("./projectLeaveRequest.route");
const mail_route_1 = require("./mail.route");
const message_route_1 = require("./message.route");
const notification_route_1 = require("./notification.route");
const auth_routes_1 = require("./auth.routes");
const jwt_1 = require("lib/jwt");
const file_route_1 = require("./file.route");
const router = (0, express_1.Router)();
router.use("/user", user_route_1.UserRoutes);
router.use("/auth", auth_routes_1.AuthRoutes);
router.use("/team", jwt_1.JwtInstance.verifyToken, team_route_1.TeamRoutes);
router.use("/invitation", jwt_1.JwtInstance.verifyToken, invitation_route_1.InvitationRoutes);
router.use("/payment", jwt_1.JwtInstance.verifyToken, payment_route_1.PaymentRoutes);
router.use("/plan", plan_route_1.PlanRoutes);
router.use("/project", jwt_1.JwtInstance.verifyToken, project_route_1.ProjectRoutes);
router.use("/task", jwt_1.JwtInstance.verifyToken, task_route_1.TaskRoutes);
router.use("/leave-team", jwt_1.JwtInstance.verifyToken, teamLeaveRequest_route_1.TeamLeaveRequestRoutes);
router.use("/leave-project", jwt_1.JwtInstance.verifyToken, projectLeaveRequest_route_1.ProjectLeaveRequestRoutes);
router.use("/mail", mail_route_1.MailRoutes);
router.use("/message", jwt_1.JwtInstance.verifyToken, message_route_1.MessageRoutes);
router.use("/cloudinary", file_route_1.FileUploadRoutes);
router.use("/notification", jwt_1.JwtInstance.verifyToken, notification_route_1.NotificationRoutes);
exports.RootRoutes = router;
