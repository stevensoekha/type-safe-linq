import { Pair } from './pair'
import { NonIterable } from '../utils/iterable'
import { Filter, FilterCondition } from './filter'

export type List<a> = {
    head: () => a
    tail: () => List<a>
    isEmpty: () => Boolean
    size: () => number
    map: <b>(f: (_: a) => b) => List<b>
    concat: (l2: List<a>) => List<a>
    toArray: () => Array<a>
    sort: <k extends NonIterable<a>>(property: k, order: 'ASC' | 'DESC') => List<a>
    filter: (f: (_: Filter<a>) => FilterCondition<a>) => List<a>
}

export const List = <a>(data: Array<a>): List<a> => ({
    head: (): a => data[0],
    tail: (): List<a> => List<a>(data.slice(1)),
    isEmpty: (): Boolean => data.length === 0,
    size: (): number => data.length,
    map: <b>(f: (_: a) => b): List<b> => List<b>(data.map(f)),
    concat: (l2: List<a>): List<a> => List<a>(data.concat(l2.toArray())),
    toArray: (): Array<a> => data,
    sort: <k extends NonIterable<a>>(property: k, order: 'ASC' | 'DESC'): List<a> =>
        List(
            data.sort((a, b) =>
                order === 'ASC' ? (a[property] > b[property] ? 1 : -1) : a[property] < b[property] ? 1 : -1
            )
        ),
    filter: (f: (_: Filter<a>) => FilterCondition<a>) => List<a>(data.filter((x) => f(Filter(x)).condition)),
})

export const zip = <a, b>(l1: List<a>, l2: List<b>): List<Pair<a, b>> =>
    l1.isEmpty() || l2.isEmpty()
        ? List<Pair<a, b>>([])
        : List<Pair<a, b>>([Pair(l1.head(), l2.head())]).concat(zip(l1.tail(), l2.tail()))

export const mergeZip = <a, b>(lst: List<Pair<a, b>>): List<a & b> =>
    List<a & b>(lst.map((x) => ({ ...x.fst(), ...x.snd() })).toArray())
