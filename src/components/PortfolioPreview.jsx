import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Globe,
    ExternalLink,
    Briefcase,
    GraduationCap,
    Code2,
    RefreshCw,
    Sparkles,
    Download
} from "lucide-react";

const PortfolioPreview = ({ portfolio, onRegenerate, onDownload, isRegenerating }) => {
    if (!portfolio) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[600px] p-8 text-center">
                <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mb-6 animate-pulse-slow">
                    <Sparkles className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Your Portfolio Awaits</h3>
                <p className="text-muted-foreground max-w-md">
                    Fill in your details on the left and click "Generate Portfolio with AI" to see your stunning portfolio here.
                </p>
            </div>
        );
    }

    // If AI generated a full HTML version, show it in an iframe for the "Modern UI" experience
    if (portfolio.fullHTML) {
        return (
            <div className="flex flex-col h-full min-h-[600px]">
                <div className="bg-background/80 backdrop-blur-lg border-b border-border p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm font-medium">AI-Enhanced Modern UI</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={onDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Download HTML
                    </Button>
                </div>
                <iframe
                    srcDoc={portfolio.fullHTML}
                    className="flex-1 w-full h-full border-none bg-white"
                    title="Portfolio Preview"
                />
            </div>
        );
    }

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, url: portfolio.socialLinks.github, label: "GitHub" },
        { icon: <Linkedin className="w-5 h-5" />, url: portfolio.socialLinks.linkedin, label: "LinkedIn" },
        { icon: <Twitter className="w-5 h-5" />, url: portfolio.socialLinks.twitter, label: "Twitter" },
        { icon: <Globe className="w-5 h-5" />, url: portfolio.socialLinks.website, label: "Website" },
    ].filter(link => link.url);

    return (
        <div className="bg-background min-h-full">
            {/* Action bar */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={onDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download HTML
                </Button>
            </div>

            <div className="max-w-4xl mx-auto p-6 space-y-12">
                {/* Hero Section */}
                <section className="relative text-center py-12">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
                    </div>

                    <div className="relative">
                        <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-primary-foreground">
                            {portfolio.name.charAt(0)}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
                            {portfolio.name}
                        </h1>

                        <p className="text-xl text-primary font-medium mb-4">
                            {portfolio.role}
                        </p>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                            {portfolio.headline}
                        </p>

                        {/* Contact info */}
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6">
                            {portfolio.email && (
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" /> {portfolio.email}
                                </span>
                            )}
                            {portfolio.phone && (
                                <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" /> {portfolio.phone}
                                </span>
                            )}
                            {portfolio.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> {portfolio.location}
                                </span>
                            )}
                        </div>

                        {/* Social links */}
                        {socialLinks.length > 0 && (
                            <div className="flex justify-center gap-3">
                                {socialLinks.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                                        title={link.label}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4"
                        onClick={() => onRegenerate("headline")}
                        disabled={isRegenerating === "headline"}
                    >
                        <RefreshCw className={`w-4 h-4 ${isRegenerating === "headline" ? "animate-spin" : ""}`} />
                    </Button>
                </section>

                {/* About Section */}
                <section className="relative">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-display font-bold">About Me</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onRegenerate("about")}
                            disabled={isRegenerating === "about"}
                        >
                            <RefreshCw className={`w-4 h-4 ${isRegenerating === "about" ? "animate-spin" : ""}`} />
                        </Button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{portfolio.about}</p>
                </section>

                {/* Skills Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Code2 className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-display font-bold">Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {portfolio.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                {portfolio.projects.length > 0 && portfolio.projects[0].title && (
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Code2 className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-display font-bold">Projects</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onRegenerate("projects")}
                                disabled={isRegenerating === "projects"}
                            >
                                <RefreshCw className={`w-4 h-4 ${isRegenerating === "projects" ? "animate-spin" : ""}`} />
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            {portfolio.projects.map((project, i) => (
                                <Card key={i} className="glass-card hover-lift">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold">{project.title}</h3>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary/80"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground mb-3">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, j) => (
                                                <Badge key={j} variant="outline" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                {portfolio.experience.length > 0 && portfolio.experience[0].company && (
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Briefcase className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-display font-bold">Experience</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onRegenerate("experience")}
                                disabled={isRegenerating === "experience"}
                            >
                                <RefreshCw className={`w-4 h-4 ${isRegenerating === "experience" ? "animate-spin" : ""}`} />
                            </Button>
                        </div>
                        <div className="space-y-6">
                            {portfolio.experience.map((exp, i) => (
                                <div key={i} className="relative pl-6 border-l-2 border-primary/30">
                                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full gradient-bg" />
                                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                                    <p className="text-primary font-medium">{exp.company}</p>
                                    <p className="text-sm text-muted-foreground mb-2">{exp.duration}</p>
                                    <p className="text-muted-foreground">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {portfolio.education.length > 0 && portfolio.education[0].institution && (
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-display font-bold">Education</h2>
                        </div>
                        <div className="space-y-4">
                            {portfolio.education.map((edu, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <p className="text-muted-foreground">{edu.institution}</p>
                                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                <section className="text-center py-12 border-t border-border">
                    <h2 className="text-2xl font-display font-bold mb-4">Let's Connect</h2>
                    <p className="text-muted-foreground mb-6">
                        I'm always open to new opportunities and collaborations.
                    </p>
                    {portfolio.email && (
                        <a
                            href={`mailto:${portfolio.email}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                        >
                            <Mail className="w-5 h-5" />
                            Get in Touch
                        </a>
                    )}
                </section>
            </div>
        </div>
    );
};

export default PortfolioPreview;
