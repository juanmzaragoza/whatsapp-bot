import { addKeyword, EVENTS } from "@builderbot/bot";
import { SelectedProvider } from "~/provider";
import { welcomeFlow } from "./welcome.flow";
import { LANGS } from "./config";

const numberPattern = /\d+/g;

export const selectLangFlow = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAnswer(
    [
      "👋 *Hola! Soy Sebas, de The Host.*",
      "",
      "Te voy a ayudar a agilizar y evacuar todas las dudas que tengas sobre Puerto Iguazú 🤗",
      "",
      "==========================",
      "",
      "👋 *Hi! I'm Sebas from The Host.*",
      "",
      "I'm here to help speed things up and answer all your questions about Puerto Iguazú 🤗",
    ])
  .addAction(async (ctx, { state, gotoFlow })=> {
    const lang = state.get('language');
    console.log("[DEBUG] selectLangFlow.ts ~ state.get('language') -> ", lang);
    if(lang) {
      return gotoFlow(welcomeFlow);
    }
  })
  .addAnswer(
    [
      "Pero primero, selecciona el lenguaje que prefieras",
      "",
      "*[1]* 🇦🇷 Español",
      "*[2]* 🇬🇧 Inglés",
      "",
      "==========================",
      "",
      "👋 *Hi! I'm Sebas from The Host.*",
      "",
      "I'm here to help speed things up and answer all your questions about Puerto Iguazú 🤗",
      "",
      "But first, select your preferred language",
      "",
      "*[1]* 🇦🇷 Spanish",
      "*[2]* 🇬🇧 English"
    ],
    { capture: true }
  )
  .addAction(async (ctx, { state, gotoFlow, fallBack })=> {
    const txt = ctx.body;
    const match = txt.match( numberPattern );
    console.log("[DEBUG] selectLangFlow.ts ~  txt, match -> ", txt, match);
    if(match && match[0] && LANGS[match[0]]) {
      await state.update({ language: match[0] });
      return gotoFlow(welcomeFlow);
    } else{
      return fallBack('🇦🇷 Seleccioná alguno de los lenguajes proporcionados!\n\n🇬🇧 Please select one of the provided languages!');
    }
  });