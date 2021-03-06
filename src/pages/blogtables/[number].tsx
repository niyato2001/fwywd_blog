import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter, Router } from 'next/router';
import BlogCard from '../../components/BlogCard';
import SelectButton from '../../components/SelectButton';
import { getDatabase } from '../../lib/notion/get-database';
import PageList from '../../lib/pagenation/PageList';

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

interface Params {
  params: Page[];
}

export default function Page({ params }: Params) {
  const router = useRouter();
  const { number } = router.query;
  //number = router.query.number????????????????????????
  //params???getStaticProps???database=[{page1},{page2}...]???????????????????????????
  const new_params = params.slice(0 + 6 * (Number(number) - 1), 6 + 6 * (Number(number) - 1));
  //params???6??????????????????????????????database?????????
  const pageList: string[] = PageList(params);
  console.log(pageList);
  const hrefAfter: string = `/blogtables/${String(Number(number) + 1)}`;
  const hrefBefore: string = `/blogtables/${String(Number(number) - 1)}`;
  const handleClickBefore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(hrefBefore);
  };
  const handleClickAfter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(hrefAfter);
  };
  return (
    <div>
      <Head>
        <title>fwywd Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div></div>
      <div className='bg-bg-gray-light'>
        <div className='mx-auto flex max-w-5xl flex-col py-16'>
          <div className='flex items-center justify-start gap-4'>
            <div className='inline-block rounded-md border-2 border-button-border px-3 py-1 text-xs text-font-green'>
              ?????????????????????
            </div>
            <div className='inline-block font-bold text-font-black'>
              {number}/
              {params.length % 6 === 0
                ? Math.floor(params.length / 6).toString()
                : (Math.floor(params.length / 6) + 1).toString()}
              ?????????
            </div>
          </div>
          <div className='grid grid-cols-3 grid-rows-2 gap-10 py-16'>
            {new_params.map((post, i) => {
              //posts??????new_params?????????????????????
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
          <div className='mx-auto flex items-center justify-center gap-1   text-white'>
            {Number(number) - 1 === 0 ? null : (
              <button className='rounded-l-md bg-button-green p-3' onClick={handleClickBefore}>
                ??????
              </button>
            )}

            <SelectButton numbers={pageList} />
            {Number(number) === pageList.length ? null : (
              <button className='rounded-r-md bg-button-green p-3' onClick={handleClickAfter}>
                ??????
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticProps: GetStaticProps = async () => {
  const database = await getDatabase(databaseId);
  //database = [{????????????3},{????????????2},{????????????1}?????????]
  return {
    props: {
      params: database,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  //database???response.results??????????????????????????????
  //getStaticPaths??????????????????paths??????????????????paths???context?????????getStaticProps?????????????????????????????????
  const pageNumber: number = Math.floor(database.length / 6);
  const listPaths: string[] = [];
  if (database.length % 6 === 0) {
    [...Array(pageNumber)].map((_, i) => {
      listPaths.push(String(i + 1));
    });
    //[...Array()]?????????????????????????????????????????????????????????????????????????????????????????????????????????listPaths?????????????????????
  } else {
    [...Array(pageNumber + 1)].map((_, i) => {
      listPaths.push(String(i + 1));
      //i+1???index???0????????????????????????i+1????????????1??????????????????????????????
    });
  }
  const paths = listPaths.map((id) => ({
    params: { number: id },
  }));
  return {
    paths,
    fallback: false,
  };
};
