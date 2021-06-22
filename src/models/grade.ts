import { Professor } from './professor'

export type Grade = {
    name: string
    grade: number
    ETC: number
    Professors: Array<Professor>
}

export const Grade = (name: string, grade: number, ETC: number, professors?: Array<Professor>): Grade => ({
    name,
    grade,
    ETC,
    Professors: professors ? professors : [],
})
