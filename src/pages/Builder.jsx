import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, LogOut } from "lucide-react";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioPreview from "@/components/PortfolioPreview";
import { initialFormData } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Builder = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast({
            title: "Logged out",
            description: "You have been logged out successfully",
        });
        navigate("/login");
    };
    const [formData, setFormData] = useState(initialFormData);
    const [portfolio, setPortfolio] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(null);

    const callGeminiAI = async (section, currentPortfolio) => {
        if (!GEMINI_API_KEY) {
            throw new Error("Gemini API Key is not configured in .env file");
        }

        let prompt = "";

        if (section === "full") {
            prompt = `You are a professional portfolio writer. Generate content for a personal portfolio based on the following information. Be professional, engaging, and highlight the person's strengths.

Name: ${formData.name}
Role: ${formData.role}
Email: ${formData.email || "Not provided"}
Location: ${formData.location || "Not provided"}
Skills: ${formData.skills}

Projects:
${formData.projects.map((p, i) => `${i + 1}. ${p.title}: ${p.description} (Technologies: ${p.technologies})`).join("\n")}

Experience:
${formData.experience.map((e, i) => `${i + 1}. ${e.role} at ${e.company} (${e.duration}): ${e.description}`).join("\n")}

Education:
${formData.education.map((e, i) => `${i + 1}. ${e.degree} from ${e.institution} (${e.year})`).join("\n")}

Generate a JSON response with the following structure (no markdown, just JSON):
{
  "headline": "A catchy 1-2 sentence professional tagline",
  "about": "A compelling 2-3 paragraph about me section (as a single string)",
  "projectDescriptions": ["Enhanced description for project 1", "Enhanced description for project 2", ...],
  "experienceDescriptions": ["Enhanced description for experience 1", "Enhanced description for experience 2", ...]
}

Make the content engaging, professional, and highlight achievements. Use action verbs and quantify achievements where possible.`;
        } else if (section === "headline") {
            prompt = `Generate a new catchy professional headline/tagline for:
Name: ${formData.name}
Role: ${formData.role}
Skills: ${formData.skills}

Return ONLY a JSON object: {"headline": "Your new headline here"}
Make it different from: "${currentPortfolio?.headline || ""}"`;
        } else if (section === "about") {
            prompt = `Generate a new compelling about me section for:
Name: ${formData.name}
Role: ${formData.role}
Skills: ${formData.skills}
Experience: ${formData.experience.map((e) => e.role + " at " + e.company).join(", ")}

Return ONLY a JSON object: {"about": "Your new about me text here (2-3 paragraphs as a single string)"}
Make it different from the current one and more engaging.`;
        } else if (section === "projects") {
            prompt = `Generate enhanced project descriptions for:
${formData.projects.map((p, i) => `Project ${i + 1}: ${p.title} - ${p.description} (Tech: ${p.technologies})`).join("\n")}

Return ONLY a JSON object: {"projectDescriptions": ["Description 1", "Description 2", ...]}
Make them compelling and highlight technical achievements.`;
        } else if (section === "experience") {
            prompt = `Generate enhanced experience descriptions for:
${formData.experience.map((e, i) => `${i + 1}. ${e.role} at ${e.company} (${e.duration}): ${e.description}`).join("\n")}

Return ONLY a JSON object: {"experienceDescriptions": ["Description 1", "Description 2", ...]}
Use action verbs and highlight achievements.`;
        } else if (section === "ui") {
            prompt = `You are a world-class UI/UX designer and Frontend Developer. 
Take the following portfolio data and generate a COMPLETE, SINGLE-FILE HTML/CSS portfolio that is modern, professional, and follows high-end European design standards.

Data:
Name: ${formData.name}
Role: ${formData.role}
Headline: ${currentPortfolio?.headline}
About: ${currentPortfolio?.about}
Skills: ${formData.skills}
Theme: ${formData.theme}

Requirements:
1. Use a dark, sophisticated color palette with ${formData.theme} gradients.
2. Include smooth scroll animations and hover effects.
3. Use modern typography (Inter/Outfit).
4. Add glassmorphism cards and subtle glow effects.
5. Ensure it is fully responsive.
6. Include all sections: Hero, About, Skills, Projects, Experience, Education, and Contact.

Return ONLY a JSON object: {"html": "the complete html code here as a single string"}
Make it look like a premium $10k portfolio website.`;
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt + "\n\nIMPORTANT: Return ONLY the JSON object. Do not include markdown formatting, code blocks, or any other text."
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: "application/json",
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API error:", response.status, errorText);

            // Show detailed error to user
            let errorMessage = "Failed to generate content from AI";
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.error?.message) {
                    errorMessage = errorJson.error.message;
                }
            } catch (e) {
                // errorText is not JSON, use it as is
                if (errorText.length > 0 && errorText.length < 200) {
                    errorMessage = errorText;
                }
            }

            throw new Error(errorMessage);
        }

        const aiResponse = await response.json();
        console.log("AI Response:", aiResponse);

        const content = aiResponse.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!content) {
            console.error("No content in AI response. Full response:", JSON.stringify(aiResponse));
            throw new Error("No content in AI response. The AI may have blocked the request.");
        }

        return JSON.parse(content);
    };

    const generatePortfolio = async () => {
        if (!formData.name || !formData.role || !formData.skills) {
            toast({
                title: "Missing Information",
                description: "Please fill in at least your name, role, and skills.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);

        try {
            const generated = await callGeminiAI("full");

            // Also generate UI enhancements (Full HTML version)
            let uiEnhancements = { html: "" };
            try {
                // Pass the generated content to the UI call for better context
                const tempPortfolio = { ...initialFormData, headline: generated.headline, about: generated.about };
                uiEnhancements = await callGeminiAI("ui", tempPortfolio);
            } catch (e) {
                console.warn("UI enhancement failed, using default styles", e);
            }

            const newPortfolio = {
                name: formData.name,
                role: formData.role,
                email: formData.email,
                location: formData.location,
                headline: generated.headline,
                about: generated.about,
                skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
                projects: formData.projects.map((p, i) => ({
                    id: crypto.randomUUID(),
                    title: p.title,
                    description: generated.projectDescriptions?.[i] || p.description,
                    technologies: p.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                    link: p.link
                })).filter((p) => p.title),
                education: formData.education.map((e) => ({
                    id: crypto.randomUUID(),
                    institution: e.institution,
                    degree: e.degree,
                    year: e.year
                })).filter((e) => e.institution),
                experience: formData.experience.map((e, i) => ({
                    id: crypto.randomUUID(),
                    company: e.company,
                    role: e.role,
                    duration: e.duration,
                    description: generated.experienceDescriptions?.[i] || e.description
                })).filter((e) => e.company),
                socialLinks: {
                    github: formData.github,
                    linkedin: formData.linkedin,
                    twitter: formData.twitter,
                    website: formData.website
                },
                theme: formData.theme || "rainbow",
                fullHTML: uiEnhancements.html
            };

            setPortfolio(newPortfolio);
            toast({
                title: "Portfolio Generated! 🎉",
                description: "Your AI-powered portfolio is ready. You can now customize or download it.",
            });
        } catch (error) {
            console.error("Generation error:", error);

            // Show detailed error
            const errorMsg = error.message || "Something went wrong. Please try again.";
            toast({
                title: "AI Generation Failed",
                description: errorMsg + " - Using basic portfolio instead.",
                variant: "destructive"
            });

            // Create portfolio without AI enhancement as fallback
            const basicPortfolio = {
                name: formData.name,
                role: formData.role,
                email: formData.email,
                location: formData.location,
                headline: `${formData.role} | Building Amazing Things`,
                about: `Hello! I'm ${formData.name}, a ${formData.role} with expertise in ${formData.skills}. I'm passionate about creating innovative solutions and continuously learning new technologies.`,
                skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
                projects: formData.projects.map((p) => ({
                    id: crypto.randomUUID(),
                    title: p.title,
                    description: p.description,
                    technologies: p.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                    link: p.link
                })).filter((p) => p.title),
                education: formData.education.map((e) => ({
                    id: crypto.randomUUID(),
                    institution: e.institution,
                    degree: e.degree,
                    year: e.year
                })).filter((e) => e.institution),
                experience: formData.experience.map((e) => ({
                    id: crypto.randomUUID(),
                    company: e.company,
                    role: e.role,
                    duration: e.duration,
                    description: e.description
                })).filter((e) => e.company),
                socialLinks: {
                    github: formData.github,
                    linkedin: formData.linkedin,
                    twitter: formData.twitter,
                    website: formData.website
                },
                theme: formData.theme || "rainbow"
            };

            setPortfolio(basicPortfolio);
        } finally {
            setIsGenerating(false);
        }
    };

    const regenerateSection = async (section) => {
        if (!portfolio) return;

        setIsRegenerating(section);

        try {
            const generated = await callGeminiAI(section, portfolio);
            const updatedPortfolio = { ...portfolio };

            if (section === "headline" && generated.headline) {
                updatedPortfolio.headline = generated.headline;
            } else if (section === "about" && generated.about) {
                updatedPortfolio.about = generated.about;
            } else if (section === "projects" && generated.projectDescriptions) {
                updatedPortfolio.projects = updatedPortfolio.projects.map((p, i) => ({
                    ...p,
                    description: generated.projectDescriptions[i] || p.description
                }));
            } else if (section === "experience" && generated.experienceDescriptions) {
                updatedPortfolio.experience = updatedPortfolio.experience.map((e, i) => ({
                    ...e,
                    description: generated.experienceDescriptions[i] || e.description
                }));
            }

            setPortfolio(updatedPortfolio);
            toast({
                title: "Section Regenerated!",
                description: `The ${section} section has been updated.`,
            });
        } catch (error) {
            console.error("Regeneration error:", error);
            toast({
                title: "Regeneration Failed",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsRegenerating(null);
        }
    };

    const downloadPortfolio = () => {
        if (!portfolio) return;

        // Use the AI-generated full HTML if available, otherwise use the template
        const html = portfolio.fullHTML || generateHTML(portfolio);
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${portfolio.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Download Started!",
            description: "Your portfolio HTML file is being downloaded.",
        });
    };

    const generateHTML = (portfolio) => {
        const themeGradients = {
            rainbow: "linear-gradient(135deg, hsl(280 100% 65%) 0%, hsl(340 100% 70%) 50%, hsl(45 100% 60%) 100%)",
            sunset: "linear-gradient(135deg, hsl(320 85% 60%) 0%, hsl(15 95% 60%) 50%, hsl(45 100% 65%) 100%)",
            ocean: "linear-gradient(135deg, hsl(240 95% 65%) 0%, hsl(200 95% 55%) 50%, hsl(180 85% 60%) 100%)",
            purple: "linear-gradient(135deg, hsl(250 90% 65%) 0%, hsl(290 85% 68%) 100%)",
            fire: "linear-gradient(135deg, hsl(10 95% 60%) 0%, hsl(35 100% 55%) 100%)",
            neon: "linear-gradient(135deg, hsl(160 100% 50%) 0%, hsl(290 100% 70%) 100%)",
            emerald: "linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(170 78% 42%) 100%)",
        };

        // Check if theme is a custom gradient or a preset
        const selectedGradient = portfolio.theme.startsWith('linear-gradient')
            ? portfolio.theme
            : (themeGradients[portfolio.theme] || themeGradients.rainbow);

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${portfolio.headline}">
  <title>${portfolio.name} - ${portfolio.role}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0a0f1e; color: #f1f5f9; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    h1, h2, h3 { font-family: 'Outfit', sans-serif; }
    .hero { text-align: center; padding: 5rem 0 3rem; }
    .avatar { width: 120px; height: 120px; border-radius: 50%; background: ${selectedGradient}; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: bold; color: white; margin: 0 auto 1.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
    .name { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; background: ${selectedGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .role { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #94a3b8; }
    .headline { color: #cbd5e1; font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.8; }
    .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-top: 2rem; font-size: 1rem; color: #94a3b8; }
    .section { margin-top: 4rem; }
    .section-title { font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; background: ${selectedGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .skills { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .skill { background: rgba(148, 163, 184, 0.1); padding: 0.75rem 1.5rem; border-radius: 9999px; font-size: 0.95rem; border: 1px solid rgba(148, 163, 184, 0.2); color: #e2e8f0; font-weight: 500; }
    .card { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 1rem; padding: 2rem; margin-bottom: 1.5rem; backdrop-filter: blur(10px); }
    .card h3 { margin-bottom: 0.5rem; font-size: 1.5rem; color: #f1f5f9; }
    .card-meta { background: ${selectedGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; font-size: 1.1rem; }
    .card-date { color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.75rem; }
    .card p { color: #cbd5e1; line-height: 1.7; }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
    .tech-tag { background: rgba(148, 163, 184, 0.15); border: 1px solid rgba(148, 163, 184, 0.2); padding: 0.4rem 1rem; border-radius: 0.5rem; font-size: 0.85rem; color: #cbd5e1; }
    .timeline { border-left: 2px solid rgba(148, 163, 184, 0.2); padding-left: 2rem; }
    .timeline-item { position: relative; margin-bottom: 2rem; }
    .timeline-dot { position: absolute; left: -2.5rem; top: 0.25rem; width: 1rem; height: 1rem; background: ${selectedGradient}; border-radius: 50%; box-shadow: 0 0 15px rgba(148, 163, 184, 0.5); }
    .social-links { display: flex; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
    .social-link { display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: rgba(148, 163, 184, 0.1); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 0.75rem; color: #e2e8f0; text-decoration: none; transition: all 0.3s; font-weight: 600; }
    .social-link:hover { background: ${selectedGradient}; border-color: transparent; transform: translateY(-2px); }
    .cta { text-align: center; padding: 4rem 0; border-top: 1px solid rgba(148, 163, 184, 0.1); margin-top: 4rem; }
    .cta-button { display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 2rem; background: ${selectedGradient}; color: white; border-radius: 0.75rem; text-decoration: none; font-weight: 600; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.2s; }
    .cta-button:hover { transform: translateY(-2px); }
    @media (max-width: 640px) { .name { font-size: 2.5rem; } .container { padding: 1rem; } .hero { padding: 3rem 0 2rem; } }
    
    /* AI Generated UI Enhancements */
    ${portfolio.customCSS || ''}
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <div class="avatar">${portfolio.name.charAt(0)}</div>
      <h1 class="name">${portfolio.name}</h1>
      <p class="role">${portfolio.role}</p>
      <p class="headline">${portfolio.headline}</p>
      <div class="contact">
        ${portfolio.email ? `<span>📧 ${portfolio.email}</span>` : ''}
        ${portfolio.location ? `<span>📍 ${portfolio.location}</span>` : ''}
      </div>
      <div class="social-links">
        ${portfolio.socialLinks.github ? `<a href="${portfolio.socialLinks.github}" target="_blank" class="social-link">GH</a>` : ''}
        ${portfolio.socialLinks.linkedin ? `<a href="${portfolio.socialLinks.linkedin}" target="_blank" class="social-link">LI</a>` : ''}
        ${portfolio.socialLinks.twitter ? `<a href="${portfolio.socialLinks.twitter}" target="_blank" class="social-link">X</a>` : ''}
        ${portfolio.socialLinks.website ? `<a href="${portfolio.socialLinks.website}" target="_blank" class="social-link">🌐</a>` : ''}
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">About Me</h2>
      <p>${portfolio.about}</p>
    </section>

    <section class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills">
        ${portfolio.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
      </div>
    </section>

    ${portfolio.projects.length > 0 && portfolio.projects[0].title ? `
    <section class="section">
      <h2 class="section-title">Projects</h2>
      ${portfolio.projects.map(project => `
        <div class="card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </section>
    ` : ''}

    ${portfolio.experience.length > 0 && portfolio.experience[0].company ? `
    <section class="section">
      <h2 class="section-title">Experience</h2>
      <div class="timeline">
        ${portfolio.experience.map(exp => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <h3>${exp.role}</h3>
            <p class="card-meta">${exp.company}</p>
            <p class="card-date">${exp.duration}</p>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${portfolio.education.length > 0 && portfolio.education[0].institution ? `
    <section class="section">
      <h2 class="section-title">Education</h2>
      ${portfolio.education.map(edu => `
        <div class="card">
          <h3>${edu.degree}</h3>
          <p class="card-meta">${edu.institution}</p>
          <p class="card-date">${edu.year}</p>
        </div>
      `).join('')}
    </section>
    ` : ''}

    <section class="cta">
      <h2>Let's Connect</h2>
      <p style="color: #64748b; margin: 1rem 0;">I'm always open to new opportunities and collaborations.</p>
      ${portfolio.email ? `<a href="mailto:${portfolio.email}" class="cta-button">📧 Get in Touch</a>` : ''}
    </section>
  </div>
</body>
</html>`;
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setPortfolio(null);
        toast({
            title: "Reset Complete",
            description: "Form has been cleared. Start fresh!",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl font-display font-bold">Portfolio Builder</h1>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4 scrollbar-thin">
                        <PortfolioForm
                            formData={formData}
                            setFormData={setFormData}
                            onGenerate={generatePortfolio}
                            isGenerating={isGenerating}
                        />
                    </div>

                    {/* Preview */}
                    <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                        <div className="glass-card rounded-xl overflow-hidden min-h-[600px]">
                            <PortfolioPreview
                                portfolio={portfolio}
                                onRegenerate={regenerateSection}
                                onDownload={downloadPortfolio}
                                isRegenerating={isRegenerating}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;
