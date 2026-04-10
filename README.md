<div align="center">
  
  # 🏛️ ImpactArchitect v3.3
  **Behaviorally-Informed Policy IDE & Strategic Intervention Canvas**

  [![Version](https://img.shields.io/badge/Version-3.3-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/AnggaConni/TheoryofChange_COM-B)
  [![AI Powered](https://img.shields.io/badge/AI_Engine-Google_Gemini-purple.svg?style=for-the-badge&logo=google)](https://aistudio.google.com/)
  [![Built With](https://img.shields.io/badge/Built_With-React_&_Tailwind-teal.svg?style=for-the-badge&logo=react)]()
  [![Author](https://img.shields.io/badge/Author-Angga_Conni_Saputra-0A66C2.svg?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/pulse/why-does-toc-need-com-b-theory-change-canvas-angga-conni-saputra-bhnwc/)

  <p align="center">
    <strong>Stop guessing why your programs fail.</strong><br>
    Transform complex social, corporate, and policy problems into highly logical, actionable strategies using the Theory of Change and COM-B Behavior Model.
  </p>
  
</div>

---

## 📖 The Philosophy

Most strategic planners suffer from **"Activity-First Thinking"**. They design workshops, build applications, and distribute resources while completely ignoring the brutal realities of human psychology and environmental constraints. 

ImpactArchitect plugs this hole by fusing two robust methodologies:
1. **Theory of Change (ToC):** The macro-level roadmap that reverse-engineers success.
2. **COM-B Model:** The micro-level behavioral engine that proves whether an Outcome (behavior) will actually happen based on *Capability*, *Opportunity*, and *Motivation*.

If ToC is the roadmap, COM-B is the reality check. ImpactArchitect forces clarity before action, diagnosis before intervention, and logic before budget.

---

## ✨ Core Features

### 🧠 Smart Theory of Change Canvas
* **Visual Logic Flow:** Map out Inputs, Activities, Outputs, Outcomes, and Impacts linearly.
* **Rich Text Editor:** Click-to-edit interface supporting Bold, Italic, Lists, and Headers.
* **Dynamic Layout:** Text areas auto-expand to fit content for a clean, scroll-free experience.

### 🤖 Context-Aware AI (Google Gemini)
* **Magic Wand:** Auto-fill empty nodes based on the logical context of your previous steps.
* **Auto-Complete All:** Generate a full program draft globally from just an Impact statement.
* **Behavioral Reality Check:** AI analyzes specific Outcome nodes to identify hidden behavioral bottlenecks.
* **Strategic Interventions:** Stop guessing. The AI suggests precise programmatic interventions based on your lowest COM-B scores.

### 📊 Behavioral Diagnostics (COM-B)
* **Triangular Radar Charts:** Instantly visualize Capability, Opportunity, and Motivation scores.
* **Auto-Risk Assessment:** Automatic risk labeling (Safe, Medium, High, Critical) to prevent launching failing activities.
* **Sandbox Tutorials:** Practice diagnosing logic gaps using pre-loaded dummy datasets (e.g., Farmer Welfare, Stunting Reduction).

### 🚀 Built-in Static Blog Engine
* **Automated Publishing:** Includes a Node.js script to dynamically generate a beautiful, SEO-friendly blog and individual article pages from a single `data.json` file.
* **GitHub Actions Ready:** Push changes to your JSON file and let the automated CI/CD pipeline build and deploy your articles.

---

## 🛠️ Technology Stack

ImpactArchitect is built with a **"No-Build" architecture** for the main app, ensuring maximum portability and zero-configuration for end users.

| Category | Technology |
| :--- | :--- |
| **Core UI** | React 18 & ReactDOM (via CDN) |
| **Styling** | Tailwind CSS (via CDN) |
| **Icons & Fonts** | FontAwesome 6, Plus Jakarta Sans |
| **Visualization** | Chart.js (Radar Charts) |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash`) |
| **Markdown Parsing** | Marked.js |
| **Blog Generator** | Node.js, GitHub Actions (`build.yml`) |

---

## 📂 Project Structure

```text
├── index.html                 # The Premium Landing Page
├── tool.html                  # The ImpactArchitect Workspace App
├── blog.html                  # The Blog Index (Auto-generated)
├── blog/
│   ├── data.json              # Your blog content database
│   └── article/               # Generated single article HTML pages
├── scripts/
│   └── generate-blog.js       # Node.js script to build the blog
└── .github/workflows/
    └── build.yml              # CI/CD pipeline for auto-publishing
