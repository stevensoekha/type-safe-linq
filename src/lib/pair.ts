export type Pair<a, b> = {
    fst: () => a
    snd: () => b
    mapLeft: <c>(f: (_: a) => c) => Pair<c, b>
    mapRight: <d>(f: (_: b) => d) => Pair<a, d>
    map: <c, d>(f: (_: a) => c, g: (_: b) => d) => Pair<c, d>
}

export const Pair = <a, b>(fst: a, snd: b): Pair<a, b> => ({
    fst: () => fst,
    snd: () => snd,
    mapLeft: <c>(f: (_: a) => c): Pair<c, b> => Pair<c, b>(f(fst), snd),
    mapRight: <d>(g: (_: b) => d): Pair<a, d> => Pair<a, d>(fst, g(snd)),
    map: <c, d>(f: (_: a) => c, g: (_: b) => d): Pair<c, d> => Pair<c, d>(f(fst), g(snd)),
})
