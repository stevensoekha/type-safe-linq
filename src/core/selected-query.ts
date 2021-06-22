import { Query } from './query'
import { State } from '../lib/state'
import { zip, mergeZip } from '../lib/list'
import { omitMany, omitOne, pickMany, Iterable, pickOne } from '../utils'

export type SelectedQuery<a, b> = {
    select: <k extends keyof a>(...properties: k[]) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    include: <k extends keyof a, a2 extends Iterable<a[k]>, k2 extends keyof a2>(
        property: k,
        query: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    toList: () => Array<b>
}

export const SelectedQuery = <a, b>(state: State<a, b>): SelectedQuery<a, b> => ({
    select: function <k extends keyof a>(...properties: k[]): SelectedQuery<Omit<a, k>, b & Pick<a, k>> {
        return SelectedQuery(
            state.map(
                (selectable) => selectable.map((x) => omitMany(x, properties)),
                (selected) =>
                    mergeZip(
                        zip(
                            selected,
                            state.fst.map((x) => pickMany(x, properties))
                        )
                    )
            )
        )
    },
    include: function <k extends keyof a, a2 extends Iterable<a[k]>, k2 extends keyof a2>(
        property: k,
        query: (q: Query<a2>) => SelectedQuery<Omit<a2, k2>, Pick<a2, k2>>
    ): SelectedQuery<Omit<a, k>, b & Pick<a, k>> {
        return SelectedQuery(
            state.map(
                (selectable) => selectable.map((x) => omitOne(x, property)),
                (selected) =>
                    mergeZip(
                        zip(
                            selected,
                            state.fst.map(
                                (x) => ({ [property]: query(Query(State(x[property] as any))).toList() } as any)
                            )
                        )
                    )
            )
        )
    },
    toList: function (): Array<b> {
        return state.snd.toArray()
    },
})
