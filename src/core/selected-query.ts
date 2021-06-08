import { State } from '../lib/state'

export type SelectedQuery<a, b> = {
    state: State<a, b>
}

export const SelectedQuery = <a, b>(state: State<a, b>) => ({
    state,
})
