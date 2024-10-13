import { createFlow } from '@builderbot/bot';
import { flowHumanNewChat } from './human.flow';
import { welcomeFlow } from './welcome.flow';
import { infoFlow } from './info.flow';
import { worksFlow } from './works.flow';
import { servicesFlow } from './services.flow';
import { arrangeMeetingFlow } from './arrange-meeting.flow';
import { defaultFlow } from './default.flow';

export const adapterFlow = createFlow([
  welcomeFlow,
  infoFlow,
  worksFlow,
  servicesFlow,
  arrangeMeetingFlow,
  flowHumanNewChat,
  defaultFlow
]);