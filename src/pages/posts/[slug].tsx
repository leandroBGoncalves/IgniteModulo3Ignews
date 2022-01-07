import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"
import moment from "moment"
import Head from "next/head"

import styles from './post.module.scss'

interface PostsProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updatedAt: string,
    }
}

export default function Post({post}: PostsProps) {
    return (
        <>
         <Head>
             <title>{post.title} | Ignews</title>
         </Head>

         <main className={styles.container}>
             <article className={styles.post}>
                 <h1>{post.title}</h1>
                 <time>{post.updatedAt}</time>
                 <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}} />
             </article>
         </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({ req })
    const { slug } = params;
    
    //if (!session) {       
    //}

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: moment(response.last_publication_date)
        .locale("pt-BR")
        .format("DD MMMM YY"),
    }

    return {
        props: {
            post,
        }
    }
}