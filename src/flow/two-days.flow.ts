import { getFlowWithoutSubFlow } from './helper/flows.helper';

export const twoDaysFlow = getFlowWithoutSubFlow({ 
  messages: [
    "*¿Qué atracciones principales puedo visitar si me quedo 2 días?*",
    "",
    "Si el día anterior fuiste a Cataratas lado argentino 🇦🇷 y te quedó algo pendiente, se puede aprovechar el descuento del 50% que ofrece el Parque y completar la actividad.",
    "",
    "Si fuiste al lado de Brasil 🇧🇷, se puede visitar el lado argentino de las cataratas.",
    "",
  ]});