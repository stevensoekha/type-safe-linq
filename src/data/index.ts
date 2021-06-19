import { Student } from '../models/student'
import { Grade } from '../models/grade'

export const initialize = (): Array<Student> => [
    Student('Steven', 'Soekha', 24, 'steven.soekha@outlook.com', grades1()),
    Student('Jack', 'Mitzer', 26, 'jack.mitzer@gmail.com'),
    Student('Liza', 'Smiths', 21, 'liza.smiths@outlook.com', grades2()),
    Student('Mika', 'Moka', 28, 'mika.moka@gmail.com'),
]

export const grades1 = (): Array<Grade> => [
    { name: 'Development 1', ETC: 4, grade: 8.0 },
    { name: 'Development 2', ETC: 4, grade: 7.0 },
    { name: 'Development 3', ETC: 4, grade: 7.8 },
]

export const grades2 = (): Array<Grade> => [{ name: 'Development 1', ETC: 4, grade: 8.0 }]
