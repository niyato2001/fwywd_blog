import Image from 'next/image';
import SelectButton from '../components/SelectButton';
import PageList from '../lib/pagenation/PageList';
import BlogCard from './BlogCard';

interface Title {
  plain_text: string;
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

interface File {
  name: string;
  type: string;
  file: File2;
}

interface File2 {
  url: string;
  expiry_time: Date;
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
  href?: string | null;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Posts {
  properties: Properties;
  id: string;
}

interface Props {
  posts: Posts[];
}

export default function PageMain(props: Props): JSX.Element {
  const pageList: string[] = PageList(props.posts);
  //postsはデータベースの項目（記事）ごとの配列
  return (
    <div className='bg-bg-gray-light'>
      <div className='mx-auto flex max-w-5xl flex-col py-16'>
        <div className='flex items-center justify-start gap-4'>
          <div className='inline-block rounded-md border-2 border-button-border px-3 py-1 text-xs text-font-green'>
            プログラミング
          </div>
          <div className='inline-block font-bold text-font-black'>記事一覧</div>
        </div>
        <div className='grid grid-cols-3 grid-rows-2 gap-10 py-16'>
          {props.posts.map((post: Posts, i: number) => {
            return (
              <BlogCard
                key={i}
                title={post.properties.title.title[0].plain_text}
                date={post.properties.date.date.start}
                tag={post.properties.tag.multi_select.map((tag) => {
                  return tag.name;
                })}
                href={post.id}
                image={post.properties.image?.files[0].file.url}
              />
            );
          })}
        </div>
        <div className='mx-auto flex items-center justify-center gap-1  text-white'>
          <SelectButton numbers={pageList} />
        </div>
      </div>
    </div>
  );
}
