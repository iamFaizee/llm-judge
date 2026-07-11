# Self-Consistency LLM

Self-Consistency LLM is a lightweight command-line tool that sends a single user question to multiple LLM providers, compares their responses, and uses a self-consistency style flow to pick the most reliable answer.

## How the project works

1. The user enters a prompt in the terminal.
2. The app sends that prompt to several providers in parallel.
3. Each provider returns an answer.
4. A judging step evaluates the collected responses and produces a final verdict with a winner, reason, and best answer.

## CLI-based or UI-based

This project is completely CLI-based. It runs from the terminal and prompts the user for input directly in the console.

## Models and providers used

The project uses:

- OpenAI GPT models via the OpenAI SDK
- Google Gemini via the Google GenAI SDK
- OpenRouter models via the OpenRouter SDK

The exact model names can be adjusted in the provider files under the models folder.

## Self-consistency flow

The self-consistency approach is implemented by generating multiple candidate answers from different providers and then evaluating them together. Instead of trusting one model blindly, the app gathers several outputs and selects the most convincing one through a consistency-based judging step.

## Fallbacks, error handling, and loading state

The app is designed to be resilient:

- If one provider is unavailable or a specific API key is missing, the app does not stop entirely.
- It continues with the other providers and still tries to produce a result.
- Errors from individual providers are handled gracefully so the app can keep running when possible.
- A loading spinner is shown while the answer is being generated to improve the CLI experience.

## Notes

- No API keys are stored in this repository.
- Environment variables should be used for provider credentials.
- If a particular provider is not configured, the app can still attempt to use the others.
