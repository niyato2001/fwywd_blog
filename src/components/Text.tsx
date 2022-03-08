import { Fragment } from 'react';
interface Props {
  text: Value[];
}
//二次元配列の型定義

interface Value {
  text: { content: string; link: { url: string } | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

function Component(props: Props): (JSX.Element | null)[] | JSX.Element {
  //text=[]でtextは配列オブジェクト！
  if (!props.text) {
    return <></>;
  }
  return props.text.map((value: Value, i: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    //分割代入によりtext = value.textになっている。
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
    if (text.content === '【目次】') {
      return null;
    } else {
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
          {text.link ? (
            <a href={text.link.url} className='text-blue-500 underline'>
              {text.content}
            </a>
          ) : (
            text.content
          )}
          {/*text.linkがtrueならばaタグ、そうでなければ単純にtext.contentのspanタグ*/}
        </span>
      );
    }
  });
}

export default function Text(props: Props): JSX.Element {
  return <Fragment>{Component(props)}</Fragment>;
}
