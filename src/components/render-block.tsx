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
          {value.children?.map((block, i) => (
            <Fragment key={i}>{renderBlock(block)}</Fragment>
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
          <div className='relative  h-96 '>
            <Image src={src} alt={caption} layout='fill' objectFit='contain' />
          </div>
          {caption &&
            caption.map((caption, i) => {
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
        ? value.caption.map((caption) => caption?.plain_text)
        : '';
      return (
        <figure>
          <video src={video_src} controls muted autoPlay />
          {video_caption &&
            video_caption.map((caption, i) => {
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
            {value.children?.map((child, i) => (
              <Fragment key={i}>{renderBlock(child)}</Fragment>
            ))}
          </div>
        </div>
      );
    case 'code':
      const language: string = value.language;
      //group hoverやinvisibleを選択することを検討（code blockをhover時にプログラミング言語を表示させたい！）
      return (
        <div>
          <div className=' bg-font-black pb-5'>
            <p className='pl-3 pt-2  text-xs text-bg-gray-dark opacity-0 hover:opacity-100 '>
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
    case 'child_database':
      return (
        <div className='text-extrabold my-2  text-center text-red-500'>
          <span className='rounded-md border-2 p-3'>
            child databaseはAPIでサポートされていないため表示できません。
          </span>
        </div>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
    //return null;
  }
};
