import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Sparkles, Target, Users, Zap, Code2, Award, Heart } from "lucide-react";

const About = () => {
    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Our Mission",
            description:
                "Empowering everyone to create professional portfolios without technical barriers or expensive tools.",
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered",
            description:
                "Leveraging cutting-edge AI technology to generate compelling, professional content instantly.",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "User-Centric",
            description:
                "Built for students, developers, and creators who want to showcase their work beautifully.",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Lightning Fast",
            description:
                "Create a complete portfolio in minutes, not hours. No signup, no hassle, just results.",
        },
    ];

    const features = [
        {
            icon: <Code2 className="w-5 h-5" />,
            title: "Modern Tech Stack",
            description: "Built with React, TypeScript, and Tailwind CSS for optimal performance.",
        },
        {
            icon: <Award className="w-5 h-5" />,
            title: "Professional Quality",
            description: "AI-generated content that matches professional writing standards.",
        },
        {
            icon: <Heart className="w-5 h-5" />,
            title: "Free Forever",
            description: "No hidden costs, no subscriptions. Create unlimited portfolios for free.",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-6 animate-fade-up">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>About Portfolio AI</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up stagger-1">
                        Transforming Ideas into{" "}
                        <span className="gradient-text">Professional Portfolios</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up stagger-2 leading-relaxed">
                        Empowering professionals worldwide with AI-driven portfolio creation.
                        Modern, elegant, and effortlessly professional - European design standards meet cutting-edge technology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-3">
                        <Button variant="hero" size="lg" onClick={() => window.location.href = "/builder"}>
                            <Sparkles className="w-5 h-5" />
                            Try It Now
                        </Button>
                        <Button variant="glass" size="lg" onClick={() => window.location.href = "/contact"}>
                            Get in Touch
                        </Button>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            What Drives Us
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Our core values guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="glass-card hover-lift border-none">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="glass-card rounded-2xl p-8 md:p-12">
                        <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Portfolio AI was born from a simple observation: creating a professional
                                portfolio shouldn't require design skills, coding knowledge, or expensive
                                tools. Too many talented individuals struggle to showcase their work
                                effectively.
                            </p>
                            <p>
                                We built this platform to democratize personal branding. Using advanced AI
                                technology, we transform basic information into compelling narratives that
                                highlight your strengths and achievements.
                            </p>
                            <p>
                                Whether you're a student looking for your first job, a developer showcasing
                                projects, or a creative professional building your brand, Portfolio AI makes
                                it easy to present yourself professionally.
                            </p>
                            <p className="text-foreground font-semibold">
                                Join thousands of users who have already created their perfect portfolio
                                with Portfolio AI.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Why Choose Portfolio AI?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The smartest way to create professional portfolios
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Ready to Create Your Portfolio?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Join the community and start building your professional presence today.
                        </p>
                        <Button variant="hero" size="xl" onClick={() => window.location.href = "/builder"}>
                            <Sparkles className="w-5 h-5" />
                            Get Started Free
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border/50 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground text-lg mb-4">
                            Crafted for ambitious professionals worldwide
                        </p>
                        <p className="text-sm text-muted-foreground/60">
                            © 2026 Portfolio Builder · Excellence in Digital Presence
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
