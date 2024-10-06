import { getFlowWithoutSubFlow } from './helper/flows.helper';

export const flowArrangeMeeting = getFlowWithoutSubFlow({ 
  messages: [
    "Si prefieres discutir tu proyecto en detalle, podemos coordinar una llamada o reunión. ¿Te gustaría agendar una?",
    "",
    "Podés reservar un espacio aquí: https://calendly.com/juanmanuelzaragoza/30min"
  ]});