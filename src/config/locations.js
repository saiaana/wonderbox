export const getLocationsConfig = (t) => ({
  stores: [
    {
      id: 1,
      name: t("locations.store1.name"),
      address: t("locations.store1.address"),
    },
  ],
  contacts: {
    email: "saygrig@gmail.com",
    phone: {
      display: "+82 10-6527-9871",
      link: "tel:+821065279871",
    },
  },
});
