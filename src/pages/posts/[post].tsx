import { data } from 'autoprefixer';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getBlocks } from '../../lib/notion/get-blocks';
import { getDatabase } from '../../lib/notion/get-database';
import { getPage } from '../../lib/notion/get-page';

export default function Post({ props_page, props_blocks }) {
  //{title}とすることで、props:{title:.....}のtitleのみを受け取ることができる！
  //retrieve a pageとretrieve blocks childrenの両方を受け取る
  return (
    <h1>
      このページは{props_page.title}のページです。 1つめのブロックのタイプは{props_blocks.type}
      です。
    </h1>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = context.params.post;
  //postを{post}としていたために、オブジェクト扱いになってしまっていた。そのため、getPageの引数に入れることができなかった。
  //結局getStaticPropsは名前の通り、propsを作り出してgetStaticPropsがある同ページ内でそのpropsを受け取ることができるようにするもの！
  const pageAndBlocks = await Promise.all([getPage(post), getBlocks(post)]);
  const page = pageAndBlocks[0];
  const blocks = pageAndBlocks[1];
  const props_page = {
    title: `title: ${page.properties.title.title[0].plain_text}`,
  };
  //props→props_page
  const props_blocks = {
    type: `type: ${blocks[0].type}`,
  };
  return {
    props: { props_page, props_blocks },
    //props→props:{props_page,props_blocks}に変更
    revalidate: 10,
  };
};

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  //databaseはresponse.resultsと同様のオブジェクト
  //getStaticPathsは名前の通りpathsを作り出す。pathsはcontextとしてgetStaticPropsで受け取ることが可能。
  const paths = database.map((post) => ({
    params: { post: post.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};
