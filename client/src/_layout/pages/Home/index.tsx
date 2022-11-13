import GridMain from '@layout/components/GridMain';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import Login from '../../../Login/components';
import UserProfile from '../../../UserProfile/components';

function HomePage() {
  return (
    <GridMain>
      <Login />
      <SuspenseBoundary gridArea="user-profile">
        <UserProfile />
      </SuspenseBoundary>
    </GridMain>
  );
}

export default HomePage;
