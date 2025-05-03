import { NextRequest } from 'next/server';
import { HomeAssistant } from 'homeassistant';

export const config = {
  runtime: 'edge',
};

export async function GET(request: NextRequest) {
  const homeAssistant = new HomeAssistant({
    baseUrl: process.env.HOMEASSISTANT_URL,
    accessToken: process.env.HOMEASSISTANT_ACCESS_TOKEN,
  });

  const response = await homeAssistant.getStates();
  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
