import { Query } from './core/query'
import { State } from './lib/state'
import { Student } from './models/student'
import { initialize } from './data'
import { prettyPrint } from './utils'

const main = () => {
    console.log('Main program \n')
    const students = Query<Student>(State(initialize()))

    const x = students
        .select('firstName')
        .include('Grades', (q) => q.select('name', 'grade', 'ETC'))
        .toList()

    prettyPrint('Result x:', x)
}

main()
