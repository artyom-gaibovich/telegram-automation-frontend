import './MainPage.scss';
import App from '@pages/App';
import { bem } from '@shared/libs';

const b = bem('main-page');

const MainPage = () => {
  return (
    <div className={b()}>
      <App></App>
    </div>
  );
};

export default MainPage;
