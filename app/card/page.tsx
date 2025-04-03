"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

const themes = [
  {
    bg: "from-rose-900 to-purple-900",
    textColor: "text-rose-300",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&h=900&fit=crop",
  },
  {
    bg: "from-blue-900 to-purple-900",
    textColor: "text-blue-300",
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&h=900&fit=crop",
  },
  {
    bg: "from-emerald-900 to-teal-900",
    textColor: "text-emerald-300",
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1600&h=900&fit=crop",
  },
];

export default function CardPage() {
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const name = searchParams.get("name") || "";
  const teamName = searchParams.get("teamName") || "";
  const themeIndex = parseInt(searchParams.get("theme") || "0");
  const theme = themes[themeIndex];

  const downloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement("a");
      link.download = `${name}-id-card.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center gap-8">
      <div
        ref={cardRef}
        className="w-[400px] h-[600px] rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#000" }}
      >
        <div
          className={`w-full h-full bg-gradient-to-b ${theme.bg} relative p-8 flex flex-col items-center`}
        >
          <div className="absolute inset-0">
            <img
              src={theme.image}
              alt="background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-6 mt-8">
            <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                alt="avatar"
                className="w-32 h-32"
              />
            </div>
            
            <div className="text-center space-y-4 mt-6">
              <h1 className={`text-4xl font-bold ${theme.textColor}`}>
                {name.toUpperCase()}
              </h1>
              <p className="text-white/60 text-xl">{teamName}</p>
            </div>
            
            <div className="mt-auto text-center">
              <h2 className={`text-3xl font-bold mb-4 ${theme.textColor}`}>
                WEB WIZARD 3.0
              </h2>
              <p className="text-white/80 text-sm max-w-[280px]">
                We are participating in WebWiz, exploring
                the development journey! Excited to connect
                with devs and learn together!
              </p>
              <p className="text-white/60 mt-4">3rd April, 2025</p>
            </div>
          </div>
        </div>
      </div>
      
      <Button onClick={downloadCard} className="gap-2">
        <Download size={20} />
        Download ID Card
      </Button>
    </div>
  );
}