export type Iterable<a> = a extends Array<infer t> ? t : never
