import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getDatabase } from '../../lib/notion/get-database';

export default function Post({ posts }) {
  const router = useRouter();
  const { post } = router.query;
  return <h1>Post:{post}</h1>;
}

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticProps: GetStaticProps = async () => {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  const paths = database.map((data) => `posts/${data.id}`);
  return {
    paths,
    fallback: false,
  };
};
