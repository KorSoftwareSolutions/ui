export type CountryCode =
  | "AF"
  | "AL"
  | "DZ"
  | "AR"
  | "AU"
  | "AT"
  | "BD"
  | "BE"
  | "BR"
  | "CA"
  | "CL"
  | "CN"
  | "CO"
  | "CR"
  | "CZ"
  | "DK"
  | "DO"
  | "EC"
  | "EG"
  | "FI"
  | "FR"
  | "DE"
  | "GH"
  | "GR"
  | "GT"
  | "HK"
  | "HU"
  | "IN"
  | "ID"
  | "IE"
  | "IL"
  | "IT"
  | "JM"
  | "JP"
  | "KE"
  | "KR"
  | "MY"
  | "MX"
  | "MA"
  | "NL"
  | "NZ"
  | "NG"
  | "NO"
  | "PK"
  | "PA"
  | "PE"
  | "PH"
  | "PL"
  | "PT"
  | "PR"
  | "RO"
  | "RU"
  | "SA"
  | "SG"
  | "ZA"
  | "ES"
  | "SE"
  | "CH"
  | "TW"
  | "TH"
  | "TR"
  | "UA"
  | "AE"
  | "GB"
  | "US"
  | "VE"
  | "VN";

export interface CountryData {
  /** ISO 3166-1 alpha-2 code */
  code: CountryCode;
  /** Display name */
  name: string;
  /** Dial code without plus sign */
  dialCode: string;
  /** Flag emoji */
  flag: string;
  /** Format pattern using # for digits */
  format: string;
  /** Priority for sorting countries with same dial code (lower = higher) */
  priority: number;
}

export const COUNTRIES: CountryData[] = [
  {
    code: "AF",
    name: "Afghanistan",
    dialCode: "93",
    flag: "🇦🇫",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "AL",
    name: "Albania",
    dialCode: "355",
    flag: "🇦🇱",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "DZ",
    name: "Algeria",
    dialCode: "213",
    flag: "🇩🇿",
    format: "### ## ## ##",
    priority: 0,
  },
  {
    code: "AR",
    name: "Argentina",
    dialCode: "54",
    flag: "🇦🇷",
    format: "## ####-####",
    priority: 0,
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "61",
    flag: "🇦🇺",
    format: "#### ### ###",
    priority: 0,
  },
  {
    code: "AT",
    name: "Austria",
    dialCode: "43",
    flag: "🇦🇹",
    format: "### #######",
    priority: 0,
  },
  {
    code: "BD",
    name: "Bangladesh",
    dialCode: "880",
    flag: "🇧🇩",
    format: "#### ######",
    priority: 0,
  },
  {
    code: "BE",
    name: "Belgium",
    dialCode: "32",
    flag: "🇧🇪",
    format: "### ## ## ##",
    priority: 0,
  },
  {
    code: "BR",
    name: "Brazil",
    dialCode: "55",
    flag: "🇧🇷",
    format: "(##) #####-####",
    priority: 0,
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "1",
    flag: "🇨🇦",
    format: "(###) ###-####",
    priority: 1,
  },
  {
    code: "CL",
    name: "Chile",
    dialCode: "56",
    flag: "🇨🇱",
    format: "# #### ####",
    priority: 0,
  },
  {
    code: "CN",
    name: "China",
    dialCode: "86",
    flag: "🇨🇳",
    format: "### #### ####",
    priority: 0,
  },
  {
    code: "CO",
    name: "Colombia",
    dialCode: "57",
    flag: "🇨🇴",
    format: "### ### ####",
    priority: 0,
  },
  {
    code: "CR",
    name: "Costa Rica",
    dialCode: "506",
    flag: "🇨🇷",
    format: "#### ####",
    priority: 0,
  },
  {
    code: "CZ",
    name: "Czech Republic",
    dialCode: "420",
    flag: "🇨🇿",
    format: "### ### ###",
    priority: 0,
  },
  {
    code: "DK",
    name: "Denmark",
    dialCode: "45",
    flag: "🇩🇰",
    format: "## ## ## ##",
    priority: 0,
  },
  {
    code: "DO",
    name: "Dominican Republic",
    dialCode: "1",
    flag: "🇩🇴",
    format: "(###) ###-####",
    priority: 2,
  },
  {
    code: "EC",
    name: "Ecuador",
    dialCode: "593",
    flag: "🇪🇨",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "EG",
    name: "Egypt",
    dialCode: "20",
    flag: "🇪🇬",
    format: "### ### ####",
    priority: 0,
  },
  {
    code: "FI",
    name: "Finland",
    dialCode: "358",
    flag: "🇫🇮",
    format: "## ### ## ##",
    priority: 0,
  },
  {
    code: "FR",
    name: "France",
    dialCode: "33",
    flag: "🇫🇷",
    format: "# ## ## ## ##",
    priority: 0,
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "49",
    flag: "🇩🇪",
    format: "#### #######",
    priority: 0,
  },
  {
    code: "GH",
    name: "Ghana",
    dialCode: "233",
    flag: "🇬🇭",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "GR",
    name: "Greece",
    dialCode: "30",
    flag: "🇬🇷",
    format: "### ### ####",
    priority: 0,
  },
  {
    code: "GT",
    name: "Guatemala",
    dialCode: "502",
    flag: "🇬🇹",
    format: "#### ####",
    priority: 0,
  },
  {
    code: "HK",
    name: "Hong Kong",
    dialCode: "852",
    flag: "🇭🇰",
    format: "#### ####",
    priority: 0,
  },
  {
    code: "HU",
    name: "Hungary",
    dialCode: "36",
    flag: "🇭🇺",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "IN",
    name: "India",
    dialCode: "91",
    flag: "🇮🇳",
    format: "#####-#####",
    priority: 0,
  },
  {
    code: "ID",
    name: "Indonesia",
    dialCode: "62",
    flag: "🇮🇩",
    format: "### #### ####",
    priority: 0,
  },
  {
    code: "IE",
    name: "Ireland",
    dialCode: "353",
    flag: "🇮🇪",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "IL",
    name: "Israel",
    dialCode: "972",
    flag: "🇮🇱",
    format: "##-###-####",
    priority: 0,
  },
  {
    code: "IT",
    name: "Italy",
    dialCode: "39",
    flag: "🇮🇹",
    format: "### ### ####",
    priority: 0,
  },
  {
    code: "JM",
    name: "Jamaica",
    dialCode: "1",
    flag: "🇯🇲",
    format: "(###) ###-####",
    priority: 3,
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "81",
    flag: "🇯🇵",
    format: "##-####-####",
    priority: 0,
  },
  {
    code: "KE",
    name: "Kenya",
    dialCode: "254",
    flag: "🇰🇪",
    format: "### ######",
    priority: 0,
  },
  {
    code: "KR",
    name: "South Korea",
    dialCode: "82",
    flag: "🇰🇷",
    format: "##-####-####",
    priority: 0,
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "60",
    flag: "🇲🇾",
    format: "##-### ####",
    priority: 0,
  },
  {
    code: "MX",
    name: "Mexico",
    dialCode: "52",
    flag: "🇲🇽",
    format: "## #### ####",
    priority: 0,
  },
  {
    code: "MA",
    name: "Morocco",
    dialCode: "212",
    flag: "🇲🇦",
    format: "##-### ####",
    priority: 0,
  },
  {
    code: "NL",
    name: "Netherlands",
    dialCode: "31",
    flag: "🇳🇱",
    format: "# ## ## ## ##",
    priority: 0,
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "64",
    flag: "🇳🇿",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "NG",
    name: "Nigeria",
    dialCode: "234",
    flag: "🇳🇬",
    format: "### ### ####",
    priority: 0,
  },
  {
    code: "NO",
    name: "Norway",
    dialCode: "47",
    flag: "🇳🇴",
    format: "### ## ###",
    priority: 0,
  },
  {
    code: "PK",
    name: "Pakistan",
    dialCode: "92",
    flag: "🇵🇰",
    format: "### #######",
    priority: 0,
  },
  {
    code: "PA",
    name: "Panama",
    dialCode: "507",
    flag: "🇵🇦",
    format: "####-####",
    priority: 0,
  },
  {
    code: "PE",
    name: "Peru",
    dialCode: "51",
    flag: "🇵🇪",
    format: "### ### ###",
    priority: 0,
  },
  {
    code: "PH",
    name: "Philippines",
    dialCode: "63",
    flag: "🇵🇭",
    format: "### ### ####",
    priority: 0,
  },
  {
    code: "PL",
    name: "Poland",
    dialCode: "48",
    flag: "🇵🇱",
    format: "### ### ###",
    priority: 0,
  },
  {
    code: "PT",
    name: "Portugal",
    dialCode: "351",
    flag: "🇵🇹",
    format: "### ### ###",
    priority: 0,
  },
  {
    code: "PR",
    name: "Puerto Rico",
    dialCode: "1",
    flag: "🇵🇷",
    format: "(###) ###-####",
    priority: 4,
  },
  {
    code: "RO",
    name: "Romania",
    dialCode: "40",
    flag: "🇷🇴",
    format: "### ### ###",
    priority: 0,
  },
  {
    code: "RU",
    name: "Russia",
    dialCode: "7",
    flag: "🇷🇺",
    format: "### ###-##-##",
    priority: 0,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "966",
    flag: "🇸🇦",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "65",
    flag: "🇸🇬",
    format: "#### ####",
    priority: 0,
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "27",
    flag: "🇿🇦",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "ES",
    name: "Spain",
    dialCode: "34",
    flag: "🇪🇸",
    format: "### ## ## ##",
    priority: 0,
  },
  {
    code: "SE",
    name: "Sweden",
    dialCode: "46",
    flag: "🇸🇪",
    format: "##-### ## ##",
    priority: 0,
  },
  {
    code: "CH",
    name: "Switzerland",
    dialCode: "41",
    flag: "🇨🇭",
    format: "## ### ## ##",
    priority: 0,
  },
  {
    code: "TW",
    name: "Taiwan",
    dialCode: "886",
    flag: "🇹🇼",
    format: "### ### ###",
    priority: 0,
  },
  {
    code: "TH",
    name: "Thailand",
    dialCode: "66",
    flag: "🇹🇭",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "TR",
    name: "Turkey",
    dialCode: "90",
    flag: "🇹🇷",
    format: "### ### ## ##",
    priority: 0,
  },
  {
    code: "UA",
    name: "Ukraine",
    dialCode: "380",
    flag: "🇺🇦",
    format: "## ### ## ##",
    priority: 0,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "971",
    flag: "🇦🇪",
    format: "## ### ####",
    priority: 0,
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "44",
    flag: "🇬🇧",
    format: "#### ######",
    priority: 0,
  },
  {
    code: "US",
    name: "United States",
    dialCode: "1",
    flag: "🇺🇸",
    format: "(###) ###-####",
    priority: 0,
  },
  {
    code: "VE",
    name: "Venezuela",
    dialCode: "58",
    flag: "🇻🇪",
    format: "###-###-####",
    priority: 0,
  },
  {
    code: "VN",
    name: "Vietnam",
    dialCode: "84",
    flag: "🇻🇳",
    format: "## ### ## ##",
    priority: 0,
  },
];

export function getCountryByCode(code: string): CountryData | undefined {
  return COUNTRIES.find((c) => c.code === code);
}
