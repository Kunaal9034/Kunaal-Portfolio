export const projectsData = [
  {
    id: "hotel-management-system",
    title: "Hotel Management System",
    category: "Backend & Systems",
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
    links: {
      github: "", // Configurable: Set repository URL here
      demo: "",   // Console application: Set demo video/repo URL here
    }
  },
  {
    id: "student-grade-tracker",
    title: "Student Grade Tracker",
    category: "Data Analytics & Python",
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
    links: {
      github: "", // Configurable: Set repository URL here
      demo: "",   // Analytics script: Set demo notebook/repo URL here
    }
  }
];
