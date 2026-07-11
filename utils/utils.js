

export const section = (name, model) => {

    console.log("\n" + "=".repeat(60))
    console.log(name)
    console.log("=".repeat(60) + "\n")

    model.status === 'fulfilled' ? console.log(model.value) : console.log("Error: ", model.reason.message)

}