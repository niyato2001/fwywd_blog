interface Text {
  type: string;
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
  href: string | null;
}

export const Contents = (text: Text[]) => {
  //TypeScript化の時点で引数を({text})から(text:Text[])に変更したのでエラー発生するか確認
  //text=[]でtextは配列オブジェクト！
  if (!text) {
    return null;
  }
  return text.map((value: Text, i: number) => {
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
        <p key={i}>
          {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
          {/*text.linkがtrueならばaタグ、そうでなければ単純にtext.contentのspanタグ*/}
        </p>
      );
    }
  });
};
