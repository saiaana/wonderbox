export const getLocationsConfig = (t) => ({
  stores: [
    {
      id: 1,
      name: t("locations.store1.name"),
      address: t("locations.store1.address"),
    },
  ],
  contacts: {
    email: "biz@hydrosta.com",
    phone: {
      display: "051-646-0002",
      link: "tel: 0516460002",
    },
  },
});
