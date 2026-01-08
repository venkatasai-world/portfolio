import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const themes = [
    {
        name: "🌈 Rainbow",
        value: "rainbow",
        colors: {
            primary: "hsl(280 100% 65%)",
            primaryHsl: "280 100% 65%",
            gradient: "linear-gradient(135deg, hsl(280 100% 65%) 0%, hsl(340 100% 70%) 50%, hsl(45 100% 60%) 100%)",
        },
    },
    {
        name: "🌅 Sunset",
        value: "sunset",
        colors: {
            primary: "hsl(15 95% 60%)",
            primaryHsl: "15 95% 60%",
            gradient: "linear-gradient(135deg, hsl(320 85% 60%) 0%, hsl(15 95% 60%) 50%, hsl(45 100% 65%) 100%)",
        },
    },
    {
        name: "🌊 Ocean",
        value: "ocean",
        colors: {
            primary: "hsl(200 95% 55%)",
            primaryHsl: "200 95% 55%",
            gradient: "linear-gradient(135deg, hsl(240 95% 65%) 0%, hsl(200 95% 55%) 50%, hsl(180 85% 60%) 100%)",
        },
    },
    {
        name: "💜 Purple Dream",
        value: "purple",
        colors: {
            primary: "hsl(270 85% 65%)",
            primaryHsl: "270 85% 65%",
            gradient: "linear-gradient(135deg, hsl(250 90% 65%) 0%, hsl(290 85% 68%) 100%)",
        },
    },
    {
        name: "🔥 Fire",
        value: "fire",
        colors: {
            primary: "hsl(10 95% 60%)",
            primaryHsl: "10 95% 60%",
            gradient: "linear-gradient(135deg, hsl(10 95% 60%) 0%, hsl(35 100% 55%) 100%)",
        },
    },
    {
        name: "⚡ Neon",
        value: "neon",
        colors: {
            primary: "hsl(160 100% 50%)",
            primaryHsl: "160 100% 50%",
            gradient: "linear-gradient(135deg, hsl(160 100% 50%) 0%, hsl(290 100% 70%) 100%)",
        },
    },
    {
        name: "🍀 Emerald",
        value: "emerald",
        colors: {
            primary: "hsl(142 76% 36%)",
            primaryHsl: "142 76% 36%",
            gradient: "linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(170 78% 42%) 100%)",
        },
    },
];

const ThemeSelector = () => {
    const [selectedTheme, setSelectedTheme] = useState("rainbow");

    // Set rainbow theme as default on first load
    useEffect(() => {
        const rainbowTheme = themes.find(t => t.value === "rainbow") || themes[0];
        applyTheme(rainbowTheme);
    }, []);

    const applyTheme = (theme) => {
        setSelectedTheme(theme.value);
        const root = document.documentElement;
        root.style.setProperty("--primary", theme.colors.primaryHsl);
        root.style.setProperty("--ring", theme.colors.primaryHsl);

        // Force update all gradient elements
        setTimeout(() => {
            const style = document.createElement('style');
            style.id = 'dynamic-gradient';
            const oldStyle = document.getElementById('dynamic-gradient');
            if (oldStyle) oldStyle.remove();

            style.textContent = `
        .gradient-text {
          background-image: ${theme.colors.gradient} !important;
        }
        .gradient-bg {
          background-image: ${theme.colors.gradient} !important;
        }
      `;
            document.head.appendChild(style);
        }, 0);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative animate-pulse-slow">
                    <Palette className="h-5 w-5" />
                    <span className="sr-only">Select theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>🎨 Choose Theme Color</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {themes.map((theme) => (
                    <DropdownMenuItem
                        key={theme.value}
                        onClick={() => applyTheme(theme)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg border-2 border-border shadow-lg"
                                style={{ background: theme.colors.gradient }}
                            />
                            <span className="font-medium">{theme.name}</span>
                        </div>
                        {selectedTheme === theme.value && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSelector;
