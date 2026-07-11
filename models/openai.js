import OpenAI from 'openai'
import 'dotenv/config'

const openaiClient = new OpenAI()

export async function askGpt(input){
    try {
        const response = await openaiClient.responses.create({
            model: 'gpt-4.1-mini',
            input: input
        })

        // console.log("gpt-output: ", response.output_text)

        return response.output_text

    } catch (error) {
        // console.error('Error asking GPT:', error)
        // throw error
        throw new Error(error?.message)
    }
}