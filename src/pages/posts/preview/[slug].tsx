import { useEffect } from "react";
import { GetStaticProps } from "next"
import { session, useSession } from "next-auth/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../../services/prismic"
import Link from 'next/link';
import moment from "moment"
import Head from "next/head"

import styles from '../post.module.scss'
import { useRouter } from "next/router";

interface PostsPreviewProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updatedAt: string,
    }
}

export default function PostPreview({post}: PostsPreviewProps) {
    const [ session ] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
         <Head>
             <title>{post.title} | Ignews</title>
         </Head>

         <main className={styles.container}>
             <article className={styles.post}>
                 <h1>{post.title}</h1>
                 <time>{post.updatedAt}</time>
                 <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html: post.content}} />
                 <div className={styles.continueReading}>
                    Wanna continue reading?
                    <Link href='/'>
                        <a href="">Subscribe now 🤗 </a>
                    </Link>
                 </div>
             </article>
         </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    //console.log(response)
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: moment(response.last_publication_date)
        .locale("pt-BR")
        .format("DD MMMM YY"),
    }

    return {
        props: {
            post,
        },
        redirect: 60 * 30, //30 minutos
    }
}