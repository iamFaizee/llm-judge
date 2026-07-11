import {GoogleGenAI} from '@google/genai'
import 'dotenv/config'

const geminiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function askGemini(input){
    try {
        const response = await geminiClient.interactions.create({
            model: 'gemini-2.5-flash',
            input: input
        })

        // console.log("Gemini output: ", response.output_text)

        return response.output_text

    } catch (error) {
        // console.error("Error askGemini: ", error)
        throw new Error(error?.message)
    }
}