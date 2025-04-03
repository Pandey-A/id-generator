"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

// Import your local background images
// Place these images in your public folder
const WebWizardCardGenerator = () => {
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Updated themes to use local background images
  const themes = [
    {
      bg: "#430224",
      textColor: "/logo3.png",
      journeyType: "REACT",
      backgroundImage: "/bg1.png", // Path to your local red/purple background
      characterImage: "/venom3.svg", // Path to your vampire character image
      textImage: "mytext3.svg",
      textc:"#FEA9AB"
    },
    {
      bg: "#050540",
      textColor: "/logo2.png",
      journeyType: "JAVASCRIPT",
      backgroundImage: "/bg2.png", // Path to your local blue/purple background
      characterImage: "/venom2.svg",
      textImage: "mytext2.svg",
      textc:"#EF00CA" // Path to your werewolf character image
    },
    {
      bg: "#0C1510",
      textColor: "/logo1.png",
      journeyType: "NEXT.js",
      backgroundImage: "/bg3.png", // Path to your local green background
      characterImage: "/venom.svg",
      textImage: "mytext1.svg",
      textc:"#B7FEA9" // Path to your witch character image
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && teamName) {
      // Randomly select a theme (0-2)
      setThemeIndex(Math.floor(Math.random() * 3));
      setShowCard(true);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-background to-accent flex flex-col items-center justify-center p-4">
      {!showCard ? (
        <div
          className="w-full max-w-md"
          
        >
          <div className="bg-card rounded-lg shadow-xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center text-card-foreground">
              Web Wizard ID Generator
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
            Full Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full"
          />
              </div>
              <div className="space-y-2">
          <label htmlFor="teamName" className="text-sm font-medium text-muted-foreground">
            Team Name
          </label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            required
            className="w-full"
          />
              </div>
              <Button type="submit" className="w-full">
          Generate ID Card
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div
            ref={cardRef}
            className="w-96 h-144 overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#000" }}
          >
            <div className="w-full h-full relative p-8 flex flex-col items-center" style={{ backgroundColor: themes[themeIndex].bg }}>
              {/* Background overlay */}
              <div className="absolute inset-0 opacity-70">
                <img
                  src={themes[themeIndex].backgroundImage}
                  alt="background"
                  className="w-full h-1/2 "
                />
              </div>
              
              {/* Google Developer Groups logo */}
              <div className=" relative z-20 w-full text-center -mt-4">
                <img src='/footerlogo.png' alt="GDG Logo" className="w-64 h-32 mx-9" style={{ imageRendering: 'crisp-edges' }} />
              </div>
              
              {/* Avatar circle */}
              <div className="relative z-10 w-44 h-44  flex items-center justify-center overflow-hidden mb-6">
                <img
                  src={themes[themeIndex].characterImage}
                  alt="wizard avatar"
                  className="w-full h-full "
                />
              </div>
              
              {/* Card title */}
              <div className="relative z-10 text-center  mt-8">
              <img
                  src={themes[themeIndex].textColor}
                  alt="background"
                  className="w-full h-fit"
                />
              </div>
              
              {/* Name and team */}
              <div className="z-10 mb-4">
                <h1 className="text-2xl font-bold text-white" style={{ color: themes[themeIndex].textc }}>
                  {name.toUpperCase()}
                </h1>
                <p className="text-white/60 text-lg text-center" style={{ color: themes[themeIndex].textc }}>{teamName}</p>
              </div>

              <img
                  src={themes[themeIndex].textImage}
                  alt="wizard avatar"
                  className="w-64px"
                />
              
              
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={downloadCard} className="gap-2">
              <Download size={20} />
              Download ID Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebWizardCardGenerator;