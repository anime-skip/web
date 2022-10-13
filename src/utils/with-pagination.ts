import { ApiClient } from './graphql.generated';

interface PaginationData {
  /**
   * If there's a next page, this value is the next offset. If there's not a next page, this value
   * is `undefined`.
   */
  nextOffset?: number;
}

interface PaginationVars {
  offset?: number;
  limit?: number;
}

/**
 * Convert a query that doesn't include a "nextOffset" in the query response to include one. The
 * result can be used with a paginated vue-query.
 */
export function withPagination<TMethod extends (vars: PaginationVars) => any, TListItem>(
  method: TMethod,
  getList: (res: Awaited<ReturnType<TMethod>>) => TListItem[],
  defaultLimit: number,
) {
  return async (vars: PaginationVars): Promise<Awaited<ReturnType<TMethod>> & PaginationData> => {
    const limit = vars.limit ?? defaultLimit;
    const res = await method({ ...vars, limit });
    const nextOffset = getList(res).length < limit ? undefined : (vars.offset ?? 0) + limit;
    return {
      ...res,
      nextOffset,
    };
  };
}
