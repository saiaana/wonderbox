import { Link } from "react-router-dom";
// 

// export default function LinkGrid({ listItems, path }) {

//   const getPath = (item) => {
//     if (path === linkGridConfig.brands.path) return ROUTES.brand(item.toLowerCase());
//     if (path === linkGridConfig.categories.path) return ROUTES.category(item.toLowerCase());
//     return "#";
//   };

//   if(!listItems || listItems.length === 0) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <p className="text-lg text-gray-500">No {path} found.</p>
//       </div>
//     );
//   }

//   return (
//     <section className="mx-auto max-w-4xl px-4">
//       <h2 className="mb-6 text-center text-2xl font-semibold uppercase tracking-wide text-black md:text-3xl">
//         {linkGridConfig[path].title} {linkGridConfig.companyTitle}
//       </h2>
//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
//         {listItems.map((listItem) => (
//           <Link
//             to={getPath(listItem)}
//             aria-label={`View ${path} ${listItem}`}
//             key={listItem}
//             className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm uppercase tracking-wide text-gray-800 transition hover:border-pink-500 hover:text-pink-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 active:scale-95 md:text-base"
//           >
//             {listItem}
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }


export default function LinkGrid({
  items,
  title,
  emptyText,
  getHref,
  getAriaLabel,
}) {
  if (!items?.length) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-gray-500">{emptyText}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4">
      <h2 className="mb-6 text-center text-2xl font-semibold uppercase tracking-wide text-black md:text-3xl">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
        {items.map((item) => (
          <Link
            to={getHref(item)}
            aria-label={getAriaLabel?.(item) ?? item}
            key={item}
            className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm uppercase tracking-wide text-gray-800 transition hover:border-pink-500 hover:text-pink-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 active:scale-95 md:text-base"
          >
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}
