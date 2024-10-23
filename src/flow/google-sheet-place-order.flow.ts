import { addKeyword, EVENTS } from "@builderbot/bot";
import { SelectedProvider } from "~/provider";
import GoogleSheetService from "~/services/sheets";
import { BACK_ANSWER, SHEET_CLIENTS_HEADERS, SHEET_CLIENTS_TITLE } from "./config";
import { getDateNow, todaySheetName } from "./helper/utils.heper";

const googleSheetService = new GoogleSheetService(process.env.GOOGLE_SHEET_ID);

export const googleSheetPlaceOrderFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
   "🕑 Un momento por favor..."
  )
  .addAction(async (ctx, { state, flowDynamic, gotoFlow }) => {
    // get client
    const phone = ctx.from;
    const clients = await googleSheetService.retrieveData({ sheetTitle: SHEET_CLIENTS_TITLE });
    const client = clients.find(client => client[2] === phone);
    console.log("[DEBUG] Find clients: ", client);
    if(!client) {
      return gotoFlow(registerClientFlow);
    } else{
      let clientData = {};
      Object.keys(SHEET_CLIENTS_HEADERS).forEach(key =>
        clientData = { ...clientData, [SHEET_CLIENTS_HEADERS[key]]: client[key] }
      )
      await state.update({ ...clientData });
      await flowDynamic(`Hola *${clientData["Nombre y apellido"]}*, es un gusto atenderte 🤗`);
      return gotoFlow(placeProductFlow);
    }
  })

export const registerClientFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
    [
      "Primero, voy a necesitar que ingreses tu *correo electrónico* (podes omitir este paso): ", 
    ],
    { capture: true },
    (async (ctx, { state, flowDynamic }) => {
      const email = ctx.body;
      const phone = ctx.from;
      await state.update({ 'Email': email, 'Telefono': phone });
      await flowDynamic(`Tu correo es ${email? email : "-"} y tu número es +${phone}`)
    })
  )
  .addAnswer(
    [
      "Ahora voy a necesitar que me indiques tu *nombre y apellido*: ", 
    ],
    { capture: true },
    (async (ctx, { state, flowDynamic, gotoFlow }) => {
      // update state
      const name = ctx.body;
      await state.update({ 'Nombre y apellido': name });
      const data = state.getMyState();
      //get all client data
      await googleSheetService.saveData({ sheetTitle: SHEET_CLIENTS_TITLE, data });
      // response
      await flowDynamic(`Hola *${name}*, es un gusto atenderte`);
      await flowDynamic(`Ahora comenzaremos a crear tu orden`);
      return gotoFlow(placeProductFlow);
    })
  )

export const placeProductFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
    [
      "Te pido que me indiques que productos y que cantidad necesitas de cada producto",
      "", 
      "Para esto, podes hacerlo de la siguiente manera (podes copiar y pegar este listado 😉):", 
      "*pan 1kg*", 
      "*bizcochitos 1kg*", 
      "*medialunas 48*", 
      "",
      "Cuando termine de cargar su orden, tiene que enviarme  el mensaje *listo*", 
      BACK_ANSWER
    ],
    { capture: true },
    async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
      const order = ctx.body;
      // finish the order
      if(order.trim().toLowerCase().includes("listo")) {
        // validate that order is not empty
        const order = state.get('order');
        if(!order.length){
          return fallBack('Ingresá al menos un producto para poder tomar tu pedido');
        } else{
          // save order
          return gotoFlow(saveProductFlow);
        }
      } else{
        console.log("txt", order.split("\n"));
        await state.update({ 
          order: [ 
            ...(state?.get('order') ?? []), 
            ...order.split("\n") 
          ] 
        });
        console.log("state.get('order') -> ", state.get('order'))
        await flowDynamic(
          `Hasta el momento, esto es lo que vas a pedir:\n${state.get('order')
            .map(line => `*${line}*`)
            .join("\n")
          }`
        );
        return fallBack('Agregá maś productos si lo necesitas. En caso de finalizar,escribí la palabra *listo*');
      }
    }
  );

export const saveProductFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
    [
      "Hay algún otro comentario que quieras dejarnos para tu pedido (*hora de entrega/forma de entrega/etc*) 🤔: "
    ],
    { capture: true },
    async (ctx, { state, flowDynamic, endFlow }) => {
      const extra = ctx.body;
      // save order
      const dateToday = todaySheetName();
      const order = await state.get('order').join("\n");
      const row = await googleSheetService.saveData({ 
        sheetTitle: dateToday, 
        createSheetByName: true,
        data: {
          "telefono": ctx.from,
          "cliente": state.get('Nombre y apellido'),
          "dia": getDateNow(),
          "pedido": order,
          "observaciones": extra
        }, 
      });
      if(!row) {
        await flowDynamic(`Tu pedido no pudo ser guardado 😔. Comunicate con Leo directamente `);
      } else{
        await flowDynamic(`Tu pedido acaba de ser guardado 🥳`);
      }
      await state.update({ order: [] }); 
      return endFlow(`Gracias por comunicarte con nosotros ☺️`);
    })