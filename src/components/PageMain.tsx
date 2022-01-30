import Image from 'next/image';
import BlogCard from './BlogCard';

interface Props {
  title: string;
  date: string;
  tag: string;
}

export default function PageMain(): JSX.Element {
  return (
    <div className='bg-bg-gray-light'>
      <div className='mx-auto flex max-w-5xl flex-col py-16'>
        <div className='flex items-center justify-start gap-4'>
          <div className='inline-block rounded-md border-2 border-button-border px-3 py-1 text-xs text-font-green'>
            プログラミング
          </div>
          <div className='inline-block font-bold text-font-black'>1/26 ページ</div>
        </div>
        <div className='grid grid-cols-3 grid-rows-2 gap-10 py-16'></div>
        <div className='mx-auto flex items-center justify-center gap-1   text-white'>
          <button className='rounded-l-md bg-button-green p-3'>前へ</button>
          <button className='flex justify-between gap-4 bg-button-green py-3 pl-10 pr-4'>
            <div>1/26</div>
            <div>v</div>
          </button>
          <button className='rounded-r-md bg-button-green p-3'>次へ</button>
        </div>
      </div>
    </div>
  );
}
