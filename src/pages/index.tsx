import styles from './home.module.scss';

import Head from "next/head";

export default function Home() {
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
            <span>for $9.90 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
