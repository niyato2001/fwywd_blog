import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { Contents } from './Contents';
import LinkCard from './LinkCard';
import { Table } from './Table';
import { Text } from './Text';

export const renderBlock = (block) => {
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
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption.map((caption) => caption?.plain_text) : '';
      return (
        <figure>
          <div className='relative my-2 h-60 '>
            <Image src={src} alt={caption} layout='fill' objectFit='contain' />
          </div>
          {caption &&
            caption.map((caption) => {
              return (
                <figcaption key={id} className='text-center text-sm text-bg-gray-dark'>
                  {caption}
                </figcaption>
              );
            })}
        </figure>
      );
    case 'code':
      const language: string = value.language;
      const code: string = value.text[0]?.text.content;
      return (
        <div className='my-5 bg-gray-100 pb-5 '>
          <p className='pl-2 text-xs text-bg-gray-dark hover:block hover:text-left'>{language}</p>
          <p className='mx-10 my-5 whitespace-pre-wrap text-sm'>{code}</p>
        </div>
      );
    case 'embed':
      const { ogpMeta } = value;
      const { url, title, description, image } = ogpMeta;
      if (ogpMeta) {
        return <LinkCard url={url} title={title} description={description} image={image} />;
      }
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
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
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
    case 'table':
      return (
        <table className='w-full table-fixed border-2'>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            //はじめはこのファイルでtable_rowの分岐をつくらずそのまま実装しようとしていたが、そもそものvalue=block[block.type]なので
            //再度子ブロックごとにrenderBlock()して分岐させないと実装できない！
          ))}
        </table>
      );
    case 'table_row':
      return (
        <tr className='border-2'>
          <Table table={value.cells} />
        </tr>
      );
    case 'divider':
      return null;
    case 'table_of_contents':
      return null;
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
    //return null;
  }
};
