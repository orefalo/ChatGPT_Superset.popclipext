// #popclip extension for ChatGPT
// name: ChatGPT Quick Actions
// icon: iconify:logos:openai-icon
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Obtain API key from https://platform.openai.com/account/api-keys'
// }]

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;

const openai = require("axios").create({
  baseURL: "https://api.openai.com/v1/",
});

const model = "gpt-3.5-turbo";

async function prompt(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content = input.text.trim();
  const messages = [{ role: "user", content: content }];
  const { data } = await openai.post("chat/completions", {
    model: model,
    messages,
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

async function rewrite(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content =
    "Rewrite this using an academic tone: \n\n" + input.text.trim();
  const messages = [{ role: "user", content: content }];
  const { data } = await openai.post("chat/completions", {
    model: model,
    messages,
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

async function summarize(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content =
    "Summarize the following text as concise as possible: \n\n" +
    input.text.trim();
  const messages = [{ role: "user", content: content }];
  const { data } = await openai.post("chat/completions", {
    model: model,
    messages,
  });
  return data.choices[0].message.content.trim();
}

async function correctFrench(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content = "Corrige mon Francais: \n\n" + input.text.trim();
  const messages = [{ role: "user", content: content }];
  const { data } = await openai.post("chat/completions", {
    model: model,
    messages,
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

async function correctGrammar(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content =
    "I want you to act as an English spelling corrector and improver, in which I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning the same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. Correct and improve the following sentence: \n\n" +
    input.text.trim();
  const messages = [{ role: "user", content: content }];
  const { data } = await openai.post("chat/completions", {
    model: model,
    messages,
  });

  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

exports.actions = [
  {
    title: "Execute the selected prompt",
    // after: "paste-result",
    code: prompt,
    icon: "./prompt.svg",
  },
  {
    title: "Check Grammar",
    //after: "copy-result",
    code: correctGrammar,
    icon: "./spell-check.svg",
  },
  {
    title: "Rewrite using an academic tone",
    after: "copy-result",
    code: rewrite,
    icon: "symbol:pencil.and.outline",
  },
  {
    title: "Summarize the selected text",
    after: "preview-result",
    code: summarize,
    icon: "symbol:arrow.down.right.and.arrow.up.left",
  },
  {
    title: "Corrige mon francais",
    //after: "copy-result",
    code: correctFrench,
    icon: "./FRA.svg",
  },
];
