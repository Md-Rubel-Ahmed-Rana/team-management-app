"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProjectDTO = void 0;
const user_entity_1 = require("@/entities/user.entity");
const classes_1 = require("@automapper/classes");
const get_1 = require("../team/get");
const get_2 = require("../user/get");
class GetProjectDTO {
    constructor() {
        this.members = [];
    }
}
exports.GetProjectDTO = GetProjectDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetProjectDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetProjectDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetProjectDTO.prototype, "category", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], GetProjectDTO.prototype, "user", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => get_1.GetTeamDTO),
    __metadata("design:type", get_1.GetTeamDTO)
], GetProjectDTO.prototype, "team", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [get_2.GetUserDTO]),
    __metadata("design:type", Array)
], GetProjectDTO.prototype, "members", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetProjectDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetProjectDTO.prototype, "updatedAt", void 0);
