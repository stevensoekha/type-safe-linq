export type Filter<a> = {
    entity: a
    get: <k extends keyof a>(property: k) => Where<a, a[k]>
}

export type Where<a, b> = {
    entity: a
    value: b
    equals: (value: b) => FilterCondition<a>
}

export type FilterCondition<a> = {
    entity: a
    condition: boolean
    and: (f: (_: Filter<a>) => FilterCondition<a>) => FilterCondition<a>
    or: (f: (_: Filter<a>) => FilterCondition<a>) => FilterCondition<a>
    not: () => FilterCondition<a>
}

export const Filter = <a>(entity: a): Filter<a> => ({
    entity,
    get: <k extends keyof a>(property: k): Where<a, a[k]> => Where(entity, entity[property]),
})

export const Where = <a, b>(entity: a, value: b): Where<a, b> => ({
    entity,
    value,
    equals: (comparer: b) => FilterCondition<a>(entity, comparer === value),
})

export const FilterCondition = <a>(entity: a, condition: boolean): FilterCondition<a> => ({
    entity,
    condition,
    and: (f: (_: Filter<a>) => FilterCondition<a>): FilterCondition<a> =>
        FilterCondition(entity, condition && f(Filter(entity)).condition),
    or: (f: (_: Filter<a>) => FilterCondition<a>): FilterCondition<a> =>
        FilterCondition(entity, condition || f(Filter(entity)).condition),
    not: (): FilterCondition<a> => FilterCondition(entity, !condition),
})
