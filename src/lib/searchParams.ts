import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsIsoDate, parseAsString } from 'nuqs/server';

export const searchParams = {
  q: parseAsString.withDefault('').withOptions({shallow:false,throttleMs:300}),
  mode: parseAsArrayOf(parseAsString).withDefault([]).withOptions({shallow:false}),
  page: parseAsInteger.withDefault(1).withOptions({shallow:false}),
  limit: parseAsInteger.withDefault(1).withOptions({shallow:false}),
  dateFrom:parseAsIsoDate,
  dateTo:parseAsIsoDate
};
export const searchParamsCache = createSearchParamsCache(searchParams);