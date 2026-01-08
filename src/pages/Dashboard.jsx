
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const userData = localStorage.getItem("user");

        if (!userData) {
            navigate("/login");
            return;
        }

        try {
            setUser(JSON.parse(userData));
        } catch (error) {
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        // localStorage.removeItem("token"); // Token removed
        localStorage.removeItem("user");
        toast({
            title: "Logged out",
            description: "You have been logged out successfully",
        });
        navigate("/login");
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back, {user.username}!</CardTitle>
                        <CardDescription>Manage your portfolio projects and settings here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            You are logged in as <span className="font-medium text-foreground">{user.email}</span>
                        </p>
                        {/* Add more dashboard content here */}
                        <div className="mt-6">
                            <Button onClick={() => navigate("/builder")}>
                                Create New Portfolio
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
