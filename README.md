## TEAM NAME:
TEAM-17

## Team Members:
- 24U45A4215 - M.HARINI
- 23U41A05B6 - URUKUTI ROSHINI
- 24U45A0403 - BODDEDA VANDHANA
- 24u45a0438 - KONCHA SUBHADRA

## Demo Video:
You can watch the Demo video file for this entire case study using the below link
- https://drive.google.com/file/d/12oSdCOP_o6Xmij-Jp-gfLZfnY1ZAfgGo/view?usp=sharing

## PRESENTATION
You can view the PPT through this below link
- https://drive.google.com/file/d/1N-maeC9doWW0ZFFnnZF5o2n8RL9BawDL/view?usp=drivesdk

## Category
Quality assurance

## Title
Test Data Generator with Constraints

## Business Problem
Test data is hand-crafted and brittle. Time-consuming to create, difficult to maintain, and frequently violates underlying business domain rules. Hardcoding test states prevents edge-case discovery.

## Expected POC Output
Schema + business rules (YAML) -> agent generates N realistic rows respecting constraints (age 18-60, valid emails). Provides JSON/CSV/SQL.

## AI/AGENT CAPABILITY REQUIRED
Constraint-aware generation.

## Requirement
# Prompt Documentation
The following prompts were used during development of the Test Data Generator with Constraints:
- "Generate a Python application that creates realistic test data from YAML schema definitions while enforcing business constraints."
- "Design an agent loop architecture that validates generated records and automatically regenerates invalid data."
- "Create a regex pattern to validate corporate email addresses and reject invalid formats."
- "Write Pytest test cases to verify age constraints, uniqueness checks, and schema validation."
- "Generate sample employee and banking user YAML schemas with realistic business rules."
- "Suggest methods to export generated data into CSV, JSON, and SQL formats."
- "Identify edge cases for test data generation involving minimum and maximum age boundaries."
These prompts were refined iteratively during development to improve accuracy, validation coverage, and usability of the generated datasets.

## Description
Maintain a simple notes file containing key prompts used during development. (See AI Usage Note section)

## Solution Architecture
The solution uses an **Agentic Loop architecture** built in Python. The agent reads constraints, iteratively generates data properties, evaluates these fields through a Validation rules engine, and enforces constraints via heuristic regeneration if a constraint fails.

\`\`\`
YAML Rules
    ↓
Generate Data
    ↓
Validate Rules
    ↓
Detect Errors
    ↓
Self-Correct
    ↓
Re-Validate
    ↓
Export
\`\`\`

## Agent Workflow
1. **YAML Rules**: Define structures, ranges, and types (e.g. choice lists, integer min/max constraints, uniqueness).
2. **Generate Data**: The generation core creates initial data entries according to rule hints.
3. **Validate Rules**: Each row candidate is sent to the validation validator criteria checker.
4. **Detect Errors**: The engine evaluates checks, locating exact error rows (e.g. invalid age fields or email collisions).
5. **Self-Correct**: If errors exist, the feedback loop drops faulty segments and triggers intelligent correction.
6. **Re-Validate**: Confirms corrected versions against the validation spec.
7. **Export**: Outputs fully verified compliant rows in downloadable SQL, CSV, or JSON datasets.

## Setup Instructions
Ensure you have Python 3.9+ installed natively or via a virtual environment. Clean commit history and complete source code are maintained in the repository.

## Technologies used
1. The Simulated Backend (The files shown in the Code Viewer):
- Language: Python 3.9+
- Entry Point: app.py
- Libraries Used: pandas, pytest, faker (as specified in the requirements.txt)
- Architecture: Agentic Loop via object-oriented Py modules (parser.py, agent.py, validator.py).
2. The Live Web Wrapper (The actual UI you are interacting with right now):
- Framework: React 18 with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS (Handles the dark/light mode and layout)
- Icons: lucide-react

### Installation Commands
\`\`\`bash
# Clone the repository
- git clone https://github.com/24U45A4215/test-data-generator-with-constraints.git
- cd test-data-generator-with-constraints

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

## Run Instructions
Execute the orchestration app directly from the terminal:
\`\`\`bash
# Generate data utilizing the default users.yaml schema
python app.py

# Run unit tests
pytest tests/
\`\`\`

## AI Usage Note
This section details a 1-page overview of AI tools used during the development of this generator.

**What AI helped with:**
- Generating boilerplate code for Python file parsing and database connection simulations.
- Brainstorming the heuristic agent loop structure.
- Crafting regex validation patterns for robust email domain matching.
- Formulating realistic test data schemas for banking and corporate employees.

**What AI got wrong:**
- AI initially suggested pure LLM-based generation for every single row, which proved too slow, expensive, and non-deterministic. I had to pivot to a deterministic Python-based generation loop (using 'Faker') structured around AI validation concepts.
- The AI missed handling boundary edge cases properly (e.g., validating age = 18 exactly without off-by-one errors), which required manual assertion corrections in the validation engine.

**Best prompts used:**
- *"Generate a robust regex pattern in Python to validate corporate email formats ensuring they do not contain free services like Gmail or Yahoo."*
- *"Write a Pytest function that tests a generator loop verifying uniqueness constraints over 1,000 iterations without failing."*
- *"Design a YAML schema for a corporate employee database that includes edge cases like age minimums and departmental choice constraints."*

## Sample Data Folder
Sample inputs and expected outputs are available in the repository.

**Input Files Used:**
- 'schemas/employees.yaml': Configures employee limits, age boundaries (18-60), and departments.
- 'schemas/users.yaml': Configures banking user constraints.

**Expected Outputs Generated:**
- 'outputs/employees.csv': Comma-delimited file containing valid records.
- 'outputs/employees.json': Payload format perfectly mirroring the schema limits.
- 'outputs/employees.sql': 'INSERT' statements ready to seed a SQL database.

## Test Cases
Unit testing is implemented natively via **Pytest**, covering the happy path and critical validation boundaries.

\`\`\`python
def test_happy_path_validation():
    # Tests that correct entries pass through without interference
    rule = {"min": 18, "max": 60}
    assert validate_age(25, rule) == True
    assert validate_age(18, rule) == True

def test_uniqueness_constraint():
    # Tests the detector logic ensuring colliding emails are reje
Sample inputs, logic flow, and generated outputs are integrated and available within the codebase itself. Look for the \`schemas\` and \`outputs\` directory.
`
## Assumptions & Limitations
**Assumptions:**
- Unique constraints apply only to strings and integers.
- Schema YAML definitions are trusted and properly formatted structurally.

**Limitations:**
- Large row generation targets (e.g., >100,000) may encounter bottlenecking due to Faker synchronous generation.
- Cross-column validation logic (e.g., 'start_date' must be before 'end_date') is unsupported in MVP.

## Any supporting documents AI-Powered Test Data Generator with constraints
The following supporting artifacts are included within this codebase to validate the demonstration:
- **\`schemas/\` directory**: Contains the business rule definitions (e.g., \`users.yaml\`) acting as inputs.
- **\`outputs/\` directory**: Contains the pre-generated datasets (\`.json\`, \`.csv\`, \`.sql\`) demonstrating the Agent's constraint-aware generation.
- **\`tests/\` directory**: Contains Pytest suites validating edge cases and constraints handling.
- **Codebase Source**: The core logic within \`app.py\` and the agent modules serves as the architectural reference.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
