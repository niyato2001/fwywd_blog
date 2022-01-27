import Image from 'next/image';

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
        <div className='grid grid-cols-3 grid-rows-2 gap-10 py-16'>
          <a href='https:' className='flex max-h-96 max-w-md flex-col'>
            <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
            <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
              <div className='text-bg-gray-dark'>2022.01.01</div>
              <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
              <div className='flex gap-1 text-bg-gray-dark'>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
              </div>
            </div>
          </a>
          <a href='https:' className='flex max-h-96 max-w-md flex-col'>
            <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
            <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
              <div className='text-bg-gray-dark'>2022.01.01</div>
              <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
              <div className='flex gap-1 text-bg-gray-dark'>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
              </div>
            </div>
          </a>
          <a href='https:' className='flex max-h-96 max-w-md flex-col'>
            <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
            <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
              <div className='text-bg-gray-dark'>2022.01.01</div>
              <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
              <div className='flex gap-1 text-bg-gray-dark'>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
              </div>
            </div>
          </a>
          <a href='https:' className='flex max-h-96 max-w-md flex-col'>
            <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
            <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
              <div className='text-bg-gray-dark'>2022.01.01</div>
              <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
              <div className='flex gap-1 text-bg-gray-dark'>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
              </div>
            </div>
          </a>
          <a href='https:' className='flex max-h-96 max-w-md flex-col'>
            <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
            <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
              <div className='text-bg-gray-dark'>2022.01.01</div>
              <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
              <div className='flex gap-1 text-bg-gray-dark'>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
              </div>
            </div>
          </a>
          <a href='https:' className='flex max-h-96 max-w-md flex-col'>
            <div className='h-44 rounded-t-md bg-bg-gray-dark'></div>
            <div className='flex h-52 flex-col gap-4 rounded-b-md bg-white p-10'>
              <div className='text-bg-gray-dark'>2022.01.01</div>
              <div className='text-font-black'>titletitletitletitletitletitletitletitletitle</div>
              <div className='flex gap-1 text-bg-gray-dark'>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
                <div className='rounded-md border-2 border-bg-gray-dark px-3 py-1 text-xs'>
                  タグ
                </div>
              </div>
            </div>
          </a>
        </div>
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
