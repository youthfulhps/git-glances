export type GetDiffDaysFromNow = (target: string | Date) => number;

export type GetTodayDate = () => string;

export type GetDateAfterDays = (days: number) => string;

export type GetNow = () => string;

export type IsToday = (target: string | Date) => boolean;

export type GetRelativeTimeFromNow = (target: string | Date) => string;

export type GetMonthRange = () => string;
