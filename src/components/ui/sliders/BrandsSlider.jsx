import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBrands,
  selectBrandsStatus,
  fetchBrands,
} from "../../../store/slices/productsSlice";
import ROUTES from "../../../constants/routes";

function BrandsSlider() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const status = useSelector(selectBrandsStatus);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBrands());
    }
  }, [dispatch, status]);

  if (status === "loading" || !brands?.length) {
    return null;
  }

  // Убираем дубликаты (если есть)
  const uniqueBrands = [...new Set(brands)];
  const duplicatedBrands = [...uniqueBrands, ...uniqueBrands];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#faf9f7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#faf9f7] to-transparent" />

      <div
        className={`flex whitespace-nowrap animate-scroll-left ${isHovered ? "animation-paused" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicatedBrands.map((brand, index) => (
          <Link
            key={`${brand}-${index}`}
            to={ROUTES.brand(brand)}
            className="
              group relative mx-12 cursor-pointer
              text-xl font-light uppercase
              tracking-[0.12em] text-stone-500
              transition-all duration-500 ease-out
              hover:text-stone-800
              md:text-2xl lg:text-3xl
            "
            aria-label={`View ${brand} products`}
          >
            {brand}

            {/* underline */}
            <span
              className="
                absolute -bottom-2 left-1/2 h-px w-0
                bg-stone-400 transition-all duration-500
                group-hover:left-0 group-hover:w-full
              "
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BrandsSlider;
