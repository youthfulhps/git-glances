import Grid from '@layout/components/Grid';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import Main from '@layout/components/Main';
import Login from '../../../Login/components';
import UserProfile from '../../../UserProfile/components';
import Language from '../../../Language/components';
import Contribution from '../../../Contribution/components';
import Refactor from '../../../Refactor/components';
import Daily from '../../../Daily/components';
import Trends from '../../../Trends/components';
import Notification from '../../../Notification/components';
import Enhance from '../../../Enhance/components';
import Search from '../../../Search/components';

function HomePage() {
  return (
    <Main>
      {/* <Header /> */}
      <Grid>
        <Search />
        <Login />
        <UserProfile />
        <Language />
        <Contribution />
        <SuspenseBoundary gridArea="Contribution">
          <Contribution />
        </SuspenseBoundary>
        <SuspenseBoundary gridArea="Refactor">
          <Refactor />
        </SuspenseBoundary>
        <SuspenseBoundary gridArea="Daily">
          <Daily />
        </SuspenseBoundary>
        <SuspenseBoundary gridArea="Trends">
          <Trends />
        </SuspenseBoundary>
        <Notification />
        <SuspenseBoundary gridArea="Enhance">
          <Enhance />
        </SuspenseBoundary>
      </Grid>
    </Main>
  );
}

export default HomePage;
