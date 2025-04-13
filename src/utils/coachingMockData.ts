
interface TrainingModule {
  id: string;
  title: string;
  completedDate?: string;
  status: 'completed' | 'in_progress';
}

interface SellerTraining {
  id: string;
  name: string;
  completedModules: number;
  totalModules: number;
  progressPercent: number;
  lastActivity: {
    date: string;
    time: string;
  };
  modules: TrainingModule[];
  recommendedModules: {
    id: string;
    title: string;
  }[];
}

export const mockSellerTrainingData = (): SellerTraining[] => [
  {
    id: '1',
    name: 'Алишер Рахимов / Alisher Rahimov',
    completedModules: 7,
    totalModules: 10,
    progressPercent: 70,
    lastActivity: {
      date: '12.04.2025',
      time: '14:25',
    },
    modules: [
      {
        id: 'm1',
        title: 'Работа с возражениями / E\'tirozlar bilan ishlash',
        completedDate: '10.04.2025',
        status: 'completed',
      },
      {
        id: 'm2',
        title: 'Техника продаж SPIN / SPIN sotish texnikasi',
        completedDate: '08.04.2025',
        status: 'completed',
      },
      {
        id: 'm3',
        title: 'Активное слушание / Faol tinglash',
        status: 'in_progress',
      },
    ],
    recommendedModules: [
      {
        id: 'rm1',
        title: 'Работа с ценовыми возражениями / Narx e\'tirozlari bilan ishlash',
      },
      {
        id: 'rm2',
        title: 'Завершение продажи / Sotuvni yakunlash',
      },
    ],
  },
  {
    id: '2',
    name: 'Малика Каримова / Malika Karimova',
    completedModules: 9,
    totalModules: 10,
    progressPercent: 90,
    lastActivity: {
      date: '13.04.2025',
      time: '11:30',
    },
    modules: [
      {
        id: 'm1',
        title: 'Работа с возражениями / E\'tirozlar bilan ishlash',
        completedDate: '05.04.2025',
        status: 'completed',
      },
      {
        id: 'm2',
        title: 'Техника продаж SPIN / SPIN sotish texnikasi',
        completedDate: '08.04.2025',
        status: 'completed',
      },
      {
        id: 'm3',
        title: 'Активное слушание / Faol tinglash',
        completedDate: '13.04.2025',
        status: 'completed',
      },
    ],
    recommendedModules: [
      {
        id: 'rm1',
        title: 'Углубленное понимание клиента / Mijozni chuqur tushunish',
      },
    ],
  },
  {
    id: '3',
    name: 'Рустам Валиев / Rustam Valiyev',
    completedModules: 4,
    totalModules: 10,
    progressPercent: 40,
    lastActivity: {
      date: '09.04.2025',
      time: '09:15',
    },
    modules: [
      {
        id: 'm1',
        title: 'Работа с возражениями / E\'tirozlar bilan ishlash',
        completedDate: '05.04.2025',
        status: 'completed',
      },
      {
        id: 'm2',
        title: 'Техника продаж SPIN / SPIN sotish texnikasi',
        status: 'in_progress',
      },
    ],
    recommendedModules: [
      {
        id: 'rm1',
        title: 'Техника продаж SPIN / SPIN sotish texnikasi',
      },
      {
        id: 'rm2',
        title: 'Активное слушание / Faol tinglash',
      },
    ],
  },
  {
    id: '4',
    name: 'Гулнора Азизова / Gulnora Azizova',
    completedModules: 10,
    totalModules: 10,
    progressPercent: 100,
    lastActivity: {
      date: '11.04.2025',
      time: '16:40',
    },
    modules: [
      {
        id: 'm1',
        title: 'Работа с возражениями / E\'tirozlar bilan ishlash',
        completedDate: '01.04.2025',
        status: 'completed',
      },
      {
        id: 'm2',
        title: 'Техника продаж SPIN / SPIN sotish texnikasi',
        completedDate: '05.04.2025',
        status: 'completed',
      },
      {
        id: 'm3',
        title: 'Активное слушание / Faol tinglash',
        completedDate: '11.04.2025',
        status: 'completed',
      },
    ],
    recommendedModules: [
      {
        id: 'rm1',
        title: 'Персональное развитие / Shaxsiy rivojlanish',
      },
    ],
  },
];
