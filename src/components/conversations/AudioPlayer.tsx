
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface AudioPlayerProps {
  duration: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ duration }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Simulate audio progress updates
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium">
          {t('conversation.playAudio')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={() => setIsPlaying(!isPlaying)} 
            variant="outline" 
            className="w-12 h-12 rounded-full"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <div className="space-y-2">
            <Progress value={audioProgress} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {Math.floor(audioProgress / 100 * duration) / 60 < 1 ? '00:' : '01:'}
                {Math.floor(audioProgress / 100 * (duration % 60)).toString().padStart(2, '0')}
              </span>
              <span>
                {Math.floor(duration / 60)}:
                {(duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
