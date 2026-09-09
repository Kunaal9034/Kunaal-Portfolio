/**
 * Project Architecture Data
 * Strictly grounded in resume details:
 * - Flow: Java Console Application -> JDBC -> MySQL Database
 * - Core concepts: OOP, CRUD Operations, Input Validation, SQL Exception Handling, try-with-resources
 * - Schema: 4-table normalized schema
 * - Metrics: 50+ rooms, 200+ reservations, ~40% reduction in manual booking errors,
 *   4-table normalized schema, ~60% redundancy reduction, ~35% query speed improvement, 100+ test transactions
 */

export const projectArchitectures = {
  "hotel-management-system": {
    id: "hotel-management-system",
    projectName: "Hotel Management System",
    title: "Technical Architecture & System Flow",
    subtitle: "Console Application → JDBC Data Access → Relational Persistence",
    summary: "High-level architectural flow and engineering specifications strictly grounded in resume benchmarks and system design.",
    
    // Exact resume metrics - no additions, no exaggerations
    metrics: [
      { label: "Rooms Managed", value: "50+", highlight: "Capacity" },
      { label: "Reservations Handled", value: "200+", highlight: "Lifecycle" },
      { label: "Manual Booking Errors", value: "~40%", highlight: "Reduction via Validation" },
      { label: "Normalized Relational Schema", value: "4 Tables", highlight: "ACID Compliant" },
      { label: "Data Redundancy", value: "~60%", highlight: "Reduction" },
      { label: "Query Speed", value: "~35%", highlight: "Improvement" },
      { label: "Test Transactions", value: "100+", highlight: "Zero Connection Leaks" },
    ],

    // Highlighted engineering principles specified in resume
    corePrinciples: [
      {
        name: "OOP",
        category: "Architecture",
        description: "Object-oriented design structuring entities, modular domain logic, and reservation management."
      },
      {
        name: "CRUD Operations",
        category: "Data Management",
        description: "Complete Create, Read, Update, and Delete operations for managing room allocations and reservation states."
      },
      {
        name: "Input Validation",
        category: "Application Tier",
        description: "Defensive validation of user inputs at the console boundary, reducing manual booking errors by ~40%."
      },
      {
        name: "SQL Exception Handling",
        category: "Reliability",
        description: "Defensive SQL exception handling and state inspection preventing runtime crashes across transactions."
      },
      {
        name: "try-with-resources",
        category: "Resource Safety",
        description: "Automated statement and connection cleanup eliminating memory and connection leaks across 100+ test transactions."
      }
    ],

    // Architecture Nodes in the flow
    nodes: [
      {
        id: "app-tier",
        title: "Java Console Application",
        role: "Client & Presentation Layer",
        tech: "Java",
        badges: ["OOP", "CRUD Operations", "Input Validation"],
        description: "Engineered as an interactive console application in Java. Implements Object-Oriented Programming (OOP) principles and robust input validation to manage 50+ rooms and 200+ reservations across the complete booking lifecycle.",
        responsibilities: [
          "Interactive console interface for hospitality operators",
          "Upfront input validation preventing booking errors (~40% reduction)",
          "Domain logic for reservation workflows and room management",
          "Dispatch of transactional CRUD operations"
        ],
        connectedTo: ["jdbc-tier"]
      },
      {
        id: "jdbc-tier",
        title: "JDBC Data Access Layer",
        role: "Database Connectivity & Transaction Management",
        tech: "Java Database Connectivity (JDBC)",
        badges: ["try-with-resources", "SQL Exception Handling"],
        description: "Facilitates reliable communication between the Java runtime and the database. Employs try-with-resources and defensive SQL exception handling, eliminating connection leaks across 100+ test transactions.",
        responsibilities: [
          "Driver-managed database communication via JDBC",
          "Automated resource cleanup using try-with-resources",
          "Defensive SQL exception handling and query error isolation",
          "Zero connection leaks validated across 100+ test transactions"
        ],
        connectedTo: ["app-tier", "db-tier"]
      },
      {
        id: "db-tier",
        title: "MySQL Database",
        role: "Relational Persistence Layer",
        tech: "MySQL",
        badges: ["4-table normalized schema", "ACID Compliance"],
        description: "Relational storage structured as a normalized 4-table schema. Eliminates approximately 60% of data redundancy and enhances query speed by approximately 35% for room allocations and guest records.",
        responsibilities: [
          "ACID-compliant relational data persistence",
          "Normalized 4-table database schema design",
          "Redundancy reduction (~60%) across stored entities",
          "Query response optimization (~35% performance improvement)"
        ],
        connectedTo: ["jdbc-tier"]
      }
    ],

    // Sequential flow pathways
    connections: [
      {
        id: "conn-app-jdbc",
        from: "app-tier",
        to: "jdbc-tier",
        label: "CRUD Operations & Validated Data",
        sublabel: "Method calls & try-with-resources management"
      },
      {
        id: "conn-jdbc-db",
        from: "jdbc-tier",
        to: "db-tier",
        label: "SQL Execution & Result Sets",
        sublabel: "4-table relational schema queries & transactions"
      }
    ]
  },
  "student-grade-tracker": {
    id: "student-grade-tracker",
    projectName: "Student Grade Tracker",
    title: "Data Processing Pipeline & Analytical Architecture",
    subtitle: "Student Records (CSV) → Pandas → GPA & Performance Processing → Matplotlib Visualization",
    summary: "Automated academic data analytics pipeline streamlining GPA computation, batch performance analysis, and visual trend discovery for faculty decision-making.",

    // Exact resume metrics - no additions, no exaggerations
    metrics: [
      { label: "Students Evaluated", value: "30+", highlight: "Cohort Scope" },
      { label: "Academic Subjects", value: "5", highlight: "Curriculum Breadth" },
      { label: "Manual Effort Saved", value: "~70%", highlight: "Automation Gain" }
    ],

    // Featured Subject-Wise Comparison Highlight
    featuredHighlight: {
      title: "Subject-Wise Performance Comparison",
      badge: "Key Analytical Capability",
      description: "Introduced a subject-wise comparison feature that evaluates score distributions across all 5 academic subjects, pinpointing underperforming areas across the entire 30+ student batch for targeted faculty intervention.",
      metricCallout: "5 Subjects Evaluated Across 30+ Students"
    },

    // 10 Verified resume-supported capabilities & core principles
    corePrinciples: [
      {
        name: "Automated GPA Calculation",
        category: "Processing",
        description: "Automated GPA calculation for 30+ students across 5 subjects, saving ~70% manual computational effort."
      },
      {
        name: "Performance Reporting",
        category: "Reporting",
        description: "Batch performance reporting providing structured summary metrics for faculty decision-making."
      },
      {
        name: "Semester-Wise Performance Visualization",
        category: "Visualization",
        description: "Visualized semester-wise performance trends to track academic trajectories across multiple evaluation periods."
      },
      {
        name: "Matplotlib Bar Charts",
        category: "Visualization",
        description: "Rendered comparative bar charts depicting subject-wise score distributions across the cohort."
      },
      {
        name: "Matplotlib Line Charts",
        category: "Visualization",
        description: "Plotted performance trend line charts tracking progress and score consistency across evaluation cycles."
      },
      {
        name: "CSV-Based Student Record Storage",
        category: "Storage",
        description: "Streamlined storage using standardized CSV files for structured persistence of multi-subject student records."
      },
      {
        name: "Pandas-Based Data Handling",
        category: "Data Handling",
        description: "Integrated Pandas library for high-speed tabular data manipulation, filtering, and aggregation."
      },
      {
        name: "Fast Import/Export of Student Records",
        category: "Data Handling",
        description: "Enabled rapid import and export of student records between flat CSV files and Python memory structures."
      },
      {
        name: "Subject-Wise Performance Comparison",
        category: "Analytics",
        description: "Comparative analytical module benchmarking score performance between all 5 academic subjects."
      },
      {
        name: "Identification of Underperforming Areas",
        category: "Analytics",
        description: "Pinpointed specific subject areas with lower performance thresholds across the entire student batch."
      }
    ],

    // Architecture Nodes in the flow
    nodes: [
      {
        id: "csv-storage",
        title: "CSV Storage",
        role: "Student Records Data Store",
        tech: "CSV Flat Files",
        icon: "file-spreadsheet",
        badges: ["CSV-based Storage", "Fast Import/Export", "Student Records"],
        description: "Flat-file persistence layer storing academic records for 30+ students across 5 subjects. Supports fast import and export operations for seamless integration with analytical tools.",
        responsibilities: [
          "CSV-based student record storage",
          "Fast import and export of student records",
          "Structured tabular score records across 5 subjects",
          "Decoupled file-based input feed for evaluation pipelines"
        ],
        connectedTo: ["pandas-layer"]
      },
      {
        id: "pandas-layer",
        title: "Pandas Data Handling",
        role: "Data Ingestion & Transformation Layer",
        tech: "Python / Pandas",
        icon: "table",
        badges: ["Pandas Data Handling", "DataFrame Manipulation", "~70% Effort Saved"],
        description: "Data processing layer leveraging Python and Pandas. Ingests raw CSV student records, converts records into structured DataFrames, and saves approximately 70% of manual calculation effort.",
        responsibilities: [
          "Pandas-based data handling and cleaning",
          "DataFrame construction from imported CSV student records",
          "Elimination of manual calculation overhead (~70% effort saved)",
          "Data transformation and grouping for downstream statistical logic"
        ],
        connectedTo: ["csv-storage", "processing-layer"]
      },
      {
        id: "processing-layer",
        title: "GPA & Performance Processing",
        role: "Academic Evaluation & Analytical Engine",
        tech: "Python Analytical Logic",
        icon: "calculator",
        badges: ["Automated GPA Calculation", "Performance Reporting", "Subject-Wise Comparison"],
        description: "Core analytical engine automating GPA calculation across 5 subjects for 30+ students. Generates performance reports, executes subject-wise comparisons, and pinpoints underperforming areas.",
        responsibilities: [
          "Automated GPA calculation for 30+ students across 5 subjects",
          "Batch performance reporting for faculty decision-making",
          "Subject-wise performance comparison across all 5 subjects",
          "Identification of underperforming academic areas"
        ],
        connectedTo: ["pandas-layer", "viz-layer"]
      },
      {
        id: "viz-layer",
        title: "Matplotlib Visualization",
        role: "Charts & Trend Discovery Layer",
        tech: "Matplotlib",
        icon: "chart",
        badges: ["Matplotlib Bar Charts", "Matplotlib Line Charts", "Semester-Wise Trends"],
        description: "Visual analytics layer utilizing Matplotlib. Generates bar charts and line charts illustrating semester-wise performance trends and subject-wise comparisons for faculty decision-making.",
        responsibilities: [
          "Semester-wise performance visualization",
          "Matplotlib bar charts for subject-wise distribution comparisons",
          "Matplotlib line charts for student trend discovery",
          "Visual reporting to support faculty interventions and decisions"
        ],
        connectedTo: ["processing-layer"]
      }
    ],

    // Sequential flow pathways
    connections: [
      {
        id: "conn-csv-pandas",
        from: "csv-storage",
        to: "pandas-layer",
        label: "Fast Import & Ingestion",
        sublabel: "30+ student records loaded into Pandas DataFrames"
      },
      {
        id: "conn-pandas-proc",
        from: "pandas-layer",
        to: "processing-layer",
        label: "Structured DataFrames & Series",
        sublabel: "Automated GPA calculation & cohort aggregation"
      },
      {
        id: "conn-proc-viz",
        from: "processing-layer",
        to: "viz-layer",
        label: "Comparative Metrics & Trend Feeds",
        sublabel: "Subject comparisons & semester-wise trend charts"
      }
    ]
  }
};
