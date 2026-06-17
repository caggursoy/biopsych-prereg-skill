# biopsych-prereg-skill

A GitHub repository scaffold for a reusable AI model skill set (Claude or other LLMs) that automatically generates preregistrations for biopsychology research by analyzing your project directory.

## Table of Contents

- [Purpose](#purpose)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Getting Started](#getting-started)
- [Using the Templates Manually](#using-the-templates-manually)
- [Development Status](#development-status)
- [Conventions](#conventions)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Version History](#version-history)
- [References and Sources](#references-and-sources)

## Purpose

This project provides:
- **Automated Preregistration Skill**: AI-powered analysis of your project directory to generate preregistrations
- Prompt-based skills for AI-assisted preregistration
- Reusable preregistration templates for biopsychology research
- Guardrails and behavioral rules for open science practices
- Evaluation examples and test prompts

### The Preregistration Skill

The core feature is a Claude skill (`SKILL.md`) that:
1. **Scans your project directory** to detect research modality (EEG, fMRI, online, psychophysiology)
2. **Extracts information** from your files (scripts, data, documentation)
3. **Generates a draft preregistration** with detected information filled in
4. **Identifies missing sections** and prompts you interactively to complete them
5. **Creates `PREREGISTRATION_DRAFT.md`** ready for review and submission

**Quick Start**: Navigate to your project directory and say "Create a preregistration" or use `/preregister`

See `USAGE_GUIDE.md` for detailed instructions.

### Why Preregister?

Preregistration helps researchers:
- **Increase Transparency**: Document your plans before seeing the data
- **Distinguish Confirmatory from Exploratory**: Clearly separate hypothesis-testing from hypothesis-generating research
- **Reduce Bias**: Minimize HARKing (Hypothesizing After Results are Known) and p-hacking
- **Improve Reproducibility**: Provide detailed methods for others to replicate
- **Enhance Credibility**: Show that findings were predicted, not just discovered
- **Better Planning**: Think through all methodological decisions in advance

### Benefits by Modality

**EEG/ERP Studies**:
- Document complex preprocessing pipelines
- Specify artifact handling procedures
- Define components and time windows a priori
- Reduce flexibility in ERP analysis

**fMRI Studies**:
- Specify preprocessing steps and parameters
- Define ROIs and contrasts before analysis
- Document multiple comparison correction methods
- Increase reproducibility of neuroimaging findings

**Online Behavioral Studies**:
- Define data quality criteria
- Specify exclusion rules for online participants
- Document attention checks and bot detection
- Plan for platform-specific issues

**Psychophysiology Studies**:
- Specify signal processing parameters
- Define artifact detection and correction methods
- Document baseline and analysis windows
- Plan for physiological confounds

## Project Structure

```
templates/
  biopsych/
    common/
      METADATA_SCHEMA.md
      ETHICS_PRIVACY_TEMPLATE.md
  eeg/
    EEG_ERP_PREREGISTRATION_GUIDE.md
  fmri/
    FMRI_PREREGISTRATION_GUIDE.md
  online/
    ONLINE_BEHAVIORAL_PREREGISTRATION_GUIDE.md
  psychophys/
    PSYCHOPHYSIOLOGY_PREREGISTRATION_GUIDE.md
skills/
  biopsych/
    SKILL.md                    # Base modality detection skill
  eeg/
    SKILL.md                    # EEG/ERP-specific skill
  fmri/
    SKILL.md                    # fMRI-specific skill
  online/
    SKILL.md                    # Online behavioral skill
  psychophys/
    SKILL.md                    # Psychophysiology skill
examples/
  PREREGISTRATION_EEG_N170_Example.md              # EEG example
  PREREGISTRATION_fMRI_RewardProcessing_Example.md # fMRI example
  PREREGISTRATION_Online_AV_Dilemmas_Example.md    # Online example
  PREREGISTRATION_Psychophys_StressHRV_Example.md  # Psychophysiology example
configs/
  biopsych-config.json          # Base skill configuration
  eeg-config.json               # EEG skill configuration
  fmri-config.json              # fMRI skill configuration
  online-config.json            # Online skill configuration
  psychophys-config.json        # Psychophysiology skill configuration
```

**New in v1.1**: Skills are now implemented with automated detection and parameter extraction for each modality.

### Template Descriptions

- **biopsych/common/**: Common schemas and templates applicable across all biopsychology modalities
  - `METADATA_SCHEMA.md`: Standard metadata fields for all preregistrations
  - `ETHICS_PRIVACY_TEMPLATE.md`: Ethics approval and data privacy documentation
- **eeg/**: EEG and ERP (Event-Related Potential) preregistration templates
- **fmri/**: Functional MRI preregistration templates
- **online/**: Online behavioral experiment preregistration templates (based on PRP-QUANT)
- **psychophys/**: Psychophysiology templates for ECG, HRV, EDA, EMG, and other peripheral measures

## Installation & Setup

**Quick Start:** See `INSTALL.md` for detailed platform-specific setup instructions.

### Prerequisites

- **Claude Desktop** (recommended) or **Claude Code** with MCP support
- Git (for cloning the repository)
- Your research project directory with data/scripts

### Quick Setup (Claude Desktop)

1. **Clone this repository:**
   ```bash
   git clone https://github.com/caggursoy/biopsych-prereg-skill.git
   cd biopsych-prereg-skill
   ```

2. **Configure Claude Desktop MCP:**
   
   Edit your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

   Add the skill directory to your MCP configuration:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/biopsych-prereg-skill"]
       }
     }
   }
   ```

3. **Restart Claude Desktop** to load the configuration.

4. **Navigate to your research project** and say:
   - "Create a preregistration" or
   - "Use the biopsych preregistration skill" or
   - "/preregister" (if custom commands are configured)

### Alternative Setup (Manual Integration)

If you're not using MCP or prefer manual integration:

1. **Clone to your project directory:**
   ```bash
   cd /path/to/your/research/project
   git clone https://github.com/caggursoy/biopsych-prereg-skill.git
   ```

2. **Reference the skill in your conversation:**
   ```
   "Please use the skill at ./biopsych-prereg-skill/SKILL.md to create a preregistration"
   ```

3. **Or copy the skill to your project:**
   ```bash
   cp biopsych-prereg-skill/SKILL.md ./
   cp -r biopsych-prereg-skill/skills ./
   cp -r biopsych-prereg-skill/templates ./
   cp -r biopsych-prereg-skill/configs ./
   ```

### For Other LLMs (ChatGPT, etc.)

1. **Clone the repository** as shown above.

2. **Upload relevant files** to your LLM conversation:
   - `SKILL.md` (base skill)
   - Modality-specific skill from `skills/[modality]/SKILL.md`
   - Template from `templates/[modality]/`
   - Config from `configs/[modality]-config.json`

3. **Provide context:**
   ```
   "I want to create a preregistration for my [EEG/fMRI/online/psychophys] study.
   Please use the uploaded skill file to analyze my project and generate a draft."
   ```

### For Agentic CLIs (GitHub Copilot CLI, Aider, etc.)

**GitHub Copilot CLI:**
1. **Clone the repository** to your project:
   ```bash
   cd /path/to/your/research/project
   git clone https://github.com/caggursoy/biopsych-prereg-skill.git
   ```

2. **Use with Copilot CLI:**
   ```bash
   gh copilot explain "Use the skill at ./biopsych-prereg-skill/SKILL.md to create a preregistration for this project"
   ```

**Aider:**
1. **Clone and add to Aider context:**
   ```bash
   aider --read biopsych-prereg-skill/SKILL.md \
         --read biopsych-prereg-skill/skills/eeg/SKILL.md \
         --read biopsych-prereg-skill/templates/eeg/EEG_ERP_PREREGISTRATION_GUIDE.md
   ```

2. **In Aider prompt:**
   ```
   Create a preregistration using the loaded skill files
   ```

**Cursor / Windsurf / Other AI IDEs:**
1. **Add to workspace:** Clone or copy the repository into your project
2. **Reference in chat:**
   ```
   @biopsych-prereg-skill/SKILL.md Create a preregistration for this project
   ```

**General CLI Integration:**
The skills are designed as **portable markdown-based prompts** that work with any LLM that can:
- Read files from your project directory
- Execute grep/search operations
- Parse JSON configuration files
- Generate markdown output

Simply point your AI tool to `SKILL.md` or the modality-specific skill file.

**For detailed setup instructions for each platform, see `INSTALL.md`.**

## Getting Started

### Using the Automated Skill

**Basic workflow:**
1. Navigate to your research project folder
2. Say "Create a preregistration" or use `/preregister`
3. The skill will analyze your files and generate a draft
4. Complete missing sections interactively
5. Review `PREREGISTRATION_DRAFT.md`

**What the skill detects:**
- Research modality from file types (.set for EEG, .nii for fMRI, .html/.js for online, .acq for psychophys)
- Study information from README and documentation files
- Analysis parameters from scripts (Python, R, MATLAB)
- Software versions from requirements files
- Sample size from power analysis scripts

See `USAGE_GUIDE.md` for complete instructions.

### Skill Implementation Details

The automated skill is implemented as a modular system with skills for each research modality:

**Base Skill** (`skills/biopsych/SKILL.md`):
- Scans your project directory
- Detects research modality (EEG, fMRI, online, psychophysiology)
- Routes to appropriate modality-specific skill
- Confidence scoring: Only routes if confidence ≥60%

**EEG/ERP Skill** (`skills/eeg/SKILL.md`):
- Detects EEGLAB, MNE, FieldTrip software
- Extracts sampling rate, filter parameters, reference electrode
- Identifies ICA settings and preprocessing pipeline
- Auto-fills EEG Acquisition and Preprocessing sections
- See example: `examples/PREREGISTRATION_EEG_N170_Example.md`

**fMRI Skill** (`skills/fmri/SKILL.md`):
- Validates BIDS-compliant directory structure
- Parses JSON sidecars for acquisition parameters (TR, TE, voxel size)
- Detects SPM, FSL, or fMRIPrep software
- Extracts GLM design, contrasts, and statistical thresholds
- Auto-fills fMRI Acquisition and Preprocessing sections
- See example: `examples/PREREGISTRATION_fMRI_RewardProcessing_Example.md`

**Online Behavioral Skill** (`skills/online/SKILL.md`):
- Detects jsPsych, Qualtrics, Pavlovia, or custom platforms
- Identifies Prolific, MTurk, or other recruitment platforms
- Extracts experiment structure (trials, conditions, stimuli)
- Finds data quality rules (attention checks, response time bounds, bot detection)
- Auto-fills Experiment Design and Data Quality sections
- See example: `examples/PREREGISTRATION_Online_AV_Dilemmas_Example.md`

**Psychophysiology Skill** (`skills/psychophys/SKILL.md`):
- Detects psychophysiology software (AcqKnowledge, Kubios, Ledalab, NeuroKit2, BioSPPy, RHRV)
- Identifies signal types (ECG, HRV, EDA, EMG, respiration, pupillometry)
- Extracts signal acquisition parameters (sampling rate, electrode placement)
- Identifies preprocessing decisions (artifact detection, decomposition methods)
- Auto-fills Physiological Measures and Analysis sections
- See example: `examples/PREREGISTRATION_Psychophys_StressHRV_Example.md`

**Configuration Files** (`configs/*.json`):
- Define file patterns and software signatures for detection
- Specify parameters to extract from scripts and data
- Set confidence thresholds and validation rules
- Each modality has its own configuration

### Using the Templates Manually

1. **Choose Your Modality**: Select the template that matches your research method:
   - `templates/eeg/` for EEG/ERP studies
   - `templates/fmri/` for fMRI studies
   - `templates/online/` for online behavioral experiments
   - `templates/psychophys/` for psychophysiology (ECG, HRV, EDA, EMG, etc.)

2. **Start with Common Elements**: All preregistrations should include:
   - Metadata from `templates/biopsych/common/METADATA_SCHEMA.md`
   - Ethics and privacy information from `templates/biopsych/common/ETHICS_PRIVACY_TEMPLATE.md`

3. **Complete Your Preregistration**:
   - Follow the guide for your chosen modality
   - Be as specific as possible
   - Document uncertainty (e.g., "not yet decided" or "option A or B")
   - Include all relevant sections

4. **Register Your Preregistration**:
   - OSF Registries: https://osf.io/registries
   - AsPredicted: https://aspredicted.org/
   - PsychArchives: https://www.psycharchives.org/
   - ClinicalTrials.gov (for clinical studies)

5. **Document Deviations**: If your methods change:
   - Update your preregistration or create an addendum
   - Clearly distinguish confirmatory from exploratory analyses
   - Explain reasons for deviations in your final report

### For Multimodal Studies

If your study uses multiple methods (e.g., EEG + behavioral, fMRI + psychophysiology):
1. Use the relevant template for each modality
2. Include a section on synchronization and integration
3. Specify how data from different modalities will be combined
4. Document timing and alignment procedures

### Template Formats

Templates are provided as Markdown (.md) files for easy editing and version control. You can:
- Edit directly in Markdown
- Convert to Word/PDF for submission
- Use as a checklist while filling out online forms
- Adapt sections as needed for your specific study

## Development Status

**⚠️ IMPORTANT: This project is in early development and has not been extensively tested.**

### Current Status

- **Templates**: Based on established community standards and peer-reviewed guidelines
- **Skills**: Implemented but not validated with real-world projects
- **Detection Logic**: Theoretical implementation requiring field testing
- **Platform Support**: Installation instructions provided but not tested across all platforms

### Known Limitations

1. **Limited Testing**: The automated skills have not been tested on diverse research projects
2. **Detection Accuracy**: File and parameter detection patterns may need refinement
3. **Platform Compatibility**: MCP and CLI integrations require user validation
4. **Edge Cases**: Unusual project structures or custom workflows may not be handled correctly

### What This Means for Users

- **Templates are reliable**: Based on published preregistration standards
- **Skills are experimental**: Automated detection and extraction should be verified
- **Manual review required**: Always review and validate generated preregistrations
- **Feedback welcome**: Please report issues and share your experience

### How You Can Help

We need your feedback to improve this project:

1. **Test the skills** on your research projects
2. **Report issues** with detection or extraction
3. **Share examples** of successful (or unsuccessful) usage
4. **Suggest improvements** to detection patterns
5. **Contribute fixes** for issues you encounter

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

**Use at your own discretion and always verify generated content before submission.**

## Conventions

- Keep one skill per file.
- Use clear naming (for example: `summarize-research.md`).
- Include objective, inputs, constraints, and expected output format for each skill.
- Document all sources and references used in templates
- Version control your preregistrations
- Be transparent about uncertainty and decision-making processes

## License

This project is released under the **MIT License**. See `LICENSE` for details.

All templates are built upon and acknowledge work by the preregistration community, including the EEG/ERP Methods Preregistration Template team, fMRI template contributors, and the Joint Psychological Societies Preregistration Task Force. Full attribution is provided in `LICENSE` and `README.md` (References section).

## Contributing

We welcome contributions to improve and expand these templates and skills! Please see `CONTRIBUTING.md` for detailed guidelines on how to contribute.

**Ways to contribute:**
1. **Suggesting Improvements**: Open an issue for template enhancements
2. **Adding New Templates**: Develop templates for additional modalities (fNIRS, TMS, MEG, EMA/ESM)
3. **Improving Skills**: Enhance detection logic or parameter extraction
4. **Sharing Examples**: Provide example preregistrations
5. **Reporting Issues**: Report errors or suggest clarifications
6. **Adding Resources**: Suggest relevant references

See `CONTRIBUTING.md` for the complete contribution process, quality standards, and submission guidelines.

## Acknowledgments

These templates are based on community-driven efforts by researchers worldwide, including:
- The EEG/ERP Methods Preregistration Template team
- The fMRI Preregistration Template contributors
- The Joint Psychological Societies Preregistration Task Force (PRP-QUANT)
- The Center for Open Science (COS)
- The Leibniz Institute for Psychology (ZPID)
- The Society for Psychophysiological Research (SPR)
- All contributors to open science and preregistration initiatives

## Contact

**Maintainer**: Çağatay Gürsoy ([@caggursoy](https://github.com/caggursoy))

For questions, suggestions, or collaboration inquiries:
- **Issues**: Open an issue on this repository
- **Discussions**: Use GitHub Discussions for general questions

We welcome feedback and contributions from the research community!

## Version History

- **v1.1** (June 2026): Full skill implementation release
  - Added psychophysiology skill and configuration
  - Comprehensive installation guide (INSTALL.md)
  - Support for multiple AI platforms (Claude, Copilot, Aider, Cursor)
  - Enhanced detection patterns for all modalities
  - Complete contributor guidelines

- **v1.0** (June 2026): Initial release
  - Templates for EEG/ERP, fMRI, online behavioral, and psychophysiology studies
  - Base modality detection skill
  - Skills for EEG, fMRI, and online behavioral modalities
  - Common metadata and ethics templates
  - Comprehensive references and resources
  - Based on latest community standards and guidelines


## References and Sources

### EEG/ERP Templates
1. **EEG and ERP Methods Preregistration Template**
    - Govaart, G. H., Schettino, A., Helbling, S., Mehler, D. M. A., Ngiam, W. X. Q., Moreau, D., Chiossi, F., Zanesco, A. P., Yang, Y.-F., Gau, R., Bartlett, J. E., García Alanis, J. C., Gutsell, J. N., Çetinçelik, M., Pavlov, Y. G., Šoškić, A., Ehinger, B. V., Mouseli, P., Algermissen, J., … Paul, E. (2025). EEG ERP Preregistration Template [Preprint]. MetaArXiv. https://doi.org/10.31222/osf.io/4nvpt
    - Sciety record: https://sciety.org/articles/activity/10.31222/osf.io/4nvpt_v2

5. **ARTEM-IS: Agreed Reporting Template for EEG Methodology—International Standard for Event-Related Potential Experiments**
    - Šoškić, A., Ković, V., Algermissen, J., et al. (2025). ARTEM-IS for ERP: Agreed Reporting Template for EEG Methodology—International Standard for Event-Related Potential Experiments. Psychophysiology, 62(12), e70187.
    - DOI: https://doi.org/10.1111/psyp.70187
    - PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC12683983/
    - Purpose: International standard for transparent and reproducible ERP methodology reporting
   
2. **Making ERP Research More Transparent: Guidelines for Preregistration**
    - Clayson, P. E., Carbine, K. A., & Larson, M. J. (2021). Making ERP Research More Transparent: Guidelines for Preregistration. International Journal of Psychophysiology, 161, 55-67.
    - DOI: https://doi.org/10.1016/j.ijpsycho.2021.02.016
    - ScienceDirect: https://www.sciencedirect.com/science/article/pii/S016787602100074X

3. **Center for Open Science (COS) - EEG and ERP Methods Template**
   - Blog announcement: https://www.cos.io/blog/introducing-the-eeg-and-erp-methods-template-qa-with-gisela-govaart-and-antonio-schettino
   - OSF Template: Available through OSF Registries

4. **MPI CBS Preregistration Hackathon**
    - Event: Max Planck Institute for Human Cognitive and Brain Sciences Preregistration Hackathon (June 2020 & beyond)
    - Website: https://www.cbs.mpg.de/1543216/preregistration-hackathon
    - Purpose: Community-driven development of EEG/fMRI preregistration templates
    - Resources: EEG and fMRI template materials from Max Planck Institute for Human Cognitive and Brain Sciences (Leipzig, Germany)

### fMRI Templates
1. **A fMRI Pre-registration Template**
   - Beyer, F., Flannery, J., Gau, R., Janssen, L., Schaare, L., Hartmann, H., Nilsonne, G., Martin, S., Khalil, A., Lipp, I., Puhlmann, L., Heinrichs, H., Mohamed, A., Herholz, P., Sicorello, M., & Panagoulas, E. (2021). A fMRI pre-registration template. PsychArchives. https://doi.org/10.23668/PSYCHARCHIVES.5121
   - PsychArchives: https://www.psycharchives.org/en/item/eaf562e3-69a7-46a4-925a-05a982ef1a0b
   - Downloadable formats: DOCX and PDF available

2. **OSF fMRI Preregistration Template**
   - OSF Project: https://osf.io/6juft/

3. **GitHub Repository - Foundational Implementation**
    - Jessica Flannery's fMRI preregistration template: https://github.com/jessicaflannery/fmri-prereg
    - RMarkdown version enabling reproducible/computational preregistrations
    - Note: This is the foundational template that formed the basis for the official Beyer et al. (2021) template above
    - Useful for researchers who prefer programmatic approaches or version control integration

4. **COBIDAS (Committee on Best Practices in Data Analysis and Sharing) Guidelines**
     - Nichols, T. E., Das, S., Eickhoff, S. B., Evans, A. C., Glatard, T., Hanke, M., Kriegeskorte, N., Milham, M. P., Poldrack, R. A., Poline, J.-B., Proal, E., Thirion, B., Van Essen, D. C., White, T., Yeo, B. T. T. (2017). Best practices in data analysis and sharing in neuroimaging using MRI. Nature Neuroscience, 20(3), 299-303.
     - DOI: https://doi.org/10.1038/nn.4500
     - COBIDAS Report: http://www.humanbrainmapping.org/COBIDASreport
     - SharedIt Access: http://rdcu.be/pxWt
     - Purpose: Best practices for MRI data analysis, acquisition, reporting, and sharing

5. **BIDS (Brain Imaging Data Structure) Specification**
    - Gorgolewski, K. J., Auer, T., Calhoun, V. D., et al. (2016). The brain imaging data structure, a format for organizing and describing outputs of neuroimaging experiments. Scientific Data, 3, 160044.
    - DOI: https://doi.org/10.1038/sdata.2016.44
    - Official Documentation: https://bids-specification.readthedocs.io/en/stable/
    - Purpose: Standardized format for organizing and sharing fMRI and other neuroimaging data

### Online Behavioral Experiments Templates
1. **PRP-QUANT (Psychological Research Preregistration-Quantitative) Template**
   - Preregistration Task Force. (2020). Preregistration Standards for Psychology - the Psychological Research Preregistration-Quantitative (aka PRP-QUANT) Template. ZPID (Leibniz Institute for Psychology). https://doi.org/10.23668/psycharchives.4584
   - PsychArchives: https://www.psycharchives.org/en/item/088c79cb-237c-4545-a9e2-3616d6cc8453
   - Online form: https://forms.gle/9YgAoJn4ZYPXtHGk9
   - Available formats: .xlsx, .docx, .odt, .ipynb

2. **Joint Psychological Societies Preregistration Task Force Report**
   - Bosnjak, M., Fiebach, C. J., Mellor, D., et al. (2022). A template for preregistration of quantitative research in psychology: Report of the joint psychological societies preregistration task force. American Psychologist, 77(4), 602-615.
   - PubMed: https://pubmed.ncbi.nlm.nih.gov/34807636/

3. **PRP-QUANT Webinar**
   - Launch webinar (October 27, 2020) featuring Simine Vazire and E. J. Wagenmakers
   - Available at: http://bit.ly/PreRegWebinar

4. **PreReg (ZPID) Resources**
   - PreReg home: https://prereg-psych.org/
   - Templates and materials: Multiple template options for psychology research

### MEG/MEEG Resources
1. **COBIDAS MEEG (Committee on Best Practices in Data Analysis and Sharing for MEEG)**
     - Pernet, C. R., Appelhoff, S., Gorgolewski, K. J., et al. (2020). Issues and recommendations from the OHBM COBIDAS MEEG committee for reproducible EEG and MEG research. Nature Neuroscience, 24, 1473-1474.
     - DOI: https://doi.org/10.1038/s41593-020-00710-7
     - OSF Preprint: https://osf.io/a8dhx
     - COBIDAS-MEEG Blog: https://cobidasmeeg.wordpress.com/
     - Purpose: Best practices for MEG/EEG study design, data acquisition, preprocessing, analysis, and reporting to enhance reproducibility and facilitate preregistration

2. **Hitchhacker's Guide to Preregistration (Neuroimaging)**
     - Guide: https://learn-neuroimaging.github.io/hitchhackers_guide_brain/22-preregistration/
     - Comprehensive overview of preregistration best practices in neuroimaging research
     - Purpose: Educational resource for implementing preregistration in neuroimaging studies including MEG/EEG

### Psychophysiology Resources
1. **Electrodermal Activity (EDA) Guidelines**
    - Boucsein, W., Fowles, D. C., Grimnes, S., et al. (2012). Publication recommendations for electrodermal measurements. Psychophysiology, 49(8), 1017-1034.
    - DOI: https://doi.org/10.1111/j.1469-8986.2012.01384.x
    - BIOPAC EDA resources: https://www.biopac.com/application/electrodermal-activity/

2. **Heart Rate Variability (HRV) Standards**
    - Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology (1996). Heart rate variability: Standards of measurement, physiological interpretation, and clinical use. European Heart Journal, 17(3), 354-381.
    - DOI: https://doi.org/10.1093/oxfordjournals.eurheartj.a014868

3. **Electromyography (EMG) Guidelines**
    - Fridlund, A. J., & Cacioppo, J. T. (1986). Guidelines for human electromyographic research. Psychophysiology, 23(5), 567-589.
    - DOI: https://doi.org/10.1111/j.1469-8986.1986.tb00676.x

4. **General Psychophysiology Resources**
    - Cacioppo, J. T., Tassinary, L. G., & Berntson, G. G. (Eds.). (2007). Handbook of Psychophysiology (3rd ed.). Cambridge University Press.
    - ISBN: 978-0-521-84471-0
    - Society for Psychophysiological Research (SPR): https://sprweb.org/
    - Comprehensive coverage of psychophysiological measurement and analysis
    - Interdisciplinary College - Introduction to Psychophysiology: https://interdisciplinary-college.org/2026-bc2/

5. **EDA Science and Applications**
    - Innsightful guide: https://www.innsightful.com/electrodermal-activity-eda-the-science-of-skin-conductance-and-emotional-arousal/
    - Practical guide to EDA measurement and interpretation

### General Preregistration Resources
1. **Open Science Framework (OSF)**
    - OSF Registries: https://osf.io/registries
    - Preregistration resources: https://www.cos.io/initiatives/prereg
    - Templates of OSF Registration Forms: https://osf.io/zab38/wiki/home/

2. **AsPredicted**
    - Simple preregistration platform: https://aspredicted.org/

3. **ClinicalTrials.gov**
    - For clinical and intervention studies: https://clinicaltrials.gov/

4. **APS (Association for Psychological Science)**
    - Research Preregistration 101: https://www.psychologicalscience.org/observer/preregistration
    - Preregistration of Research Plans: https://www.psychologicalscience.org/observer/preregistration-of-research-plans
    - Purpose: Educational resources on preregistration best practices

5. **Hitchhacker's Guide to Preregistration (Neuroimaging)**
     - Guide: https://learn-neuroimaging.github.io/hitchhackers_guide_brain/22-preregistration/
     - Comprehensive overview of preregistration in neuroimaging research
     - Purpose: Best practices for implementing preregistration with neuroimaging data

### Data Repositories
1. **PsychArchives (ZPID)**
    - ZPID repository for psychological research: https://www.psycharchives.org/
    - Multilingual platform for preregistrations, templates, and research materials
    - DOI: All materials receive persistent identifiers

2. **OpenNeuro**
    - For neuroimaging data sharing (BIDS format): https://openneuro.org/
    - Supports EEG, fMRI, MEG, and other neuroimaging modalities
    - Integrated with preregistration tracking

3. **PhysioNet**
    - For physiological signal databases: https://physionet.org/
    - Large collection of publicly available physiological datasets
    - Supports EEG, ECG, HRV, and other psychophysiological data

4. **NeuroVault**
    - For sharing statistical maps and brain images: https://neurovault.org/
    - Complements OpenNeuro for result-level sharing

### Registered Reports and Stage 1 Resources
1. **Registered Reports Overview**
    - Center for Open Science guide: https://www.cos.io/initiatives/registered-reports
    - Purpose: Pre-review of methods and analysis plan before data collection
    - Supports both narrative and structured preregistration formats

2. **Journals Publishing Registered Reports**
    - List of participating journals: https://www.cos.io/initiatives/registered-reports
    - Growing number of journals across neuroscience, psychology, and related fields accepting Registered Reports