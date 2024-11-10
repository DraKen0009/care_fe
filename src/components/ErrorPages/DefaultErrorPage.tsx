import { Link } from "raviger";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import * as Notification from "@/Utils/Notifications";

type ErrorType = "PAGE_NOT_FOUND" | "PAGE_LOAD_ERROR";

interface ErrorPageProps {
  forError?: ErrorType;
}

export default function ErrorPage({
  forError = "PAGE_NOT_FOUND",
}: ErrorPageProps) {
  const { t } = useTranslation();

  useEffect(() => {
    Notification.closeAllNotifications();
  }, []);

  const errorContent = {
    PAGE_NOT_FOUND: {
      image: "/images/404.svg",
      title: t("page_not_found"),
      message: t("404_message"),
    },
    PAGE_LOAD_ERROR: {
      image: "/images/404.svg",
      title: t("page_load_error"),
      message: t("could_not_load_page"),
    },
  };

  const { image, title, message } = errorContent[forError];

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="w-[500px] text-center">
        <img src={image} alt={title} className="w-full" />
        <h1 className="mt-4">{title}</h1>
        <p>
          {message}
          <br />
          <br />
          <Link
            href="/"
            className="inline-block rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 hover:text-white"
          >
            {t("return_to_care")}
          </Link>
        </p>
      </div>
    </div>
  );
}
