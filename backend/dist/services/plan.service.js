"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanService = void 0;
const plan_model_1 = require("@/models/plan.model");
const mapper_1 = require("../mapper");
const plan_entity_1 = require("@/entities/plan.entity");
const get_1 = require("@/dto/plan/get");
const create_1 = require("@/dto/plan/create");
class Service {
    getPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield plan_model_1.Plan.find({});
            const mappedData = mapper_1.mapper.mapArray(result, plan_entity_1.PlanEntity, get_1.GetPlanDTO);
            return mappedData;
        });
    }
    createPlan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield plan_model_1.Plan.create(data);
            const mappedData = mapper_1.mapper.map(result, plan_entity_1.PlanEntity, create_1.CreatePlanDTO);
            return mappedData;
        });
    }
    getSinglePlan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield plan_model_1.Plan.findById(id);
            const mappedData = mapper_1.mapper.map(result, plan_entity_1.PlanEntity, get_1.GetPlanDTO);
            return mappedData;
        });
    }
}
exports.PlanService = new Service();
