
"use client";

import React, { useState } from "react";
import { Button } from '@/components/ui/button'
import Image from "next/image";
import Imagination from "@/assets/final-result.png"
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import * as Progress from "@radix-ui/react-progress";

const FashionDesignSection: React.FC = () => {
  const [sketch, setSketch] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const simulateProgress = (callback: () => void) => {
    setIsLoading(true);
    setProgress(0);

    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 20;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          callback();
        }, 400);
      }
      setProgress(value);
    }, 300);
  };

  const handleSketchUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSketch(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = () => {
    simulateProgress(() => {
      setGeneratedImage("/placeholder-fashion-image.jpg");
    });
  };

  const handleUpdateClick = () => {
    simulateProgress(() => {
      alert(`Updated design with prompt: "${prompt}"`);
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-white py-16 px-6">
      <div className="w-full max-w-3xl rounded-3xl shadow-lg bg-white/70 backdrop-blur-xl border border-pink-200 overflow-hidden p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-fashion-gradient bg-clip-text text-transparent block">
          Upload Your Fashion Sketch
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Transform your hand-drawn fashion ideas into stunning digital concepts powered by AI.
        </p>

        <Separator.Root className="h-px bg-pink-200 mb-8" />

        {/* Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <Label.Root
            htmlFor="sketch-upload"
            className="cursor-pointer bg-fashion-gradient text-white px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition"
          >
            Upload Fashion Sketch
          </Label.Root>

          <input
            id="sketch-upload"
            type="file"
            accept="image/*"
            onChange={handleSketchUpload}
            className="hidden"
          />

          {sketch && (
            <div className="relative w-64 h-64 mt-4 rounded-2xl overflow-hidden shadow-md ring-2 ring-pink-300">
              <Image
                src={sketch}
                alt="Uploaded Sketch"
                fill
                className="object-contain bg-white"
              />
            </div>
          )}

          {sketch && !isLoading && (
        <Button
                variant="default"
                size="lg"
              onClick={handleGenerateClick}
                className="group bg-fashion-gradient hover:opacity-90"
              >
              Generate Design
            </Button>
          )}
        </div>

        {/* Loading Progress */}
        {isLoading && (
          <div className="mt-8 w-full flex flex-col items-center">
            <p className="text-pink-600 font-medium mb-2">
              Generating your design...
            </p>
            <Progress.Root
              className="relative overflow-hidden bg-pink-100 rounded-full w-2/3 h-3"
              value={progress}
            >
              <Progress.Indicator
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </Progress.Root>
          </div>
        )}

        {/* Generated Image Section */}
        {generatedImage && !isLoading && (
          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-lg ring-2 ring-purple-300">
              <Image
                src={Imagination.src}
                alt="Generated Fashion Design"
                fill
                className="object-contain bg-white"
              />
            </div>

            <textarea
              placeholder="Fine-tune your design (e.g., 'add lace sleeves, make it silk, pastel tones')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full max-w-lg mt-4 border border-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none shadow-sm"
              rows={3}
            />
        <Button
                variant="default"
                size="lg"
              onClick={handleUpdateClick}
                className="group bg-fashion-gradient hover:opacity-90"
              >
              Update Design
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FashionDesignSection;
