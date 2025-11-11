import './MainPage.scss';
import { bem } from '@shared/libs';

const b = bem('main-page');

const MainPage = () => {
  return (
    <div className={b()}>
      <div>Hello world</div>
    </div>
  );
};

export default MainPage;
