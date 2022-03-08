interface Page {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: Cover;
  icon?: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

interface CreatedBy {
  object: string;
  id: string;
}
interface LastEditedBy {
  object: string;
  id: string;
}
interface Cover {
  type: string;
  external: External;
}
interface External {
  url: string;
}
interface Parent {
  type: string;
  database_id: string;
}
interface Properties {
  tag: Tag;
  date: Date;
  link: Link;
  image: Image;
  title: Title;
}
interface Tag {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}
interface MultiSelect {
  id: string;
  name: string;
  color: string;
}
interface Link {
  id: string;
  type: string;
  url: string;
}
interface Image {
  id: string;
  type: string;
  files: File[];
}
interface Title {
  id: string;
  type: string;
  title: Title2[];
}
interface Title2 {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
}
interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Date {
  id: string;
  type: string;
  date: Date2;
}

interface Date2 {
  start: string;
  end?: string | null;
  time_zone?: string | null;
}

interface File {
  name: string;
  type: string;
  file: File2;
}

interface File2 {
  url: string;
  expiry_time: Date;
}

export default function PageList(page: Page[]) {
  const pageNumber: number = Math.floor(page.length / 6);
  const pageList: string[] = [];
  if (page.length % 6 === 0) {
    [...Array(pageNumber)].map((_, i) => {
      pageList.push(String(i + 1));
    });
  } else {
    [...Array(pageNumber + 1)].map((_, i) => {
      pageList.push(String(i + 1));
      //i+1はindexが0スタートのため。i+1とすれば1スタートになるので。
    });
  }
  return pageList;
}
