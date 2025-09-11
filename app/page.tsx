'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Brain, Wand2, ArrowRight, CheckCircle, Shirt, Scissors, Clock } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Home() {
    const generatorRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startGeneration = () => {
    setIsGenerating(true);
    setIsTraining(true);
    setProgress(0);
    setShowResults(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setShowResults(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

const aiDesigns = [
  { category: 'Tops', icon: <Shirt size={20} /> },
  { category: 'Dresses', icon: <Scissors size={20} /> },
  { category: 'Pants', icon: <Shirt size={20} /> }, // Using Dress icon for pants
  { category: 'Shoes', icon: <Zap size={20} /> }, // Using Zap as fallback
  { category: 'Accessories', icon: <Scissors size={20} /> }
];

  const matches = [
    { category: 'Pants', percentage: 86 },
    { category: 'Accessories', percentage: 89 },
    { category: 'Dresses', percentage: 84 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold">StyleSynth</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Gallery</a>
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>
        <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Generate Unique Fashion Designs
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              with GAN AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of fashion design with our Generative Adversarial Network.
            Create stunning, original clothing designs from random noise using advanced
            machine learning trained on fashion datasets.
          </motion.p>
          </div></main>
            <div>
            <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-12"
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={scrollToGenerator}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
            >
              Start Generating
              <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              View Gallery
            </button>
          </motion.div>
          </div>
            <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-16"
          />
          <div>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-8"
          >
           {/* Feature 1 */}
            <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Neural Networks</h3>
              <p className="text-gray-400">GAN Architecture</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Generation</h3>
              <p className="text-gray-400">Instant Results</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-pink-500 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Designs</h3>
              <p className="text-gray-400">Never Repeating</p>
            </div>
          </motion.div>
        </div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        <section
        ref={generatorRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
     <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Fashion Magic?
            </h2>

            <button
              onClick={startGeneration}
              disabled={isGenerating}
              className="group relative bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className="w-6 h-6 inline mr-2 group-hover:rotate-12 transition-transform" />
              Start Generating
              <Zap className="w-5 h-5 inline ml-2 group-hover:animate-pulse" />
            </button>
          </motion.div>

          {/* Training Progress */}
          <AnimatePresence>
            {isTraining && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700"
              >
                <div className="text-center mb-6">
                  <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-2">Training GAN Model...</h3>
                  <p className="text-gray-300">Training Generator Network...</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                  />
                </div>
                <p className="text-center text-gray-400">{progress}% Complete</p>
                {/* Generation Features */}
                <div className="mt-8 p-4 bg-gray-900/50 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    Generation
                  </h4>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Randomize</span>
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-4 gap-8"
              >
                {/* AI Designs List */}
                <div className="lg:col-span-1 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Brain className="w-6 h-6 text-blue-400 mr-2" />
                    AI Designs
                  </h3>
                  <div className="space-y-3">
                    {aiDesigns.map((design, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                        <div className="w-6 h-6 text-blue-400 mr-3">
                          {design.icon}
                        </div>
                        <span className="text-gray-200">{design.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Match Percentage */}
                <div className="lg:col-span-1 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Match Analysis</h3>
                  <div className="space-y-4">
                    {matches.map((match, index) => (
                      <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-200">{match.category}</span>
                          <span className="text-green-400 font-bold">{match.percentage}% Match</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                            style={{ width: `${match.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Generated Designs */}
                <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4">AI Generated Designs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: item * 0.1 }}
                        className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-200 mb-2">AI Generated Design</h4>
                        <p className="text-sm text-gray-400">Unique fashion pattern #{item}</p>
                        <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-3/4"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </section>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

                {/* Additional info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">How it works</h3>
              <p className="text-gray-300">
                Our GAN analyzes thousands of fashion designs to create completely new,
                unique patterns and styles that have never been seen before.
              </p>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">What to expect</h3>
              <p className="text-gray-300">
                Each generation produces 4 unique fashion designs. You can refine,
                save, or generate more based on your preferences.
              </p>
            </div>
          </div>
    </div>
  )
}
