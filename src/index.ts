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

    const lazy = LazyQuery<Student>(Fun(Id))
        .select('firstName')
        .select('lastName')
        .select('age')
        .include('Grades', (q) => q.select('name').select('grade').select('ETC'))
        .select('email')
        .include('Schools', (q) => q.select('name', 'location').select('founded'))
        .orderBy('age', 'DESC')

    // ! QUERY EXAMPLES
    const query = students
        .select('firstName')
        .include('Grades', (q) =>
            q
                .select('name', 'grade')
                .include('Professors', (q) =>
                    q
                        .select('name', 'age')
                        .include('Schools', (q) => q.select('name').select('founded'))
                        .select('email')
                )
                .select('ETC')
        )
        .select('lastName')
        .select('email')

    const queryAll = students
        .select('firstName')
        .select('lastName')
        .select('age')
        .select('email')
        .include('Schools', (q) => q.select('name').select('location').select('founded'))
        .include('Grades', (q) =>
            q
                .select('name')
                .select('grade')
                .select('ETC')
                .include('Professors', (q) =>
                    q
                        .select('name')
                        .select('age')
                        .select('email')
                        .include('Schools', (q) => q.select('name').select('location').select('founded'))
                )
        )

    // ! OUTPUT
    prettyPrint('Query:', query.toList())
    prettyPrint('QueryAll:', queryAll.toList())
    prettyPrint('lazy', lazy.toList(students))
}

main()
