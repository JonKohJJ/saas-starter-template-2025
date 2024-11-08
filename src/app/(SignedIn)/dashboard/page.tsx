import { getTodos } from "@/server/db/todos"
import { auth } from "@clerk/nextjs/server"
import { TodoForm } from "./_components/TodoForm"
import { Button } from "@/components/ui/button"
import DeleteTodoButton from "./_components/DeleteTodoButton"
import { Pencil } from "lucide-react"

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
            {Todos.map((todo, index) => (
                <div key={todo.id} className="flex gap-2 items-center mb-2">
                    <p>{index+1}.{todo.todoName}</p>
                    <Button><Pencil /></Button>
 
                    <DeleteTodoButton id={todo.id} />
                </div>
            ))}
        </div>
    </div>
}