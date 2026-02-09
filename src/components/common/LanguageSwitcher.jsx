import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function LanguageSwitcher({ variant = 'light' }) {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const isDark = variant === 'dark';

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={changeLanguage}
        className={`
          appearance-none rounded px-2.5 py-1.5 pr-7 text-xs font-medium
          transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500/50
          cursor-pointer min-w-[80px]
          ${isDark
            ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }
        `}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <div className={`
        pointer-events-none absolute right-2 top-1/2 -translate-y-1/2
        ${isDark ? 'text-white/70' : 'text-gray-500'}
      `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-3 w-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}
