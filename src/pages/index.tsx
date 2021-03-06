import { GetServerSideProps } from 'next';

import styles from './home.module.scss';

import Head from "next/head";
import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SubscribButton';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  

  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>
      <main className={styles.HomeContainer}>
        <section className={styles.Hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br /> the <span>React</span> world. </h1>
          <p>get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JFiN9IZGW2gaDppPQP7gbdk', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    }
  }
}