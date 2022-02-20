import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';
import PageMain from '../components/PageMain';
import SelectButton from '../components/SelectButton';
import { getDatabase } from '../lib/notion/get-database';
import { getPage } from '../lib/notion/get-page';
import PageList from '../lib/pagenation/PageList';

interface Props {
  title: string;
  date: string;
  tag: string[];
  href: string;
}

export default function Home({ posts }) {
  return (
    <section>
      <Head>
        <title>fwywd Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero />
      <PageMain posts={posts} />
    </section>
  );
}

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticProps: GetStaticProps = async () => {
  const database = await getDatabase(databaseId);
  //database = [{仮ページ3},{仮ページ2},{仮ページ1}・・・]
  return {
    props: {
      posts: database,
    },
    revalidate: 30,
  };
};
