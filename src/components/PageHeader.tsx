import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PageHeader(): JSX.Element {
  return (
    <div className='flex justify-between'>
      <Image src='/logo.png' alt='headerlogo' width={200} height={100} />
      <div className='flex w-1/6 items-center justify-around'>
        <button>投稿</button>
        <button>ログアウト</button>
      </div>
    </div>
  );
}
