import { Student } from '../models/student'
import { Grade } from '../models/grade'
import { Professor } from '../models/professor'
import { School } from '../models/school'
import { name, internet, datatype, address } from 'faker'
import { randint } from '../utils/random'

const newStudent = (): Student => {
    const firstName = name.firstName()
    const lastName = name.lastName()
    const email = internet.email(firstName, lastName)
    const age = datatype.number(100)
    return Student(firstName, lastName, age, email, newGrade(randint(1, 5)), newSchool(randint(1, 2)))
}

const newProfessor = (): Professor => {
    const firstName = name.firstName()
    const lastName = name.lastName()
    const email = internet.email(firstName, lastName)
    const age = randint(20, 70)
    return Professor(firstName, age, email, newSchool(randint(1, 2)))
}

const newSchool = (amount: number, arr: Array<School> = []): Array<School> =>
    arr.length === amount
        ? arr
        : newSchool(amount, [
              ...arr,
              School(schools.name[randint(0, schools.name.length)], schools.location(), schools.founded()),
          ])

const newGrade = (amount: number, arr: Array<Grade> = []): Array<Grade> =>
    arr.length === amount
        ? arr
        : newGrade(amount, [
              ...arr,
              Grade(
                  grades.subject[randint(0, grades.subject.length)],
                  randint(1, 10),
                  grades.ETC[randint(0, grades.ETC.length)],
                  newProfessors(randint(1, 2))
              ),
          ])

const newProfessors = (amount: number, arr: Array<Professor> = []): Array<Professor> =>
    arr.length === amount ? arr : newProfessors(amount, [...arr, newProfessor()])

const schools = {
    name: [
        'Hogeschool Rotterdam',
        'Avans Hogeschool',
        'Universiteit van Amsterdam',
        'TU Delft',
        'Universiteit Utrecht',
        'Inholland',
        'LOI',
        'Haagse Hogeschool',
        'Has Hogeschool',
        'HAN University of Applied Sciences',
        'Hogeschool Utrecht',
        'Erasmus University',
        'Hogeschool Leiden',
        'Codarts Rotterdam',
    ],
    location: () => `${address.streetName()}, ${address.cityName()}`,
    founded: () => randint(1960, 2020),
}

const grades = {
    subject: [
        'Development 1',
        'Development 2',
        'Development 3',
        'Development 4',
        'Development 5',
        'Development 6',
        'Development 7',
        'Development 8',
        'Business Basic',
        'Business Expert',
        'Art',
        'Medicine',
        'Singing',
        'Marketing',
    ],
    ETC: [1, 2, 10, 20, 29, 30],
}

export const initialize = (amount: number, arr: Array<Student> = []): Array<Student> =>
    arr.length === amount ? arr : initialize(amount, [...arr, newStudent()])
