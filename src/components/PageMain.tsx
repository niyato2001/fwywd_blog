import Image from 'next/image';
import SelectButton from '../components/SelectButton';
import PageList from '../lib/pagenation/PageList';
import BlogCard from './BlogCard';

export default function PageMain(props): JSX.Element {
  const pageList: string[] = PageList(props.posts);
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
          {props.posts.map((post, i) => {
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
          <button className='rounded-l-md bg-button-green p-3'>前へ</button>
          <SelectButton numbers={pageList} />
          <button className='rounded-r-md bg-button-green p-3'>次へ</button>
        </div>
      </div>
    </div>
  );
}
