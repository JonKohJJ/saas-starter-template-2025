import { getTodos } from "@/server/db/todos"
import { auth } from "@clerk/nextjs/server"
import { TodoForm } from "./_components/TodoForm"
import TodoItem from "./_components/TodoItem"
import { canAddTodo } from "@/server/permissions"
import { HasPermission } from "@/components/HasPermission"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default async function DashboardPage(){

    const { userId, redirectToSignIn } = await auth()
    if (userId == null) return redirectToSignIn() 
    const Todos = await getTodos(userId, { limit: 10 })

    return <div>
        <p className="text-3xl mb-12">Your Dashboard</p>

        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Create Todo</CardTitle>
                <CardDescription>Add your new todo in one-click</CardDescription>
            </CardHeader>
            <CardContent>
                <HasPermission 
                    permission={canAddTodo}
                    renderFallback
                    fallbackText="You have already added the maximum number of todos. Try upgrading your account to add more."
                >
                    <TodoForm />
                </HasPermission>
            </CardContent>
            <CardFooter className="flex justify-between">
                {Todos.length === 0
                    ? <CardDescription>You have no todos</CardDescription>
                    : <ol className="w-full">
                        {Todos.map((todo) => (
                            <li key={todo.id}>
                                <TodoItem todo={todo}/>
                            </li>
                        ))}
                    </ol>
                }
            </CardFooter>
        </Card>
    </div>
}