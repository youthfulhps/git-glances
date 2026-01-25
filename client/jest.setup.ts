import '@testing-library/jest-dom/extend-expect';

process.env.IS_WEB = 'true';

global.TransformStream = class TransformStream {} as any;
