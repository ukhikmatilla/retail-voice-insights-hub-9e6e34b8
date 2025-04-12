
import { Insight } from '@/types';

export const expandableInsightsMock: Insight[] = [
  {
    id: "improvement-1",
    type: "improvement",
    content: "Были продемонстрированы хорошие знания о продукте. Можно было раньше объяснить варианты финансирования.",
    skillKey: "valueExplanation"
  },
  {
    id: "opportunity-1",
    type: "opportunity",
    content: "Клиент проявил интерес к аксессуарам, но продолжения не последовало.",
    timestamp: "00:35"
  },
  {
    id: "urgent-1",
    type: "urgent",
    content: "Возражение по цене не было обработано, возможная потеря продажи.",
    skillKey: "objections"
  },
  {
    id: "behavior-1",
    type: "behavior",
    content: "Много пауз в речи, низкая уверенность в разговоре.",
    skillKey: "trustBuilding"
  },
  {
    id: "custom-1",
    type: "custom",
    content: "Клиент проявил интерес к цветам товара, что говорит о покупках на основе предпочтений.",
    timestamp: "00:25"
  }
];
