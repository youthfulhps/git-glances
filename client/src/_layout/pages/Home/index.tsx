import Grid from '@layout/components/Grid';
import Main from '@layout/components/Main';
import UserProfile from '../../../UserProfile/components';
import Language from '../../../Language/components';
import Contribution from '../../../Contribution/components';
import Search from '../../../Search/components';
import Notification from '../../../Notification/components';
import Board from '../../../Board/components';
import TrendsSummary from '../../../Trends/components/TrendsSummary';
import StarredSummary from '../../../Starred/components/StarredSummary';
import Setting from '../../../Setting/components';

function HomePage() {
  return (
    <Main>
      <div className="flex w-full gap-4">
        <div className="sticky top-24 h-[640px] w-[30%] min-w-[360px] flex-shrink-0">
          <Grid>
            <Search />
            <UserProfile />
            <Language />
            <Contribution />
            <Notification />
            <TrendsSummary />
            <StarredSummary />
            <Setting />
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
