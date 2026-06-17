# Psychophysiology Preregistration Template (ECG, HRV, EDA, EMG)

## Overview

This template provides guidance for preregistering psychophysiology studies involving peripheral physiological measures such as electrocardiography (ECG), heart rate variability (HRV), electrodermal activity (EDA/skin conductance), electromyography (EMG), respiration, and pupillometry.

## Purpose

Preregistration of psychophysiology studies helps:
- Document complex signal processing and analysis decisions
- Distinguish confirmatory from exploratory analyses
- Increase transparency in psychophysiological research
- Reduce flexibility in data analysis

## Key Sections to Include

### 1. Study Information
- Title
- Authors and affiliations
- Research question(s)
- Hypotheses (with directionality)
- Study design

### 2. Participants
- Target sample size with justification
- Power analysis
- Inclusion criteria
- Exclusion criteria (general and physiology-specific)
  - Cardiovascular conditions (for ECG/HRV)
  - Skin conditions (for EDA)
  - Medications affecting autonomic function
  - Arrhythmias
  - Other relevant conditions
- Recruitment strategy
- Compensation

### 3. Psychophysiological Measures

#### 3.1 Electrocardiography (ECG) / Heart Rate (HR) / Heart Rate Variability (HRV)

**Acquisition**
- ECG system and manufacturer
- Lead configuration (e.g., Lead II, 3-lead, 12-lead)
- Electrode type and placement
- Sampling rate (minimum 250 Hz recommended for HRV)
- Online filters
- Impedance checking

**Processing**
- R-peak detection algorithm
- Manual inspection/correction of R-peaks
- Artifact detection and correction
- Ectopic beat handling
- Interpolation method for missing beats

**HRV Analysis**
- Time domain measures:
  - SDNN (standard deviation of NN intervals)
  - RMSSD (root mean square of successive differences)
  - pNN50 (percentage of successive NN intervals > 50ms)
  - Other measures
- Frequency domain measures:
  - LF (low frequency) power and band (typically 0.04-0.15 Hz)
  - HF (high frequency) power and band (typically 0.15-0.4 Hz)
  - LF/HF ratio
  - Total power
  - FFT vs. autoregressive method
- Nonlinear measures (if applicable):
  - Poincaré plot indices (SD1, SD2)
  - Sample entropy
  - Detrended fluctuation analysis
- Analysis window length
- Stationarity requirements

#### 3.2 Electrodermal Activity (EDA) / Skin Conductance

**Acquisition**
- EDA system and manufacturer
- Electrode placement (e.g., palmar, plantar, medial phalanges)
- Electrode type (Ag/AgCl recommended)
- Gel type (isotonic recommended)
- Sampling rate (minimum 10 Hz recommended)
- Measurement mode (DC for tonic, AC for phasic, or both)

**Processing**
- Artifact detection and removal
- Decomposition method (if separating tonic and phasic):
  - High-pass filtering
  - Continuous decomposition analysis (CDA)
  - Other method
- Baseline correction

**EDA Analysis**
- Tonic measures:
  - Skin Conductance Level (SCL)
  - Baseline period definition
  - Averaging method
- Phasic measures:
  - Skin Conductance Response (SCR)
  - SCR detection criteria:
    - Minimum amplitude threshold (e.g., 0.01-0.05 μS)
    - Latency window (typically 1-4 seconds post-stimulus)
    - Rise time criteria
    - Recovery criteria
  - Specific SCR (SSCR) vs. Non-specific SCR (NSSCR)
  - SCR amplitude, latency, rise time, recovery time
  - Frequency of SCRs
- Analysis software and version

#### 3.3 Electromyography (EMG)

**Acquisition**
- EMG system and manufacturer
- Muscle(s) recorded (e.g., corrugator supercilii, zygomaticus major, masseter)
- Electrode type and placement
- Inter-electrode distance
- Sampling rate (minimum 1000 Hz recommended)
- Online filters

**Processing**
- Artifact detection and removal
- Rectification (full-wave)
- Smoothing/integration method
- Baseline correction

**EMG Analysis**
- Baseline period definition
- Response window
- Peak amplitude vs. integrated EMG
- Latency measures
- Startle response analysis (if applicable)

#### 3.4 Respiration

**Acquisition**
- Respiration measurement method:
  - Respiratory belt/strain gauge
  - Nasal thermistor
  - Capnography
  - Other
- Sampling rate
- Calibration procedure

**Processing**
- Breath detection algorithm
- Artifact detection and removal

**Respiration Analysis**
- Respiratory rate
- Tidal volume (if calibrated)
- Respiratory sinus arrhythmia (RSA)
- Breath-by-breath analysis vs. averaged

#### 3.5 Pupillometry / Eye Tracking

**Acquisition**
- Eye tracker manufacturer and model
- Sampling rate
- Monocular vs. binocular recording
- Calibration procedure
- Lighting conditions

**Processing**
- Blink detection and interpolation
- Artifact removal
- Baseline correction

**Pupillometry Analysis**
- Baseline pupil diameter
- Task-evoked pupillary response (TEPR)
- Peak dilation
- Latency to peak
- Sustained dilation

### 4. Experimental Paradigm

#### 4.1 Task Description
- Detailed description of experimental task
- Conditions and contrasts
- Trial structure and timing
- Stimulus presentation
- Number of trials per condition
- Breaks and session duration

#### 4.2 Baseline Recording
- Baseline duration
- Baseline instructions (e.g., eyes open/closed, resting)
- Baseline timing (before task, between blocks, etc.)

#### 4.3 Environmental Control
- Room temperature
- Lighting
- Noise level
- Time of day restrictions
- Participant preparation:
  - Caffeine restrictions
  - Alcohol restrictions
  - Exercise restrictions
  - Medication restrictions
  - Sleep requirements

### 5. Data Quality Control

#### 5.1 Signal Quality Criteria
- Minimum signal-to-noise ratio
- Maximum artifact percentage
- Visual inspection procedures
- Automated quality checks

#### 5.2 Exclusion Criteria
- Participant-level exclusions:
  - Poor signal quality
  - Excessive artifacts
  - Equipment malfunction
  - Non-compliance with restrictions
- Trial-level exclusions:
  - Artifact contamination
  - Movement artifacts
  - Missing data
- Minimum data requirements per participant

### 6. Statistical Analysis

#### 6.1 Dependent Variables
- Primary physiological outcome measures
- Secondary outcome measures
- Derived indices

#### 6.2 Independent Variables
- Experimental manipulations
- Between-subject factors
- Within-subject factors

#### 6.3 Covariates
- Age
- Sex/gender
- BMI (for some measures)
- Baseline physiological state
- Other relevant covariates

#### 6.4 Statistical Tests
- Planned statistical tests for each hypothesis
- Assumptions to be tested
- Corrections for multiple comparisons
- Alpha level
- Effect size measures

#### 6.5 Handling of Confounds
- Respiration effects on HRV
- Movement artifacts
- Circadian rhythms
- Habituation effects
- Order effects

### 7. Multimodal Integration (if applicable)

- Synchronization method across modalities
- Time-locking procedures
- Integration analysis approach

### 8. Software and Tools

- Acquisition software and version
- Analysis software and version (e.g., Kubios, Ledalab, AcqKnowledge, MATLAB toolboxes)
- Custom scripts (will they be shared?)
- Statistical software and version

### 9. Data Sharing

- Will data be shared? (Yes/No)
- Repository (e.g., OSF, PhysioNet)
- Level of sharing (raw, preprocessed, summary statistics)
- Data format (e.g., BIDS-compatible)

### 10. Deviations

- How deviations from this preregistration will be documented
- Distinction between confirmatory and exploratory analyses

## Special Considerations for Remote/Wearable Psychophysiology

### Device Specifications
- Wearable device manufacturer and model
- Sensor specifications
- Validation studies for the device
- Firmware version

### Participant Setup
- Self-application instructions
- Video tutorials or written guides
- Verification of correct placement
- Troubleshooting procedures

### Data Quality in Naturalistic Settings
- Expected noise levels
- Movement artifact handling
- Environmental variability
- Compliance monitoring

### Signal Quality Thresholds
- Minimum wear time
- Maximum gap duration
- Signal quality indicators
- Re-recording procedures

## References

This template draws from:
- Society for Psychophysiological Research (SPR) guidelines
- Handbook of Psychophysiology (Cacioppo, Tassinary, & Berntson)
- Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology (1996). Heart rate variability: Standards of measurement, physiological interpretation, and clinical use.
- Boucsein et al. (2012). Publication recommendations for electrodermal measurements. Psychophysiology, 49(8), 1017-1034.
- Fridlund & Cacioppo (1986). Guidelines for human electromyographic research. Psychophysiology, 23(5), 567-589.

## Additional Resources

- PhysioNet for physiological signal databases
- BIOPAC application notes and guides
- Kubios HRV software documentation
- Ledalab for EDA analysis
- SPR (Society for Psychophysiological Research) resources

## Notes

- Specify all parameters and thresholds before data collection
- Document any deviations from standard procedures
- Consider physiological confounds specific to your measures
- Pilot test your paradigm to ensure adequate signal quality
- Consult published guidelines for your specific measures
- For clinical populations, consult with medical professionals about safety and contraindications
