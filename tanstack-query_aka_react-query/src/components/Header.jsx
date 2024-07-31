import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {
  const fetching = useIsFetching(); // 데이터를 어디서든 가져올 수 있다
  // 데이터를 가져오지 않으면 0, 가져오면 0보다 큼

  console.log(fetching);

  return (
    <>
      <div id='main-header-loading'>{fetching > 0 && <progress />}</div>
      <header id='main-header'>
        <div id='header-title'>
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
