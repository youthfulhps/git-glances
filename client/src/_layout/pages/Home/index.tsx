import Grid from '@layout/components/Grid';
import Main from '@layout/components/Main';
import Login from '../../../Login/components';
import UserProfile from '../../../UserProfile/components';
import Language from '../../../Language/components';
import Contribution from '../../../Contribution/components';
import Search from '../../../Search/components';
import Notification from '../../../Notification/components';
import Board from '../../../Board/components';
import TrendsSummary from '../../../Trends/components/TrendsSummary';

function HomePage() {
  return (
    <Main>
      <div className="flex w-full gap-4">
        <div className="sticky top-24 h-[560px] w-[30%] flex-shrink-0">
          <Grid>
            <Search />
            <Login />
            <UserProfile />
            <Language />
            <Contribution />
            <Notification />
            <TrendsSummary />
          </Grid>
        </div>
        <div className="relative min-h-screen w-[70%] pb-24 pt-24">
          <Board />
        </div>
      </div>
    </Main>
  );
}

export default HomePage;
