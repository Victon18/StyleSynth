"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Download, Shuffle, Zap } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Designs', icon: '👔' },
  { id: 'tops', label: 'Tops', icon: '👕' },
  { id: 'dresses', label: 'Dresses', icon: '👗' },
  { id: 'pants', label: 'Pants', icon: '👖' },
  { id: 'shoes', label: 'Shoes', icon: '👠' },
  { id: 'accessories', label: 'Accessories', icon: '👜' }
]

interface GeneratedDesign {
  id: string
  category: string
  style: string
  confidence: number
  imageUrl?: string
}

const FashionGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [generatedDesigns, setGeneratedDesigns] = useState<GeneratedDesign[]>([])

  const generateDesigns = async () => {
    setIsGenerating(true)
    setProgress(0)

    // Simulate GAN training progress
    const progressSteps = [10, 25, 50, 75, 90, 100]

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setProgress(step)
    }

    // Generate random fashion designs
    const newDesigns: GeneratedDesign[] = []
    const styles = [
      'Minimalist Chic', 'Avant-garde', 'Street Style', 'Vintage Revival',
      'Futuristic', 'Bohemian', 'Gothic', 'Preppy', 'Punk Rock'
    ]

    const designCategories = ['tops', 'dresses', 'pants', 'shoes', 'accessories']

    for (let i = 0; i < 9; i++) {
      const category = designCategories[Math.floor(Math.random() * designCategories.length)]
      const style = styles[Math.floor(Math.random() * styles.length)]
      const confidence = Math.floor(Math.random() * 20) + 80 // 80-100%

      newDesigns.push({
        id: `design-${Date.now()}-${i}`,
        category,
        style,
        confidence
      })
    }

    setGeneratedDesigns(newDesigns)
    setIsGenerating(false)
  }

  const filteredDesigns = selectedCategory === 'all'
    ? generatedDesigns
    : generatedDesigns.filter(design => design.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Generator Controls */}
      <Card className="bg-fashion-gradient-subtle border-0 shadow-fashion">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-accent" />
            GAN Fashion Design Generator
          </CardTitle>
          <CardDescription className="text-lg">
            Generate unique fashion designs using Generative Adversarial Networks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isGenerating && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Training GAN Model...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {progress < 50 ? 'Training Generator Network...' :
                 progress < 90 ? 'Training Discriminator Network...' :
                 'Generating Fashion Designs...'}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={generateDesigns}
              disabled={isGenerating}
              className="w-full sm:w-auto bg-fashion-gradient hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate New Designs
                </>
              )}
            </Button>

            {generatedDesigns.length > 0 && (
              <Button variant="outline" size="lg">
                <Shuffle className="w-4 h-4" />
                Randomize
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      {generatedDesigns.length > 0 && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1">
                <span className="text-lg">{category.icon}</span>
                <span className="text-xs">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Generated Designs Grid */}
      {filteredDesigns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="group hover:shadow-fashion-hover transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">
                    {design.category}
                  </Badge>
                  <Badge variant="outline" className="text-accent">
                    {design.confidence}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder for generated design image */}
                <div className="aspect-square bg-fashion-gradient-subtle rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {categories.find(c => c.id === design.category)?.icon || '👔'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI Generated Design
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">{design.style}</h3>
                  <p className="text-sm text-muted-foreground">
                    Neural network confidence: {design.confidence}%
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4" />
                  Download Design
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {generatedDesigns.length === 0 && !isGenerating && (
        <Card className="py-16">
          <CardContent className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Ready to Create Fashion Magic?</h3>
            <p className="text-muted-foreground mb-6">
              Click the generate button to start creating unique fashion designs with AI
            </p>
            <Button
              variant="default"
              onClick={generateDesigns}
              className="bg-fashion-gradient hover:opacity-90"
            >
              <Sparkles className="w-4 h-4" />
              Start Generating
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default FashionGenerator
