# Architecture and Project Structure

## Overview

The biopsych-prereg-skill project is organized into modular components that handle different research modalities (EEG, fMRI, online behavioral, psychophysiology).

## Directory Structure

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

## Component Descriptions

### Templates

- **biopsych/common/**: Common schemas and templates applicable across all biopsychology modalities
  - `METADATA_SCHEMA.md`: Standard metadata fields for all preregistrations
  - `ETHICS_PRIVACY_TEMPLATE.md`: Ethics approval and data privacy documentation
- **eeg/**: EEG and ERP (Event-Related Potential) preregistration templates
- **fmri/**: Functional MRI preregistration templates
- **online/**: Online behavioral experiment preregistration templates (based on PRP-QUANT)
- **psychophys/**: Psychophysiology templates for ECG, HRV, EDA, EMG, and other peripheral measures

### Skills

Each skill is a modular AI instruction set designed to analyze your research project and generate preregistrations.

#### Base Skill (skills/biopsych/SKILL.md)

The entry point for preregistration generation:
- Scans your project directory
- Detects research modality (EEG, fMRI, online, psychophysiology)
- Routes to appropriate modality-specific skill
- Confidence scoring: Only routes if confidence ≥60%

#### EEG/ERP Skill (skills/eeg/SKILL.md)

Specialized for electrophysiology studies:
- Detects EEGLAB, MNE, FieldTrip software
- Extracts sampling rate, filter parameters, reference electrode
- Identifies ICA settings and preprocessing pipeline
- Auto-fills EEG Acquisition and Preprocessing sections
- See example: `examples/PREREGISTRATION_EEG_N170_Example.md`

#### fMRI Skill (skills/fmri/SKILL.md)

Specialized for neuroimaging studies:
- Validates BIDS-compliant directory structure
- Parses JSON sidecars for acquisition parameters (TR, TE, voxel size)
- Detects SPM, FSL, or fMRIPrep software
- Extracts GLM design, contrasts, and statistical thresholds
- Auto-fills fMRI Acquisition and Preprocessing sections
- See example: `examples/PREREGISTRATION_fMRI_RewardProcessing_Example.md`

#### Online Behavioral Skill (skills/online/SKILL.md)

Specialized for web-based behavioral experiments:
- Detects jsPsych, Qualtrics, Pavlovia, or custom platforms
- Identifies Prolific, MTurk, or other recruitment platforms
- Extracts experiment structure (trials, conditions, stimuli)
- Finds data quality rules (attention checks, response time bounds, bot detection)
- Auto-fills Experiment Design and Data Quality sections
- See example: `examples/PREREGISTRATION_Online_AV_Dilemmas_Example.md`

#### Psychophysiology Skill (skills/psychophys/SKILL.md)

Specialized for peripheral physiological measurements:
- Detects psychophysiology software (AcqKnowledge, Kubios, Ledalab, NeuroKit2, BioSPPy, RHRV)
- Identifies signal types (ECG, HRV, EDA, EMG, respiration, pupillometry)
- Extracts signal acquisition parameters (sampling rate, electrode placement)
- Identifies preprocessing decisions (artifact detection, decomposition methods)
- Auto-fills Physiological Measures and Analysis sections
- See example: `examples/PREREGISTRATION_Psychophys_StressHRV_Example.md`

### Configuration Files (configs/*.json)

Each modality has a configuration file that:
- Defines file patterns and software signatures for detection
- Specifies parameters to extract from scripts and data
- Sets confidence thresholds and validation rules
- Enables customization for specific research needs

## How It Works

### Step 1: Modality Detection

When you ask the skill to create a preregistration, the base skill:
1. Scans your project directory
2. Looks for file types and software signatures (e.g., `.set` for EEG, `.nii` for fMRI)
3. Calculates confidence score based on detected patterns
4. Routes to the appropriate modality-specific skill if confident (≥60%)

### Step 2: Information Extraction

The modality-specific skill:
1. Analyzes your project files systematically
2. Extracts key parameters:
   - Research metadata from README and documentation
   - Analysis parameters from scripts (Python, R, MATLAB)
   - Software versions from requirements files
   - Sample size from power analysis scripts
   - Signal acquisition parameters specific to your modality

### Step 3: Draft Generation

The skill:
1. Fills in detected information into the preregistration template
2. Identifies missing sections
3. Prompts you interactively to complete them
4. Generates `PREREGISTRATION_DRAFT.md`

### Step 4: Review and Submission

You:
1. Review the generated draft
2. Make any necessary corrections or additions
3. Submit to your chosen preregistration platform (OSF, AsPredicted, ClinicalTrials.gov, etc.)

## Design Principles

1. **Modularity**: Each skill handles one modality independently
2. **Transparency**: Detection confidence and extraction logic are explicit
3. **Human-in-the-loop**: AI assists but humans make final decisions
4. **Template-driven**: All output follows established community standards
5. **Configuration-based**: Easy to customize detection and extraction rules
