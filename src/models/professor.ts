import { School } from './school'

export type Professor = {
    name: string
    age: number
    email: string
    Schools: Array<School>
}

export const Professor = (name: string, age: number, email: string, schools?: Array<School>): Professor => ({
    name,
    age,
    email,
    Schools: schools ? schools : [],
})
