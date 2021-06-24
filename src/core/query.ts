import { State } from '../lib/state'
import { Unit } from '../lib/unit'
import { SelectedQuery } from './selected-query'
import { omitMany, pickMany, NonIterable } from '../utils'

export type Query<a> = {
    select: <k extends NonIterable<a>>(...properties: k[]) => SelectedQuery<Omit<a, k>, Pick<a, k>>
}

export const Query = <a>(state: State<a, Unit>): Query<a> => ({
    select: <k extends NonIterable<a>>(...properties: k[]): SelectedQuery<Omit<a, k>, Pick<a, k>> =>
        SelectedQuery(
            state.map(
                (selectable) => selectable.map((x) => omitMany(x, properties)),
                (_) => state.fst().map((x) => pickMany(x, properties))
            )
        ),
})
