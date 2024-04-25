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

const model = "gpt-4";

// async function prompt(input, options) {
//   openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
//   const content = input.text.trim();
//   const messages = [{ role: "user", content: content }];
//   const { data } = await openai.post("chat/completions", {
//     model: model,
//     messages,
//   });
//   const response = data.choices[0].message.content.trim();
//   // if holding shift, copy just the response. else, paste the last input and response.
//   if (popclip.modifiers.shift) {
//     popclip.copyText(response);
//   } else {
//     popclip.pasteText(response);
//   }
//   return null;
// }

async function rewrite(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content =
    "I want you to act as an English spelling corrector, only reply the correction, the improvements and nothing else, do not write explanations. improve the following sentence using BBC english: \n\n" +
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

async function summarize(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content =
    "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. avoid unnecessary details or tangential points: \n\n" +
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

async function improveText(input, options) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const content =
    "I want you to act as an English spelling corrector and improver. Keep the meaning the same, but make them more business friendly, avoid complex words and verbs, use BBC english. I want you to only reply the correction, the improvements and nothing else, do not write explanations. Correct and improve the following sentence: \n\n" +
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
  // {
  //   title: "Execute the selected prompt",
  //   // after: "paste-result",
  //   code: prompt,
  //   icon: "./prompt.svg",
  // },
  {
    title: "Improve the text",
    //after: "copy-result",
    code: improveText,
    icon: "symbol:pencil.and.outline",
  },
  {
    title: "Correct the text",
    after: "copy-result",
    code: rewrite,
    icon: "./spell-check.svg",
  },
  {
    title: "Summarize the text",
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
