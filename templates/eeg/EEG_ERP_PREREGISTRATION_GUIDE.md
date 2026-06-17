# EEG/ERP Preregistration Template Guide

## Overview

This template guides researchers who wish to preregister their EEG projects, specifically studies investigating event-related potentials (ERPs) in the sensor space. It is based on the community-driven EEG and ERP Methods Preregistration Template developed through collaborative hackathons.

## Purpose

Preregistration helps:
- Distinguish confirmatory from exploratory research
- Increase transparency in EEG/ERP research
- Reduce bias and improve robustness of findings
- Document complex preprocessing and analysis decisions

## Key Sections to Include

### 1. Study Information
- Title
- Authors
- Research question(s)
- Hypotheses (directional and non-directional)

### 2. Design
- Study type (e.g., experimental, observational)
- Blinding procedures
- Randomization procedures
- Sample size and power analysis

### 3. Participants
- Inclusion/exclusion criteria
- Recruitment procedures
- Planned sample size with justification
- Stopping rule (when to stop data collection)

### 4. EEG Data Acquisition
- EEG system and manufacturer
- Number of electrodes and montage
- Reference electrode(s)
- Ground electrode
- Sampling rate
- Online filters (high-pass, low-pass, notch)
- Impedance threshold

### 5. Experimental Paradigm
- Task description
- Stimulus types and presentation
- Trial structure and timing
- Number of trials per condition
- Breaks and session duration
- Instructions to participants

### 6. Preprocessing Pipeline
- Offline filtering (high-pass, low-pass, notch filters)
- Re-referencing strategy
- Artifact detection and rejection criteria
  - Eye movement artifacts (EOG)
  - Muscle artifacts (EMG)
  - Other artifacts
- Independent Component Analysis (ICA) approach
- Bad channel detection and interpolation
- Epoching parameters (time window, baseline)
- Baseline correction method

### 7. ERP Analysis
- Components of interest (e.g., N1, P3, N400)
- Time windows for analysis
- Electrode selection/regions of interest
- Peak detection vs. mean amplitude
- Statistical approach for ERP analysis

### 8. Statistical Analysis
- Dependent variables
- Independent variables
- Statistical tests planned
- Multiple comparison corrections
- Alpha level
- Handling of missing data
- Planned sensitivity analyses

### 9. Exclusion Criteria
- Participant-level exclusions
- Trial-level exclusions
- Minimum number of trials per condition
- Data quality thresholds

### 10. Deviations
- How deviations from this preregistration will be documented
- Distinction between confirmatory and exploratory analyses

## References

This template is based on:
- Govaart, G. H., Schettino, A., et al. (2025). EEG ERP Preregistration Template. MetaArXiv. https://doi.org/10.31222/osf.io/4nvpt
- Pernet, C. R., Appelhoff, S., Gorgolewski, K. J., et al. (2020). Issues and recommendations from the OHBM COBIDAS MEEG committee for reproducible EEG and MEG research. Nature Neuroscience, 24, 1473-1474. https://doi.org/10.1038/s41593-020-00710-7
- Making ERP Research More Transparent: Guidelines for Preregistration (International Journal of Psychophysiology)
- Center for Open Science (COS) EEG and ERP Methods Template

## Additional Resources

- OSF Preregistration: https://osf.io/registries
- COBIDAS MEEG Blog: https://cobidasmeeg.wordpress.com/ (Best practices for MEG/EEG study design, analysis, and reporting)
- COBIDAS MEEG OSF Preprint: https://osf.io/a8dhx
- EEG/ERP Methods Template on OSF
- MPI CBS Preregistration Hackathon materials

## Notes

- Be as specific as possible while acknowledging uncertainty
- If a decision hasn't been made, state "not decided yet" or list options A and B
- Update the preregistration if methods change, documenting all deviations
- This template encourages thoroughness - use it as a planning tool, not just a checkbox
