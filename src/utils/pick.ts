export const pickMany = <a, k extends keyof a>(entity: a, properties: k[]): Pick<a, k> =>
    properties.reduce((s, prop) => ((s[prop] = entity[prop]), s), {} as Pick<a, k>)

export let pickOne = <a, k extends keyof a>(entity: a, property: k): Pick<a, k> =>
    ({ [property]: entity[property] } as Pick<a, k>)
