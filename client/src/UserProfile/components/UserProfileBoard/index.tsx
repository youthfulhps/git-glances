import React from 'react';
import { SuspenseQuery } from '@suspensive/react-query';
import { userQueryOptions } from '../../queries/useUserQuery';
import { userEventsQueryOptions } from '../../queries/useUserEventsQuery';
import ProfileOverview from './ProfileOverview';
import ProfileStats from './ProfileStats';
import ActivityTimeline from './ActivityTimeline';
import ActivityHeatmap from './ActivityHeatmap';
import DeveloperPersona from './DeveloperPersona';
import FunFacts from './FunFacts';
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

              {/* Activity Timeline and Heatmap */}
              <SuspenseQuery {...userEventsQueryOptions(user.login)}>
                {({ data }) => (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <ActivityTimeline events={data} />
                      <ActivityHeatmap events={data} />
                    </div>

                    {/* Developer Persona with AI */}
                    <DeveloperPersona events={data} username={user.login} />

                    {/* Fun Facts */}
                    <FunFacts events={data} />
                  </>
                )}
              </SuspenseQuery>
            </div>
          )}
        </SuspenseQuery>
      </SuspenseBoundary>
    </div>
  );
}

export default UserProfileBoard;
