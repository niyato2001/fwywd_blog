import { data } from 'autoprefixer';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getBlocks } from '../../lib/notion/get-blocks';
import { getDatabase } from '../../lib/notion/get-database';
import { getPage } from '../../lib/notion/get-page';

export const Text = ({ text }) => {
  //text=[]でtextは配列オブジェクト！
  if (!text) {
    return null;
  }
  return text.map((value, i) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    //textは[
    //{"type": "text",
    //  "text": {
    //      "content": "APIを使ってデータを○○する【GET/POST/PUT/DELETE】",
    //      "link": null
    //  },
    //  "annotations": {
    //      "bold": false,
    //      "italic": false,
    //      "strikethrough": false,
    //      "underline": false,
    //      "code": false,
    //      "color": "default"
    //  },
    //  "plain_text": "APIを使ってデータを○○する【GET/POST/PUT/DELETE】",
    //  "href": null
    //}
    //]のような配列構造で、そのうちのtextとannotationに対して分割代入している。
    return (
      <span
        key={i}
        className={[
          bold ? 'font-bold' : '',
          code ? 'bg-gray-light rounded-3xl px-2 py-4 font-mono' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
        {/*text.linkがtrueならばaタグ、そうでなければ単純にtext.contentのspanタグ*/}
      </span>
    );
  });
};

const renderBlock = (block) => {
  //blockはオブジェクト
  //block={
  //{
  //  "object": "block",
  //"id": "1d95866b-810a-49b7-9421-a52935fc754b",
  //      "created_time": "2022-01-25T06:16:00.000Z",
  //    "last_edited_time": "2022-01-25T06:16:00.000Z",
  //   "has_children": false,
  //    "archived": false,
  //    "type": "paragraph",
  //    "paragraph": {
  //    "children":あれば子ブロック,
  //        "text": [
  //            {
  //                "type": "text",
  //               "text": {
  //                 "content": "【目次】",
  //               "link": null
  //         },
  //       "annotations": {
  //         "bold": true,
  //       "italic": false,
  //     "strikethrough": false,
  //        "underline": false,
  //             "code": false,
  //           "color": "default"
  //     },
  //        "plain_text": "【目次】",
  //        "href": null
  //    },
  //    {
  //           "type": "text",
  //                  "text": {
  //                    "content": "                                                                                                                  written by 田原純平",
  //                  "link": null
  //            },
  //          "annotations": {
  //            "bold": false,
  //          "italic": false,
  //        "strikethrough": false,
  //      "underline": false,
  //    "code": false,
  //      "color": "default"
  //      },
  //     "plain_text": "                                                                                                                  written by 田原純平",
  //    "href": null
  //      }
  //     ]
  //    }
  // }
  //}のような形。
  const { type, id } = block;
  //const type = block.type;
  //const id = block.id;　と同じ。分割代入。
  const value = block[type];
  //value=block[block.type]という意味。たとえば、value=block['paragraph']

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <Text text={value.text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <Text text={value.text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <Text text={value.text} />
        </h3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.text} />
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type='checkbox' id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    //      case 'image':
    //        const src = value.type === 'external' ? value.external.url : value.file.url;
    //        const caption = value.caption ? value.caption[0].plain_text : '';
    //        return (
    //          <figure>
    //            <Image src={src} alt={caption} />
    //            {caption && <figcaption>{caption}</figcaption>}
    //          </figure>
    //        );
    default:
      //      return `❌ Unsupported block (${
      //        type === 'unsupported' ? 'unsupported by Notion API' : type
      //      })`;
      return null;
  }
};

export default function Post({ props_page, blocks }) {
  if (!props_page || !blocks) {
    return <div />;
  }
  //{title}とすることで、props:{title:.....}のtitleのみを受け取ることができる！
  //retrieve a pageとretrieve blocks childrenの両方を受け取る
  return (
    <div className='flex gap-10 bg-bg-gray-light px-20 py-10'>
      <div className='flex flex-col gap-10'>
        <Image src='/twitter.png' alt='footer_twitter' width={36} height={30} />
        <Image src='/facebook.png' alt='footer_facebook' width={36} height={36} />
      </div>
      <article className='rounded-xl bg-white p-10'>
        <h1>{props_page.title}</h1>
        <div>{props_page.date}</div>
        <div>{props_page.tag}</div>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
      <div className='rounded-xl bg-white'></div>
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
      //".?"はオプショナルチェーン演算子とよび、childblocks.find()がある場合にchildrenを呼び出す。childblocks.find()がnullの場合はundefinedを返す。
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
