import { addKeyword, EVENTS } from "@builderbot/bot";
import { SelectedProvider } from "~/provider";
import GoogleSheetService from "~/services/sheets";
import { BACK_ANSWER, BACK_WORD } from "./config";
import { welcomeFlow } from "./welcome.flow";

//TODO: move this line to a configuration service
const googleSheetService = new GoogleSheetService("1Cd6jeYk3hgq7XPmxRG0L3RV0P5fBztKBQa1rUvqCsgc");
let GLOBAL_STATE = [];
const numberPattern = /\d+/g;

export const googleSheetFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
   "🕑 Estoy consultando las excursiones que tenemos para el día de hoy..."
  )
  .addAction(async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
    
    const menus = await googleSheetService.retrieveData({ sheetNumber: 1 });
    if(menus) {
      let response = "Estos son las excursiones - disponibles en el día de la fecha: \n";
      GLOBAL_STATE = [];
      for (const menu of menus) {
        GLOBAL_STATE.push(menu);
        response = `${response}*[${menus.indexOf(menu)}]* ${menu[0]}\n`;
      }
      await flowDynamic(response);
      return gotoFlow(chooseOptionFlow);
    } else {
      return endFlow("No hay resultados para tu busqueda");
    }
  });

export const chooseOptionFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
    [
      "¿Sobre cuál te interesaría saber más?", 
      BACK_ANSWER
    ],
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      const txt = ctx.body;
      // back the main menu
      if(txt.trim().toLowerCase().includes(BACK_WORD)) {
        return gotoFlow(welcomeFlow);
      } else{
        return await chooseTour({ txt, flowDynamic, fallBack, gotoFlow });
      }
    }
  );

const chooseTour = async ({ txt, flowDynamic, fallBack, gotoFlow }) => {
  const match = txt.match( numberPattern );
  if(match) {
    const choice = match[0];
    if(GLOBAL_STATE[choice]) {
      let response = `*${GLOBAL_STATE[choice][0]}* \n\n`;
      response = response + `${GLOBAL_STATE[choice][1]} \n\n`;
      if (GLOBAL_STATE[choice][2]) {
        response = response + `*PRECIOS*\n\n${GLOBAL_STATE[choice][2]} \n\n`;
      }
      if (GLOBAL_STATE[choice][3]) {
        response = response + `*OBSERVACIONES*\n\n${GLOBAL_STATE[choice][3]} \n\n`;
      }
      await flowDynamic(response);
      return gotoFlow(chooseOptionFlow);
    }
  }
  return fallBack('Ups! Pasó algo!\nIntentalo de nuevo');
}