import { Student } from '../models/student'

export const initialize = (): Array<Student> => [
    Student('Steven', 'Soekha', 24, 'steven.soekha@outlook.com'),
    Student('Jack', 'Mitzer', 26, 'jack.mitzer@gmail.com'),
    Student('Liza', 'Smiths', 21, 'liza.smiths@outlook.com'),
    Student('Mika', 'Moka', 28, 'mika.moka@gmail.com'),
]
