import { Query } from './core/query'
import { State } from './lib/state'
import { Student } from './models/student'
import { initialize } from './data'
import { prettyPrint } from './utils'
import { LazyQuery } from './core/lazy-query'
import { Fun } from './lib/fun'
import { Id } from './lib/id'

const main = () => {
    console.log('Main program \n')

    // ! SETUP
    const students = Query<Student>(State(initialize()))

    const query1 = students
        .select('firstName')
        .select('age')
        .where((x) => x.get('age').equals(21).not())
        .toList()

    prettyPrint('Query1', query1)
}

main()
