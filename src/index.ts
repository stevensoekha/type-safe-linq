import { Query } from './core/query'
import { State } from './lib/state'
import { Student } from './models/student'
import { initialize } from './data'
import { prettyPrint } from './utils'

const main = () => {
    console.log('Main program \n')
    const students = Query<Student>(State(initialize()))

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
        .toList()

    const queryAll = students
        .select('firstName')
        .select('lastName')
        .select('age')
        .select('email')
        .include('Schools', (q) =>
            q
                .select('name')
                .select('location')
                .select('founded')
        )
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
                        .include('Schools', (q) => 
                            q
                                .select('name')
                                .select('location')
                                .select('founded')
                        )
                )
        )

    prettyPrint('Query:', query)
    prettyPrint('QueryAll:', queryAll)
}

main()
