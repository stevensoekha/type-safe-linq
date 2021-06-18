export const omitMany = <a, k extends keyof a>(entity: a, properties: k[]): Omit<a, k> =>
    properties.reduce((s, prop) => omitOne(entity, prop), {} as Omit<a, k>)

export const omitOne = <a, k extends keyof a>(entity: a, property: k): Omit<a, k> => {
    const { [property]: _, ...rest } = entity
    return rest
}

// https://stackoverflow.com/questions/56255212/how-to-omit-delete-many-properties-from-an-object
