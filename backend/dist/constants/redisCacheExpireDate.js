"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheExpireDates = void 0;
exports.cacheExpireDates = {
    minutes: {
        5: 300,
        10: 600,
        30: 1800,
    },
    hours: {
        1: 3600,
        6: 21600,
        12: 43200,
    },
    days: {
        1: 86400,
        3: 259200,
        10: 864000,
        15: 1296000,
        30: 2592000,
    },
    months: {
        1: 2592000,
        6: 2592000 * 30 * 6,
    },
    years: {
        1: 31536000,
        6: 31536000 * 6,
    },
};
