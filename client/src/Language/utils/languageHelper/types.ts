export type LanguageList = {
  [key: string]: string;
};

export type GetMergedLanguageList = (languageNodeList: any[]) => LanguageList;

export type GetDestructuredLanguageList = (rawLanguageList: any) => any;

export type SortedLanguageList = (languageList: LanguageList) => LanguageList;

export type GetLanguageColor = (language: string) => string;
