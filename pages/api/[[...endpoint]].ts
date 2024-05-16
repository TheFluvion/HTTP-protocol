import { NextApiRequest, NextApiResponse } from 'next';
import getEndpointUrl from '../../utils/url';
import { API_BASE_URL, isDevelopment } from '../../services/constants';

const DEBUG_ENABLED = isDevelopment && false;

const log = (...args: any[]) => {
  // eslint-disable-next-line no-console
  if (DEBUG_ENABLED) console.log(...args);
};

type Data = {
  data: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, query, body, headers } = req;
  const url = getEndpointUrl(API_BASE_URL, query);
  log('URL: ', url);

  try {
    const fetchHeaders = new Headers();
    fetchHeaders.append('Content-Type', 'application/json');
    if (headers?.authorization) {
      fetchHeaders.append('Authorization', headers.authorization);
    }

    switch (method?.toUpperCase()) {
      case 'GET': {
        const resFromBack = await fetch(url, {
          headers: fetchHeaders,
          method,
          mode: 'cors',
        });
        log('RES: ', resFromBack);

        if (resFromBack.status !== 200)
          return res.status(resFromBack.status).json({ data: null });

        const { data } = await resFromBack.json();
        return res.status(200).json({ data });
      }
      case 'POST':
      case 'PUT':
      case 'DELETE': {
        const resFromBack = await fetch(url, {
          headers: fetchHeaders,
          method,
          mode: 'cors',
          body: JSON.stringify(body),
        });
        log('RES: ', resFromBack);

        if (![200, 201].includes(resFromBack.status))
          return res.status(resFromBack.status).json({ data: null });

        const { data } = await resFromBack.json();
        return res.status(200).json({ data: data ?? null });
      }
      default:
        return res.status(405).json({ data: null });
    }
  } catch (error) {
    log('Error: ', error);
    res.status(500).json({ data: null });
  }
};

export default handler;
