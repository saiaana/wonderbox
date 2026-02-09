import { useMemo } from "react";
import LinkGrid from "../components/common/LinkGrid";
import Loading from "./Loading";
import { useProductsPage } from "../hooks/useProductsPage";
import ROUTES from "../constants/routes";

function BrandsList() {
  const { brands, status } = useProductsPage();

  const getHref = (brand) => {
    return ROUTES.brand(brand);
  }

  const getAriaLabel = (brand) => {
    return `Brand ${brand}`;
  }

  const sortedBrands = useMemo(
    () =>
      brands
        ? [...brands].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
          )
        : [],
    [brands]
  );

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <LinkGrid  title="brands" items={sortedBrands} getHref={getHref} getAriaLabel={getAriaLabel} emptyText="No brands found." />
  );
}

export default BrandsList;
