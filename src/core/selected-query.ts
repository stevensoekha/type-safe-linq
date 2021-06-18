import { State } from '../lib/state'
import { omitMany } from '../utils/omit'
import { pickMany } from '../utils/pick'
import { zip, mergeZip } from '../lib/list'

export type SelectedQuery<a, b> = {
    state: State<a, b>
    select: <k extends keyof a>(...properties: k[]) => SelectedQuery<Omit<a, k>, b & Pick<a, k>>
    toList: () => Array<b>
}

export const SelectedQuery = <a, b>(state: State<a, b>): SelectedQuery<a, b> => ({
    state,
    select: function <k extends keyof a>(...properties: k[]): SelectedQuery<Omit<a, k>, b & Pick<a, k>> {
        return SelectedQuery(
            this.state.map(
                (selectable) => selectable.map((x) => omitMany(x, properties)),
                (selected) =>
                    mergeZip(
                        zip(
                            selected,
                            this.state.fst.map((x) => pickMany(x, properties))
                        )
                    )
            )
        )
    },
    toList: function (): Array<b> {
        return this.state.snd.toArray()
    },
})
