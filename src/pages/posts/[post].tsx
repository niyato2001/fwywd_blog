import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { renderBlock } from '../../components/render-block';
import { renderBlockContents } from '../../components/render-block-contents';
import { getBlocks } from '../../lib/notion/get-blocks';
import { getDatabase } from '../../lib/notion/get-database';
import { getPage } from '../../lib/notion/get-page';

export default function Post({ props_page, blocks }) {
  if (!props_page || !blocks) {
    return <div />;
  }
  //{title}とすることで、props:{title:.....}のtitleのみを受け取ることができる！
  //retrieve a pageとretrieve blocks childrenの両方を受け取る
  return (
    <div>
      <Head>
        <title>{props_page.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex items-start gap-10 bg-bg-gray-light px-20 py-10 leading-10'>
        <div className='flex flex-col gap-10'>
          <FontAwesomeIcon icon={faTwitter} width={32} height={32} />
          <FontAwesomeIcon icon={faFacebook} width={32} height={32} />
          {/*Imageタグのほうが処理早ければそちらを利用*/}
        </div>
        <article className='max-w-4xl rounded-xl bg-white p-10'>
          <h1 className='text-3xl font-bold'>{props_page.title}</h1>
          <div className='flex items-center justify-items-start gap-4 py-10'>
            <div className='text-bg-gray-dark'>{props_page.date}</div>
            <div className='flex gap-2 text-bg-gray-dark'>
              {props_page.tag.map((tag, i) => {
                return (
                  <div
                    key={i}
                    className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <section>
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </section>
        </article>
        <div className='max-w-sm rounded-xl bg-white p-5'>
          {blocks.map((block) => {
            if (block.paragraph?.text[0]?.text.content.match(/目次/)) {
              return <div>{block.paragraph.text[0].text.content}</div>;
            }
            return <Fragment key={block.id}>{renderBlockContents(block)}</Fragment>;
          })}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = context.params.post;
  //postを{post}としていたために、オブジェクト扱いになってしまっていた。そのため、getPageの引数に入れることができなかった。
  //結局getStaticPropsは名前の通り、propsを作り出してgetStaticPropsがある同ページ内でそのpropsを受け取ることができるようにするもの！
  const pageAndBlocks = await Promise.all([getPage(post), getBlocks(post)]);
  const page = pageAndBlocks[0];
  const blocks = pageAndBlocks[1];
  //blocksはparagraphなどのtypeごとの配列
  const props_page = {
    title: page.properties.title.title[0].plain_text,
    date: page.properties.date.date.start,
    tag: page.properties.tag.multi_select.map((tag) => {
      return tag.name;
    }),
  };
  //props→props_page
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      //block.has_childrenがtrueの要素のみの配列に変換
      .map(async (block) => {
        //子ブロックがある場合は、内容がすべて表示されるわけではないので、追加でblock_idからgetBlocksする必要がある
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      }),
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      //has_childrenがtrueだが、childrenオブジェクトを持っていない場合にchildrenオブジェクトをつくる！
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children;
      //xはblocks.filterで作られたblock.has_childrenがtrueのみのblockによる配列の要素（idとchildren）
      //childBlocks=[{id:block.id,children:await getBlocks(block.id),{id:...,children:...},...]
      //x.idはchildBlocksで呼び出されているblock.idであり、あとのblock.idはblocksSithChildrenで呼び出されているblock.id
      //"?."はオプショナルチェーン演算子とよび、childblocks.find()がある場合にchildrenを呼び出す。childblocks.find()がnullの場合はundefinedを返す。
    }
    return block;
    //has_childrenがtrueのものは、childrenが加えられた状態でfalseのものはそのままreturnされる。
  });
  return {
    props: { props_page, blocks: blocksWithChildren },
    //pageとデータベースの2つの情報を入れるためprops→props:{props_page,props_blocks}に変更
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
    fallback: false,
  };
};
