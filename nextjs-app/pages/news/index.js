import Link from 'next/link';

function news() {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href='/news/nextjs-great'>NextJS Is A great</Link>
        </li>
        <li>222</li>
        <li>3333</li>
      </ul>
    </>
  );
}

export default news;
