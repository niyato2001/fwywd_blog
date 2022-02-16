import Router, { useRouter } from 'next/router';
import { getStaticProps } from '../pages';

interface Props {
  numbers: string[];
}

export default function SelectButton(props: Props) {
  const router = useRouter();
  return (
    <select
      className='!ml-1/2 rounded-md p-4 px-20 text-font-black'
      //stackoverflowhttps://stackoverflow.com/questions/10813528/is-it-possible-to-center-text-in-select-boxを参考
      onChange={(e) => Router.push(e.target.value)}
      defaultValue={router.pathname}
    >
      <option value='/'>Home</option>
      {props.numbers.map((number, i, array) => {
        return (
          <option key={i} value={`/blogtables/${number}`}>
            ページ{number}/{array.length}
          </option>
        );
      })}
    </select>
  );
}
