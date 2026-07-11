

export const prompt = (question, answers) => {
    return `
    You are an AI judge or A self-consistency Answer Engine.

    A user asked the following questions:

    "${question}"

    Three AI models answer it.

    A) GPT
    "${answers.gpt}"

    B) Gemini
    "${answers.gemini}"

    C) NVidia Nemotron 3 ultra
    "${answers.nemotron}"

    Now evaluate these responses based on:
    - completeness
    - compare outputs
    - identify the strongest parts
    - accuracy
    - clarity
    - correctness
    - helpfulness

    Do not return A, B, or C.
    return proper name of the model.

    Do not wrap the JSON in markdown.

    return only a valid json structure like this:
    {
        "winner": "GPT | Gemini | Nemotron,
        "reason": "why this model is winner",
        "response": "Create the winning response into plain text. The winner response text must be a refined output after analyzing all of models responses and the winner response should not simply a copy response. Return plain text only. Remove all markdown formatting such as **, #, bullets, code fences, and tables while preserving the meaning. "
    }
`}