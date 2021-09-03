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

    const data = State<Student, Unit>(initialize(100))
    const students = Query(data)
    const lazyStudents = LazyQuery<Student>(Fun(Id))

    // ! 1. SELECT
    const query1 = students.select('firstName', 'lastName').select('email').select('age')

    const lzquery1 = lazyStudents.select('firstName', 'lastName').select('email').select('age')

    // prettyPrint('Query1', query1.toList())
    // prettyPrint('Query1 lazy', lzquery1.toList(students))

    // ! 2. INCLUDE
    const query2 = query1.include('Grades', (q) => q.select('name', 'grade'))

    const lzquery2 = lzquery1.include('Grades', (q) => q.select('name', 'grade'))

    // prettyPrint('Query2', query2.toList())
    // prettyPrint('Query2 Lazy', lzquery2.toList(students))

    // ! 3. WHERE
    const query3 = query2.where((x) => x.get('age').between(25, 30))

    const lzquery3 = lzquery2.where((x) => x.get('age').between(25, 30))

    // prettyPrint('Query3', query3.toList())
    // prettyPrint('Query3 Lazy', lzquery3.toList(students))

    // ! 4. ORDER BY
    const query4 = query3.orderBy('age', 'ASC')

    const lzquery4 = lzquery3.orderBy('age', 'ASC')

    // prettyPrint('Query4', query4.toList())
    // prettyPrint('Query4 Lazy', lzquery4.toList(students))

    // ! 5. GROUP BY
    const query5 = query4.groupBy('age')

    // const lzquery5 = lzquery4

    prettyPrint('Query4', query5.toList())
    // prettyPrint('Query4 Lazy', lzquery4.toList(students))
}

main()
