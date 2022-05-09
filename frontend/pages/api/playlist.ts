// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getAPIInstance from '../../utils/API'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = await getAPIInstance()
  api
    .getPlaylist('VLPLTw3BBwcLBjG-4fernx2Xt-GHdYMPYAFM')
    .then((result: any) => {
      res.status(200).json(result)
    })
}
