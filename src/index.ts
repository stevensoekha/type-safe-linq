import { Query } from './core/query'
import { State } from './lib/state'
import { Student } from './models/student'
import { initialize } from './data'

const main = () => {
    console.log('Main program \n')
    const student = Query<Student>(State(initialize()))

    const x1 = student.select('firstName').toList()
    console.log('RESULT x1:', x1)
}

main()
