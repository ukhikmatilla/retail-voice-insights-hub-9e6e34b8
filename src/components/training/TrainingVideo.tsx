
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/lazy';
import { Card, CardContent } from '@/components/ui/card';

interface TrainingVideoProps {
  videoUrl: string;
  duration: string;
}

const TrainingVideo: React.FC<TrainingVideoProps> = ({ videoUrl, duration }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="aspect-video relative rounded-md overflow-hidden">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
          <span>{t('training.videoDuration')}: {duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingVideo;
