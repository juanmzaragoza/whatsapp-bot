import { createProvider } from '@builderbot/bot';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';

export const provider = createProvider(Provider);