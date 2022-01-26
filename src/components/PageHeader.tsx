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
      <div className='flex w-1/4 items-center justify-center gap-4'>
        <button className='h-1/3 w-1/3 rounded-md bg-button-green text-xs text-white'>投稿</button>
        <button className='h-1/3 w-1/3  rounded-md border-2 border-button-border text-xs text-font-green'>
          ログアウト
        </button>
      </div>
    </div>
  );
}
