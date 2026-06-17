# Preregistration: Acute Stress-Induced Changes in Heart Rate Variability and Autonomic Function

**Study ID**: PSY-2026-001-StressHRV
**Registration Date**: 2026-06-17
**OSF Registration**: [To be completed upon submission]
**AsPredicted Link**: [To be completed upon submission]

---

## 1. Study Information

### 1.1 Title
Acute Stress-Induced Changes in Heart Rate Variability, Cardiovascular Reactivity, and Parasympathetic Withdrawal: A Pre-Registered Psychophysiological Study

### 1.2 Authors and Affiliations
- **Principal Investigator**: Dr. Sarah Chen, PhD
  - Department of Biopsychology, Institute for Neuroscience and Human Health
  - Email: s.chen@institution.edu
  
- **Co-Investigators**:
  - Dr. James Murphy, PhD (Statistics)
  - Dr. Elena Rossi, PhD (Physiology)

### 1.3 Research Questions
1. How does acute psychological stress (Trier Social Stress Test) alter resting heart rate variability (HRV) parameters in young adults?
2. What is the magnitude of parasympathetic withdrawal (decreased high-frequency HRV) during stress recovery?
3. Do baseline HRV characteristics (trait-level) predict individual differences in stress-induced cardiovascular reactivity?
4. Does regular physical activity moderate the relationship between stress and HRV recovery?

### 1.4 Hypotheses

**Primary Hypothesis (H1)**: 
Acute psychological stress will induce significant parasympathetic withdrawal, manifested as:
- Decreased high-frequency HRV (HF-HRV; 0.15–0.4 Hz band) during stress vs. baseline (expected 30-50% reduction)
- Increased low-frequency to high-frequency ratio (LF/HF) during stress vs. baseline (expected 2-3 fold increase)
- Increased heart rate (HR) during stress vs. baseline (expected 15-20 bpm elevation)

**Secondary Hypothesis (H2)**:
Recovery of HRV after stress removal will show gradual restoration over a 10-minute recovery period, with HF-HRV returning to within 80% of baseline by the end of recovery.

**Exploratory Hypothesis (H3)**:
Baseline SDNN (standard deviation of normal-to-normal intervals; trait-level cardiac variability) will correlate negatively with stress-induced HR elevation (more variable baseline = less stress reactivity).

---

## 2. Participants

### 2.1 Sample Size and Justification
- **Target N**: 85 participants (accounting for 10% attrition: 75 analyzable)
- **Power Analysis**:
  - Effect size: Cohen's d = 0.70 (medium-to-large; based on prior meta-analyses of stress-induced HRV changes)
  - Alpha: 0.05 (two-tailed)
  - Power: 0.85
  - Test: Paired t-test (within-subject stress effect) via G*Power 3.1.9.7

### 2.2 Inclusion Criteria
- Age: 18–35 years
- Fluent in English
- No current psychiatric diagnosis (screened via PHQ-9 < 10, GAD-7 < 10)
- No recent cardiovascular, respiratory, or neurological medication changes (in past 4 weeks)
- No current pregnancy or lactation
- No pacemaker or other cardiac implants

### 2.3 Exclusion Criteria
- History of major cardiac arrhythmias (beyond occasional premature contractions)
- Uncontrolled hypertension (systolic BP ≥ 160 mmHg or diastolic ≥ 100 mmHg at screening)
- Current use of beta-blockers, antiarrhythmic drugs, or other medications directly affecting HR/HRV
- Caffeine consumption > 400 mg on study day (verified by self-report at arrival)
- Alcohol or recreational drug use in 24 hours prior to testing
- Extreme anxiety or claustrophobia (unable to complete Trier Social Stress Test)
- Skin conditions precluding ECG electrode placement on chest

### 2.4 Recruitment
- Method: University student body, online advertisements (Craigslist, institutional bulletin boards), community flyers
- Compensation: $30 USD gift card + optional course credit (if applicable)
- Recruitment period: 6 months (June–December 2026)

### 2.5 Stopping Rule
Stop enrollment when target N = 85 is reached, or at end of recruitment period (December 31, 2026), whichever comes first.

---

## 3. Study Design

### 3.1 Overview
Within-subject, repeated-measures design with three conditions:
1. **Baseline** (5 min rest, eyes open, seated)
2. **Stress** (Trier Social Stress Test; ~10 min task + speech delivery)
3. **Recovery** (10 min rest, post-stress)

### 3.2 Randomization
N/A (within-subject design; conditions presented in fixed order: Baseline → Stress → Recovery)

### 3.3 Blinding
Participants will be naive to specific HRV hypotheses. Researchers conducting HRV analysis will be blinded to condition during initial processing (condition labels removed until final step).

---

## 4. Psychophysiological Measurements

### 4.1 Electrocardiography (ECG) / Heart Rate and Heart Rate Variability

**Acquisition Parameters**:
- **System**: Biopac MP160 system with ECG100C module
- **Electrode Configuration**: Lead II (standard limb lead)
  - Positive electrode: Left mid-axillary line, level of 5th intercostal space
  - Negative electrode: Right shoulder
  - Ground electrode: Left shoulder
- **Electrode Type**: Ag/AgCl disposable ECG electrodes (3M Red Dot)
- **Sampling Rate**: 1000 Hz
- **Analog Filter**: 1–100 Hz hardware bandpass filter
- **Impedance Check**: < 5 kΩ per electrode

**Data Recording Software**: AcqKnowledge 5.0 (Biopac)

**Processing Parameters**:
- R-peak detection: Automated algorithm (AcqKnowledge R-wave detection) with manual verification of ≥ 100% of beats
- Artifact criteria and correction:
  - Ectopic beats: Identified as inter-beat intervals (IBIs) deviating > 2 standard deviations from local mean; corrected via cubic spline interpolation
  - Noise-induced false peaks: Manually removed if visual inspection reveals non-physiological spikes
  - Maximum artifact correction: ≤ 5% of total IBIs per condition (exclusion criterion if exceeded)

**HRV Analysis Parameters**:

*Time-Domain Measures*:
- SDNN: Standard deviation of all NN intervals (measure of overall variability)
- RMSSD: Root mean square of successive differences (measure of parasympathetic activity)
- pNN50: Percentage of successive NN intervals differing > 50 ms

*Frequency-Domain Measures* (via Fast Fourier Transform; FFT):
- Segment length: 300 s per condition (baseline, stress, recovery)
- FFT order: 2^12 points
- Window: Hann window
- LF power (0.04–0.15 Hz): Low-frequency power
- HF power (0.15–0.4 Hz): High-frequency power (parasympathetic correlate)
- Total power: Sum of LF + HF
- LF/HF ratio: Normalized ratio (proposed sympathetic-parasympathetic balance)

*Nonlinear Measures*:
- Approximate entropy (ApEn): Regularity of heart rate fluctuations (exploratory; if data quality permits)

**Quality Control**:
- Minimum valid RR-interval count per condition: ≥ 200 intervals (required for frequency-domain analysis)
- Stationarity check: Visual inspection of IBI time series (if apparent drift, note in report)

### 4.2 Heart Rate (HR)
- Calculated as mean beats per minute (bpm) from ECG
- Reported separately for baseline, stress, recovery

---

## 5. Experimental Paradigm

### 5.1 Trier Social Stress Test (TSST)
The TSST is a standardized, socially evaluative stressor with proven cardiovascular reactivity:

**Task Structure** (~10 min total):
1. **Preparation Phase** (3 min): Participant told they will give a 5-minute speech on job qualifications to a panel. Instructed to "be as convincing as possible."
2. **Speech Phase** (5 min): Participant delivers speech to 3-person panel (instructed to be neutral/slightly negative in expression). Recorded for "evaluation."
3. **Mental Arithmetic Phase** (2 min): Participant performs serial subtraction (start at 2,043, subtract 17 repeatedly) aloud. Errors are corrected by panel member.

**Panel Composition**: 3 research staff (trained to maintain neutral expression; at least one PhD-level researcher).

**Instructions**: "Your role as panelists is to evaluate the participant's speech quality and stress response. Show minimal emotional expression. Give corrective feedback during math task (e.g., 'Try again')."

### 5.2 Baseline Period
- Duration: 5 minutes
- Posture: Seated in comfortable chair, feet flat on floor
- Lighting: Dim, neutral (500 lux)
- Temperature: 21–23°C
- Instructions: "Sit quietly, relax, and do not move. Breathe naturally. You will see a fixation cross on the monitor."
- Visual task: Fixation cross (on screen), no overt task (allows resting-state data)

### 5.3 Recovery Period
- Duration: 10 minutes
- Conditions: Same as baseline
- Instructions: Same as baseline ("Rest and relax; the stressful task is complete")

---

## 6. Environmental and Procedural Control

### 6.1 Participant Preparation
- **Caffeine Restriction**: Participants instructed to avoid caffeine ≥ 2 hours before session (confirmed at arrival)
- **Food**: Light meal ≥ 1 hour before session (no heavy food 3 hours prior)
- **Exercise**: No strenuous exercise ≥ 2 hours before session
- **Sleep**: ≥ 6 hours sleep night before (self-reported)
- **Menstrual Cycle**: Women will note current cycle phase (exploratory variable; no exclusion based on phase)

### 6.2 Session Timeline
- **Arrival**: 5 min (check-in, consent review)
- **Preparation**: 10 min (ECG setup, electrode placement, impedance check, sensor comfort verification)
- **Baseline Acclimation**: 5 min (participant sits quietly; ECG recording stabilizes)
- **Recording Baseline**: 5 min (ECG recorded; fixation task on screen)
- **TSST Instructions + Preparation**: 3 min (explain task, allow 3 min preparation time in separate room)
- **TSST Stress Phase**: 10 min (speech 5 min + math 2 min, with 3 min preparation included)
- **Recovery Recording**: 10 min (ECG recorded; fixation task)
- **Post-Hoc Questionnaires**: 5 min (Perceived Stress Scale, STAI, subjective HR/stress rating)
- **Debrief**: 5 min (explain study purpose, ask for written feedback)
- **Total Duration**: ~60 minutes

### 6.3 Environmental Standards
- **Room**: Temperature maintained 21–23°C; humidity 40–50%
- **Lighting**: Dim, constant (no windows; LED panel set to 500 lux)
- **Noise**: Sound-dampened room; no external noise > 50 dB
- **Time of Day**: All sessions conducted 1–5 PM to minimize circadian variation

---

## 7. Data Quality Control and Exclusion Criteria

### 7.1 Participant-Level Exclusion
Exclude participant data if:
- ECG signal quality poor (≥ 10% artifacts or missing data in > 1 condition)
- > 5% ectopic beats or arrhythmias in any condition
- Participant did not complete TSST or recovery (withdrew early)
- Reported medication change or health event between screening and session
- Resting HR at baseline ≥ 110 bpm or ≤ 40 bpm (indicating acute illness or medication effect)

### 7.2 Condition-Level Exclusion
Exclude condition (not participant) if:
- < 200 valid RR intervals in that condition
- Visual inspection reveals > 10 consecutive artifact-contaminated beats
- Participant noncompliance (e.g., excessive movement during baseline/recovery, refusing TSST)

### 7.3 Technical Quality Checks
- Impedance: Re-check after 10 min of recording; if exceeds 5 kΩ, adjust electrodes
- R-wave detection: 100% manual verification on random subset (n = 10% of final sample) to validate automated detection
- Metadata: Log session date, time, ambient temperature, experimenter ID, equipment firmware version

---

## 8. Statistical Analysis Plan

### 8.1 Primary Analysis: Stress Effect on HRV

**Research Question**: Does acute stress significantly reduce HF-HRV and increase LF/HF ratio?

**Analysis**:
- **Design**: Within-subject repeated-measures ANOVA (or paired t-tests for non-normal data)
- **Dependent Variables**: 
  - HF-HRV (primary outcome)
  - LF/HRV ratio (secondary outcome)
  - Mean HR (exploratory)
  - SDNN (exploratory)
  
- **Independent Variable**: Condition (Baseline vs. Stress vs. Recovery)

- **Statistical Test**: 
  - If HRV data normal (Shapiro-Wilk p > 0.05): Repeated-measures ANOVA with Greenhouse-Geisser correction
  - If non-normal: Friedmans ANOVA (non-parametric equivalent)
  - Pairwise comparisons: Paired t-tests with Bonferroni correction (α = 0.05/3 = 0.017 per contrast)

- **Expected Results**: 
  - HF-HRV (Baseline > Stress; Recovery intermediate)
  - LF/HF (Baseline < Stress; Recovery intermediate)
  - Main effect of Condition: p < 0.05 (90% power to detect d = 0.70)

### 8.2 Secondary Analysis: Recovery Trajectory

**Research Question**: Does HRV return toward baseline during recovery?

**Analysis**:
- Compare Stress vs. Recovery HF-HRV (paired t-test)
- Expected: HF-HRV (Recovery) > HF-HRV (Stress), p < 0.05
- Effect size: Cohens d (medium to large expected)

### 8.3 Exploratory Analysis: Trait-Level Predictors

**Research Question**: Do baseline HRV traits predict stress reactivity?

**Analysis**:
- Pearson correlation: Baseline SDNN vs. (Stress HR - Baseline HR)
- Regression: Baseline SDNN, age, sex, physical activity → Stress-induced HR change
- Note: Exploratory; not pre-committed to significance threshold
- Will report point estimates and 95% CIs

### 8.4 Covariates and Sensitivity Analyses

**Potential Covariates**:
- Age, biological sex, BMI
- Self-reported physical activity (IPAQ)
- Trait anxiety (STAI-Trait)
- Baseline systolic BP (to control for general cardiovascular reactivity)

**Sensitivity Analyses** (if primary result p < 0.10):
- Repeat analyses excluding participants with > 3% ectopic beats
- Repeat analyses using log-transformed HRV values (if heteroscedasticity present)
- Repeat analyses restricted to female only / male only (explore sex differences)

### 8.5 Handling of Missing Data
- Participant excluded if > 5% of condition-level data missing
- If < 5% missing in a single condition, use last-observation-carried-forward (LOCF) for that condition
- Rationale: ECG typically continuous; unlikely to have internal gaps unless technical failure

### 8.6 Multiple Comparisons Correction
- Primary tests (Condition effect on HF-HRV, LF/HF): Bonferroni-corrected α = 0.05
- Secondary tests: α = 0.05 (exploratory, reported separately)
- Report both raw and FDR-adjusted p-values

### 8.7 Transparency and Reproducibility
- Analysis scripts: R (tidyverse, lme4 for mixed models if applicable) or Python (scipy, statsmodels)
- Software versions: Specify R/Python version, package versions in supplementary materials
- Data and code: Will be made available on OSF (anonymized data) and GitHub (analysis code) at publication

---

## 9. Physiological Confounds and Control

### 9.1 Respiration Effects
- **Rationale**: Respiration affects HRV (respiratory sinus arrhythmia; RSA)
- **Control**: Instruct all participants to breathe normally (no paced breathing)
- **Measurement**: Optional respiratory belt recording (if equipment available); if recorded, will document mean respiratory rate per condition in supplementary materials

### 9.2 Postural Effects
- **Control**: All participants seated in same chair, feet flat on floor (fixed posture)
- **Rationale**: Lying vs. sitting affects HRV; standardization reduces variability

### 9.3 Circadian Rhythm
- **Control**: All sessions 1–5 PM (narrow time window)
- **Rationale**: HRV exhibits circadian rhythm; afternoon sessions minimize variation

### 9.4 Medication and Substance Effects
- **Caffeine**: None ≥ 2 hours before session
- **Nicotine**: No smoking ≥ 1 hour before session
- **Alcohol**: None within 24 hours
- **Beta-blockers/antiarrhythmics**: Exclusion criterion

---

## 10. Deviations and Exploratory Analyses

### 10.1 Expected Deviations
If TSST does not induce expected physiological stress (HR elevation < 5 bpm, subjective stress < 3/10), will:
- Document in results as "low-stress condition"
- Report effect sizes regardless (may be small)
- Examine compliance (did participant engage with task?)

### 10.2 Unplanned Exploratory Analyses
All exploratory analyses (not pre-registered above) will be:
- Clearly labeled as "Exploratory" in results
- Reported with point estimates and 95% CIs (not p-values alone)
- Not used to support primary conclusions

### 10.3 Deviations from Protocol
Any deviations from this preregistration (equipment failure, participant dropout, etc.) will be:
- Documented in detail in methods
- Impact assessed via sensitivity analyses if substantive
- Reported transparently in final manuscript

---

## 11. Ethics and Data Management

### 11.1 Ethical Approval
- **Status**: IRB approval obtained from [Institution] (Protocol #: PENDING)
- **Informed Consent**: Written consent obtained from all participants; copy provided to participant
- **Right to Withdraw**: Participants may withdraw at any time without penalty
- **Distress**: If participant becomes distressed during TSST, can discontinue task; provided with mental health resources

### 11.2 Data Privacy and GDPR Compliance
- **Participant Identifiers**: Coded with alphanumeric ID (e.g., PSYCHO-001); link to names stored in encrypted file, separate from data
- **Data Storage**: Encrypted hard drive, password-protected, locked in filing cabinet
- **Data Access**: Only PI and trained research staff with signed data use agreements
- **Data Retention**: Raw ECG data retained 7 years post-study completion (per NIH guidelines); then securely destroyed
- **Data Sharing**: De-identified data (all identifiers removed) will be shared via OSF upon publication

### 11.3 Conflict of Interest
- **Funding**: Study funded by [Institution Internal Grant / NSF Grant #XXXXX]
- **Disclosure**: No financial conflicts of interest declared
- **Equipment**: Biopac systems no affiliation with authors

---

## 12. References

### Key References for Psychophysiology Preregistration

1. Boucsein, W., Fowles, D. C., Grimnes, S., Ben-Shakhar, G., Roth, W. T., Dawson, M. E., & Filion, D. L. (2012). Publication recommendations for electrodermal measurements. *Psychophysiology*, 49(8), 1017–1034. https://doi.org/10.1111/j.1469-8986.2012.01384.x

2. Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology. (1996). Heart rate variability: Standards of measurement, physiological interpretation, and clinical use. *European Heart Journal*, 17(3), 354–381. https://doi.org/10.1093/oxfordjournals.eurheartj.a014868

3. Cacioppo, J. T., Tassinary, L. G., & Berntson, G. G. (Eds.). (2007). *Handbook of Psychophysiology* (3rd ed.). Cambridge University Press.

4. Kirschbaum, C., Pirke, K. M., & Hellhammer, D. H. (1993). The 'Trier Social Stress Test'—A tool for investigating psychobiological stress responses in a laboratory setting. *Neuropsychobiology*, 28(1–2), 76–81. https://doi.org/10.1159/000119004

5. Clayson, P. E., Carbine, K. A., & Larson, M. J. (2021). Making ERP research more transparent: Guidelines for preregistration before data collection and analysis plans before data access. *International Journal of Psychophysiology*, 161, 55–67. https://doi.org/10.1016/j.ijpsycho.2021.02.016

---

## 13. Appendices

### Appendix A: Screening Questionnaire
- PHQ-9 (Patient Health Questionnaire-9) — Depression screening
- GAD-7 (Generalized Anxiety Disorder-7) — Anxiety screening
- Cardiovascular history checklist
- Medication inventory

### Appendix B: Post-Study Questionnaires
- Perceived Stress Scale (PSS-10)
- State-Trait Anxiety Inventory (STAI) — State subscale
- Subjective stress rating (0–10 Likert scale)
- Subjective HR perception ("How fast was your heart beating?" rated 0–10)
- TSST task difficulty and engagement (Likert scales)

### Appendix C: TSST Speech Topic
- "Imagine you are applying for your ideal job. You have 5 minutes to convince the panel that you are the best candidate. Include your qualifications, strengths, and why you are perfect for the role."

### Appendix D: ECG Quality Report Template
- Electrode impedance (Ω) per lead
- Sampling rate (Hz) and duration per condition
- Number of detected R-waves per condition
- Number of artifacts detected and corrected
- Percentage of data retained after cleaning
- Visual QC notes (equipment issues, participant movement, etc.)

---

**Preregistration Status**: ✅ Complete
**Submission Target**: OSF Registries or AsPredicted.org (prior to data collection)
**Estimated Study Timeline**: June 2026 – March 2027 (recruitment, data collection, analysis)

