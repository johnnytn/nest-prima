"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (password, saltOrRounds = 10) => {
    return await bcrypt.hash(password, saltOrRounds);
};
exports.hashPassword = hashPassword;
const generatePassword = (password) => {
    const randomNumber = password || Math.random().toString(16);
    return randomNumber.substring(2, randomNumber.length);
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=utils.js.map