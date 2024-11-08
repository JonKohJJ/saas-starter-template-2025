"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { todosSchema } from "@/schemas/todos"
import { createTodo } from "@/server/actions/todos"

export function TodoForm() {

    const { toast } = useToast()
    const form = useForm<z.infer<typeof todosSchema>>({
        resolver: zodResolver(todosSchema),
        defaultValues: {
            todoName: "",
        }
    })

    async function onSubmit(values: z.infer<typeof todosSchema>) {
        const data = await createTodo(values)

        if ('error' in data) {
            console.error(data.message);
            toast({ title: "Error", description: data.message });
        } else {
            toast({ title: "Success", description: `Todo '${data.todoName}' successfully added!` });
        }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="todoName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-4">
                        Input Todo
                        <FormMessage className="font-bold"/>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Add
              </Button>
            </div>
          </form>
        </Form>
    )
}