import { Fun } from '../lib/fun'
import { LazySelectedQuery } from './lazy-selected-query'
import { Query } from './query'
import { SelectedQuery } from './selected-query'
import { Unit } from '../lib/unit'
import { NonIterable } from '../utils'

export type LazyQuery<a> = {
    select: <k extends NonIterable<a>>(...properties: k[]) => LazySelectedQuery<Omit<a, k>, Pick<a, k>>
}

export const LazyQuery = <a>(query: Fun<Query<a>, Query<a>>): LazyQuery<a> => ({
    select: <k extends NonIterable<a>>(...properties: k[]): LazySelectedQuery<Omit<a, k>, Pick<a, k>> =>
        LazySelectedQuery(query.then(Fun((x) => x.select(...properties)))),
})
