import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import Contents from './Contents';
import LinkCard from './LinkCard';
import Table from './Table';
import Text from './Text';

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

interface Text {
  text: { content: string; link: { url: string } | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
}

export const renderBlock = (block: Block) => {
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
        <p className='my-4'>
          <Text text={value.text} />
        </p>
      );
    case 'heading_1':
      return (
        <h2 className='mb-5 border-b border-font-black py-3 text-2xl'>
          <Contents text={value.text} />
        </h2>
      );
    case 'heading_2':
      return (
        <h3 className='my-2 bg-gray-100 p-3 text-lg'>
          <Text text={value.text} />
        </h3>
      );
    case 'heading_3':
      return (
        <h4 className='text-md my-1 border-b border-font-black px-5'>
          <Text text={value.text} />
        </h4>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className='text-sm'>
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
          {value.children?.map((block: Block, i: number) => (
            <Fragment key={i}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption
        ? value.caption.map((caption: Text) => caption?.plain_text)
        : '';
      return (
        <figure>
          <div className='relative  h-96 '>
            <Image src={src} alt={caption} layout='fill' objectFit='contain' />
          </div>
          {caption &&
            caption.map((caption: Text, i: number) => {
              return (
                <figcaption key={i} className='text-center text-sm text-bg-gray-dark'>
                  {caption}
                </figcaption>
              );
            })}
        </figure>
      );
    case 'video':
      const video_src = value.type === 'external' ? value.external.url : value.file.url;
      const video_caption = value.caption
        ? value.caption.map((caption: Text) => caption?.plain_text)
        : '';
      return (
        <figure>
          <video src={video_src} controls muted autoPlay />
          {video_caption &&
            video_caption.map((caption: Text, i: number) => {
              return (
                <figcaption key={i} className='text-center text-sm text-bg-gray-dark'>
                  {caption}
                </figcaption>
              );
            })}
        </figure>
      );
    case 'quote':
      return (
        <div className='flex w-full flex-row justify-start'>
          <div className='w-3 bg-bg-gray-light'></div>
          <div className='w-1 bg-bg-black'></div>
          <div className='w-full bg-bg-gray-light p-3 italic text-font-black'>
            <p>
              <Text text={value.text}></Text>
            </p>
            {value.children?.map((child: Block, i: number) => (
              <Fragment key={i}>{renderBlock(child)}</Fragment>
            ))}
          </div>
        </div>
      );
    case 'callout':
      return (
        <div className='flex items-center gap-2 bg-font-black px-2 py-4'>
          <p className=''>{value.icon?.emoji}</p>
          <p className='text-white'>
            <Text text={value.text} />
          </p>
          {value.children?.map((child: Block, i: number) => (
            <Fragment key={i}>{renderBlock(child)}</Fragment>
          ))}
        </div>
      );
    case 'code':
      const language: string = value.language;
      //group hoverやinvisibleを選択することを検討（code blockをhover時にプログラミング言語を表示させたい！）
      return (
        <div>
          <div className=' group bg-font-black pb-5'>
            <p className='pl-3 pt-2  text-xs text-bg-gray-dark opacity-0 group-hover:opacity-100 '>
              {language}
            </p>
            <p className='mx-10 my-5 whitespace-pre-line text-sm leading-6 text-white'>
              <Text text={value.text} />
            </p>
          </div>
          <p className='text-bg-gray-dark'>
            <Text text={value.caption} />
          </p>
        </div>
      );
    case 'embed':
      const { ogpMeta } = value;
      const { url, title, description, image } = ogpMeta;
      if (ogpMeta) {
        return <LinkCard url={url} title={title} description={description} image={image} />;
      }
      return '❌ Unsupported block';
    case 'bookmark':
      const { target } = value;
      if (target) {
        return (
          <LinkCard
            url={target.url}
            title={target.title}
            description={target.description}
            image={target.image}
          />
        );
      }
      return '❌ Unsupported block';
    case 'table':
      return (
        <table className='w-full table-fixed '>
          {value.children?.map((block: Block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            //はじめはこのファイルでtable_rowの分岐をつくらずそのまま実装しようとしていたが、そもそものvalue=block[block.type]なので
            //再度子ブロックごとにrenderBlock()して分岐させないと実装できない！
          ))}
        </table>
      );
    case 'table_row':
      return (
        <tr className=''>
          <Table table={value.cells} />
        </tr>
      );
    case 'divider':
      return null;
    case 'table_of_contents':
      return null;
    case 'child_database':
      return (
        <div className='text-center'>
          <p className='font-bold'>【{value.title}】</p>
          <table className='mx-auto my-2 w-2/3 table-fixed border-y-2'>
            {value.databaseInformation.map((data: Data, i: number) => {
              return (
                <tr key={i}>
                  <td>
                    <Text text={data.properties['名前'].title} />
                  </td>
                  <td className='w-1/2 text-right'>{data.properties['日付'].date.start}</td>
                </tr>
              );
            })}
          </table>
        </div>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
    //return null;
  }
};
