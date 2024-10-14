import { getFlowWithoutSubFlow } from './helper/flows.helper';

export const moreTimeFlow = getFlowWithoutSubFlow({ 
  messages: [
    "*¿Qué otras cosas puedo hacer si tengo más tiempo/al regresar del Parque?*",
    "",
    "*Hito Tres fronteras:* Es un paseo costero y atracción turística donde confluyen el río Paraná y el río Iguazú, mientras se puede observar la frontera de tres países a la vez (Argentina, Brasil y Paraguay)",
    "",
    "*Mirador Escondido:* Es un parque junto al río, ideal para observar el atardecer.",
    "",
  ]});