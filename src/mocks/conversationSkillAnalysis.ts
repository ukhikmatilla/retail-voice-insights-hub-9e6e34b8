
// Mock data for AI-powered conversation skill analysis

export type SkillRating = 'good' | 'warning' | 'poor';

export interface SkillCriterion {
  name: {
    uz: string;
    ru: string;
  };
  rating: SkillRating;
  comment: {
    uz: string;
    ru: string;
  };
}

export interface SkillBlock {
  key: string;
  title: {
    uz: string;
    ru: string;
  };
  icon: string;
  criteria: SkillCriterion[];
  aiAdvice: {
    uz: string;
    ru: string;
  };
}

export const conversationSkillAnalysisMock: SkillBlock[] = [
  {
    key: "trustBuilding",
    title: {
      uz: "Ishonch uygʻotish",
      ru: "Построение доверия"
    },
    icon: "🧩",
    criteria: [
      {
        name: {
          uz: "Salomlashish va ohang",
          ru: "Приветствие и тон"
        },
        rating: "good",
        comment: {
          uz: "Ijobiy, ochiq ohangda salomlashdi. Muloqot yoqimli boshlandi.",
          ru: "Приветствие было позитивным и дружелюбным, начало разговора прошло хорошо."
        }
      },
      {
        name: {
          uz: "Mijozni tinglash",
          ru: "Слушание клиента"
        },
        rating: "good",
        comment: {
          uz: "Savollar tugagunga qadar gapini boʻlmay, diqqat bilan tingladi.",
          ru: "Продавец выслушал клиента до конца, не перебивал."
        }
      },
      {
        name: {
          uz: "Shaxsiy yondashuv",
          ru: "Персонализация"
        },
        rating: "warning",
        comment: {
          uz: "Shaxsiy savollar yoki mijoz haqida aniqlovchi soʻrov boʻlmadi.",
          ru: "Не было задано персонализирующих вопросов клиенту."
        }
      }
    ],
    aiAdvice: {
      uz: "Mijoz ismini aytsa — eslab qoling va murojaat qiling. Masalan: 'Qizchaga olmoqchimisiz?' kabi savollar shaxsiy yondashuv beradi.",
      ru: "Используйте имя клиента, если он представился. Задавайте уточняющие вопросы, например: 'Для девочки или мальчика?'"
    }
  },
  {
    key: "objections",
    title: {
      uz: "E'tirozlarga ishlov berish",
      ru: "Работа с возражениями"
    },
    icon: "🧱",
    criteria: [
      {
        name: {
          uz: "E'tirozni sezish",
          ru: "Обнаружение возражения"
        },
        rating: "poor",
        comment: {
          uz: "Narx haqidagi savol berildi, ammo javob soddalik bilan berildi.",
          ru: "Клиент высказал сомнение в цене, но продавец просто назвал сумму."
        }
      },
      {
        name: {
          uz: "Narxga izoh",
          ru: "Аргументация цены"
        },
        rating: "poor",
        comment: {
          uz: "Mahsulot afzalliklari yoki qiymati haqida maʼlumot berilmadi.",
          ru: "Ценность товара не была объяснена."
        }
      }
    ],
    aiAdvice: {
      uz: "Narxni aytishdan oldin mahsulotning foydali tomonlarini tushuntiring: 'Ushbu oyoq kiyim nafas oladigan materialdan, bolalar uchun qulay.'",
      ru: "Перед тем как назвать цену, объясните, за что клиент платит. Например: 'У этой обуви дышащий материал и усиленная подошва.'"
    }
  },
  {
    key: "crossSelling",
    title: {
      uz: "Qo'shimcha savdo (cross-sell)",
      ru: "Кросс-продажи"
    },
    icon: "🧦",
    criteria: [
      {
        name: {
          uz: "Qo'shimcha mahsulotlar taklifi",
          ru: "Предложение доп. товаров"
        },
        rating: "poor",
        comment: {
          uz: "Asosiy mahsulot tanlangach, boshqa mahsulot taklif qilinmadi.",
          ru: "После выбора товара продавец не предложил дополнительных товаров."
        }
      }
    ],
    aiAdvice: {
      uz: "Sotuvdan so'ng ayting: 'Odatda bu oyoq kiyim bilan paxta paypoq ham olishadi. Ko'rsatib beraymi?'",
      ru: "После выбора товара скажите: 'Обычно к этой паре берут хлопковые носки — показать?'"
    }
  },
  {
    key: "valueExplanation",
    title: {
      uz: "Qiymatni tushuntirish",
      ru: "Аргументация ценности"
    },
    icon: "💰",
    criteria: [
      {
        name: {
          uz: "Afzalliklarni aytib o'tish",
          ru: "Озвучивание преимуществ"
        },
        rating: "warning",
        comment: {
          uz: "Mahsulotning texnik yoki estetik afzalliklari tilga olinmadi.",
          ru: "Не упомянуты технические или визуальные достоинства товара."
        }
      },
      {
        name: {
          uz: "Solishtirish",
          ru: "Сравнение"
        },
        rating: "warning",
        comment: {
          uz: "Qimmatlik sababi boshqalar bilan solishtirib tushuntirilmagan.",
          ru: "Не объяснено, почему этот товар дороже других."
        }
      }
    ],
    aiAdvice: {
      uz: "Narx aytilgach, qo'shing: 'Bu model namga chidamli, uzun yurishga mo'ljallangan. Shu bois biroz qimmatroq.'",
      ru: "После цены скажите: 'Эта модель водостойкая и подходит для длительной носки — поэтому немного дороже.'"
    }
  },
  {
    key: "closing",
    title: {
      uz: "Bitimni yakunlash",
      ru: "Закрытие сделки"
    },
    icon: "📦",
    criteria: [
      {
        name: {
          uz: "Mijozning tayyorligini tekshirish",
          ru: "Проверка готовности клиента"
        },
        rating: "good",
        comment: {
          uz: "Mijoz: 'Olaman' deganida, savdo muloqoti yaxshi yo'nalishda bo'lgan.",
          ru: "Когда клиент сказал: 'Я возьму это', продавец правильно отреагировал."
        }
      },
      {
        name: {
          uz: "Qo'llab-quvvatlovchi yakun",
          ru: "Завершающая поддержка"
        },
        rating: "good",
        comment: {
          uz: "Yaxshi xulosa, mahsulot qutiga solishni taklif qildi.",
          ru: "Продавец предложил упаковку и вежливо завершил разговор."
        }
      }
    ],
    aiAdvice: {
      uz: "Savdodan so'ng 'Sharh qoldirasizmi?' yoki 'Keyingi safarga chegirma uchun a'zo bo'ling' deyish mumkin.",
      ru: "После сделки можно сказать: 'Оставите отзыв?' или 'Подпишитесь, чтобы получить скидку в следующий раз.'"
    }
  }
];
