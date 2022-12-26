import GridMain from '@layout/components/GridMain';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import Login from '../../../Login/components';
import UserProfile from '../../../UserProfile/components';
import Language from '../../../Language/components';
import Repository from '../../../Repository/components';
import Contribution from '../../../Contribution/components';

function HomePage() {
  return (
    <GridMain>
      <Login />
      <SuspenseBoundary gridArea="Profile">
        <UserProfile />
      </SuspenseBoundary>
      <SuspenseBoundary gridArea="language">
        <Language />
      </SuspenseBoundary>
      <SuspenseBoundary gridArea="Contribution">
        <Contribution />
      </SuspenseBoundary>
      <SuspenseBoundary gridArea="repository">
        <Repository />
      </SuspenseBoundary>
    </GridMain>
  );
}

export default HomePage;
