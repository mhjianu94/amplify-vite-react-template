import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Target, Heart } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-4 py-12">
                {/* Back Navigation */}
                <Link href="/">
                    <Button variant="ghost" className="gap-2 mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>

                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        About Us
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Learn more about our mission and the team behind this project.
                    </p>
                </div>

                {/* Content Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <Card className="border-0 shadow-lg text-center">
                        <CardHeader>
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Target className="w-7 h-7 text-blue-600" />
                            </div>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                To build tools that empower developers and teams to create amazing products.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg text-center">
                        <CardHeader>
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Users className="w-7 h-7 text-purple-600" />
                            </div>
                            <CardTitle>Our Team</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                A passionate group of engineers, designers, and dreamers working together.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg text-center">
                        <CardHeader>
                            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Heart className="w-7 h-7 text-rose-600" />
                            </div>
                            <CardTitle>Our Values</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Quality, transparency, and putting our users first in everything we do.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}

