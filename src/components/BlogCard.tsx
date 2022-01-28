import Link from 'next/link';

export default function BlogCard() {
  return (
    <Link href='/posts/[1]'>
      <a className='flex max-h-96 max-w-md flex-col'>
        <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
        <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
          <div className='text-bg-gray-dark'>2022.01.01</div>
          <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
          <div className='flex gap-1 text-bg-gray-dark'>
            <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>タグ</div>
            <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>タグ</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
