export const Table = ({ table }) => {
  //table=[{列1},{列2}...]でtableは配列オブジェクト！
  if (!table) {
    return null;
  }
  return table.map((value, i) => {
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
