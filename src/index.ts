import { Query } from './core/query'
import { State } from './lib/state'
import { Student } from './models/student'
import { initialize } from './data'
import { prettyPrint } from './utils'
import { LazyQuery } from './core/lazy-query'
import { Fun } from './lib/fun'
import { Id } from './lib/id'
import { Unit } from './lib/unit'

const main = () => {
    console.log('Main program \n')

    // ! SETUP
    const data = State<Student, Unit>(initialize())
    const students = Query(data)
    const lazyStudents = LazyQuery<Student>(Fun(Id))

    const query2 = lazyStudents
        .select('firstName')
        .select('age')
        .where((x) => x.get('age').notEquals(24))
        .toList(students)

    prettyPrint('Query2', query2)
}

main()
