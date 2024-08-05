"use strict";

class GenerateQA {
  constructor(inference) {
    this.inference = inference;
  }

  _parseQAItems(qaItems) {
    return JSON.parse(qaItems || "{}").questions_answers;
  }

  async process(chunk) {
    const prompt = this.inference.createPromptMessage(
      `
         You are an AI language model that generates QA pairs from a given text chunk. For each question, you should create an answer that includes the question within it. Format the output as a JSON object with the following structure:

  {
    questions_answers: [
      {
        "question": "Your first question here?",
        "answer": "Your answer here, which should include the question: Your first question here?"
      },
      {
        "question": "Your second question here?",
        "answer": "Your answer here, which should include the question: Your second question here?"
      }
    ]
  }

  Text chunk:
  """
  ${chunk.text}
  """

  Generate the JSON output.
  `
    );
    const res = await this.inference.execute([prompt], {
      response_format: {
        type: "json_object"
      },
      max_tokens: 4096
    });

    return {
      prompt: prompt,
      usage: res.usage,
      content: this._parseQAItems(res.choices[0].message.content)
    };
  }
}

module.exports = GenerateQA;
