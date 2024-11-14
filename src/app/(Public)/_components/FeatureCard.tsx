import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LucideProps } from "lucide-react"

export function FeatureCard({
    icon,
    title,
    description
}: {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    title: string;
    description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
            <div className="flex gap-3 items-center">
                {React.createElement(icon)}
                <p className="text-base">{title}</p>
            </div>
        </CardTitle>
        <CardDescription>
            {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
