"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X } from "lucide-react";
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
        <span className="todo-item flex gap-2 items-center mb-2 w-full">

            {isEditing 
            ?  <TodoForm todoTobeEdited={todo} setIsEditing={setIsEditing} /> 
            : 
                <div className="flex justify-between w-full">
                    <p>{todo.todoName}</p>
                    <div className="flex gap-2 items-center">
                        <Pencil onClick={() => setIsEditing(true)} className="hover:cursor-pointer w-5 h-5" />
                        <X onClick={() => onDelete(todo.id)} className="hover:cursor-pointer w-6 h-6" />
                    </div>
                </div>
            } 

        </span>
    )
}
