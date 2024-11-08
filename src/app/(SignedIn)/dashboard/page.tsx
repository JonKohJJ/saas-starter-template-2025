import { getTodos } from "@/server/db/todos"
import { auth } from "@clerk/nextjs/server"
import { TodoForm } from "./_components/TodoForm"
import TodoItem from "./_components/TodoItem"

export default async function DashboardPage(){

    const { userId, redirectToSignIn } = await auth()
    if (userId == null) return redirectToSignIn() 
    const Todos = await getTodos(userId, { limit: 6 })

    return <div>
        <p className="text-3xl mb-8">Dashboard Page</p>

        <div className="todo-form-div">
            <TodoForm />
        </div>

        <div className="my-todos mt-8">
            <p>My Todos: </p>
            <ol>
                {Todos.map((todo) => (
                    <TodoItem todo={todo}/>
                ))}
            </ol>
        </div>
    </div>
}