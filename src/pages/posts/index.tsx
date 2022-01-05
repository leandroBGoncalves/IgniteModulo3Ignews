import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import styles from './styles.module.scss';
import moment from 'moment';

type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string,
}

interface PostsProps {
    posts: Post[]
}
export default function Posts({ posts }: PostsProps) {
    return (
        <>
        <Head>
            Posts | Ignews
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post => (
                <a key={post.slug} href="#">
                    <time>{post.updatedAt}</time>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt}</p>
                </a>
                ))}
            </div>
        </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    console.log(JSON.stringify(response, null, 2))

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: moment(post.last_publication_date).locale('pt-BR').format('DD MMMM YY'),
            }
    })
    return {
        props: {
            posts
        }
    }
}