'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApiTest() {
    const [healthStatus, setHealthStatus] = useState<string>('');
    const [helloMessage, setHelloMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // These URLs will be provided by Amplify backend outputs
    // For now, using placeholder - will be replaced during deployment
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const testHealth = async () => {
        setLoading(true);
        setHealthStatus('Testing...');
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            const data = await response.json();
            setHealthStatus(JSON.stringify(data, null, 2));
        } catch (error: any) {
            setHealthStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const testHello = async () => {
        setLoading(true);
        setHelloMessage('Testing...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/hello`);
            const data = await response.json();
            setHelloMessage(JSON.stringify(data, null, 2));
        } catch (error: any) {
            setHelloMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-4 py-12">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>

                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center space-y-4 mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            API Test Page
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Test your backend API endpoints
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Health Check Endpoint</CardTitle>
                            <CardDescription>Test the /health endpoint</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button onClick={testHealth} disabled={loading || !API_BASE_URL}>
                                Test /health
                            </Button>
                            {healthStatus && (
                                <pre className="bg-slate-100 p-4 rounded-md overflow-auto text-sm">
                                    {healthStatus}
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hello Endpoint</CardTitle>
                            <CardDescription>Test the /api/hello endpoint</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button onClick={testHello} disabled={loading || !API_BASE_URL}>
                                Test /api/hello
                            </Button>
                            {helloMessage && (
                                <pre className="bg-slate-100 p-4 rounded-md overflow-auto text-sm">
                                    {helloMessage}
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    {!API_BASE_URL && (
                        <Card className="border-yellow-200 bg-yellow-50">
                            <CardHeader>
                                <CardTitle className="text-yellow-800">Configuration Needed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-yellow-700">
                                    API URL not configured. Set NEXT_PUBLIC_API_URL environment variable
                                    or configure Amplify outputs.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}

