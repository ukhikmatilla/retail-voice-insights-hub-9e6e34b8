
import { EvaluationTemplate, TemplatePreset } from "@/types/templates";

// Presets that users can apply
export const templatePresets: TemplatePreset[] = [
  {
    id: "preset-retail",
    nameKey: "preset.retail",
    type: "manual",
    criteria: [
      "Greeting according to standard",
      "Identified customer needs",
      "Presented relevant products",
      "Explained key features/benefits",
      "Handled objections professionally",
      "Offered additional products",
      "Mentioned special offers/promotions",
      "Closed the sale effectively",
      "Used appropriate tone & language",
      "Followed up appropriately"
    ]
  },
  {
    id: "preset-service",
    nameKey: "preset.service",
    type: "ai",
    criteria: [
      "Professional greeting",
      "Attentive listening",
      "Problem identification",
      "Clear explanation of solution",
      "Empathetic approach",
      "Technical knowledge",
      "Resolution efficiency",
      "Customer satisfaction check",
      "Next steps explanation",
      "Appropriate closing"
    ]
  },
  {
    id: "preset-sales",
    nameKey: "preset.sales",
    type: "manual",
    criteria: [
      "Introduction and rapport building",
      "Discovery questions",
      "Active listening",
      "Value proposition delivery",
      "Feature-benefit connection",
      "Objection handling",
      "Price presentation",
      "Asking for the sale",
      "Cross-selling/upselling",
      "Follow-up planning"
    ]
  }
];

// Mock templates that would come from an API
export const mockTemplates: EvaluationTemplate[] = [
  {
    id: "template-1",
    name: "Стандарт продаж электроники",
    type: "manual",
    criteria: [
      { id: "c1", text: "Приветствие и установление контакта" },
      { id: "c2", text: "Определение потребностей" },
      { id: "c3", text: "Презентация продукта" },
      { id: "c4", text: "Работа с возражениями" },
      { id: "c5", text: "Закрытие сделки" }
    ],
    assignedTo: {
      stores: ["store-1", "store-2"],
      sellers: []
    }
  },
  {
    id: "template-2",
    name: "Чек-лист для AI оценки",
    type: "ai",
    criteria: [
      { id: "c6", text: "Использование имени клиента" },
      { id: "c7", text: "Позитивная интонация" },
      { id: "c8", text: "Активное слушание" },
      { id: "c9", text: "Эмпатия в разговоре" },
      { id: "c10", text: "Использование скрипта" }
    ],
    assignedTo: {
      stores: [],
      sellers: ["user-1", "user-2"]
    }
  }
];
