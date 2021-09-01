export type Filter<a> = {
    get: <k extends keyof a>(property: k) => Where<a, a[k]>
}

export type Where<a, b> = {
    equals: (value: b) => FilterCondition<a>
    notEquals: (value: b) => FilterCondition<a>
    greaterThan: (value: b) => FilterCondition<a>
    greaterThanOrEqualTo: (value: b) => FilterCondition<a>
    lessThan: (value: b) => FilterCondition<a>
    lessThanOrEqualTo: (value: b) => FilterCondition<a>
    between: (start: b, end: b) => FilterCondition<a>
    includes: (query: string) => FilterCondition<a>
    startsWith: (query: string) => FilterCondition<a>
    endsWith: (query: string) => FilterCondition<a>
    in: (l: Array<b>) => FilterCondition<a>
}

export type FilterCondition<a> = {
    condition: boolean
    and: (f: (_: Filter<a>) => FilterCondition<a>) => FilterCondition<a>
    or: (f: (_: Filter<a>) => FilterCondition<a>) => FilterCondition<a>
    not: () => FilterCondition<a>
}

export const Filter = <a>(entity: a): Filter<a> => ({
    get: <k extends keyof a>(property: k): Where<a, a[k]> => Where(entity, entity[property]),
})

export const Where = <a, b>(entity: a, value: b): Where<a, b> => ({
    equals: (comparer: b) => FilterCondition<a>(entity, value === comparer),
    notEquals: (comparer: b) => FilterCondition<a>(entity, value !== comparer),
    greaterThan: (comparer: b) => FilterCondition<a>(entity, value > comparer),
    greaterThanOrEqualTo: (comparer: b) => FilterCondition<a>(entity, value >= comparer),
    lessThan: (comparer: b) => FilterCondition<a>(entity, value < comparer),
    lessThanOrEqualTo: (comparer: b) => FilterCondition<a>(entity, value <= comparer),
    between: (start: b, end: b) => FilterCondition<a>(entity, value > start && value < end),
    includes: (query: string) => FilterCondition<a>(entity, `${value}`.includes(query)),
    startsWith: (query: string) => FilterCondition<a>(entity, `${value}`.startsWith(query)),
    endsWith: (query: string) => FilterCondition<a>(entity, `${value}`.endsWith(query)),
    in: (l: Array<b>) => FilterCondition<a>(entity, l.includes(value)),
})

export const FilterCondition = <a>(entity: a, condition: boolean): FilterCondition<a> => ({
    condition,
    and: (f: (_: Filter<a>) => FilterCondition<a>): FilterCondition<a> =>
        FilterCondition(entity, condition && f(Filter(entity)).condition),
    or: (f: (_: Filter<a>) => FilterCondition<a>): FilterCondition<a> =>
        FilterCondition(entity, condition || f(Filter(entity)).condition),
    not: (): FilterCondition<a> => FilterCondition(entity, !condition),
})
