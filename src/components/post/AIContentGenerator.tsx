
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIContentGeneratorProps {
  onContentGenerated: (content: string) => void;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ onContentGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI content generation (replace with actual AI API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = `Here's some AI-generated content based on your prompt: "${prompt}". This would be replaced with actual AI-generated content from your preferred AI service like OpenAI, Claude, or others. The content would be engaging, relevant, and tailored to your social media audience.

#AI #ContentGeneration #SocialMedia`;

      onContentGenerated(generatedContent);
      setIsOpen(false);
      setPrompt('');
      
      toast({
        title: "Content generated",
        description: "AI-generated content has been added to your post.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Sparkles className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate AI Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">What would you like to post about?</Label>
            <Input
              id="prompt"
              placeholder="e.g., Tips for productivity, motivational quote, industry insights..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={generateContent}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentGenerator;
