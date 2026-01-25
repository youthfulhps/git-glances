import '@testing-library/jest-dom';

process.env.IS_WEB = 'true';

global.TransformStream = class TransformStream {} as any;
