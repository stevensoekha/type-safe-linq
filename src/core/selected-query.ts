import { Query } from './query'
import { State } from '../lib/state'
import { zip, mergeZip } from '../lib/list'
import { omitMany, omitOne, pickMany, GetIterableType, Iterable, NonIterable } from '../utils'

export type SelectedQuery<a, b> = {
    select: <k extends NonIterable<a>>(...properties: k[]) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    include: <k extends Iterable<a>, a2 extends GetIterableType<a[k]>, k2 extends keyof a2>(
        property: k,
        query: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    orderBy: <k extends NonIterable<b>>(property: k, order: 'ASC' | 'DESC') => SelectedQuery<a, b>
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
    orderBy: <k extends NonIterable<b>>(property: k, order: 'ASC' | 'DESC'): SelectedQuery<a, b> =>
        SelectedQuery(state.mapRight((x) => x.sort(property, order))),
    toList: (): Array<b> => state.snd().toArray(),
})
