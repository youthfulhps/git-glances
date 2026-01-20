import React from 'react';
import { Mutation } from '@suspensive/react-query';
import { SparkleFillIcon } from '@primer/octicons-react';
import { UserEvent } from '@shared/apis/user/types';
import { developerPersonaMutationOptions } from '../../mutations/useDeveloperPersonaMutation';
import ShinyText from '@shared/components/ShinyText/ShinyText';
import StarBorder from '@shared/components/StarBorder';

type DeveloperPersonaProps = {
  events: UserEvent[];
  username: string;
};

function DeveloperPersona({ events, username }: DeveloperPersonaProps) {
  return (
    <Mutation {...developerPersonaMutationOptions()}>
      {({ mutate, isPending, isError, data, error }) => {
        const handleGenerate = () => {
          mutate({
            events: events.map((e) => ({
              type: e.type,
              created_at: e.created_at,
            })),
            username,
          });
        };

        // Initial state: show generate button
        if (!data && !isPending && !isError) {
          return (
            <StarBorder
              as="button"
              onClick={handleGenerate}
              className="w-full"
              innerClassName="flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 hover:border-zinc-600 hover:via-zinc-900/90 hover:to-zinc-900"
              color="rgba(250, 250, 250, 0.8)"
              speed="8s"
              thickness={1}
            >
              <SparkleFillIcon size={12} className="fill-zinc-400" />
              <ShinyText
                text="Generate Developer Persona"
                className="text-sm font-medium text-zinc-700"
                speed={2}
              />
            </StarBorder>
          );
        }

        // Loading state
        if (isPending) {
          return (
            <StarBorder
              as="div"
              innerClassName="flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950"
              color="rgba(250, 250, 250, 0.8)"
              speed="8s"
              thickness={1}
            >
              <SparkleFillIcon size={12} className="fill-zinc-400" />
              <ShinyText
                text="Analyzing your activity patterns..."
                className="text-sm font-medium text-zinc-700"
                speed={2}
              />
            </StarBorder>
          );
        }

        // Error state
        if (isError) {
          return (
            <div className="flex flex-col gap-2 rounded-lg border border-red-900/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 p-3">
              <p className="text-sm text-red-300/80">
                {error?.message || 'Failed to generate developer persona'}
              </p>
              <button
                onClick={handleGenerate}
                className="mt-1 text-sm text-red-400 underline hover:text-red-300"
              >
                Retry
              </button>
            </div>
          );
        }

        // Success state with data
        if (data) {
          return (
            <StarBorder
              as="div"
              innerClassName="flex flex-col gap-3 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950"
              color="rgba(250, 250, 250, 0.8)"
              speed="8s"
              thickness={1}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <SparkleFillIcon size={12} className="fill-zinc-200" />
                  <ShinyText
                    text="Developer Persona"
                    className="text-sm font-medium text-zinc-700"
                    speed={5}
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  className="text-xs text-zinc-500 underline transition-colors hover:text-zinc-400"
                >
                  Regenerate
                </button>
              </div>

              {/* Persona Title */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-zinc-100">{data.persona}</h3>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-zinc-300">{data.description}</p>

              {/* Traits */}
              {data.traits && data.traits.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {data.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-zinc-500/30 px-2 py-1 text-xs text-zinc-400"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex flex-col gap-1.5 rounded-md border border-zinc-700/50 bg-zinc-800/50 p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Most Active Day</span>
                  <span className="text-sm font-medium text-zinc-300">
                    {data.stats.mostActiveDay}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Most Active Time</span>
                  <span className="text-sm font-medium text-zinc-300">
                    {data.stats.mostActiveTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Weekday vs Weekend</span>
                  <span className="text-sm font-medium text-zinc-300">
                    {data.stats.weekdayVsWeekend}
                  </span>
                </div>
              </div>
            </StarBorder>
          );
        }

        return null;
      }}
    </Mutation>
  );
}

export default DeveloperPersona;
