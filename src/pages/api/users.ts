import { NextApiRequest, NextApiResponse} from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name: 'Leandro'},
        {id: 2, name: 'Valeria'},
        {id: 3, name: 'Rodrigo'},
        {id: 4, name: 'Luiza'},
    ]

    return response.json(users)
}