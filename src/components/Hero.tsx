import Image from 'next/image';

export default function Hero() {
  return (
    <div className=' relative bg-bg-green text-white'>
      <Image src='/bg-hero.png' alt='bg_Hero' layout='fill' objectFit='cover' />
      <div className='max-w-2lg flex items-center  gap-32 py-10'>
        <div className='mx-auto flex w-1/2 items-center justify-center gap-4'>
          <h1 className='text-4xl font-extrabold'>ブログ</h1>
          <h2 className='text-2xl font-bold'>BLOG</h2>
        </div>
        <div className='w-1/2'>
          <Image src='/edited-hero.png' alt='Hero' width={425} height={250} />
        </div>
      </div>
    </div>
  );
}
