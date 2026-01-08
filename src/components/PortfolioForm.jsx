import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Sparkles, Loader2, Palette } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const themes = [
    { value: "rainbow", label: "🌈 Rainbow", gradient: "linear-gradient(135deg, hsl(280 100% 65%) 0%, hsl(340 100% 70%) 50%, hsl(45 100% 60%) 100%)" },
    { value: "sunset", label: "🌅 Sunset", gradient: "linear-gradient(135deg, hsl(320 85% 60%) 0%, hsl(15 95% 60%) 50%, hsl(45 100% 65%) 100%)" },
    { value: "ocean", label: "🌊 Ocean", gradient: "linear-gradient(135deg, hsl(240 95% 65%) 0%, hsl(200 95% 55%) 50%, hsl(180 85% 60%) 100%)" },
    { value: "purple", label: "💜 Purple Dream", gradient: "linear-gradient(135deg, hsl(250 90% 65%) 0%, hsl(290 85% 68%) 100%)" },
    { value: "fire", label: "🔥 Fire", gradient: "linear-gradient(135deg, hsl(10 95% 60%) 0%, hsl(35 100% 55%) 100%)" },
    { value: "neon", label: "⚡ Neon", gradient: "linear-gradient(135deg, hsl(160 100% 50%) 0%, hsl(290 100% 70%) 100%)" },
    { value: "emerald", label: "🍀 Emerald", gradient: "linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(170 78% 42%) 100%)" },
];

const PortfolioForm = ({ formData, setFormData, onGenerate, isGenerating }) => {
    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, { title: "", description: "", technologies: "", link: "" }]
        });
    };

    const removeProject = (index) => {
        const newProjects = formData.projects.filter((_, i) => i !== index);
        setFormData({ ...formData, projects: newProjects.length ? newProjects : [{ title: "", description: "", technologies: "", link: "" }] });
    };

    const updateProject = (index, field, value) => {
        const newProjects = [...formData.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        setFormData({ ...formData, projects: newProjects });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { institution: "", degree: "", year: "" }]
        });
    };

    const removeEducation = (index) => {
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEducation.length ? newEducation : [{ institution: "", degree: "", year: "" }] });
    };

    const updateEducation = (index, field, value) => {
        const newEducation = [...formData.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        setFormData({ ...formData, education: newEducation });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { company: "", role: "", duration: "", description: "" }]
        });
    };

    const removeExperience = (index) => {
        const newExperience = formData.experience.filter((_, i) => i !== index);
        setFormData({ ...formData, experience: newExperience.length ? newExperience : [{ company: "", role: "", duration: "", description: "" }] });
    };

    const updateExperience = (index, field, value) => {
        const newExperience = [...formData.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        setFormData({ ...formData, experience: newExperience });
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Basic Info */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg font-display">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Professional Role *</Label>
                            <Input
                                id="role"
                                placeholder="Full Stack Developer"
                                value={formData.role}
                                onChange={(e) => updateField("role", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Skills */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg font-display">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma separated) *</Label>
                        <Textarea
                            id="skills"
                            placeholder="React, TypeScript, Node.js, Python, AWS..."
                            value={formData.skills}
                            onChange={(e) => updateField("skills", e.target.value)}
                            rows={3}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Projects */}
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-display">Projects</CardTitle>
                    <Button variant="ghost" size="sm" onClick={addProject}>
                        <Plus className="w-4 h-4 mr-1" /> Add Project
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.projects.map((project, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-3 relative">
                            {formData.projects.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8"
                                    onClick={() => removeProject(index)}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label>Project Title</Label>
                                    <Input
                                        placeholder="E-commerce Platform"
                                        value={project.title}
                                        onChange={(e) => updateProject(index, "title", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Link (optional)</Label>
                                    <Input
                                        placeholder="https://github.com/..."
                                        value={project.link}
                                        onChange={(e) => updateProject(index, "link", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Brief Description</Label>
                                <Textarea
                                    placeholder="What does this project do? What problem does it solve?"
                                    value={project.description}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    rows={2}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Technologies Used</Label>
                                <Input
                                    placeholder="React, Node.js, MongoDB"
                                    value={project.technologies}
                                    onChange={(e) => updateProject(index, "technologies", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Experience */}
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-display">Experience</CardTitle>
                    <Button variant="ghost" size="sm" onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-1" /> Add Experience
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-3 relative">
                            {formData.experience.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8"
                                    onClick={() => removeExperience(index)}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label>Company</Label>
                                    <Input
                                        placeholder="Google"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Input
                                        placeholder="Senior Developer"
                                        value={exp.role}
                                        onChange={(e) => updateExperience(index, "role", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Duration</Label>
                                <Input
                                    placeholder="2020 - Present"
                                    value={exp.duration}
                                    onChange={(e) => updateExperience(index, "duration", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="What did you do? Key achievements?"
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    rows={2}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Education */}
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-display">Education</CardTitle>
                    <Button variant="ghost" size="sm" onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-1" /> Add Education
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.education.map((edu, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-3 relative">
                            {formData.education.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8"
                                    onClick={() => removeEducation(index)}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="space-y-2">
                                    <Label>Institution</Label>
                                    <Input
                                        placeholder="MIT"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Degree</Label>
                                    <Input
                                        placeholder="B.S. Computer Science"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Year</Label>
                                    <Input
                                        placeholder="2024"
                                        value={edu.year}
                                        onChange={(e) => updateEducation(index, "year", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg font-display">Social Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                                id="github"
                                placeholder="https://github.com/username"
                                value={formData.github}
                                onChange={(e) => updateField("github", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                                id="linkedin"
                                placeholder="https://linkedin.com/in/username"
                                value={formData.linkedin}
                                onChange={(e) => updateField("linkedin", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter/X</Label>
                            <Input
                                id="twitter"
                                placeholder="https://twitter.com/username"
                                value={formData.twitter}
                                onChange={(e) => updateField("twitter", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                placeholder="https://yourwebsite.com"
                                value={formData.website}
                                onChange={(e) => updateField("website", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Theme Selection */}
            <Card className="glass-card border-2 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg font-display flex items-center gap-2">
                        <Palette className="w-5 h-5 text-primary" />
                        Portfolio Color Theme
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <Label htmlFor="theme">Choose Preset Theme</Label>
                        <Select value={formData.theme} onValueChange={(value) => updateField("theme", value)}>
                            <SelectTrigger id="theme" className="w-full">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme.value} value={theme.value}>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-md border border-border"
                                                style={{ background: theme.gradient }}
                                            />
                                            <span>{theme.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="relative">
                            <Label htmlFor="customColor1">Or Pick Custom Colors</Label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Start Color</Label>
                                    <Input
                                        id="customColor1"
                                        type="color"
                                        className="h-16 cursor-pointer"
                                        defaultValue="#c026d3"
                                        onChange={(e) => {
                                            const color1 = e.target.value;
                                            const color2 = document.getElementById('customColor2');
                                            if (color2) {
                                                const customGradient = `linear-gradient(135deg, ${color1} 0%, ${color2.value} 100%)`;
                                                updateField("theme", customGradient);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">End Color</Label>
                                    <Input
                                        id="customColor2"
                                        type="color"
                                        className="h-16 cursor-pointer"
                                        defaultValue="#fbbf24"
                                        onChange={(e) => {
                                            const color2 = e.target.value;
                                            const color1 = document.getElementById('customColor1');
                                            if (color1) {
                                                const customGradient = `linear-gradient(135deg, ${color1.value} 0%, ${color2} 100%)`;
                                                updateField("theme", customGradient);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-border bg-muted/30">
                            <p className="text-sm text-muted-foreground mb-3">Preview:</p>
                            <div
                                className="h-16 rounded-lg shadow-lg"
                                style={{
                                    background: formData.theme.startsWith('linear-gradient')
                                        ? formData.theme
                                        : themes.find(t => t.value === formData.theme)?.gradient || themes[0].gradient
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={onGenerate}
                disabled={isGenerating || !formData.name || !formData.role || !formData.skills}
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating with AI...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Generate Portfolio with AI
                    </>
                )}
            </Button>
        </div>
    );
};

export default PortfolioForm;
