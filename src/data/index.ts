import { Student } from '../models/student'
import { Grade } from '../models/grade'
import { Professor } from '../models/professor'
import { School } from '../models/school'

export const initialize = (): Array<Student> => [
    Student('Steven', 'Soekha', 24, 'steven.soekha@outlook.com', grades1(), schools1()),
    Student('Jack', 'Mitzer', 26, 'jack.mitzer@gmail.com', [], schools3()),
    Student('Ahmed', 'Rashid', 24, 'ahmed.rizgar.rashid@gmail.com', grades2(), schools3()),
    Student('Liza', 'Smiths', 21, 'liza.smiths@outlook.com', grades2()),
    Student('Mika', 'Moka', 28, 'mika.moka@gmail.com', [], schools2()),
    Student('Ava', 'Blue', 23, 'ava.blue@gmail.com', grades2(), schools3()),
]

const grades1 = (): Array<Grade> => [
    Grade('Development 1', 8.2, 4, professors1()),
    Grade('Development 2', 7.5, 4, professors3()),
    Grade('Development 3', 6.0, 4, professors3()),
    Grade('Development 4', 4.8, 4, professors1()),
]

const grades2 = (): Array<Grade> => [Grade('Development 1', 6.6, 4, professors2())]

const grades3 = (): Array<Grade> => [
    Grade('Development 1', 8.5, 4, professors3()),
    Grade('Development 2', 8.8, 4, professors2()),
]

const professors1 = (): Array<Professor> => [
    Professor('John', 44, 'john@hr.nl', schools2()),
    Professor('Yuno', 28, 'yuno@hr.nl', schools1()),
]

const professors2 = (): Array<Professor> => [Professor('Hubert', 32, 'hubert@hr.nl', schools1())]

const professors3 = (): Array<Professor> => [Professor('Michael', 33, 'michael@hr.nl', schools3())]

const schools1 = (): Array<School> => [
    School('Hogeschool Rotterdam', 'Wijnhaven', 1960),
    School('Hogeschool Rotterdam', 'Academieplein', 1971),
]

const schools2 = (): Array<School> => [
    School('Hogeschool Rotterdam', 'Kralingse Zoom', 2001),
    School('Hogeschool Rotterdam', 'Academieplein', 1999),
]

const schools3 = (): Array<School> => [School('Hogeschool Rotterdam', 'Museumpark', 2000)]
