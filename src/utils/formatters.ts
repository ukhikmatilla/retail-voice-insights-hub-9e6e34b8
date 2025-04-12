
/**
 * Format duration from seconds to minutes:seconds
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Format date to localized format based on language
 * Uzbek format: "2025-yil 8-aprel"
 * Russian format: "8 апреля 2025"
 */
export const formatLocalizedDate = (date: string | Date, language: string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use Intl.DateTimeFormat for localized date formatting
  if (language === 'uz') {
    // Uzbek format: "2025-yil 8-aprel"
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('uz', { month: 'long' });
    return `${year}-yil ${day}-${month}`;
  } else if (language === 'ru') {
    // Russian format: "8 апреля 2025"
    return dateObj.toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  // Default format if language is not supported
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};
