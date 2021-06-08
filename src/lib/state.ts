import { Pair } from './pair'

export type State<a, b> = Pair<Array<a>, Array<b>>

export const State = <a, b>(excludes: a[], includes: b[]): Pair<Array<a>, Array<b>> => Pair(excludes, includes)
