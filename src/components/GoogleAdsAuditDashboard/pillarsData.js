import { Globe, DollarSign, Target, Layout, FileText, TrendingUp } from "lucide-react";

export const pillars = [
  {
    key: "website",
    name: "Website",
    icon: Globe,
    color: "#3B82F6",
    maxPoints: 5,
    subcriteria: [
      { key: "landingspaginas", name: "Landingspaginas", description: "Relevante content en aansluiting op ads/keywords" },
      { key: "usps", name: "USPs", description: "Unieke marktpositie, reviews" },
      { key: "content", name: "Content", description: "Afbeeldingen, teksten, CTAs" },
      { key: "snelheid", name: "Snelheid", description: "Pagespeed score" },
      { key: "cro", name: "CRO", description: "Formulieren, checkout, responsiveness" },
    ],
  },
  {
    key: "prijs",
    name: "Prijs",
    icon: DollarSign,
    color: "#10B981",
    maxPoints: 4,
    subcriteria: [
      { key: "prijsstelling", name: "Prijsstelling", description: "Duur (0) / Gemiddeld (1) / Competitief (2) / Laagste prijs (3)" },
      { key: "marge", name: "Marge", description: "Gezonde winstmarge voor groei" },
    ],
  },
  {
    key: "conversietracking",
    name: "Conversietracking",
    icon: Target,
    color: "#F59E0B",
    maxPoints: 5,
    subcriteria: [
      { key: "primaire_conversies", name: "Primaire conversies", description: "Instellingen en attributie correct" },
      { key: "enhanced_conversies", name: "Enhanced conversions", description: "Worden persoonsgegevens goed meegegeven?" },
      { key: "cookiebanner", name: "Cookiebanner", description: "Consent mode v2 correct?" },
      { key: "advanced_tracking", name: "Advanced tracking", description: "Offline conversies, server-side tagging" },
      { key: "first_party_data", name: "First party data", description: "Customer match lists, cart data" },
    ],
  },
  {
    key: "campagnestructuur",
    name: "Campagnestructuur",
    icon: Layout,
    color: "#8B5CF6",
    maxPoints: 5,
    subcriteria: [
      { key: "uitsluitingen", name: "Uitsluitingen", description: "Zoekwoord of kanaal uitsluitingen" },
      { key: "keywords", name: "Keywords", description: "Relevantie en structuur" },
      { key: "adgroups", name: "Adgroups", description: "Goed geconsolideerd?" },
      { key: "labelizer", name: "Labelizer", description: "Slimme labels (ROAS/POAS)" },
      { key: "campagnetype", name: "Campagnetype", description: "Juiste type voor doelstelling?" },
    ],
  },
  {
    key: "advertenties",
    name: "Advertenties",
    icon: FileText,
    color: "#EF4444",
    maxPoints: 5,
    subcriteria: [
      { key: "feed_optimalisatie", name: "Feed optimalisatie", description: "Titels, extra productinformatie" },
      { key: "pmax_assets", name: "Pmax assets", description: "Correct gebruikt?" },
      { key: "search_adcopies", name: "Search adcopies", description: "Relevante teksten" },
      { key: "video_afbeeldingen", name: "Video/afbeeldingen", description: "YouTube / Demand gen" },
      { key: "componenten", name: "Componenten", description: "Sitelinks, locatie, highlights" },
    ],
  },
  {
    key: "budget",
    name: "Budget/Targets",
    icon: TrendingUp,
    color: "#06B6D4",
    maxPoints: 4,
    subcriteria: [
      { key: "budget_efficientie", name: "Budget efficientie", description: "Optimale verdeling?" },
      { key: "budgetbeperking", name: "Budgetbeperking", description: "Overpresterende campagnes meer budget?" },
      { key: "target_behaald", name: "Target behaald", description: "Zijn targets realistisch?" },
      { key: "kannibalisatie", name: "Kannibalisatie", description: "Interne concurrentie" },
    ],
  },
];
