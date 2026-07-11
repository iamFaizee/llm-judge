import OpenAI from "openai";
import 'dotenv/config'
import { prompt } from "../prompt/prompt.js";

const openai = new OpenAI()

export async function judgeResponse({ question, answers }) {
    const judgePrompt = prompt(question, answers)

    try {
        const response = await openai.responses.create({
            model: 'gpt-4o',
            input: judgePrompt
        })

        // console.log("judge-response: ", response?.output_text)

        return JSON.parse(response?.output_text);

    } catch (error) {
        // console.error("Error in judge-response: ", error)
        // throw error
        throw new Error(error?.message)
    }
}