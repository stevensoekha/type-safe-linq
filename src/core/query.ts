import { State } from '../lib/state'
import { Unit } from '../lib/unit'
import { Pair } from '../lib/pair'
import { SelectedQuery } from './selected-query'

export type Query<a> = {
    state: State<a, Unit>
    select: <k extends keyof a>(...properties: k[]) => Query<Omit<a, k>>
}

export const Query = <a>(data: a[]): Query<a> => ({
    state: State(data, []),
    select: function <k extends keyof a>(...properties: k[]): Query<Omit<a, k>> {
        return Query(
            this.state.mapLeft((data) =>
                data.map((x) => {
                    return deletePropsFromObject(x, properties)
                })
            ).fst
        )
    },
})

const deletePropsFromObject = <a, k extends keyof a>(entity: a, properties: k[]): Omit<a, k> => {
    let newEntity = entity as Omit<a, k>
    properties.forEach((prop) => {
        newEntity = deletePropFromObject(newEntity, prop as unknown as keyof Omit<a, k>) as Omit<a, k>
    })
    return newEntity
}

const deletePropFromObject = <a, k extends keyof a>(entity: a, property: k): Omit<a, k> => {
    const { [property]: _, ...rest } = entity
    return rest
}

// const deletePropFromObject = <a, k extends keyof a>(property: k) =>
//     ({[property]: _, ...rest}: a): Omit<a,k> => rest

// const deletePropFromObject =
//     <a, k extends keyof a>(entity: a) =>
//     (prop: k): Omit<a, k> =>
//         (({ [prop]: _, ...rest }: a): Omit<a, k> => rest)(entity)
