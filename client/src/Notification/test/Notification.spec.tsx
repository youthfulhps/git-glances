import { render, screen } from '@testing-library/react';
import { getRelativeTimeFromNow } from '@shared/utils/date';
import { Notification as INotification } from '@shared/apis/notification';
import { RecoilRoot } from 'recoil';
import { mockedNotificationList } from './mocks';
import useNotificationListQuery from '../queries/useNotificationListQuery';
import Notification from '../components';

jest.mock('../queries/useNotificationListQuery');

const mockedUseNotificationListQuery = useNotificationListQuery as jest.Mock<{
  notificationList: INotification[];
  notificationUnreadCount: number;
  isNotificationEmpty: boolean;
}>;

describe('Notification 섹션은 알림 리스트 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseNotificationListQuery.mockImplementation(() => ({
      notificationList: mockedNotificationList,
      notificationUnreadCount: 1,
      isNotificationEmpty: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('알림 발생의 저장소과 제목, 업데이트된 시간을 제공한다.', async () => {
    render(
      <RecoilRoot>
        <Notification />
      </RecoilRoot>
    );
    const notificationRepo = await screen.findByText(
      mockedNotificationList[0].repository.full_name
    );
    const notificationTitle = await screen.findByText(mockedNotificationList[0].subject.title);
    const notificationRelativeTime = await screen.findByText(
      getRelativeTimeFromNow(mockedNotificationList[0].updated_at)
    );

    expect(notificationRepo).toBeInTheDocument();
    expect(notificationTitle).toBeInTheDocument();
    expect(notificationRelativeTime).toBeInTheDocument();
  });
});
