export type Fun<a, b> = {
    f: (_: a) => b
    then: <c>(g: Fun<b, c>) => Fun<a, c>
}

export const Fun = <a, b>(f: (_: a) => b): Fun<a, b> => ({
    f,
    then: function <c>(g: Fun<b, c>): Fun<a, c> {
        return Fun((x) => g.f(this.f(x)))
    },
})
