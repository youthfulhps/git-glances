import { axiosInstance } from '@shared/apis';

const useNotification = () => {
  const getNotificationThreadLink = async (notificationFetchUrl: string) => {
    try {
      const { data } = await axiosInstance.get(notificationFetchUrl);
      return data.html_url;
    } catch (error) {
      console.log('error occurred!');
      return '';
    }
  };

  const routeNotificationThread = async (notificationFetchUrl: string) => {
    const threadURL = await getNotificationThreadLink(notificationFetchUrl);
    if (threadURL) {
      window.open(threadURL, '_blank');
    }
  };

  return {
    routeNotificationThread,
  };
};

export default useNotification;
