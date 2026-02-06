import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Connected to AWS Amplify
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Amplify + Next.js{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Todo App
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern web application built with Next.js, AWS Amplify, and shadcn/ui.
            Connected to your backend with real-time data sync.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link href="/about">
              <Button size="lg" variant="outline">
                About
              </Button>
            </Link>
          </div>
        </div>

        {/* Todo List Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <TodoList />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
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
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                Enterprise-grade security with AWS Amplify and Cognito authentication.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
