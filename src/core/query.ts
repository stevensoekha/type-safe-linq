import { State } from '../lib/state'
import { Unit } from '../lib/unit'
import { SelectedQuery } from './selected-query'
import { omitMany } from '../utils/omit'
import { pickMany } from '../utils/pick'

export type Query<a> = {
    state: State<a, Unit>
    select: <k extends keyof a>(...properties: k[]) => SelectedQuery<Omit<a, k>, Pick<a, k>>
}

export const Query = <a>(state: State<a, Unit>): Query<a> => ({
    state,
    select: function <k extends keyof a>(...properties: k[]): SelectedQuery<Omit<a, k>, Pick<a, k>> {
        return SelectedQuery(
            this.state.map(
                (selectable) => selectable.map((x) => omitMany(x, properties)),
                (_) => this.state.fst.map((x) => pickMany(x, properties))
            )
        )
    },
})
