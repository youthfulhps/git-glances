import { lazy } from 'react';

const Login = lazy(() => import(process.env.IS_WEB ? './WebLogin' : './ExtensionLogin'));

export default Login;
