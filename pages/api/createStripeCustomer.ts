import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabase } from '@/utils/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.query.API_ROUTE_SEC !==  process.env.API_ROUTE_SEC){
        return res.status(401).send('Not authorized to call api!')
    }

    // Create stripe customer
    const stripe = new Stripe(
        `${process.env.STRIPE_KEY}`,
        {
            apiVersion: '2022-11-15',
        }
    )
    const customer = await stripe.customers.create({
        email: req.body.record.email,
    })

    // Add customer id to supabase DB
    await supabase
        .from("profile")
        .update({
            stripe_customer: customer.id
        })
        .eq("id", req.body.record.id); // update the row where id matches the request id (user should be logged in)

    res.send({ message: `Stripe customer created ${customer.id} by ${req.body.record.id}` })
}

export default handler;