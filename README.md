# FeedbackIQ 🧠

> AI-powered customer feedback intelligence platform.

FeedbackIQ helps organizations collect, analyze, and understand customer feedback using AI-powered insights.

🚧 **Status:** In active development — building in public.

## ✨ Current Progress

* [x] Landing page
* [x] Authentication flow
* [x] Initial system architecture
* [ ] Organization & member management
* [ ] Project management
* [ ] Feedback ingestion
* [ ] AI analysis pipeline
* [ ] Insights dashboard

## 🏗️ Architecture

FeedbackIQ is designed around an organization-centric architecture, where organizations manage projects, feedback sources, analysis runs, and AI-generated insights.

```text
Organization
│
├── Organization Members
│   └── Users / Roles
│
└── Projects
    │
    ├── Feedback Sources
    │   ├── Manual
    │   ├── CSV / Excel
    │   └── API
    │
    ├── Feedback Records
    │
    ├── Analysis Runs
    │   ├── Batch
    │   └── Real-time
    │
    └── Analysis Results
        ├── Sentiment
        ├── Topics
        ├── Statistics
        └── Suggestions
```

## 🔄 Product Workflow

```text
Organization
      ↓
Project
      ↓
Feedback Sources
      ↓
Feedback Records
      ↓
Analysis Run
      ↓
AI Processing
      ↓
Analysis Results
      ↓
Insights Dashboard
```

## 🎯 Planned Features

### 📥 Feedback Collection

* Manual feedback entry
* CSV / Excel imports
* API-based feedback ingestion
* Centralized feedback management

### 🧠 AI-Powered Analysis

* Sentiment analysis
* Topic extraction
* Feedback categorization
* Statistical insights
* AI-generated suggestions

### 📊 Analytics Dashboard

* Sentiment distribution
* Recurring customer concerns
* Topic trends
* Feedback statistics
* Actionable business insights

### 🏢 Organization Management

* Multi-organization support
* Organization members
* Role-based access control
* Project-based feedback management

## 🛠️ Tech Stack

> The stack is evolving as development progresses.

* **Frontend:** Next.js / React
* **Backend:** To be finalized
* **Database:** To be finalized
* **AI / ML:** Python, LLMs, NLP
* **Development:** GitHub, Docker (planned)

## 🗺️ Roadmap

* [x] Landing page
* [x] Authentication
* [x] Database configuration
* [ ] Organization & project management
* [ ] Manual feedback collection
* [ ] CSV / Excel ingestion
* [ ] First batch analysis pipeline
* [ ] Sentiment & topic analysis
* [ ] Insights dashboard
* [ ] API integrations
* [ ] Real-time analysis
* [ ] Production deployment

## 🚀 Build in Public

I'm building FeedbackIQ in public, sharing the development journey, architectural decisions, technical challenges, and lessons learned while creating an AI-powered SaaS product.

Follow the journey and watch the product evolve.

## 📌 Project Status

FeedbackIQ is currently under active development. Features, architecture, and technology choices may evolve based on validation and implementation requirements.

---

**Built with curiosity, code, and AI.**

## 🚀 Local Development Setup

Follow these steps to set up FeedbackIQ on your local machine.

### Prerequisites

Make sure you have the following installed:

- Python 3.11+ (use the version specified by the project, if different)
- Git
- A Supabase account and project
- A code editor such as VS Code

### 1. Fork and Clone the Repository

Fork the repository on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/FeedbackIQ.git
cd FeedbackIQ
```

If you have direct repository access, you can clone the original repository instead.

### 2. Create a Virtual Environment

**Windows (PowerShell):**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies

Install the project's dependencies using its existing dependency manager.

For a project with `requirements.txt`:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

If the repository uses `pyproject.toml` or another dependency manager, follow the corresponding project instructions instead.

### 4. Configure Environment Variables

Create a local `.env` file using the repository's `.env.example`, if available:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Configure the required values using your own development credentials.

Typical configuration may include:

- Supabase project URL
- Supabase authentication key
- PostgreSQL connection URL
- AI provider API key, if required by the current implementation

Use the exact variable names defined in the project's settings and configuration files.

**Important:** Never commit `.env` files, API keys, passwords, or other secrets.

### 5. Configure the Database

1. Create or use a development project in Supabase.
2. Configure the database connection using the project's expected environment variables.
3. Apply the database migrations using the project's documented migration workflow.

If Alembic is configured and the migration environment is ready, the command may be:

```bash
alembic upgrade head
```

Do not run migrations against a production database when setting up local development.

### 6. Start the Backend

Run the FastAPI application using the module path configured in the repository.

For example, if the application instance is `app` inside `app.main`:

```bash
uvicorn app.main:app --reload
```

Replace the module path if the project uses a different entry point.

### 7. Verify the Setup

Open the local API documentation:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

If the project includes a health endpoint, use it to verify that the application and database connection are working.

### 8. Start Contributing

1. Review the open GitHub issues.
2. Comment on the issue you want to work on.
3. Create a feature branch.
4. Implement and test your changes.
5. Open a pull request referencing the relevant issue.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

Keep pull requests focused and never include credentials or unrelated changes.


#BuildInPublic #AI #SaaS #Fullstack