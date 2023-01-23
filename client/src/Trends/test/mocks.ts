import { ListSearchNestedFieldResponse } from '@shared/apis/types';
import { TrendsRepository } from '@shared/apis/repo';

export const mockedRawTrendsRepoList: ListSearchNestedFieldResponse<TrendsRepository> = {
  data: {
    search: {
      edges: [
        {
          node: {
            url: 'https://github.com/ozcanzaferayan/MovieList',
            name: 'MovieList',
            description: '',
            pushedAt: '2023-01-22T23:30:24Z',
            updatedAt: '2023-01-23T13:26:23Z',
            stargazers: { totalCount: 20 },
            forks: { totalCount: 1 },
          },
        },
        {
          node: {
            url: 'https://github.com/TradeDoge/Crypto-Bot',
            name: 'Crypto-Bot',
            description:
              'Backtesting and Trading Bots Made Easy for Crypto, Stocks, Options, Futures, FOREX and more',
            pushedAt: '2023-01-23T15:45:29Z',
            updatedAt: '2023-01-23T12:36:08Z',
            stargazers: { totalCount: 10 },
            forks: { totalCount: 9 },
          },
        },
        {
          node: {
            url: 'https://github.com/prateekoctane/login_signup_ecommerce',
            name: 'login_signup_ecommerce',
            description:
              "I have tried to make the Login & Signup functionality for a website, using react-redux and browser's local storage.",
            pushedAt: '2023-01-23T14:18:59Z',
            updatedAt: '2023-01-23T15:02:02Z',
            stargazers: { totalCount: 7 },
            forks: { totalCount: 0 },
          },
        },
        {
          node: {
            url: 'https://github.com/Dipanshukumar21/Keeper',
            name: 'Keeper',
            description: 'A Front-End Project Using React (mainly).',
            pushedAt: '2023-01-23T07:25:32Z',
            updatedAt: '2023-01-23T14:13:17Z',
            stargazers: { totalCount: 6 },
            forks: { totalCount: 0 },
          },
        },
        {
          node: {
            url: 'https://github.com/oemuraye/bincom',
            name: 'bincom',
            description: '',
            pushedAt: '2023-01-23T05:33:12Z',
            updatedAt: '2023-01-23T06:29:15Z',
            stargazers: { totalCount: 3 },
            forks: { totalCount: 0 },
          },
        },
        {
          node: {
            url: 'https://github.com/gavin85-Zeng/Notion-Clone',
            name: 'Notion-Clone',
            description: 'Clone some small functions to practice',
            pushedAt: '2023-01-23T09:34:29Z',
            updatedAt: '2023-01-23T09:55:42Z',
            stargazers: { totalCount: 3 },
            forks: { totalCount: 0 },
          },
        },
        {
          node: {
            url: 'https://github.com/sabilaed/vaadin-oauth2-sample',
            name: 'vaadin-oauth2-sample',
            description: 'Sample vaadin oauth2 project',
            pushedAt: '2023-01-22T15:05:46Z',
            updatedAt: '2023-01-23T00:54:16Z',
            stargazers: { totalCount: 3 },
            forks: { totalCount: 0 },
          },
        },
        {
          node: {
            url: 'https://github.com/rajendernain/NodeApi',
            name: 'NodeApi',
            description: 'node js api',
            pushedAt: '2023-01-23T10:15:05Z',
            updatedAt: '2023-01-23T10:33:09Z',
            stargazers: { totalCount: 3 },
            forks: { totalCount: 2 },
          },
        },
        {
          node: {
            url: 'https://github.com/JonathanTurnock/dcs-global-terrain-database',
            name: 'dcs-global-terrain-database',
            description: 'Global Terrain Database for DCS. GeoJSON Features for all terrains.',
            pushedAt: '2023-01-23T00:53:12Z',
            updatedAt: '2023-01-23T02:28:36Z',
            stargazers: { totalCount: 3 },
            forks: { totalCount: 0 },
          },
        },
        {
          node: {
            url: 'https://github.com/Laurence2014/Routing-demo',
            name: 'Routing-demo',
            description: '',
            pushedAt: '2023-01-23T11:06:20Z',
            updatedAt: '2023-01-23T11:17:24Z',
            stargazers: { totalCount: 3 },
            forks: { totalCount: 0 },
          },
        },
      ],
    },
  },
};

export const mockedDestructuredTrendsRepoList = [
  {
    url: 'https://github.com/ozcanzaferayan/MovieList',
    name: 'MovieList',
    description: '',
    pushedAt: '2023-01-22T23:30:24Z',
    updatedAt: '2023-01-23T13:26:23Z',
    stargazers: { totalCount: 20 },
    forks: { totalCount: 1 },
  },
  {
    url: 'https://github.com/TradeDoge/Crypto-Bot',
    name: 'Crypto-Bot',
    description:
      'Backtesting and Trading Bots Made Easy for Crypto, Stocks, Options, Futures, FOREX and more',
    pushedAt: '2023-01-23T15:45:29Z',
    updatedAt: '2023-01-23T12:36:08Z',
    stargazers: { totalCount: 10 },
    forks: { totalCount: 9 },
  },
  {
    url: 'https://github.com/prateekoctane/login_signup_ecommerce',
    name: 'login_signup_ecommerce',
    description:
      "I have tried to make the Login & Signup functionality for a website, using react-redux and browser's local storage.",
    pushedAt: '2023-01-23T14:18:59Z',
    updatedAt: '2023-01-23T15:02:02Z',
    stargazers: { totalCount: 7 },
    forks: { totalCount: 0 },
  },
  {
    url: 'https://github.com/Dipanshukumar21/Keeper',
    name: 'Keeper',
    description: 'A Front-End Project Using React (mainly).',
    pushedAt: '2023-01-23T07:25:32Z',
    updatedAt: '2023-01-23T14:13:17Z',
    stargazers: { totalCount: 6 },
    forks: { totalCount: 0 },
  },
  {
    url: 'https://github.com/oemuraye/bincom',
    name: 'bincom',
    description: '',
    pushedAt: '2023-01-23T05:33:12Z',
    updatedAt: '2023-01-23T06:29:15Z',
    stargazers: { totalCount: 3 },
    forks: { totalCount: 0 },
  },
  {
    url: 'https://github.com/gavin85-Zeng/Notion-Clone',
    name: 'Notion-Clone',
    description: 'Clone some small functions to practice',
    pushedAt: '2023-01-23T09:34:29Z',
    updatedAt: '2023-01-23T09:55:42Z',
    stargazers: { totalCount: 3 },
    forks: { totalCount: 0 },
  },
  {
    url: 'https://github.com/sabilaed/vaadin-oauth2-sample',
    name: 'vaadin-oauth2-sample',
    description: 'Sample vaadin oauth2 project',
    pushedAt: '2023-01-22T15:05:46Z',
    updatedAt: '2023-01-23T00:54:16Z',
    stargazers: { totalCount: 3 },
    forks: { totalCount: 0 },
  },
  {
    url: 'https://github.com/rajendernain/NodeApi',
    name: 'NodeApi',
    description: 'node js api',
    pushedAt: '2023-01-23T10:15:05Z',
    updatedAt: '2023-01-23T10:33:09Z',
    stargazers: { totalCount: 3 },
    forks: { totalCount: 2 },
  },
  {
    url: 'https://github.com/JonathanTurnock/dcs-global-terrain-database',
    name: 'dcs-global-terrain-database',
    description: 'Global Terrain Database for DCS. GeoJSON Features for all terrains.',
    pushedAt: '2023-01-23T00:53:12Z',
    updatedAt: '2023-01-23T02:28:36Z',
    stargazers: { totalCount: 3 },
    forks: { totalCount: 0 },
  },
  {
    url: 'https://github.com/Laurence2014/Routing-demo',
    name: 'Routing-demo',
    description: '',
    pushedAt: '2023-01-23T11:06:20Z',
    updatedAt: '2023-01-23T11:17:24Z',
    stargazers: { totalCount: 3 },
    forks: { totalCount: 0 },
  },
];
