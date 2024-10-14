import { getFlowWithoutSubFlow } from './helper/flows.helper';

export const moreDaysFlow = getFlowWithoutSubFlow({ 
  messages: [
    "🐊 *Güirá Oga:* Es un refugio de animales que invita a reflexionar sobre la necesidad de proteger la fauna silvestre y su entorno. *(Horario: 9 a 16.30h)*",
    "",
    "🛖 *Aripuca:* Construído a base de árboles rescatados, inspirado en una típica trampa de los pueblos guaraníes. *(Horario: 9 a 18h)*",
    "",
    "💦 *Salto Mbocay:* Tres cascadas naturales y una densa vegetación. *(Horario: 9 a 16h)*",
    "",
    "🚤 *Paseo en catamarán:* Navegación por los ríos Iguazú y Paraná durante el atardecer, para disfrutarlo de un modo distinto.",
    "",
    "🧗🏻‍♀️ *FlyPark:* Juego de aventura de cinco niveles. Puentes colgantes y tirolesa. *(Horario: 10 a 18h)*",
    "",
    "🧊 *IceBar:* Duración 30 min. Barra libre y Djs en vivo en un bar de hielo. *(Horario: 15 a 23h)*",
    "",
  ]});