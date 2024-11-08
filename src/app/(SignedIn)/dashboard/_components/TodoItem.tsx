"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteTodo } from "@/server/actions/todos";
import { toast } from "@/hooks/use-toast";
import { TodoForm } from "./TodoForm";

export type TodoType = {
    id: string;
    clerkUserId: string;
    createdAt: Date;
    updatedAt: Date;
    todoName: string;
}

export default function TodoItem({ todo } : { todo: TodoType }) {

    const [isEditing, setIsEditing] = useState(false)

    const onDelete = async (id: string) : Promise<void>=> {
        const data = await deleteTodo(id)

        if ('error' in data) {
            console.error(data.message);
            toast({ title: "Error", description: data.message });
        } else {
            toast({ title: "Success", description: `Todo '${data.todoName}' deleted successfully!` });
        }
    }

    return (
        <span className="todo-item flex gap-2 items-center mb-2">

            {isEditing 
            ?  <TodoForm todoTobeEdited={todo} setIsEditing={setIsEditing} /> 
            : 
                <>
                    <p>{todo.todoName}</p>
                    <Button onClick={() => setIsEditing(true)}><Pencil /></Button>
                    <Button onClick={() => onDelete(todo.id)}><Trash2 /></Button>
                </>
            } 

        </span>
    )
}
