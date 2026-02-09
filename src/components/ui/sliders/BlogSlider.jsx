import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "../cards/BlogCard";
import { useTranslation } from "react-i18next";
import { getArticles } from "../../../utils/blog/getArticles";

const styles = {
  section: "w-full",
  headerContainer: "mb-6 flex flex-col items-center gap-2 px-4",
  title: "text-center text-2xl font-bold text-gray-900 md:text-3xl",
  divider: "h-1 w-16 rounded-full bg-pink-600",
  swiper:
    "pb-10 pt-4 px-4 [--swiper-pagination-bullet-inactive-color:#bbf7d0] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:#16a34a] md:px-6",
  slide: "transition-transform duration-300 hover:scale-[1.03]",
};

const breakpoints = {
  0: {
    slidesPerView: 1.2,
    spaceBetween: 12,
  },
  360: {
    slidesPerView: 1.5,
    spaceBetween: 12,
  },
  480: {
    slidesPerView: 1.8,
    spaceBetween: 14,
  },
  640: {
    slidesPerView: 2.2,
    spaceBetween: 16,
  },
  768: {
    slidesPerView: 3.5,
    spaceBetween: 18,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1200: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
};

export default function BlogSlider() {
  const { t, i18n } = useTranslation();
  const articles = getArticles(i18n.language);

  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>{t("menu.blog")}</h2>
        <span className={styles.divider} />
      </div>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={12}
        centeredSlides={false}
        grabCursor
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className={styles.swiper}
        breakpoints={breakpoints}
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id} className={styles.slide}>
            <BlogCard
              main_image_src={article.main_image_src}
              blogPostName={article.title}
              slug={article.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
