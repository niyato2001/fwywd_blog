import { ParsedUrlQuery } from 'querystring';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { renderBlock } from '../../components/render-block';
import { renderBlockContents } from '../../components/render-block-contents';
import { getBlocks } from '../../lib/notion/get-blocks';
import { getDatabase } from '../../lib/notion/get-database';
import { getOgpMeta } from '../../lib/notion/get-embedOGP';
import { getPage } from '../../lib/notion/get-page';

//page_propsの型定義
interface Page_props {
  title: string;
  date: Date;
  tag: string[];
}

//blockの型定義
interface Block {
  [key: string]: any;
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  has_children: boolean;
  archived: boolean;
  type: string;
  paragraph: Paragraph;
  toggle: Toggle;
  heading_1: Heading1;
  image: Image;
  child_database: ChildDatabase;
  numbered_list_item: NumberedListItem;
  table: Table;
  heading_2: Heading2;
  heading_3: Heading3;
}

interface CreatedBy {
  object: string;
  id: string;
}

interface LastEditedBy {
  object: string;
  id: string;
}

interface Paragraph {
  text: Text[];
}

interface Toggle {
  text: Text[];
}

interface Heading1 {
  text: Text[];
}

interface Heading2 {
  text: Text[];
}

interface Heading3 {
  text: Text[];
}

interface NumberedListItem {
  text: Text[];
}

interface Table {
  table_width: number;
  has_column_header: boolean;
  has_row_header: boolean;
}

interface Image {
  caption: Text[];
  type: string;
  file: File;
}

interface File {
  url: string;
  expiry_time: Date;
}

interface ChildDatabase {
  title: string;
}

interface Data {
  properties: {
    [key: string]: any;
  };
}

interface Text2 {
  content: string;
  link: { url: string } | null;
}

interface Text {
  text: Text2;
  annotations: Annotations;
  plain_text: string;
}

//databaseの型定義
interface Page {
  object: string;
  id: string;
  created_time: Date3;
  last_edited_time: Date3;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: Cover;
  icon?: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

interface CreatedBy {
  object: string;
  id: string;
}
interface LastEditedBy {
  object: string;
  id: string;
}
interface Cover {
  type: string;
  external: External;
}
interface External {
  url: string;
}
interface Parent {
  type: string;
  database_id: string;
}
interface Properties {
  tag: Tag;
  date: Date;
  link: Link;
  image: Image;
  title: Title;
}
interface Tag {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}
interface MultiSelect {
  id: string;
  name: string;
  color: string;
}
interface Link {
  id: string;
  type: string;
  url: string;
}
interface Image {
  id: string;
  type: string;
  files: File[];
}
interface Title {
  id: string;
  type: string;
  title: Title2[];
}
interface Title2 {
  type: string;
  text: Text2;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
}
interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Date3 {
  id: string;
  type: string;
  date: Date2;
}

interface Date2 {
  start: string;
  end?: string | null;
  time_zone?: string | null;
}

interface File {
  name: string;
  type: string;
  file: File2;
}

interface File2 {
  url: string;
  expiry_time: Date;
}

interface Post {
  props_page: Page_props;
  blocks: Block[];
  database: Page[];
}

//child_database用の型定義
interface ChildData {
  properties: Properties2;
}
interface Properties2 {
  [key: string]: Date3;
}

export default function Post({ props_page, blocks, database }: Post) {
  const router = useRouter();
  const post: string = router.asPath.substring(7);
  // '/posts/'を省いてpostでpageIdを表現することにした
  console.log(post);
  //とりあえずanyにしていまっている。useRouterは初回レンダリング時はundefinedになってしまうため。
  const pageIds = database.map((data) => data.id);
  const titles = database.map((data) => data.properties.title.title[0].text.content);
  const number = pageIds.indexOf(post);
  const hrefBefore: string = `/posts/${pageIds[number - 1]}`;
  const handleClickBefore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(hrefBefore);
  };
  const hrefAfter: string = `/posts/${pageIds[number + 1]}`;
  const handleClickAfter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(hrefAfter);
  };
  console.log(pageIds, number);
  if (!props_page || !blocks) {
    return <div />;
  }
  //{title}とすることで、props:{title:.....}のtitleのみを受け取ることができる！
  //retrieve a pageとretrieve blocks childrenの両方を受け取る
  return (
    <div>
      <Head>
        <title>{props_page.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex items-start gap-10 bg-bg-gray-light px-20 py-10 leading-7'>
        <div className='flex flex-col gap-10'>
          <FontAwesomeIcon icon={faTwitter} width={32} height={32} />
          <FontAwesomeIcon icon={faFacebook} width={32} height={32} />
          {/*Imageタグのほうが処理早ければそちらを利用*/}
        </div>
        {/*左側のカラム*/}
        <article className='max-w-4xl rounded-xl bg-white p-10'>
          <h1 className='text-3xl font-bold'>{props_page.title}</h1>
          <div className='flex items-center justify-items-start gap-4 py-10'>
            <div className='text-bg-gray-dark'>{props_page.date}</div>
            <div className='flex gap-2 text-bg-gray-dark'>
              {props_page.tag.map((tag, i: number) => {
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
            {blocks.map((block, i) => (
              <Fragment key={i}>{renderBlock(block)}</Fragment>
            ))}
          </section>
          <div className='mx-auto my-10 flex items-center justify-between gap-4 text-xs text-white'>
            {Number(number) === 0 ? (
              <button className='none'></button>
            ) : (
              <div className='flex w-1/3 items-center '>
                <button className=' rounded-l-md bg-button-green p-3' onClick={handleClickBefore}>
                  ＜
                </button>
                <div className='px-2  text-font-black'>{titles[number - 1]}</div>
              </div>
            )}
            <button
              className='  w-1/5 bg-button-green p-3 px-2 text-center'
              onClick={() => {
                router.push('/');
              }}
            >
              一覧ページ
            </button>
            {Number(number) === database.length - 1 ? (
              <button className='none'></button>
            ) : (
              <div className='flex w-1/3 items-center'>
                <div className='px-2  text-font-black'>{titles[number + 1]}</div>
                <button className=' rounded-r-md bg-button-green p-3' onClick={handleClickAfter}>
                  ＞
                </button>
              </div>
            )}
          </div>
        </article>
        {/*記事本文のカラム*/}
        <div className='relative max-w-sm rounded-xl bg-white p-5 text-base'>
          {blocks.map((block, i) => {
            if (block.paragraph?.text[0]?.text.content.match(/目次/)) {
              return (
                <div key={i}>
                  <div className='laptop:z-1 laptop:-top-0.75 hidden laptop:absolute laptop:flex laptop:w-11/12 laptop:items-center laptop:justify-start laptop:gap-3 laptop:bg-white'>
                    <div>{block.paragraph.text[0].text.content}</div>
                    <div className='w-4/5 border-t-2 border-bg-gray-dark'></div>
                  </div>
                  <div className='laptop:h-3'></div>
                </div>
              );
            }
            return <Fragment key={i}>{renderBlockContents(block)}</Fragment>;
          })}
          <div className='border-t border-bg-gray-dark pt-4 text-sm'>
            <Link href='/'>
              <a>トップページに戻る</a>
            </Link>
          </div>
        </div>
        {/*目次のカラム*/}
      </div>
    </div>
  );
}

interface Params extends ParsedUrlQuery {
  post: string;
}

export const getStaticProps: GetStaticProps<Post, Params> = async (context) => {
  const { post } = context.params as Params;
  //postを{post}としていたために、オブジェクト扱いになってしまっていた。そのため、getPageの引数に入れることができなかった。
  //結局getStaticPropsは名前の通り、propsを作り出してgetStaticPropsがある同ページ内でそのpropsを受け取ることができるようにするもの！
  //この場合のpostはpage_idとなっている。
  const pageAndBlocksDatabase = await Promise.all([
    getPage(post),
    getBlocks(post),
    getDatabase(databaseId),
  ]);
  const page = pageAndBlocksDatabase[0];
  const blocks = pageAndBlocksDatabase[1];
  const database = pageAndBlocksDatabase[2];
  //blocksはparagraphなどのtypeごとの配列
  console.log(page);
  const props_page = {
    title: page.properties.title.title[0].plain_text,
    date: page.properties.date.date.start,
    tag: page.properties.tag.multi_select.map((tag: { name: string }) => {
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
      //x.idはchildBlocksで呼び出されているblock.idであり、あとのblock.idはblocksで呼び出されているblock.id
      //"?."はオプショナルチェーン演算子とよび、childblocks.find()がある場合にchildrenを呼び出す。childblocks.find()がnullの場合はundefinedを返す。
    }
    return block;
    //has_childrenがtrueのものは、childrenが加えられた状態でfalseのものはそのままreturnされる。
  });

  const ogpMeta = await Promise.all(
    blocksWithChildren
      .filter((block) => block.embed)
      //block.embedがtrueの要素のみの配列に変換
      .map(async (block) => {
        //子ブロックがある場合は、内容がすべて表示されるわけではないので、追加でgetOgpMetaする必要がある
        return {
          id: block.id,
          ogpMeta: await getOgpMeta(block.embed.url),
        };
      }),
  );
  const blocksWithMeta = blocksWithChildren.map((block) => {
    // ogpMeta情報を加える
    if (block?.embed && !block?.embed?.ogpMeta) {
      //block.embedがtrueだが、embed.ogpMetaオブジェクトを持っていない場合にogpMetaオブジェクトをつくる！
      block.embed.ogpMeta = ogpMeta.find((x) => x.id === block.id)?.ogpMeta;
      //xはblocks.filterで作られたblock.embedがtrueのみのblockによる配列の要素（idとogpMeta）
      //ogpMeta=[{id:block.id,ogpMeta:await getOgpMeta(block.embed.url),{id:...,ogpMeta:...},...]
      //x.idはogpMetaで呼び出されているblock.idであり、あとのblock.idはblocksWithChildrenで呼び出されているblock.id
      //"?."はオプショナルチェーン演算子とよび、childblocks.find()がある場合にchildrenを呼び出す。childblocks.find()がnullの場合はundefinedを返す。
    }
    return block;
    //embedがtrueのものは、embed.ogpMetaが加えられた状態でfalseのものはそのままreturnされる。
  });

  const ogpBookmark = await Promise.all(
    blocksWithMeta
      .filter((block) => block.bookmark)
      //block.bookmarkがtrueの要素のみの配列に変換
      .map(async (block) => {
        //子ブロックがある場合は、内容がすべて表示されるわけではないので、追加でgetOgpMetaする必要がある
        return {
          id: block.id,
          target: await getOgpMeta(block.bookmark.url),
        };
      }),
  );
  const blocksWithBookmark = blocksWithMeta.map((block) => {
    // ogpMeta情報を加える
    if (block?.bookmark && !block?.bookmark?.target) {
      //block.embedがtrueだが、embed.ogpMetaオブジェクトを持っていない場合にogpMetaオブジェクトをつくる！
      block.bookmark.target = ogpBookmark.find((x) => x.id === block.id)?.target;
    }
    return block;
  });

  const childDatabaseId = await Promise.all(
    blocksWithBookmark
      .filter((block) => block.child_database)
      //block.child_databaseがtrueの要素のみの配列に変換
      .map(async (block) => {
        return {
          id: block.id,
          databaseInformation: await getDatabase(block.id),
        };
      }),
  );

  childDatabaseId[0]?.databaseInformation?.sort(function (a: ChildData, b: ChildData) {
    return a.properties['日付'].date.start < b.properties['日付'].date.start ? -1 : 1;
  });
  //apiでのsortは難しかったのでjavascriptのなかでsortしてdatabaseInformationを日付順にsort

  const blocksWithDatabaseId = blocksWithBookmark.map((block) => {
    // child_database情報を加える
    if (block.child_database && !block.child_database?.databaseInformation) {
      //block.child_databaseがtrueだが、embed.ogpMetaオブジェクトを持っていない場合にogpMetaオブジェクトをつくる！
      block.child_database.databaseInformation = childDatabaseId.find(
        (x) => x.id === block.id,
      )?.databaseInformation;
    }
    return block;
    //embedがtrueのものは、embed.ogpMetaが加えられた状態でfalseのものはそのままreturnされる。
  });

  console.log(blocksWithDatabaseId);
  return {
    props: { props_page, blocks: blocksWithDatabaseId, database },
    //pageとデータベースの2つの情報を入れるためprops→props:{props_page,props_blocks}に変更
    revalidate: 10,
  };
};

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  //databaseはresponse.resultsと同様のオブジェクトで配列
  //getStaticPathsは名前の通りpathsを作り出す。pathsはcontextとしてgetStaticPropsで受け取ることが可能。
  const paths = database.map((post: Page) => ({
    params: { post: post.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};
