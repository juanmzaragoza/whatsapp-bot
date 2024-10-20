import "dotenv/config";
import { createBot } from '@builderbot/bot';
import { adapterFlow as flow } from './flow';
import { provider } from './provider';
import { adapterDB as database } from './database';
import { serveFile, servePublic } from './server.helper';

const PORT = process.env.PORT ?? 3008;

const main = async () => {

  // start BOT
  const { handleCtx, httpServer } = await createBot(
    {
      flow,
      provider,
      database,
    }
  );

  // serve static files
  provider.server.use(servePublic);
  provider.server.use(serveFile);

  // expose API
  provider.server.post(
    '/v1/messages',
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body
      await bot.sendMessage(number, message, { media: urlMedia ?? null })
      return res.end('sended')
    })
  );

  provider.server.post(
    '/v1/register',
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body
      await bot.dispatch('REGISTER_FLOW', { from: number, name })
      return res.end('trigger')
    })
  );

  provider.server.post(
    '/v1/samples',
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body
      await bot.dispatch('SAMPLES', { from: number, name })
      return res.end('trigger')
    })
  );

  provider.server.post(
    '/v1/blacklist',
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body
      if (intent === 'remove') bot.blacklist.remove(number)
      if (intent === 'add') bot.blacklist.add(number)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ status: 'ok', number, intent }))
    })
  );

  httpServer(+PORT);
}

main();
