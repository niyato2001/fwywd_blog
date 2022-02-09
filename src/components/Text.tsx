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
          {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
          {/*text.linkがtrueならばaタグ、そうでなければ単純にtext.contentのspanタグ*/}
        </span>
      );
    }
  });
};
