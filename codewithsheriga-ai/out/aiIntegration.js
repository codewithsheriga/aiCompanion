"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIPoweredBotResponse = void 0;
const axios_1 = require("axios");
async function getAIPoweredBotResponse(prompt) {
    const apiUrl = "http://localhost:3000";
    try {
        const response = await axios_1.default.post(apiUrl, { prompt });
        return response.data.bot.trim;
    }
    catch (error) {
        console.error("Error Fetching response:", error);
        return 'Something Went wrong';
    }
}
exports.getAIPoweredBotResponse = getAIPoweredBotResponse;
//# sourceMappingURL=aiIntegration.js.map