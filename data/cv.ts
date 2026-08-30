export type CvExperience = {
  period: string;
  role: string;
  organisation: string;
  location?: string;
  summary: string;
  highlights?: string[];
};

export type CvEducation = {
  period: string;
  qualification: string;
  institution: string;
};

export const cvProfile = {
  name: "Paul Narvas",
  credentials: "MSc, BSc (Hons), ACIAT",
  title: "Design Manager & Architectural Technologist",
  location: "Sheffield, United Kingdom",
  phone: "07525 496 910",
  email: "paul@narvas.co.uk",
  website: "paulnarvas.com",
  linkedin: "linkedin.com/in/paulnarvas",
  profile:
    "Sheffield-based Design Manager and Architectural Technologist with more than a decade of experience across architectural consultancies, contractors and modular delivery. Experienced in coordinating multidisciplinary teams and translating ambitious concepts into practical, buildable design information.",
  approach:
    "Combines design management, technical delivery and site awareness across mixed-use, residential, commercial, hotel, office, refurbishment, listed-building and modular projects. Values clear communication, collaborative working and innovative, functional design.",
  expertise: [
    "Design management",
    "Multidisciplinary coordination",
    "Modular construction",
    "Concept and detailed design",
    "Planning and Building Regulations",
    "Tender and construction information",
    "Technical detailing",
    "Consultant and contractor liaison",
    "AutoCAD",
    "Revit",
    "SketchUp",
    "Adobe Photoshop"
  ],
  experience: [
    {
      period: "Present",
      role: "Design Manager",
      organisation: "Mockba Modular",
      summary:
        "Leads design coordination for modular projects, aligning architectural intent, consultant information, procurement requirements and buildable manufacturing solutions."
    },
    {
      period: "2022 - Recent",
      role: "Design Manager",
      organisation: "JRL Modular",
      location: "Newark",
      summary:
        "Coordinated projects with contractors, subcontractors, architects and the wider design team, supporting design management and procurement through modular delivery."
    },
    {
      period: "2020 - 2022",
      role: "Senior Architectural Technologist",
      organisation: "DB3 Architects",
      location: "Leeds",
      summary:
        "Produced and coordinated detailed design, tender and construction information for complex modular and industrial projects.",
      highlights: [
        "Lossiemouth MOD Accommodation, Scotland - detailed design for a new modular accommodation scheme for Caledonian Modular.",
        "Coca-Cola, Wakefield - tender and construction drawings for replacement of a walk-on ceiling in an operational industrial setting."
      ]
    },
    {
      period: "2016 - 2020",
      role: "Architectural Technologist",
      organisation: "Dixon Dawson Chartered Architects",
      location: "Sheffield",
      summary:
        "Delivered planning, Building Regulations, tender and construction information across major retail, leisure, hotel, restaurant and office developments.",
      highlights: [
        "Waverley, Rotherham - technical coordination for a £50m retail, leisure and office scheme forming part of the 740-acre brownfield regeneration.",
        "Merrywalks Centre, Stroud - redevelopment and reconfiguration of an existing mall, car park and cinema, including new hotel and restaurant uses.",
        "Market Street and North Street, Gainsborough - planning, Building Regulations, tender and construction drawings for a town-centre hotel and restaurant development."
      ]
    },
    {
      period: "2014 - 2016",
      role: "Architectural Technologist",
      organisation: "Cordonier Architects",
      location: "Sheffield",
      summary:
        "Worked on projects from £50,000 to £9m under construction management, design-and-build and traditional procurement, producing technical information for high-end residential, care-home and education projects.",
      highlights: [
        "Ryecroft Glen, Sheffield - lead contact for Sheffield City Council and consultants on ten apartments with undercroft parking, from planning and Building Regulations through tender and construction information."
      ]
    },
    {
      period: "2012 - 2013",
      role: "Design Team",
      organisation: "GESTAD Service",
      location: "Angola",
      summary:
        "Contributed to architectural design and Revit-based visualisation, including a forty-bedroom hotel proposal in Sumbe, Kwanza Sul."
    }
  ] satisfies CvExperience[],
  education: [
    {
      period: "2009 - 2010",
      qualification: "MSc Technical Architecture",
      institution: "Sheffield Hallam University"
    },
    {
      period: "2005 - 2009",
      qualification: "BSc (Hons) Architectural Technology",
      institution: "Sheffield Hallam University"
    },
    {
      period: "2004 - 2005",
      qualification: "Access to Higher Education - Interior Design",
      institution: "The Sheffield College"
    }
  ] satisfies CvEducation[],
  selectedWork: [
    {
      title: "Proposed Apartment Complex",
      cvSummary: "Five-storey modular residential design management.",
      detail:
        "Five-storey residential proposal developed through modular design management, consultant coordination and technical delivery."
    },
    {
      title: "Waverley",
      cvSummary: "GBP 50m mixed-use technical coordination.",
      detail:
        "£50m mixed-use destination in Rotherham, with coordinated technical design and construction information."
    },
    {
      title: "Merrywalks",
      cvSummary: "Phased live-centre redevelopment and new uses.",
      detail:
        "Phased redevelopment of a live shopping centre, car park and cinema with new hotel, restaurant and entrance works."
    },
    {
      title: "Ryecroft Glen",
      cvSummary: "10 apartments, planning to construction.",
      detail:
        "Ten-apartment development with undercroft parking, supported from planning through detailed construction information."
    }
  ],
  additional: ["Full, clean driving licence", "References available on request"]
} as const;
