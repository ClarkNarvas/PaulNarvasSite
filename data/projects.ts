export type ProjectCategory = "Design management" | "Technical design" | "Residential" | "Visualisation";

export type ProjectMedia = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  location?: string;
  year: string;
  category: ProjectCategory;
  image: ProjectMedia;
  imagePosition?: string;
  summary: string;
  detail: string;
  services: string[];
  documentPreview?: {
    path: string;
    pageCount: number;
    pageLabels?: Partial<Record<number, string>>;
  };
  gallery?: ProjectMedia[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "waverley",
    title: "Waverley",
    location: "Rotherham, UK",
    year: "2016–2020",
    category: "Design management",
    image: {
      src: "/media/Waverly-thumb.png",
      alt: "Architectural drawing preview for the Waverley mixed-use development in Rotherham"
    },
    summary: "A £50 million retail, leisure and office destination shaped through coordinated technical delivery.",
    detail: "Working within Dixon Dawson Chartered Architects, Paul contributed to the detailed design and technical coordination of this major mixed-use scheme, helping turn a complex planning vision into coordinated construction information.",
    services: ["Technical coordination", "Working drawings", "Mixed-use design"],
    documentPreview: { path: "/documents/pages/waverly", pageCount: 26 },
    featured: true
  },
  {
    slug: "merrywalks",
    title: "Merrywalks",
    location: "Stroud, UK",
    year: "2016–2020",
    category: "Design management",
    image: {
      src: "/media/merywalksthumb.png",
      alt: "Architectural drawing preview for the Merrywalks redevelopment in Stroud"
    },
    summary: "Reconfiguration of an existing mall, car park and cinema with a new entrance, hotel and restaurant uses.",
    detail: "The scheme combines extension, demolition, access and internal conversion works. Paul’s archive brings together the phased plans, elevations and technical details needed to coordinate change across a live, multi-part development.",
    services: ["Phased delivery", "Technical detailing", "Consultant coordination"],
    documentPreview: { path: "/documents/pages/merywalks2-compressed", pageCount: 32 },
    featured: true
  },
  {
    slug: "proposed-apartment-complex",
    title: "Proposed Apartment Complex",
    location: "Newark, UK",
    year: "2023",
    category: "Design management",
    image: {
      src: "/media/newark.png",
      alt: "Exterior visualisation of the proposed five-storey apartment complex in Newark"
    },
    summary: "A five-storey apartment proposal developed through a modular design and delivery lens.",
    detail: "The project reflects Paul’s progression into design management: aligning architectural intent, consultant information and buildable modular systems around a clear delivery programme.",
    services: ["Design management", "Modular coordination", "Residential design"],
    documentPreview: { path: "/documents/pages/newark", pageCount: 18 },
    featured: true
  },
  {
    slug: "coca-cola-ceiling-refurbishment",
    title: "Coca-Cola Ceiling Refurbishment",
    year: "2022",
    category: "Technical design",
    image: {
      src: "/media/cocacola-thumb.png",
      alt: "Technical drawing preview for the Coca-Cola walk-on ceiling refurbishment"
    },
    summary: "A walk-on ceiling replacement designed to improve safe access and long-term maintainability.",
    detail: "Delivered while at DB3 Architects, the work focused on translating operational requirements into tender and construction information for a complex industrial environment.",
    services: ["Construction drawings", "Tender information", "Industrial retrofit"],
    documentPreview: { path: "/documents/pages/cocacolawalkonceiling", pageCount: 12 }
  },
  {
    slug: "entrance-pavilion",
    title: "Entrance Pavilion",
    year: "2023",
    category: "Design management",
    image: {
      src: "/media/entrance-pavilion.png",
      alt: "Architectural view of the modular entrance pavilion"
    },
    summary: "A modular entrance building developed as a compact, legible threshold.",
    detail: "The pavilion balances a clear arrival sequence with the dimensional and coordination requirements of modular construction.",
    services: ["Modular design", "Design coordination", "Technical delivery"],
    documentPreview: { path: "/documents/pages/entrancepavillion", pageCount: 5 }
  },
  {
    slug: "69-bawtry-road",
    title: "69 Bawtry Road",
    location: "Sheffield, UK",
    year: "2023",
    category: "Residential",
    image: {
      src: "/media/69bawtrythumb.png",
      alt: "Residential renovation proposal for 69 Bawtry Road in Sheffield"
    },
    summary: "Transformation of a run-down house into a renewed and practical family home.",
    detail: "A residential commission that combines measured survey work, spatial re-planning and a clear set of drawings to guide the renovation of an existing property.",
    services: ["Residential renovation", "Planning drawings", "Technical design"],
    documentPreview: { path: "/documents/pages/69bawtry", pageCount: 6 },
    gallery: [
      { src: "/media/freelance-69-bawtry/1.png", alt: "69 Bawtry Road residential renovation drawing" },
      { src: "/media/freelance-69-bawtry/4.png", alt: "69 Bawtry Road proposed residential layout" },
      { src: "/media/freelance-69-bawtry/6.png", alt: "69 Bawtry Road renovation presentation view" }
    ]
  },
  {
    slug: "meadow-grange-home",
    title: "Meadow Grange Home",
    year: "2023",
    category: "Residential",
    image: {
      src: "/media/thumbnail.png",
      alt: "Architectural drawing preview for the Meadow Grange Home extension"
    },
    summary: "A two-storey extension with an ancillary basement, designed to sit comfortably within its surroundings.",
    detail: "The proposal protects neighbouring amenity while expanding the house through a carefully scaled addition and a coherent material approach.",
    services: ["Residential extension", "Planning", "Working drawings"],
    documentPreview: { path: "/documents/pages/meadowgrange", pageCount: 15 }
  },
  {
    slug: "moorside-farm",
    title: "Moorside Farm",
    year: "2023",
    category: "Residential",
    image: {
      src: "/media/msfthumbanail.png",
      alt: "Architectural view of the Moorside Farm single-storey extension with sedum roof"
    },
    summary: "A low, single-storey extension with a sedum roof that recedes into the landscape.",
    detail: "The addition preserves garden length and the existing first-floor window while matching the house’s material character. Its planted flat roof minimises the visual impact from higher ground.",
    services: ["Contextual design", "Planning drawings", "Low-impact extension"],
    documentPreview: { path: "/documents/pages/moorsidefarm", pageCount: 7 }
  },
  {
    slug: "ryecroft-glen",
    title: "Ryecroft Glen",
    year: "2023",
    category: "Residential",
    image: {
      src: "/media/rgthumbnail.png",
      alt: "Architectural drawing preview for the Ryecroft Glen apartment development"
    },
    summary: "Ten new apartments arranged above undercroft parking on the site of an existing house.",
    detail: "The proposal resolves density, vehicle access and residential amenity within a constrained site, supported by a coordinated working-drawing package.",
    services: ["Apartment design", "Technical drawings", "Site coordination"],
    documentPreview: { path: "/documents/pages/ryecroftglen", pageCount: 19 }
  },
  {
    slug: "former-derbyshire-times",
    title: "Former Derbyshire Times",
    year: "2023",
    category: "Technical design",
    image: {
      src: "/media/dtthumbnail.png",
      alt: "Technical site drawing for the former Derbyshire Times car park proposal"
    },
    summary: "Technical proposals for a new car park serving the former Derbyshire Times site.",
    detail: "A concise drawing package that tests layout, access and construction requirements for the reuse of a prominent existing site.",
    services: ["Site planning", "Working drawings", "Access coordination"],
    documentPreview: { path: "/documents/pages/derbyshiretimes", pageCount: 4 }
  },
  {
    slug: "great-gilling",
    title: "Great Gilling",
    year: "2023",
    category: "Residential",
    image: {
      src: "/media/ggthumbnail.png",
      alt: "Technical drawing preview for the Great Gilling residential renovation"
    },
    summary: "A residential renovation developed through a disciplined technical drawing set.",
    detail: "The work reorganises and renews an existing home, translating the design into a coordinated package for approval and delivery.",
    services: ["Residential renovation", "Technical design", "Detailing"],
    documentPreview: { path: "/documents/pages/greatgilling", pageCount: 6 }
  },
  {
    slug: "proposed-retail-development",
    title: "Proposed Retail Development",
    location: "South of Old Mill Road",
    year: "2023",
    category: "Visualisation",
    image: {
      src: "/media/prdthumb.png",
      alt: "Architectural visualisation of the proposed retail development south of Old Mill Road"
    },
    summary: "A visual study for a proposed retail development south of Old Mill Road.",
    detail: "The project uses architectural visualisation to communicate massing, material and arrival before the scheme reaches detailed design.",
    services: ["Concept design", "Visualisation", "Design communication"],
    documentPreview: { path: "/documents/pages/proposedretaildevelopment", pageCount: 7 }
  },
  {
    slug: "st-georges-church",
    title: "St George’s Church",
    year: "2018",
    category: "Visualisation",
    image: {
      src: "/media/sgthumb.png",
      alt: "Exterior visualisation of the proposed extension to St George’s Church"
    },
    summary: "A proposed church extension modelled in SketchUp and rendered to clarify the new intervention.",
    detail: "The sequence studies how the addition meets the existing church, using external and internal views to help stakeholders understand the proposal.",
    services: ["SketchUp modelling", "SU Podium rendering", "Stakeholder visuals"],
    documentPreview: { path: "/documents/pages/stgeorgechurch", pageCount: 6 },
    gallery: [
      { src: "/media/sketchup/Proposed extension St George Church view 1.png", alt: "Exterior view of the proposed St George’s Church extension" },
      { src: "/media/sketchup/Proposed extension St George Church 3.jpg.png", alt: "Architectural visualisation of the St George’s Church extension meeting the existing building" },
      { src: "/media/sketchup/st george church 1.png", alt: "Context view of St George’s Church and the proposed extension" }
    ]
  },
  {
    slug: "gainsborough",
    title: "Gainsborough",
    year: "Archive",
    category: "Technical design",
    image: {
      src: "/media/gainsborough/thumbnail.png",
      alt: "Working-drawing preview for the Gainsborough project"
    },
    summary: "A retained working-drawing study from Paul’s original portfolio archive.",
    detail: "The drawings show the steady technical craft behind the portfolio: plans, elevations and details organised to communicate the proposal clearly.",
    services: ["Working drawings", "Technical coordination", "Detailing"],
    gallery: [
      { src: "/media/gainsborough/ground and first floor.png", alt: "Gainsborough ground- and first-floor architectural plans" },
      { src: "/media/gainsborough/elevation.png", alt: "Gainsborough architectural elevation drawing" },
      { src: "/media/gainsborough/section 1.1 2.2.png", alt: "Gainsborough architectural section drawings" }
    ]
  },
  {
    slug: "home-renovation",
    title: "Home Renovation",
    year: "Freelance archive",
    category: "Residential",
    image: {
      src: "/media/home-renovation/A1_thumb.jpg",
      alt: "Interior visualisation for the home renovation project"
    },
    summary: "A compact home-renovation study developed from plans through interior visualisations.",
    detail: "The project combines practical plan changes with a series of visual studies, giving the client a direct view of the proposed spaces before work begins.",
    services: ["Space planning", "Interior visualisation", "Freelance design"],
    gallery: [
      { src: "/media/home-renovation/A1.jpg", alt: "Interior visualisation of the renovated home" },
      { src: "/media/home-renovation/ground-floor-plan.PNG", alt: "Ground-floor plan for the home renovation" },
      { src: "/media/home-renovation/shower3.jpg", alt: "Bathroom visualisation for the home renovation" }
    ]
  },
  {
    slug: "barlow",
    title: "Barlow",
    year: "Freelance archive",
    category: "Residential",
    image: {
      src: "/media/barlow/7_thumb.jpg",
      alt: "Exterior architectural visualisation for the Barlow residential concept"
    },
    summary: "A residential concept explored through a concise sequence of exterior visuals.",
    detail: "The image set tests massing, roof form and material character, supporting an approachable conversation with the client.",
    services: ["Residential concept", "3D visualisation", "Client presentation"],
    gallery: [
      { src: "/media/barlow/1.jpg", alt: "Exterior view of the Barlow residential concept" },
      { src: "/media/barlow/4.jpg", alt: "Alternative exterior view of the Barlow residential concept" },
      { src: "/media/barlow/7.jpg", alt: "Street-facing visualisation of the Barlow residential concept" }
    ]
  },
  {
    slug: "home-gym",
    title: "Home Gym",
    year: "Freelance archive",
    category: "Residential",
    image: {
      src: "/media/home-gym/Gym_thumb.jpg",
      alt: "Interior visualisation of the private home gym"
    },
    summary: "A dedicated training space designed and visualised as part of Paul’s freelance work.",
    detail: "The proposal focuses on a functional layout, robust finishes and a strong visual identity appropriate to a private training environment.",
    services: ["Interior design", "Spatial planning", "Visualisation"],
    gallery: [
      { src: "/media/home-gym/Gym1.jpg", alt: "Home gym interior layout visualisation" },
      { src: "/media/home-gym/Gym3.jpg", alt: "Home gym equipment and finishes visualisation" },
      { src: "/media/home-gym/Gym6.jpg", alt: "Alternative view of the home gym interior" }
    ]
  },
  {
    slug: "architectural-visualisations",
    title: "Architectural Visualisations",
    year: "Selected archive",
    category: "Visualisation",
    image: {
      src: "/media/psrenders/thumbnail.png",
      alt: "Architectural visualisation created with Photoshop compositing"
    },
    summary: "A selection of Photoshop compositing and architectural image-making from the original portfolio.",
    detail: "These images show Paul’s ability to turn drawing information into atmospheric, legible scenes that make spatial proposals easier to understand.",
    services: ["Photoshop", "Image compositing", "Design communication"],
    gallery: [
      { src: "/media/psrenders/1.png", alt: "Architectural exterior visualisation with landscape context" },
      { src: "/media/psrenders/3.png", alt: "Architectural concept visualisation created through image compositing" },
      { src: "/media/psrenders/6.png", alt: "Atmospheric architectural visualisation from the selected archive" },
      { src: "/media/psrenders/7.png", alt: "Architectural presentation image from the selected visualisation archive" }
    ]
  },
  {
    slug: "hotel-angola",
    title: "40-Bedroom Hotel",
    location: "Sumbe, Kwanza Sul, Angola",
    year: "2012–2013",
    category: "Visualisation",
    image: {
      src: "/media/revit/thumbnail.png",
      alt: "Revit visualisation of the proposed forty-bedroom hotel in Sumbe, Angola"
    },
    summary: "A hotel proposal developed through Revit renders, plans, sections and elevations.",
    detail: "Produced as part of Paul’s work in Angola, the study brings together coordinated architectural information and rendered views for a forty-bedroom hotel.",
    services: ["Revit", "Building information modelling", "Architectural visualisation"],
    gallery: [
      { src: "/media/revit/render 1.jpg", alt: "Exterior Revit render of the proposed hotel in Sumbe" },
      { src: "/media/revit/render 2.jpg", alt: "Alternative exterior Revit render of the proposed hotel" },
      { src: "/media/revit/GF plan.jpg", alt: "Ground-floor plan for the forty-bedroom hotel" },
      { src: "/media/revit/elevation.jpg", alt: "Architectural elevation of the forty-bedroom hotel" }
    ]
  }
];

export const categories: Array<"All work" | ProjectCategory> = [
  "All work",
  "Design management",
  "Technical design",
  "Residential",
  "Visualisation"
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
