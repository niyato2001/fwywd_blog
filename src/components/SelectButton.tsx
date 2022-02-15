import Router, { useRouter } from 'next/router';
import { getStaticProps } from '../pages';

interface Props {
  numbers: string[];
}

export default function SelectButton(props: Props) {
  const router = useRouter();
  return (
    <select
      className='rounded-md p-4 px-20 text-center text-font-black'
      onChange={(e) => Router.push(e.target.value)}
      defaultValue={router.pathname}
    >
      <option value='/'>Home</option>
      {props.numbers.map((number, i) => {
        return (
          <option key={i} value={`/blogtables/${number}`}>
            ページ{number}
          </option>
        );
      })}
    </select>
  );
}
