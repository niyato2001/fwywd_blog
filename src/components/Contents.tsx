export const Contents = ({ text }) => {
  //text=[]でtextは配列オブジェクト！
  if (!text) {
    return null;
  }
  return text.map((value, i) => {
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
        <p
          key={i}
          className='border-t border-bg-gray-dark pt-2'
          style={color !== 'default' ? { color } : {}}
        >
          {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
          {/*text.linkがtrueならばaタグ、そうでなければ単純にtext.contentのspanタグ*/}
        </p>
      );
    }
  });
};
