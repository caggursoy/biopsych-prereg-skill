# Using the Biopsychology Preregistration Skill

## Overview

The Biopsychology Preregistration Skill automatically analyzes your research project directory and generates a preregistration document. It detects your research modality, extracts information from existing files, and creates a draft preregistration with what it finds, leaving blanks for you to complete.

## Installation

See the **Installation & Setup** section in `README.md` for detailed setup instructions for:
- Claude Desktop (MCP)
- Manual integration
- Other LLMs (ChatGPT, etc.)
- Agentic CLIs (GitHub Copilot, Aider, Cursor, etc.)

**Quick setup:**
```bash
git clone https://github.com/caggursoy/biopsych-prereg-skill.git
cd biopsych-prereg-skill
```

Then configure your AI tool to access the skill files (see README.md for platform-specific instructions).

## How to Use

### Step 1: Navigate to Your Project Directory

```bash
cd /path/to/your/research/project
```

### Step 2: Invoke the Skill

Use any of these commands:
- `/preregister`
- "Create a preregistration"
- "Generate prereg from my project"
- "Help me preregister my study"

### Step 3: Review Detected Information

The skill will:
1. Scan your directory
2. Detect your research modality (EEG, fMRI, online, psychophys)
3. Show you what it found
4. Generate a draft preregistration

### Step 4: Complete Missing Information

The skill will ask you questions to fill in:
- Sections marked `[TO BE COMPLETED]`
- Information it couldn't detect
- Confirmations for uncertain detections marked `[VERIFY: ...]`

### Step 5: Review and Save

The skill creates `PREREGISTRATION_DRAFT.md` in your directory. Review and edit as needed.

## What the Skill Detects

### From File Types
- **EEG/ERP**: `.set`, `.fdt`, `.vhdr`, `.eeg` files
- **fMRI**: `.nii`, `.nii.gz` files, BIDS structure
- **Online**: `.html`, `.js`, `.json` experiment files
- **Psychophys**: `.acq`, ECG/EDA data files

### From Scripts
- Analysis software and versions
- Preprocessing parameters
- Statistical tests
- Sample size calculations

### From Documentation
- Study title and description
- Hypotheses
- Experimental design
- Participant criteria

## Tips for Best Results

1. **Organize your project** before running the skill
2. **Include a README** with study description
3. **Document your analysis plan** in scripts or separate files
4. **Use clear file naming** conventions
5. **Keep ethics approval** documents in the project folder

## Output

The skill creates `PREREGISTRATION_DRAFT.md` containing:
- Metadata (title, authors, date)
- Study information (filled from your files)
- Modality-specific sections (based on detected type)
- Analysis plan (extracted from scripts)
- Sections marked for completion

## Next Steps

After generating your draft:
1. Review all detected information
2. Fill in `[TO BE COMPLETED]` sections
3. Verify `[VERIFY: ...]` sections
4. Add any missing details
5. Submit to a preregistration platform (OSF, AsPredicted, etc.)

## Troubleshooting

**Skill doesn't detect my modality?**
- Ensure you have characteristic files (.set for EEG, .nii for fMRI, etc.)
- You can manually specify: "Create an EEG preregistration"

**Missing information?**
- That's expected! The skill fills what it can find
- You'll complete the rest interactively

**Want to start over?**
- Delete `PREREGISTRATION_DRAFT.md` and run the skill again

## See Also

- `QUICK_REFERENCE.md` - Quick guide to all templates
- `templates/` - Individual template guides
- `README.md` - Full project documentation
