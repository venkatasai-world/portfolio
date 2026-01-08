import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Sparkles, Send, CheckCircle2, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
    const socialLinks = [
        {
            icon: <Github className="w-5 h-5" />,
            name: "GitHub",
            link: "https://github.com",
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            name: "LinkedIn",
            link: "https://linkedin.com",
        },
        {
            icon: <Twitter className="w-5 h-5" />,
            name: "Twitter",
            link: "https://twitter.com",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
                        How to <span className="gradient-text">Use Portfolio Builder</span>
                    </h1>
                    <p className="text-xl text-muted-foreground animate-fade-up stagger-1">
                        Create your professional portfolio in 3 simple steps
                    </p>
                </div>
            </section>

            {/* Instructions Section */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-1 gap-8">
                        {/* Instructions */}
                        <div className="space-y-6">
                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-display flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">1</div>
                                        Fill in Your Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                    <p className="leading-relaxed">Navigate to the <strong className="text-foreground">Builder</strong> page and fill in the form with your details:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong className="text-foreground">Basic Info:</strong> Enter your name and professional role</li>
                                        <li><strong className="text-foreground">Skills:</strong> List your technical skills (comma separated)</li>
                                        <li><strong className="text-foreground">Projects:</strong> Add your best work with descriptions</li>
                                        <li><strong className="text-foreground">Experience:</strong> Include your work history</li>
                                        <li><strong className="text-foreground">Education:</strong> Add your academic background</li>
                                        <li><strong className="text-foreground">Social Links:</strong> Connect your GitHub, LinkedIn, etc.</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-display flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">2</div>
                                        Choose Your Theme
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                    <p className="leading-relaxed">Select a color theme for your portfolio:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong className="text-foreground">Preset Themes:</strong> Choose from 7 beautiful gradients (Rainbow, Sunset, Ocean, Purple, Fire, Neon, Emerald)</li>
                                        <li><strong className="text-foreground">Custom Colors:</strong> Pick your own start and end colors to create a unique gradient</li>
                                        <li><strong className="text-foreground">Live Preview:</strong> See your theme in action before generating</li>
                                    </ul>
                                    <div className="p-4 rounded-lg bg-muted/30 border border-border mt-4">
                                        <p className="text-sm"><strong className="text-foreground">💡 Tip:</strong> Rainbow theme is the default and most popular choice!</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-display flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">3</div>
                                        Generate & Download
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-muted-foreground">
                                    <p className="leading-relaxed">Let AI work its magic and get your portfolio:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong className="text-foreground">AI Enhancement:</strong> Click "Generate Portfolio" and our AI will polish your content</li>
                                        <li><strong className="text-foreground">Preview:</strong> Review your portfolio in the live preview panel</li>
                                        <li><strong className="text-foreground">Regenerate:</strong> Not happy? Regenerate any section with one click</li>
                                        <li><strong className="text-foreground">Download:</strong> Get your complete portfolio as an HTML file</li>
                                        <li><strong className="text-foreground">Deploy:</strong> Upload to GitHub Pages, Netlify, or any hosting service</li>
                                    </ul>
                                    <div className="p-4 rounded-lg bg-muted/30 border border-border mt-4">
                                        <p className="text-sm"><strong className="text-foreground">🚀 Pro Tip:</strong> The downloaded HTML includes your chosen theme and works offline!</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-none bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                                <CardContent className="pt-6">
                                    <div className="text-center space-y-4">
                                        <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                                        <p className="text-muted-foreground">Build your professional portfolio now - it's free and takes less than 5 minutes!</p>
                                        <Button
                                            variant="hero"
                                            size="lg"
                                            onClick={() => window.location.href = "/builder"}
                                            className="text-lg px-8 py-6 h-auto"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Start Building
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-muted/20">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <Card className="glass-card border-none">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold mb-2">Do I need to sign up?</h3>
                                <p className="text-muted-foreground">No! Portfolio Builder is completely free with no registration required.</p>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-none">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold mb-2">Can I edit the downloaded portfolio?</h3>
                                <p className="text-muted-foreground">Yes! The downloaded HTML file is fully editable. You can customize it further with any code editor.</p>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-none">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold mb-2">How do I host my portfolio?</h3>
                                <p className="text-muted-foreground">Upload the HTML file to any web hosting service like GitHub Pages, Netlify, Vercel, or your own server.</p>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-none">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-bold mb-2">Is my data stored?</h3>
                                <p className="text-muted-foreground">No! Everything happens in your browser. We don't store any of your information.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Social Links Section */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Card className="glass-card border-none text-center">
                        <CardContent className="pt-8 pb-8">
                            <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                            <div className="flex justify-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-lg glass-card flex items-center justify-center hover:gradient-bg hover:text-white transition-all hover-lift"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border/50 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground text-lg mb-4">
                            We respond within 24 hours
                        </p>
                        <p className="text-sm text-muted-foreground/60">
                            © 2026 Portfolio Builder · Professional Support Always Available
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
