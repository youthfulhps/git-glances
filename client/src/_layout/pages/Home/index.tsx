import Grid from '@layout/components/Grid';
import Main from '@layout/components/Main';
import Login from '../../../Login/components';
import UserProfile from '../../../UserProfile/components';
import Language from '../../../Language/components';
import Contribution from '../../../Contribution/components';
import Search from '../../../Search/components';
import Notification from '../../../Notification/components';
import Board from '@layout/components/Board';

function HomePage() {
  return (
    <Main>
      {/* <Header /> */}
      <div className="flex items-center gap-2">
        <div className="h-[560px]">
          <Grid>
            <Search />
            <Login />
            <UserProfile />
            <Language />
            <Contribution />
            <Notification />
          </Grid>
        </div>
        <div className="h-screen flex-1 overflow-y-auto">
          <Board />
        </div>
      </div>
    </Main>
  );
}

export default HomePage;
