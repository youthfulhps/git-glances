import React from 'react';
import { SuspenseQuery } from '@suspensive/react-query';
import { userQueryOptions } from '../../queries/useUserQuery';
import ProfileOverview from './ProfileOverview';
import ProfileStats from './ProfileStats';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';

function UserProfileBoard() {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Profile</div>
      </div>

      <SuspenseBoundary>
        <SuspenseQuery {...userQueryOptions}>
          {({ data: { data: user } }) => (
            <div className="flex flex-col gap-3">
              {/* Overview */}
              <ProfileOverview user={user} />

              {/* Stats */}
              <ProfileStats user={user} />
            </div>
          )}
        </SuspenseQuery>
      </SuspenseBoundary>
    </div>
  );
}

export default UserProfileBoard;
