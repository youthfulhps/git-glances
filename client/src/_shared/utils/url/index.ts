import { GetURLWithProtocol, IsValidURL } from '@shared/utils/url/types';

export const isValidURL: IsValidURL = (url: string) => {
  const regexrWithProtocol =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  const regexrWithoutProtocol =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  return regexrWithProtocol.test(url) || regexrWithoutProtocol.test(url);
};

export const getURLWithProtocol: GetURLWithProtocol = (url: string) => {
  const regexr = /^https?:/;
  return regexr.test(url) ? url : `https://${url}`;
};
