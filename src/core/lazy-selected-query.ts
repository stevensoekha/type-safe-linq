import { GetIterableType, Iterable, NonIterable } from '../utils'
import { LazyQuery } from './lazy-query'
import { SelectedQuery } from './selected-query'
import { Fun } from '../lib/fun'
import { Query } from './query'

export type LazySelectedQuery<a, b> = {
    select: <k extends NonIterable<a>>(...properties: k[]) => LazySelectedQuery<Omit<a, k>, b & Pick<a, k>>
    include: <k extends Iterable<a>, a2 extends GetIterableType<a[k]>, k2 extends keyof a2>(
        property: k,
        query: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ) => LazySelectedQuery<Omit<a, k>, b & Pick<a, k>>
    toList: (data: Query<any>) => Array<b>
}

export const LazySelectedQuery = <a, b>(query: Fun<Query<a>, SelectedQuery<a, b>>): LazySelectedQuery<a, b> => ({
    select: <k extends NonIterable<a>>(...properties: k[]): LazySelectedQuery<Omit<a, k>, b & Pick<a, k>> =>
        LazySelectedQuery(query.then(Fun((x) => x.select(...properties)))),
    include: <k extends Iterable<a>, a2 extends GetIterableType<a[k]>, k2 extends keyof a2>(
        property: k,
        subquery: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ): LazySelectedQuery<Omit<a, k>, b & Pick<a, k>> =>
        LazySelectedQuery(query.then(Fun((x) => x.include(property, subquery)))),
    toList: (data: Query<any>) => query.f(data).toList(),
})
