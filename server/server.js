import OpenAI from "openai";
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

//Instantiating OpenAi
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


//Setting up Express
const app = express()
app.use(cors())
app.use(express.json())


//Setting up the routes
//get Route
app.get('/', (req, res)=>{
    res.status(200).send({
        message:'Hello, this works fine'
    })
})


//Post Route
app.post('/', async(req, res)=>{
    try{
        const prompt = req.body.prompt
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        })
        res.status(200).send({
            bot: response.choices[0].text
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({error})
    }
})

//Listen
app.listen(3000, ()=>{
    console.log("Server is running on Port http://localhost:3000")
})