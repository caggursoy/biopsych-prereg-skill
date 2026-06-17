# fMRI Preregistration Template Guide

## Overview

This template provides guidance for preregistering fMRI studies to increase reproducibility and transparency. It is based on the fMRI preregistration template developed through community hackathons and published on PsychArchives.

## Purpose

Preregistration of fMRI studies helps:
- Increase reproducibility of neuroimaging research
- Distinguish confirmatory from exploratory analyses
- Document complex preprocessing and analysis pipelines
- Reduce flexibility in data analysis (researcher degrees of freedom)

## Key Sections to Include

### 1. Study Information
- Title
- Authors and affiliations
- Research question(s)
- Hypotheses (with directionality when applicable)
- Study design (e.g., block design, event-related, resting-state)

### 2. Participants
- Target sample size with justification (power analysis)
- Inclusion criteria
- Exclusion criteria (general and MRI-specific)
- Recruitment strategy
- Stopping rule for data collection
- Compensation

### 3. MRI Data Acquisition
- Scanner manufacturer and model
- Field strength (e.g., 3T, 7T)
- Head coil type
- Pulse sequence (e.g., EPI, spiral)
- Acquisition parameters:
  - TR (repetition time)
  - TE (echo time)
  - Flip angle
  - Voxel size
  - Matrix size
  - Number of slices
  - Slice orientation and order
  - Field of view (FOV)
  - Multiband/acceleration factor (if applicable)
- Number of volumes/runs
- Dummy scans
- Physiological monitoring (cardiac, respiratory)

### 4. Anatomical Scans
- T1-weighted sequence parameters
- Other structural scans (T2, FLAIR, etc.)
- Purpose of each anatomical scan

### 5. Task Design (for task-based fMRI)
- Task description
- Conditions and contrasts of interest
- Trial structure and timing
- Stimulus presentation software
- Response collection method
- Number of trials per condition
- Run structure
- Instructions to participants

### 6. Preprocessing Pipeline
- Software and version (e.g., SPM12, FSL 6.0, fMRIPrep)
- Slice timing correction
- Motion correction algorithm
- Susceptibility distortion correction
- Co-registration to anatomical image
- Normalization/spatial transformation
  - Template space (e.g., MNI152)
  - Resampling resolution
- Smoothing kernel (FWHM)
- Temporal filtering (high-pass, low-pass)
- Denoising strategies (e.g., CompCor, ICA-AROMA)
- Handling of physiological noise

### 7. Quality Control
- Motion thresholds for exclusion
  - Framewise displacement (FD) threshold
  - Percentage of volumes with excessive motion
- Signal-to-noise ratio criteria
- Visual inspection procedures
- Outlier detection methods

### 8. First-Level (Within-Subject) Analysis
- General Linear Model (GLM) specification
- Hemodynamic response function (HRF) model
- Temporal derivatives included?
- Motion parameters as regressors
- Other nuisance regressors
- Contrasts of interest
- Statistical threshold

### 9. Second-Level (Group) Analysis
- Group-level model type (e.g., one-sample t-test, ANOVA, regression)
- Between-subject factors
- Covariates
- Regions of interest (ROI) definition
  - Anatomical ROIs
  - Functional ROIs
  - Independent localizer
- Whole-brain vs. ROI analysis
- Small volume correction (if applicable)

### 10. Multiple Comparisons Correction
- Correction method (e.g., FWE, FDR, cluster-based)
- Cluster-forming threshold
- Final significance threshold
- Software for correction

### 11. Connectivity Analysis (if applicable)
- Type of connectivity (functional, effective)
- Seed regions or network definition
- Analysis method (e.g., seed-based correlation, PPI, DCM)

### 12. Statistical Analysis
- Primary outcome measures
- Secondary outcome measures
- Planned statistical tests
- Alpha level
- Handling of missing data
- Planned sensitivity analyses
- Exploratory analyses (clearly labeled)

### 13. Data Exclusion
- Participant exclusion criteria
  - Excessive motion
  - Scanner artifacts
  - Incidental findings
  - Task performance
- Run/volume exclusion criteria
- Minimum data requirements per participant

### 14. Data Sharing
- Will data be shared? (Yes/No)
- Repository (e.g., OpenNeuro, NeuroVault)
- BIDS format compliance
- Level of data sharing (raw, preprocessed, statistical maps)

## References

This template is based on:
- Beyer, F., Flannery, J., Gau, R., et al. (2021). A fMRI pre-registration template. PsychArchives. https://doi.org/10.23668/PSYCHARCHIVES.5121
- OSF fMRI Preregistration Template: https://osf.io/6juft/
- GitHub: jessicaflannery/fmri-prereg

## Additional Resources

- COBIDAS (Committee on Best Practices in Data Analysis and Sharing) guidelines
- BIDS (Brain Imaging Data Structure) specification
- fMRIPrep documentation
- NeuroVault for sharing statistical maps
- OpenNeuro for sharing raw data

## Notes

- Specify software versions for all tools used
- Be explicit about all preprocessing steps and their order
- Document any deviations from this preregistration
- Consider using containerization (Docker, Singularity) for reproducibility
- Preregister before data collection when possible, or before data analysis if data already collected
