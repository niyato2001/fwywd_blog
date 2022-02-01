import { data } from 'autoprefixer';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getDatabase } from '../../lib/notion/get-database';
import { getPage } from '../../lib/notion/get-page';

export default function Post({ title }) {
  //{title}とすることで、props:{title:.....}のtitleのみを受け取ることができる！
  return <h1>このページは{title}のページです。</h1>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = context.params.post;
  //postを{post}としていたために、オブジェクト扱いになってしまっていた！！
  const page = await getPage(post);
  const props = {
    title: `title: ${page.properties.title.title[0].plain_text}`,
  };
  return {
    props,
    revalidate: 10,
  };
};

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  //databaseはresponse.resultsと同様のオブジェクト
  const paths = database.map((post) => ({
    params: { post: post.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};
