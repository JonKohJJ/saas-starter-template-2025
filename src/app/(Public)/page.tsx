import { saasFeatures } from "@/data/saas-features";
import { FeatureCard } from "./_components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage(){
  return <>

    <section className="section hero lg:py-16 text-center lg:max-w-[650px]">
      <p className="text-4xl">
        Build Your SaaS Faster with a Ready-to-Use Starter Template
      </p>
      <p className="mt-4">
        Get up and running with a scalable SaaS template built on Next.js, complete with user authentication, integrated payments, and a permissions-based structure. This template comes with a straightforward todo app that demonstrates essential SaaS features, saving you weeks of setup so you can focus on growing your product.
      </p>
      <div className="mt-8 flex gap-2 w-full justify-center">

        <Link href='https://github.com/JonKohJJ/saas-starter-template-2025' target="_blank">
          <Button variant="outline" className="rounded">
            GitHub Repo<Github />
          </Button>
        </Link>

        <SignedOut>
            <Button variant="outline" className="rounded">
              <SignInButton />
            </Button>
        </SignedOut>
        <SignedIn>
          <Link href='/dashboard'>
            <Button variant="outline" className="rounded">
              Go To Dashboard<ArrowRight />
            </Button>
          </Link>
        </SignedIn>
      </div>
    </section>

    <section className="section features py-16">
      <p className="mb-12 text-3xl text-center">Features</p>
      <div className="features flex flex-col lg:grid gap-4 grid-cols-3">
        {saasFeatures.map(feature => (
          <FeatureCard
            key={feature.title} 
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>

  </>
}