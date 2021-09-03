export type IsType<a, b> = a extends b ? a : never

export type GetIterableType<a> = a extends Array<infer t> ? t : never

export type Iterable<a> = { [k in keyof a]: a[k] extends Array<any> ? k : never }[keyof a]

export type NonIterable<a> = { [k in keyof a]: a[k] extends Array<any> ? never : k }[keyof a]
