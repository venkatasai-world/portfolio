import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Download, Palette, Code2, User, Briefcase, GraduationCap, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered Generation",
            description: "Advanced AI creates professional, tailored content for your unique portfolio instantly"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Multiple Templates",
            description: "Choose from professionally designed themes that match your style and industry"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "Build your complete portfolio in under 60 seconds with zero technical knowledge required"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: "Export & Host Anywhere",
            description: "Download clean HTML and deploy to any platform - GitHub Pages, Netlify, or your own server"
        }
    ];

    const sections = [
        { icon: <User className="w-5 h-5" />, title: "About & Profile" },
        { icon: <Code2 className="w-5 h-5" />, title: "Projects & Work" },
        { icon: <Briefcase className="w-5 h-5" />, title: "Experience" },
        { icon: <GraduationCap className="w-5 h-5" />, title: "Education" },
    ];

    const benefits = [
        "No registration or account required",
        "Completely free to use",
        "Professional European design standards",
        "Mobile-responsive by default",
        "SEO-optimized structure",
        "Dark mode support included"
    ];

    return (
        <div className="min-h-screen bg-background">      <Navigation />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-24">
                {/* Animated background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl animate-float stagger-2" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-2xl animate-pulse-slow" />
                </div>

                <div className="container relative mx-auto px-4">
                    {/* Badge */}
                    <div className="flex justify-center mb-8 animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium border border-primary/20">
                            <Globe className="w-4 h-4 text-primary animate-pulse" />
                            <span>Professional Portfolio Builder</span>
                        </div>
                    </div>

                    {/* Main heading */}
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-up stagger-1 leading-tight">
                            Build Your{" "}
                            <span className="gradient-text">Dream Portfolio</span>
                            <br className="hidden sm:block" />
                            {" "}in Minutes
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-up stagger-2 max-w-3xl mx-auto leading-relaxed">
                            Create a stunning, professional portfolio website with AI assistance.
                            No coding required. No signup. Just pure creativity.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-up stagger-3 mb-16">
                            <Button
                                variant="hero"
                                size="xl"
                                onClick={() => navigate("/builder")}
                                className="group text-base sm:text-lg px-8 py-6 h-auto"
                            >
                                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Start Building Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="glass"
                                size="xl"
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="text-base sm:text-lg px-8 py-6 h-auto"
                            >
                                Explore Features
                            </Button>
                        </div>

                        {/* Benefits list */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto animate-fade-up stagger-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview mockup */}
                    <div className="mt-24 animate-fade-up stagger-5">
                        <div className="relative mx-auto max-w-6xl">
                            <div className="glass-card rounded-3xl p-3 sm:p-6 md:p-8 shadow-2xl animate-glow">
                                <div className="bg-muted/30 rounded-2xl p-4 sm:p-8 md:p-16">
                                    <div className="flex items-center gap-2 mb-8">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        <div className="flex-1 bg-background/50 rounded-full h-7 ml-4 max-w-md" />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="h-10 w-1/2 gradient-bg rounded-xl opacity-90 animate-pulse-slow" />
                                        <div className="h-5 w-2/3 bg-foreground/20 rounded-lg" />
                                        <div className="h-5 w-1/2 bg-foreground/15 rounded-lg" />
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12">
                                            {sections.map((section, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background/60 hover-lift">
                                                    <div className="text-primary">{section.icon}</div>
                                                    <span className="text-xs sm:text-sm font-semibold">{section.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 -z-10 blur-3xl opacity-40 gradient-bg rounded-full transform scale-90" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                            Everything You Need
                        </h2>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Professional portfolio tools designed for modern creators, developers, and professionals
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-card rounded-2xl p-8 hover-lift group animate-fade-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20 animate-fade-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                            Simple Three-Step Process
                        </h2>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            From information to impressive portfolio in minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Enter Your Details",
                                desc: "Fill in your information, skills, projects, and experience in our intuitive form"
                            },
                            {
                                step: "02",
                                title: "AI Enhancement",
                                desc: "Our advanced AI polishes your content, making it engaging and professional"
                            },
                            {
                                step: "03",
                                title: "Download & Deploy",
                                desc: "Get your complete portfolio as HTML and host it anywhere you like"
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center group animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-bg text-primary-foreground text-3xl font-bold mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-20 animate-fade-up stagger-3">
                        <Button
                            variant="hero"
                            size="xl"
                            onClick={() => navigate("/builder")}
                            className="text-lg px-10 py-7 h-auto group"
                        >
                            <Sparkles className="w-6 h-6" />
                            Create Your Portfolio Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border/50 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground text-lg mb-4">
                            Built for students, developers, designers, and professionals worldwide
                        </p>
                        <p className="text-sm text-muted-foreground/60">
                            © 2026 Portfolio Builder · Empowering careers through beautiful portfolios
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
