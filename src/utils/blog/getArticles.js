import articlesEn from "../../data/articles.en.json";
import articlesRu from "../../data/articles.ru.json";
import articlesKo from "../../data/articles.ko.json";

export function getArticles(language = "en") {
  const articlesMap = {
    en: articlesEn,
    ru: articlesRu,
    ko: articlesKo,
  };

  const articles = articlesMap[language] || articlesMap.en;
  return articles.articles || [];
}
