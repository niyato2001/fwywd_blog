import Link from 'next/link';

interface Props {
  title: string;
  date: string;
  tag1: string;
  tag2: string;
  href: string;
}

export default function BlogCard(props: Props) {
  return (
    <Link href='/posts/[{props.href}]'>
      <a className='flex max-h-96 max-w-md flex-col'>
        <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
        <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
          <div className='text-bg-gray-dark'>{props.date}</div>
          <div className='text-font-black line-clamp-2'>{props.title}</div>
          <div className='flex gap-1 text-bg-gray-dark'>
            <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
              {props.tag1}
            </div>
            <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
              {props.tag2}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
