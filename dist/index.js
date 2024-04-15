"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServe = void 0;
const express_1 = __importDefault(require("express"));
// import helmet from 'helmet'
// import cors from 'cors'
const portfinder_1 = require("portfinder");
const os_1 = __importDefault(require("os"));
const getLocalIp = () => {
    const networkInterfaces = Object.entries(os_1.default.networkInterfaces()).reduce((intefaces, [, networkInterfaces = []]) => [
        ...intefaces,
        ...networkInterfaces,
    ], []).filter(({ family, address }) => family === 'IPv4' && ![
        '127.0.0.1',
        '2.0.0.1',
    ].includes(address));
    return networkInterfaces.length > 0 ? networkInterfaces[0].address : '127.0.0.1';
};
const createServe = () => {
    return new Promise((resolve) => {
        (0, portfinder_1.getPortPromise)().then((port) => {
            const root = process.cwd();
            const app = (0, express_1.default)();
            // app.use(helmet())
            // app.use(cors())
            app.use(express_1.default.static(root));
            app.listen(port, () => {
                resolve({
                    url: `http://${getLocalIp()}:${port}`,
                });
            });
        });
    });
};
exports.createServe = createServe;
