import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BlogCard from '../../components/BlogCard';
import SelectButton from '../../components/SelectButton';
import { getDatabase } from '../../lib/notion/get-database';
import PageList from '../../lib/pagenation/PageList';

export default function Page({ params }) {
  const router = useRouter();
  const { number } = router.query;
  //number = router.query.numberと同じ。分割代入
  //paramsはgetStaticPropsのdatabase=[{page1},{page2}...]を受け取っている。
  const new_params = params.slice(0 + 6 * (Number(number) - 1), 6 + 6 * (Number(number) - 1));
  //paramsを6個ずつにスライスしてdatabaseを分割
  const pageList: string[] = PageList(params);
  console.log(pageList);
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
              プログラミング
            </div>
            <div className='inline-block font-bold text-font-black'>
              {number}/
              {params.length % 6 === 0
                ? Math.floor(params.length / 6).toString()
                : (Math.floor(params.length / 6) + 1).toString()}
              ページ
            </div>
          </div>
          <div className='grid grid-cols-3 grid-rows-2 gap-10 py-16'>
            {new_params.map((post, i) => {
              //postsからnew_paramsに変更しただけ
              return (
                <BlogCard
                  key={i}
                  title={post.properties.title.title[0].plain_text}
                  date={post.properties.date.date.start}
                  tag={post.properties.tag.multi_select.map((tag) => {
                    return tag.name;
                  })}
                  href={post.id}
                />
              );
            })}
          </div>
          <div className='mx-auto flex items-center justify-center gap-1   text-white'>
            <button className='rounded-l-md bg-button-green p-3'>前へ</button>
            <button className='flex justify-between gap-4 bg-button-green py-3 pl-10 pr-4'>
              <div>1/26</div>
              <div>v</div>
            </button>
            <SelectButton numbers={pageList} />
            <button className='rounded-r-md bg-button-green p-3'>次へ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const databaseId = process.env.NOTION_DATABASE_ID;
export const getStaticProps: GetStaticProps = async () => {
  const database = await getDatabase(databaseId);
  //database = [{仮ページ3},{仮ページ2},{仮ページ1}・・・]
  return {
    props: {
      params: database,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  //databaseはresponse.resultsと同様のオブジェクト
  //getStaticPathsは名前の通りpathsを作り出す。pathsはcontextとしてgetStaticPropsで受け取ることが可能。
  const pageNumber: number = Math.floor(database.length / 6);
  const listPaths: string[] = [];
  if (database.length % 6 === 0) {
    [...Array(pageNumber)].map((_, i) => {
      listPaths.push(String(i + 1));
    });
    //[...Array()]は要素の個数はあるものの空のリストなのでそこから番号が振られたリスト（listPaths）を作成する！
  } else {
    [...Array(pageNumber + 1)].map((_, i) => {
      listPaths.push(String(i + 1));
      //i+1はindexが0スタートのため。i+1とすれば1スタートになるので。
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
