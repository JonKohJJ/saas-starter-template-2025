"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { todosSchema } from "@/schemas/todos"
import { createTodo, updateTodo } from "@/server/actions/todos"
import { TodoType } from "./TodoItem"
import { Dispatch, SetStateAction } from "react"
import { canAddTodo } from "@/server/permissions"


export function TodoForm({ todoTobeEdited, setIsEditing } : { todoTobeEdited?: TodoType, setIsEditing?: Dispatch<SetStateAction<boolean>> }) {

    const { toast } = useToast()
    const form = useForm<z.infer<typeof todosSchema>>({
        resolver: zodResolver(todosSchema),
        defaultValues: todoTobeEdited ?
          {
              todoName: todoTobeEdited.todoName,
          }
        :
          {
              todoName: "",
          }
    })

    async function onSubmit(values: z.infer<typeof todosSchema>) {
      
        const data = todoTobeEdited 
            ? await updateTodo(todoTobeEdited.id, values) 
            : await createTodo(values)

        if ('error' in data) {
            console.error(data.message);
            toast({ title: "Error", description: data.message });
        } else {
            toast({ title: "Success", description: `Todo '${data.todoName}' successfully ${todoTobeEdited ? 'updated' : 'added'}!` });
        }

        const { reset } = form
        if (todoTobeEdited && setIsEditing) {
          setIsEditing(false)
        } else {
          reset()
        }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
          <div>
            <FormField
              control={form.control}
              name="todoName"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl>
                    <Input {...field} disabled={form.formState.isSubmitting}/>
                  </FormControl>
                  <FormMessage className="font-bold"/>  
                </FormItem>
              )}
            />
          </div>
          
          <Button disabled={form.formState.isSubmitting} type="submit">
            {todoTobeEdited ? "Save" : "Add"}
          </Button>
          
          <Button onClick={() => setIsEditing && setIsEditing(false)} disabled={form.formState.isSubmitting}>Cancel</Button>
        </form>
      </Form>
    )
}