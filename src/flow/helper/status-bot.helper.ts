export const isBotEnabledForThisUser = (state: any) => {
  const botStatusForThisUser = state.get('botStatusForThisUser');
  console.debug(`[DEBUG] isBotEnabledForThisUser() ${botStatusForThisUser}`);
  return botStatusForThisUser;
}

export const changeBotStatusForThisUser = async (state, status) => {
  await state.update({ botStatusForThisUser: status });
}

export const isBotEnabledGlobally = (globalState: any) => {
  const botStatus = globalState.get('botStatus');
  console.debug(`[DEBUG] isBotEnabledGlobally() ${botStatus}`);
  return botStatus;
}

export const changeBotStatusGlobally = async (state, status) => {
  await state.update({ botStatus: status });
}