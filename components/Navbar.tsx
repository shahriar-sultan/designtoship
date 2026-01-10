"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

interface NavbarProps {
  className?: string;
  showLanguageSelector?: boolean;
}

const languages = [
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export function Navbar({
  className = "",
  showLanguageSelector = true,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Use next-intl's router to switch locale
    // pathname from usePathname() already excludes the locale prefix
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full container mx-auto px-4 pt-4 md:pt-6 pb-4 md:pb-6 ${className}`}
    >
      <div className="max-w-[1131px] mx-auto">
        <div
          className="bg-[#FEFCFB]/40 backdrop-blur-md rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between"
          style={{
            boxShadow: "0 8px 29px rgba(151, 114, 93, 0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="text-[#402617] text-lg md:text-[20px] font-semibold">
            {t("brand")}
          </div>

          <div className="flex items-center gap-2 md:gap-8">
            {showLanguageSelector && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="hidden sm:flex items-center gap-3 bg-transparent rounded-full px-3 md:px-6 py-2 md:py-3 hover:bg-[#FEFCFB]/60 transition-colors cursor-pointer h-10"
                >
                  {/* <div className="w-9 h-6 bg-[#006A4D] rounded-sm flex items-center justify-center relative overflow-hidden">
                    <div className="w-3 h-3 bg-[#D70726] rounded-full" />
                  </div> */}
                  <span className="text-[#402617] text-sm md:text-base font-medium">
                    {currentLanguage.flag} {currentLanguage.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#402617] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EADED7] overflow-hidden z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#FFF4EF] transition-colors cursor-pointer h-10 ${
                          locale === lang.code ? "bg-[#FFF4EF]" : ""
                        }`}
                      >
                        {/* <div className="w-9 h-6 bg-[#006A4D] rounded-sm flex items-center justify-center relative overflow-hidden">
                          <div className="w-3 h-3 bg-[#D70726] rounded-full" />
                        </div> */}
                        <span className="text-[#402617] text-sm font-medium">
                          {lang.flag} {lang.name}
                        </span>
                        {locale === lang.code && (
                          <svg
                            className="w-4 h-4 text-[#402617] ml-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Button
              className="bg-[#361F12] hover:bg-[#4A2F1A] text-white rounded-full px-4 md:px-6 text-sm md:text-base font-semibold shadow-none"
              onClick={handleRegisterClick}
            >
              {t("registerButton")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
