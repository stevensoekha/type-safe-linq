import { Query } from './query'
import { State } from '../lib/state'
import { zip, mergeZip, List } from '../lib/list'
import { omitMany, omitOne, pickMany, GetIterableType, Iterable, NonIterable, IsType } from '../utils'
import { Filter, FilterCondition } from '../lib/filter'

export type SelectedQuery<a, b> = {
    select: <k extends NonIterable<a>>(...properties: k[]) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    include: <k extends Iterable<a>, a2 extends GetIterableType<a[k]>, k2 extends keyof a2>(
        property: k,
        query: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    orderBy: <k extends NonIterable<b>>(property: k, order: 'ASC' | 'DESC') => SelectedQuery<a, b>
    where: (f: (_: Filter<b>) => FilterCondition<b>) => SelectedQuery<a, b>
    groupBy: <k extends NonIterable<b>, c extends IsType<b[k], string>>(
        property: k
    ) => SelectedQuery<a, Record<c, Omit<b, k>[]>>
    toList: () => Array<b>
}

export const SelectedQuery = <a, b>(state: State<a, b>): SelectedQuery<a, b> => ({
    select: <k extends NonIterable<a>>(...properties: k[]): SelectedQuery<Omit<a, k>, b & Pick<a, k>> =>
        SelectedQuery(
            state.map(
                (selectable) => selectable.map((x) => omitMany(x, properties)),
                (selected) =>
                    mergeZip(
                        zip(
                            selected,
                            state.fst().map((x) => pickMany(x, properties))
                        )
                    )
            )
        ),
    include: <k extends Iterable<a>, a2 extends GetIterableType<a[k]>, k2 extends keyof a2>(
        property: k,
        query: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ): SelectedQuery<Omit<a, k>, b & Pick<a, k>> =>
        SelectedQuery(
            state.map(
                (selectable) => selectable.map((x) => omitOne(x, property)),
                (selected) =>
                    mergeZip(
                        zip(
                            selected,
                            state
                                .fst()
                                .map((x) => ({ [property]: query(Query(State(x[property] as any))).toList() } as any))
                        )
                    )
            )
        ),
    where: (f: (_: Filter<b>) => FilterCondition<b>): SelectedQuery<a, b> =>
        SelectedQuery(state.mapRight((selected) => selected.filter(f))),
    orderBy: <k extends NonIterable<b>>(property: k, order: 'ASC' | 'DESC'): SelectedQuery<a, b> =>
        SelectedQuery(state.mapRight((x) => x.sort(property, order))),
    groupBy: <k extends NonIterable<b>, c extends IsType<b[k], string>>(
        property: k
    ): SelectedQuery<a, Record<c, Omit<b, k>[]>> => SelectedQuery(state.mapRight((x) => List([groupBy(x, property)]))),
    toList: (): Array<b> => state.snd().toArray(),
})

const groupBy = <a, k extends keyof a, c extends IsType<a[k], string>>(
    list: List<a>,
    key: k,
    record: Record<c, Omit<a, k>[]> = {} as Record<c, Omit<a, k>[]>
): Record<c, Omit<a, k>[]> => {
    if (list.isEmpty()) {
        return record
    }

    const object = list.head()
    const value = object[key] as c

    Object.keys(record).indexOf(value.toString()) >= 0
        ? record[value].push(omitOne(object, key))
        : (record[value] = [omitOne(object, key)])

    return groupBy(list.tail(), key, record)
}
