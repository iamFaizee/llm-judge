import { OpenRouter } from '@openrouter/sdk'
import 'dotenv/config'

const openRouterClient = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
})

export async function askOpenRouter(input) {
    try {
        const response = await openRouterClient.chat.send({
            chatRequest: {
                model: "nvidia/nemotron-3-ultra-550b-a55b:free",
                // model: "openai/gpt-oss-120b:free",
                messages: [
                    {
                        role: "user",
                        content: `${input}. "Don't return Markdowns such as **, #, bullets, code fences, and tables. Return only plain text`
                    }
                ]
            }
        })

        // console.log("openrouter output: ", response.choices[0]?.message.content)

        return response.choices[0]?.message.content;

    } catch (error) {
        // console.error("Error askOpenRouter: ", error)
        // throw error
        throw new Error(error?.message)
    }
}