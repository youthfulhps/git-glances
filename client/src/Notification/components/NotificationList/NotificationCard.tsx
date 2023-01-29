import React from 'react';
import { Notification } from '@shared/apis/notification';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import { DotFillIcon } from '@primer/octicons-react';
import useNotification from '../../hooks/useNotification';

type NotificationCardProps = {
  notification: Notification;
};

const StyledNotificationCard = styled.li<{ unread: boolean }>`
  ${({ unread }) => (unread ? tw`text-zinc-100` : tw`text-zinc-300`)};

  &:hover {
    ${({ unread }) => unread && tw`text-zinc-400`};
  }
`;

function NotificationCard({ notification }: NotificationCardProps) {
  const { routeNotificationThread } = useNotification();

  return (
    <StyledNotificationCard
      role="link"
      unread={notification.unread}
      className="relative mb-1 flex w-[calc(100%_-_16px)] cursor-pointer items-center justify-between py-2 text-start text-sm"
      onClick={() => routeNotificationThread(notification.subject.url)}
    >
      {notification.unread ? (
        <DotFillIcon className="absolute top-[-2px] left-[-4px] fill-emerald-300" />
      ) : null}
      <div className="flex w-full flex-col">
        <span className="truncate">{notification.repository.full_name}</span>
        <p className="truncate text-xs">{notification.subject.title}</p>
        <p className="truncate text-xs">{getRelativeTimeFromNow(notification.updated_at)}</p>
      </div>
    </StyledNotificationCard>
  );
}

export default NotificationCard;
