import { Pair } from './pair'
import { List } from './list'

export type State<a, b> = Pair<List<a>, List<b>>

export const State = <a, b>(selectable: a[], selected?: b[]): State<a, b> =>
    Pair(List<a>(selectable), List<b>(selected ? selected : []))
