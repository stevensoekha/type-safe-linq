export type FilterBuilder<a> = {}

export type Filter<a> = a extends string
    ? FilterString
    : // a extends number ? FilterNumber :
      FilterNested<a>

export type FilterNested<a> = {
    [k in keyof a]: Filter<a[k]>
}

export type FilterString = {
    equals: (value: string) => boolean
}

export type FilterNumber = {
    equals: any
    lessThan: any
    greaterThan: any
}
