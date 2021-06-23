import { Grade } from './grade'
import { School } from './school'

export type Student = {
    firstName: string
    lastName: string
    age: number
    email: string
    Grades: Array<Grade>
    Schools: Array<School>
}

export const Student = (
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    grades?: Array<Grade>,
    schools?: Array<School>
): Student => ({
    firstName,
    lastName,
    age,
    email,
    Grades: grades ? grades : [],
    Schools: schools ? schools : [],
})
