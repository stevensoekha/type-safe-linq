export const prettyPrint = (detail: string, x: unknown) => console.log(detail, JSON.stringify(x, null, '  '))
