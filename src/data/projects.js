export const projectsData = [
  {
    id: "hotel-management-system",
    title: "Hotel Management System",
    category: "Backend & Systems",
    tags: ["JAVA", "BACKEND"],
    period: "Jan 2026 – Mar 2026",
    badge: "Backend & Database",
    summary: "A robust console-based hospitality management platform designed to automate reservations, room allocation, and financial transactions with an ACID-compliant normalized relational schema.",
    techStack: ["Java", "MySQL", "JDBC", "OOP", "Git/GitHub"],
    highlights: [
      "Engineered a console-based application managing 50+ rooms and 200+ reservations, supporting the full booking lifecycle.",
      "Reduced manual booking errors by approximately 40% by implementing CRUD operations via JDBC and MySQL with input validation.",
      "Architected a normalized schema with 4 tables, cutting redundancy by 60% and improving query speed by approximately 35%.",
      "Eliminated connection leaks across 100+ test transactions using try-with-resources for SQL exception handling."
    ],
    stats: [
      { label: "Rooms Managed", value: "50+" },
      { label: "Reservations", value: "200+" },
      { label: "Manual Booking Errors", value: "~40%", detail: "Reduction" },
      { label: "Database Tables", value: "4", detail: "Normalized Schema" },
      { label: "Redundancy", value: "~60%", detail: "Reduction" },
      { label: "Query Speed", value: "~35%", detail: "Improvement" },
      { label: "Test Transactions", value: "100+", detail: "Zero Leaks" }
    ],
    caseStudy: {
      problem: "Hospitality operations relied on manual paper and basic ledger records, resulting in approximately 40% booking errors, duplicate room assignments, and lack of relational schema constraints.",
      approach: "Engineered an object-oriented Java console system with JDBC persistence to an ACID-compliant MySQL database, enforcing normalized constraints and strict exception handling.",
      technology: ["Java", "MySQL", "JDBC", "OOP", "Git/GitHub"],
      architecture: "Interactive CLI -> Service & Controller Layer -> JDBC Persistence Gateway -> 4-Table Normalized Relational Database.",
      implementation: "Developed end-to-end CRUD operations for 50+ rooms and 200+ reservations. Structured a 4-table normalized relational schema to remove data anomalies and employed try-with-resources blocks across 100+ test transactions to guarantee zero connection leaks.",
      results: [
        "~40% reduction in manual booking errors via validated JDBC CRUD operations",
        "4-table normalized relational schema cutting redundancy by ~60%",
        "~35% query speed improvement across reservation queries",
        "100+ test transactions verified with zero JDBC connection leaks"
      ]
    },
    links: {
      github: "", // Configurable: Set repository URL here
      demo: "",   // Console application: Set demo video/repo URL here
    }
  },
  {
    id: "student-grade-tracker",
    title: "Student Grade Tracker",
    category: "Data Analytics & Python",
    tags: ["PYTHON"],
    period: "2024",
    badge: "Data Analytics",
    summary: "An automated academic data analytics system that streamlines GPA computation, batch performance analysis, and visual trend discovery for faculty decision-making.",
    techStack: ["Python", "Pandas", "Matplotlib", "CSV"],
    highlights: [
      "Automated GPA calculation and performance reporting for 30+ students across 5 subjects, saving approximately 70% manual effort.",
      "Visualized semester-wise performance trends using Matplotlib bar and line charts for faculty decision-making.",
      "Streamlined data handling by integrating CSV-based storage with Pandas for fast import and export of student records.",
      "Introduced a subject-wise comparison feature that pinpointed underperforming areas across the entire student batch."
    ],
    stats: [
      { label: "Students Evaluated", value: "30+" },
      { label: "Manual Effort Saved", value: "~70%" },
      { label: "Academic Subjects", value: "5" },
      { label: "Data Storage", value: "CSV + Pandas" }
    ],
    caseStudy: {
      problem: "Academic faculty faced tedious, error-prone manual calculations to compute student GPAs across multiple semesters and lacked visual trend reports to identify underperforming subjects.",
      approach: "Built an automated data analytics system using Python and Pandas for fast vectorized computations alongside Matplotlib for generating academic visual trends.",
      technology: ["Python", "Pandas", "Matplotlib", "CSV"],
      architecture: "CSV Storage -> Pandas Data Engine (Vectorized GPA Computation) -> Matplotlib Analytics Visualization.",
      implementation: "Automated GPA calculation and reporting for 30+ students across 5 academic subjects, saving ~70% manual effort. Implemented CSV-based data import/export with Pandas and generated subject-wise comparison charts for faculty review.",
      results: [
        "~70% manual calculation effort saved for academic faculty",
        "Automated GPA and performance reporting across 30+ students and 5 subjects",
        "Semester-wise visual performance trend discovery using Matplotlib",
        "Fast, reliable CSV-based import and export of student records"
      ]
    },
    links: {
      github: "", // Configurable: Set repository URL here
      demo: "",   // Analytics script: Set demo notebook/repo URL here
    }
  }
];
