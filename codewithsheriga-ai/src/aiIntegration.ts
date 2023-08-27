import axios from "axios";



async function getAIPoweredBotResponse(prompt: string): Promise<string>{
    const apiUrl= "http://localhost:3000"

    try{
        const response = await axios.post(apiUrl, {prompt})
        return response.data.bot.trim();
    }
    catch(error){
        console.error("Error Fetching response:", error)
        return 'Something Went wrong'

    }
}

export { getAIPoweredBotResponse }