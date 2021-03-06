import { Fragment } from 'react';

interface Props {
  table: Value[][];
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

export const Component = (props: Props) => {
  //table=[{列1},{列2}...]でtableは配列オブジェクト！
  if (!props.table) {
    return null;
  }
  return props.table.map((value, i: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value[0];
    return (
      <td
        key={i}
        className={[
          bold ? 'font-bold' : '',
          code ? 'bg-gray-light rounded-3xl px-2 py-4 font-mono' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
          'border-2',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </td>
    );
  });
};
export default function Table(props: Props) {
  return <Fragment>{Component(props)}</Fragment>;
}
