import Router, { useRouter } from 'next/router';
import { getStaticProps } from '../pages';

interface Props {
  numbers: string[];
}

export default function SelectButton(props: Props) {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <select
      className='!ml-1/2  rounded-md bg-button-green p-3 px-20 text-white'
      //stackoverflowhttps://stackoverflow.com/questions/10813528/is-it-possible-to-center-text-in-select-boxを参考
      onChange={(e) => Router.push(e.target.value)}
      defaultValue={decodeURI(router.asPath)}
      //router.pathnameだと/blogtables/[number]としかurlがとれないのでasPathとして/blogtables/1ととれるように変更。
      //decodeURIを追加して文字化けを予防
    >
      <option value='/' className='bg-white text-font-black'>
        Home
      </option>
      {props.numbers.map((number, i, array) => {
        return (
          <option key={i} value={`/blogtables/${number}`} className='bg-white text-font-black'>
            ページ{number}/{array.length}
          </option>
        );
      })}
    </select>
  );
}
