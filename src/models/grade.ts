export type Grade = {
    name: string
    grade: number
    ETC: number
}

export const Grade = (name: string, grade: number, ETC: number): Grade => ({
    name,
    grade,
    ETC,
})
