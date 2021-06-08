export type Pair<a, b> = {
    fst: a
    snd: b
    mapLeft: <c>(f: (_: a) => c) => Pair<c, b>
    mapRight: <d>(f: (_: b) => d) => Pair<a, d>
    map: <c, d>(f: (_: a) => c, g: (_: b) => d) => Pair<c, d>
}

export const Pair = <a, b>(fst: a, snd: b): Pair<a, b> => ({
    fst,
    snd,
    mapLeft: function <c>(f: (_: a) => c): Pair<c, b> {
        return Pair<c, b>(f(this.fst), this.snd)
    },
    mapRight: function <d>(g: (_: b) => d): Pair<a, d> {
        return Pair<a, d>(this.fst, g(this.snd))
    },
    map: function <c, d>(f: (_: a) => c, g: (_: b) => d): Pair<c, d> {
        return Pair<c, d>(f(this.fst), g(this.snd))
    },
})
