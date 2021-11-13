import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../services/stripe";
import { getSession, session } from "next-auth/client";


export default async ( req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const Session = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: Session.user.email,
            name: Session.user.name,
        })

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [{
                price: 'price_1JFiN9IZGW2gaDppPQP7gbdk', quantity: 1
            }],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUSSES_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })

        return res.status(200).json({ sessionId: checkoutSession.id })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed')
    }
}