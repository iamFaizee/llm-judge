import { askGemini } from "./models/gemini.js"
import { judgeResponse } from "./models/judge.js"
import { askGpt } from "./models/openai.js"
import { askOpenRouter } from "./models/openrouter.js"
import readline from 'readline/promises'
import { section } from "./utils/utils.js"


async function main(input) {
    try {
        const results = await Promise.allSettled([
            askGpt(input),
            askGemini(input),
            askOpenRouter(input)
        ])


        const gpt = results[0];
        const gemini = results[1];
        const nemotron = results[2]


        const answers = {
            gpt: gpt.status === 'fulfilled' ? gpt.value : "",
            gemini: gemini.status === 'fulfilled' ? gemini.value : "",
            nemotron: nemotron.status === 'fulfilled' ? nemotron.value : "",
        }

        console.log("\n")
        
        // console.log("\n\n" + "=".repeat(60))
        // console.log("GPT")
        // console.log("=".repeat(60) + "\n")
        // gpt.status === 'fulfilled' ? console.log(gpt.value) : console.log("Error: ", gpt.reason || gpt.reason.message)

        section("GPT", gpt)


        // console.log("\n" + "=".repeat(60))
        // console.log("Gemini")
        // console.log("=".repeat(60) + "\n")
        // gemini.status === 'fulfilled' ? console.log(gemini.value) : console.log("Error: ", gemini.reason || gemini.reason.message)

        section("Gemini", gemini)

        // console.log("\n" + "=".repeat(60))
        // console.log("Nemotron")
        // console.log("=".repeat(60) + "\n")
        // nemotron.status === 'fulfilled' ? console.log(nemotron.value) : console.log("Error: ", nemotron.reason || nemotron.reason.message)

        section("Nemotron", nemotron)

        const judge = await judgeResponse({
            question: input,
            answers: answers
        })

        // console.log("\nFINAL-JUDGMENT:\n", JSON.stringify(judge, null, 2))

        return judge
    } catch (error) {
        console.error("Error in main: ", error)
        throw error
    }
}

// main("Explain in short recursion in simple way")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = await rl.question(`Ask anything for best answer: `)

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

let i = 0;

const spinner = setInterval(() => {
    process.stdout.write(`\r${frames[i++ % frames.length]} Generating best answer...`);
}, 100);

const result = await main(input)

clearInterval(spinner);
process.stdout.clearLine(0);
process.stdout.cursorTo(0);

// console.log("FINAL-JUDGMENT:\n");
// console.log(JSON.stringify(result, null, 2));

console.log("\n" + "=".repeat(60))
console.log("FINAL JUDGEMENT:")
console.log("=".repeat(60) + "\n")

console.log(`Winner: \n${result.winner}\n`)

console.log(`Reason: \n${result.reason}\n`)

console.log("\nBest Answer:")
console.log(result.response + "\n\n")

rl.close()