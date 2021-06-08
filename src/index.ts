import { Query } from './core/query'
import { Student } from './models/student'

const main = () => {
    console.log('Main program')
    const student = Query<Student>([])

    student.select('firstName', 'lastName').select('age', 'email')
}

main()
