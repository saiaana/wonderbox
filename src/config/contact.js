export const getContactConfig = (t) => ({
  email: "saygrig@gmail.com",
  phone: {
    display: "+82 10-6527-9871",
    link: "tel:+821065279871",
  },
  businessHours: {
    weekdays: t("contact.businessHours.weekdays"),
    saturday: t("contact.businessHours.saturday"),
    sunday: t("contact.businessHours.sunday"),
  },
});
