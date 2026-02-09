import { useState } from "react";
import { getLocationsConfig } from "../../config/locations.js";
import { useTranslation } from "react-i18next";
import ContactCard from "./Locations/ContactCard";

function Locations() {
  const { t } = useTranslation();
  const locationsConfig = getLocationsConfig(t);
  const storeLocations = locationsConfig.stores;
  const contacts = locationsConfig.contacts;

  const [selectedLocationId, setSelectedLocationId] = useState(
    storeLocations[0]?.id
  );

  const LocationIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const EmailIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const PhoneIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 flex flex-col items-center gap-3">
        <h2 className="text-center text-3xl font-bold text-stone-900 md:text-4xl uppercase tracking-wide">
          {t("common.contactUs")}
        </h2>
        <span className="h-1 w-20 rounded-full bg-pink-600" />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {storeLocations.map((location) => (
          <ContactCard
            key={location.id}
            type="address"
            title={location.name}
            value={location.address}
            icon={LocationIcon}
            onClick={() => setSelectedLocationId(location.id)}
            isSelected={selectedLocationId === location.id}
          />
        ))}

        <ContactCard
          type="email"
          value={contacts.email}
          link={`mailto:${contacts.email}`}
          icon={EmailIcon}
        />
        <ContactCard
          type="phone"
          value={contacts.phone.display}
          link={contacts.phone.link}
          icon={PhoneIcon}
        />
      </div>
    </div>
  );
}

export default Locations;
