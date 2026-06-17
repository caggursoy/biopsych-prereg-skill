# Quick Reference Guide for Biopsychology Preregistration Templates

## Template Selection Guide

Use this guide to quickly identify which template(s) you need for your study.

### By Research Method

| Research Method | Template File | Key Features |
|----------------|---------------|--------------|
| **EEG/ERP** | `templates/eeg/EEG_ERP_PREREGISTRATION_GUIDE.md` | Preprocessing pipelines, artifact handling, ERP components, time windows |
| **fMRI** | `templates/fmri/FMRI_PREREGISTRATION_GUIDE.md` | Acquisition parameters, preprocessing, GLM specification, ROI analysis |
| **Online Behavioral** | `templates/online/ONLINE_BEHAVIORAL_PREREGISTRATION_GUIDE.md` | Platform specifics, data quality, attention checks, PRP-QUANT based |
| **Psychophysiology** | `templates/psychophys/PSYCHOPHYSIOLOGY_PREREGISTRATION_GUIDE.md` | ECG, HRV, EDA, EMG, signal processing, artifact detection |

### Common Elements (Required for All)

| Template | Purpose | File |
|----------|---------|------|
| **Metadata Schema** | Study identification, authors, classification | `templates/biopsych/common/METADATA_SCHEMA.md` |
| **Ethics & Privacy** | IRB approval, consent, data protection, GDPR | `templates/biopsych/common/ETHICS_PRIVACY_TEMPLATE.md` |

## Quick Start Checklist

### Before You Begin
- [ ] Determine your research modality/modalities
- [ ] Identify which template(s) you need
- [ ] Gather necessary information (IRB approval, power analysis, etc.)
- [ ] Choose a preregistration platform (OSF, AsPredicted, etc.)

### Creating Your Preregistration
- [ ] Complete metadata schema (study info, authors, dates)
- [ ] Fill out ethics and privacy template
- [ ] Complete modality-specific template(s)
- [ ] Review for completeness
- [ ] Have co-authors review
- [ ] Submit to preregistration platform
- [ ] Obtain and save DOI/URL

### After Preregistration
- [ ] Share preregistration link with team
- [ ] Reference preregistration in study materials
- [ ] Document any deviations during study
- [ ] Cite preregistration in final manuscript
- [ ] Distinguish confirmatory from exploratory findings

## Common Sections Across All Templates

All templates include these core sections:
1. **Study Information**: Title, authors, hypotheses
2. **Participants**: Sample size, inclusion/exclusion criteria
3. **Design**: Experimental design, randomization
4. **Procedure**: Step-by-step methods
5. **Data Analysis**: Statistical tests, exclusion criteria
6. **Deviations**: How changes will be documented

## Modality-Specific Highlights

### EEG/ERP
**Critical Decisions to Preregister:**
- Preprocessing pipeline (filtering, ICA, artifact rejection)
- ERP components and time windows
- Electrode selection
- Baseline correction method
- Trial exclusion criteria

### fMRI
**Critical Decisions to Preregister:**
- Acquisition parameters (TR, TE, voxel size)
- Preprocessing software and version
- Spatial smoothing kernel
- ROI definition method
- Multiple comparison correction
- Motion thresholds

### Online Behavioral
**Critical Decisions to Preregister:**
- Platform and browser requirements
- Attention checks and quality control
- Bot detection methods
- Exclusion criteria for online participants
- Data quality thresholds

### Psychophysiology
**Critical Decisions to Preregister:**
- Signal acquisition parameters (sampling rate, filters)
- Artifact detection and correction methods
- Baseline period definition
- Analysis windows
- Physiological confound handling

## Multimodal Studies

If your study uses multiple methods:
1. Use all relevant templates
2. Add a synchronization section
3. Specify integration methods
4. Document timing alignment

**Example combinations:**
- EEG + Behavioral → Use EEG + Online templates
- fMRI + Psychophysiology → Use fMRI + Psychophys templates
- EEG + fMRI → Use both neuroimaging templates

## Registration Platforms

### OSF Registries
- **Best for**: Comprehensive preregistrations, neuroimaging
- **URL**: https://osf.io/registries
- **Features**: Version control, embargoes, multiple templates

### AsPredicted
- **Best for**: Quick, simple preregistrations
- **URL**: https://aspredicted.org/
- **Features**: Simple form, fast submission

### PsychArchives
- **Best for**: Psychology research, European researchers
- **URL**: https://www.psycharchives.org/
- **Features**: ZPID repository, DOI assignment

### ClinicalTrials.gov
- **Best for**: Clinical trials, intervention studies
- **URL**: https://clinicaltrials.gov/
- **Features**: Required for many clinical studies

## Tips for Effective Preregistration

### Do:
✅ Be as specific as possible
✅ Acknowledge uncertainty ("not yet decided")
✅ List alternative approaches if undecided
✅ Include power analysis and sample size justification
✅ Specify all exclusion criteria
✅ Document software versions
✅ Plan for deviations

### Don't:
❌ Leave sections blank without explanation
❌ Be vague about critical decisions
❌ Forget to update if plans change
❌ Mix confirmatory and exploratory analyses
❌ Ignore platform-specific requirements
❌ Forget to cite your preregistration

## Time Estimates

| Template | Estimated Time to Complete |
|----------|---------------------------|
| Metadata Schema | 15-30 minutes |
| Ethics & Privacy | 30-60 minutes |
| EEG/ERP | 2-4 hours |
| fMRI | 2-4 hours |
| Online Behavioral | 1-3 hours |
| Psychophysiology | 2-4 hours |

**Note**: Times vary based on study complexity and prior preparation.

## Getting Help

### Resources
- Template-specific references (see individual template files)
- OSF Help: https://help.osf.io/
- Center for Open Science: https://www.cos.io/
- Your institution's research support office

### Common Questions
- **Q: What if I don't know all the details yet?**
  - A: Document what you do know and state "not yet decided" for uncertain items

- **Q: Can I update my preregistration?**
  - A: Yes, but document all changes and explain why

- **Q: When should I preregister?**
  - A: Ideally before data collection; if data exists, before analysis

- **Q: Do I need to preregister exploratory analyses?**
  - A: No, but clearly label them as exploratory in your report

## Version Information

- **Current Version**: 1.0
- **Last Updated**: June 2026
- **Based on**: Latest community standards and guidelines (2025-2026)

## Next Steps

1. Choose your template(s)
2. Review the full template file(s)
3. Gather necessary information
4. Complete your preregistration
5. Submit to a registry
6. Share with your team
7. Begin your research!
