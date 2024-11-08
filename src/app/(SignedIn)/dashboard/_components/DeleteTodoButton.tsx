"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteTodo } from "@/server/actions/todos";
import { Trash2 } from "lucide-react";

export default function DeleteTodoButton({ id } : { id: string }) {

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
        <Button onClick={() => onDelete(id)}><Trash2 /></Button>
    )
}
