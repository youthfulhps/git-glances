const useRouterHooks = async () => {
  if (process.env.IS_WEB === 'true') {
    const { useLocation, useNavigate } = await import('react-router-dom');
    return { useLocation, useNavigate };
  }

  return {
    useLocation: () => ({
      search: '/',
    }),
    useNavigate: () => () => {},
  };
};

export default useRouterHooks;
