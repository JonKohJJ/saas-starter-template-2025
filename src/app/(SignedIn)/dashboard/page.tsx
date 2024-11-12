import { getTodos } from "@/server/db/todos"
import { auth } from "@clerk/nextjs/server"
import { TodoForm } from "./_components/TodoForm"
import TodoItem from "./_components/TodoItem"
import { canAddTodo } from "@/server/permissions"
import { HasPermission } from "@/components/HasPermission"

export default async function DashboardPage(){

    const { userId, redirectToSignIn } = await auth()
    if (userId == null) return redirectToSignIn() 
    const Todos = await getTodos(userId, { limit: 6 })
    const canAdd = await canAddTodo(userId)

    return <div>
        <p className="text-3xl mb-8">Your Dashboard</p>

        <div className="todo-form-div">
            <HasPermission 
                permission={canAddTodo}
                renderFallback
                fallbackText="You have already added the maximum number of todos. Try upgrading your account to add more."
            >
                <TodoForm />
            </HasPermission>
        </div>

        <div className="my-todos mt-8">
            <p>My Todos: </p>
            <ol>
                {Todos.map((todo) => (
                    <li key={todo.id}>
                        <TodoItem todo={todo}/>
                    </li>
                ))}
            </ol>
        </div>
    </div>
}