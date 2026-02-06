import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Welcome to our platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Build something{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              amazing
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern web application built with Next.js and shadcn/ui.
            Start building your next great idea today.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Link href="/about">
              <Button size="lg" variant="outline">
                About Us
              </Button>
            </Link>
            <Link href="/api-test">
              <Button size="lg" variant="outline">
                Test API
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-violet-600" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built on Next.js for optimal performance and seamless user experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/features" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>Beautiful Design</CardTitle>
              <CardDescription>
                Crafted with shadcn/ui components for a polished, modern look.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/design" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                Enterprise-grade security built into every layer of the stack.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/security" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
