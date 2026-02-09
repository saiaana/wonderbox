export const getContactConfig = (t) => ({
  email: "biz@hydrosta.com",
  phone: {
    display: "051-646-0002",
    link: "tel: 0516460002",
  },
  businessHours: {
    weekdays: t("contact.businessHours.weekdays"),
    saturday: t("contact.businessHours.saturday"),
    sunday: t("contact.businessHours.sunday"),
  },
});
