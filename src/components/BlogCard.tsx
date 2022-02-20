import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  date: string;
  tag: string[];
  href: string;
  image: string;
}

export default function BlogCard(props: Props) {
  return (
    <Link href={`/posts/${props.href}`}>
      <a className='flex h-auto max-w-md flex-col divide-y-2'>
        <Image src={props.image} alt='article_image' width={480} height={270} objectFit='contain' />
        <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-8'>
          <div className='text-bg-gray-dark'>{props.date}</div>
          <div className='text-font-black line-clamp-2'>{props.title}</div>
          <div className='flex gap-1 text-bg-gray-dark'>
            {props.tag.map((tag, i) => {
              return (
                <div key={i} className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </a>
    </Link>
  );
}
