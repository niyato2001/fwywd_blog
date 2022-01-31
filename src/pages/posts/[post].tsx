import { data } from 'autoprefixer';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getDatabase } from '../../lib/notion/get-database';
import { getPage } from '../../lib/notion/get-page';

export default function Post({posts}) {
  const router = useRouter();
  const {post} = router.query;
  return <h1>このページは{post}のページです。</h1>;
}
const databaseId = process.env.NOTION_DATABASE_ID;
const pageId = process.env.NOTION_PAGE_ID;
export const getStaticProps: GetStaticProps = async ({params}) => {
  const page = await getPage(pageId);
  return {
    props: {
      posts: page,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  const paths = database.map((post) => ({
    params: { post: post.id.toString() }}));
  return {
    paths,
    fallback: true,
  };
};
