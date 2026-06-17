# Preregistration: fMRI of Reward Processing in Social Decision-Making

## Metadata

### Study Identification
- **Title**: Neural Correlates of Fairness Preferences in Social Decision-Making: A 3T fMRI Study
- **Short Title**: Reward Processing in Fair/Unfair Offers
- **Study ID**: FAIR-fMRI-2026-001
- **Registration Date**: 2026-06-17
- **Registration Platform**: OSF Registries
- **DOI/URL**: https://osf.io/[will-be-generated]

### Authors and Contributors
- **Principal Investigator(s)**: Dr. James Martinez, Department of Neuroscience, Brain Institute
- **Co-Investigators**: Prof. Jessica Lee, Dr. David Park
- **Contributors**: Research technicians (2), graduate students (3)
- **Corresponding Author**: Dr. James Martinez (jmartinez@braininstit.edu)

### Institutional Information
- **Institution(s)**: Brain Institute, Medical University
- **Department(s)**: Department of Neuroscience
- **Funding Source(s)**: NSF Grant BCS-2024562
- **Conflicts of Interest**: None declared

### Study Classification
- **Study Type**: Experimental (within-subjects)
- **Research Domain**: Social neuroscience + Affective neuroscience
- **Modality/Modalities**: fMRI

### Temporal Information
- **Preregistration Type**: Before data collection
- **Expected Start Date**: 2026-07-15
- **Expected Completion Date**: 2027-08-30
- **Analysis Start Date**: 2027-09-01

### Version Control
- **Version Number**: 1.0
- **Last Updated**: 2026-06-17
- **Change Log**: Initial preregistration for peer review stage

---

## Study Information

### Research Question
How do reward-processing brain regions (ventral striatum, ventromedial prefrontal cortex) respond to fair vs. unfair monetary offers in a modified ultimatum game, and does this response correlate with individual differences in fairness preferences?

### Hypotheses

**Primary Hypothesis (Directional):**
H1: Fair offers will elicit greater BOLD signal in the ventral striatum (nucleus accumbens, putamen) compared to unfair offers, reflecting reward prediction for advantageous exchanges.

**Secondary Hypotheses:**
H2: Unfair offers will elicit greater BOLD signal in the insula and dorsolateral prefrontal cortex, reflecting conflict and regulatory processing.
H3: Individual differences in rejection of unfair offers will correlate with differential striatal activation to fair > unfair offers.

---

## Participants

### Sample Characteristics
- **Planned N**: 40 healthy adults
- **Age**: 18-35 years old
- **Gender**: Balanced (target 50% female)

### Inclusion Criteria
- Age 18-35 years
- Native English speaker
- Right-handed (Edinburgh Handedness Inventory >80)
- Normal or corrected-to-normal vision

### Exclusion Criteria
- History of neurological or psychiatric disorder
- Current psychoactive medication use
- Substance use disorder (meeting DSM-5 criteria)
- Pregnancy or breastfeeding
- Metallic implants (pacemaker, aneurysm clips, etc.)
- Claustrophobia or scanner anxiety
- Tattoos with metallic ink

### Recruitment
- University student participant pool
- Community advertisement (craigslist, flyers)
- Compensation: $50 study payment + potential bonus ($0-$25) from task earnings

### Stopping Rule
- Continue recruitment until N=40 achieved (or until 2027-08-30)
- If dropout/exclusion rate exceeds 25%, continue recruiting to N=50

---

## fMRI Acquisition Parameters

### Scanner Specifications
- **MRI Scanner**: Siemens Prisma 3.0T
- **Coil**: 20-channel head coil
- **Magnetic Field Strength**: 3.0 Tesla

### Functional Imaging Protocol
- **Sequence**: Multiband T2*-weighted echo-planar imaging (EPI)
- **Repetition Time (TR)**: 2.0 seconds
- **Echo Time (TE)**: 30 milliseconds
- **Flip Angle (FA)**: 90 degrees
- **Voxel Size**: 3 × 3 × 3 mm
- **Field of View (FOV)**: 192 × 192 mm
- **Matrix Size**: 64 × 64
- **Multiband Acceleration Factor**: 2 (to reduce acquisition time)
- **Number of Slices**: 40 (sequential order, anterior to posterior)
- **Slice Thickness**: 3 mm
- **Gap**: 0 mm
- **Total Volumes per Run**: 225 volumes (~7.5 minutes per run)
- **Number of Runs**: 2 runs (total ~15 minutes scanning time)

### Structural Imaging
- **T1-weighted Sequence**: MPRAGE
- **Voxel Size**: 1 × 1 × 1 mm
- **Total Acquisition Time**: ~5 minutes
- **Purpose**: Anatomical reference and lesion detection

### Acquisition Procedures
- **Practice Outside Scanner**: Participants practice task for 5-10 minutes (on computer) before scanning
- **In-Scanner Instructions**: Projected onto mirror in scanner; reviewed before data collection
- **Head Motion Monitoring**: Real-time (automated detection in scanner)
- **Discarded Volumes**: First 5 volumes of each run (magnetization stabilization)

---

## Task Design

### Ultimatum Game Paradigm

**Overview**: Modified ultimatum game where participant receives monetary offers from proposers and decides to accept/reject each offer.

**Offers:**
- **Fair Offers** (50-50 split): "You get $5, Proposer gets $5"
- **Unfair Offers** (20-80 split): "You get $2, Proposer gets $8"
- **Unfair Offers** (10-90 split): "You get $1, Proposer gets $9"

**Number of Trials:**
- Fair: 20 trials (20% of trials)
- Mildly unfair (20-80): 40 trials (40% of trials)
- Highly unfair (10-90): 40 trials (40% of trials)
- **Total**: 100 trials per run × 2 runs = 200 trials

**Trial Timing:**
- Offer presentation: 3 seconds (text on screen)
- Decision window: 3 seconds (participants respond with button press: Accept/Reject)
- Fixation cross: 1-3 seconds (random jitter)
- **Average trial duration**: 7-9 seconds

**Stimulus Presentation:**
- Offers presented in pseudo-random order (no more than 3 same-type consecutive trials)
- Screen background: Gray (RGB 128, 128, 128)
- Font: White, 24-point, centered

### Feedback (End of Run)
- Summary of earnings: "Total earned this run: $[amount]"
- Payment method: One of two runs randomly selected for actual payment

---

## fMRI Preprocessing Pipeline

### Software
- **Primary**: FSL (FMRIB Software Library, version 6.0.4)
- **Secondary**: SPM12 for manual inspection
- **QC**: MRIQC for quality assessment

### Steps

**1. Brain Extraction:**
- Tool: FSL `bet` (brain extraction tool)
- Parameters: Robust brain center estimation, default fractional intensity threshold

**2. Motion Correction:**
- Method: MCFLIRT (Motion Correction FMRIB's Linear Image Registration Tool)
- Reference: Middle volume of each run
- Output: Motion parameters saved (6 parameters: 3 translation, 3 rotation)
- Exclusion criterion: Any volume with >3mm framewise displacement excluded

**3. Slice-Timing Correction:**
- Reference slice: Middle slice (20th of 40)
- Method: FSL `slicetimer`

**4. Registration to Standard Space:**
- Template: MNI152 2mm brain (standard)
- Method: Linear (FLIRT) then non-linear (FNIRT)
- Interpolation: 12 degrees of freedom (affine)

**5. Smoothing:**
- Kernel: 6 mm FWHM (full-width half-maximum) Gaussian kernel
- Applied to: Preprocessed 4D data

**6. High-pass Temporal Filtering:**
- Cutoff frequency: 0.01 Hz (removes slow signal drift)
- Method: FSL design matrix filtering

### Quality Control
- **Motion Assessment**: Framewise displacement (FD) calculated; runs with mean FD >0.5 flagged for review
- **BOLD Signal**: Time series inspected for signal dropout, spikes
- **Registration**: Visual inspection of normalized images

---

## Statistical Analysis Plan

### GLM Design

**General Linear Model:**
- Design matrix includes:
  - **Main Regressors** (convolved with canonical HRF):
    1. Fair offers (Accept trials)
    2. Fair offers (Reject trials)
    3. Mildly unfair offers (Accept)
    4. Mildly unfair offers (Reject)
    5. Highly unfair offers (Accept)
    6. Highly unfair offers (Reject)
  
  - **Nuisance Regressors**:
    1. 6 motion parameters (translation × 3, rotation × 3)
    2. 6 motion parameter derivatives
    3. Spike regressors (timepoints with FD >1 mm)

**Hemodynamic Response Function (HRF):** Canonical HRF (SPM default)

**Temporal Derivatives:** [VERIFY: included or not included - TBD based on pilot]

### Contrasts of Interest

**Primary Contrasts:**
1. `Fair > Unfair` (both fair and unfair collapsed across accept/reject)
2. `Unfair > Fair`
3. `Fair > Baseline` (implicit baseline: fixation)
4. `Unfair > Baseline`

**Secondary Contrasts:**
5. `Mildly Unfair > Highly Unfair` (fairness gradient)
6. `Accept > Reject` (decision type effect)

### Statistical Thresholds
- **Voxel-level threshold**: p < 0.001 (uncorrected)
- **Cluster-level threshold**: p < 0.05 (FWE-corrected using cluster extent)
- **Minimum cluster size**: k ≥ 20 voxels (≥540 mm³)
- **Justification**: Standard thresholds for neuroimaging to balance sensitivity/specificity

### Regions of Interest (ROI) Analysis

**Pre-defined ROIs:**
1. **Ventral Striatum**: 10 mm sphere around MNI coordinates (±12, +10, -8) [nucleus accumbens]
2. **Ventromedial PFC**: 10 mm sphere around (+6, +50, -6)
3. **Right Anterior Insula**: 10 mm sphere around (+38, +24, +4)
4. **Right DLPFC**: 10 mm sphere around (+48, +30, +28)

**ROI Analysis:**
- Extract mean BOLD parameter estimates (beta values)
- Test contrasts using paired t-tests (within-subjects)
- Multiple comparisons correction: FDR-corrected across 4 ROIs (q < 0.05)

### Whole-Brain Analysis
- Report clusters passing cluster-level threshold
- Conjunctions: Report overlapping regions across contrasts
- Non-significant results: Report if hypothesized region shows p < 0.01 (uncorrected)

### Individual Differences Analysis
- **Predictor**: Rejection rate (% unfair offers rejected) from task behavior
- **Outcome**: Beta estimates from Fair > Unfair contrast in ventral striatum
- **Analysis**: Pearson correlation
- **Multiple comparisons**: Bonferroni correction across ROIs

### Handling Missing Data
- **Participant exclusion**: If motion (mean FD >0.5) or signal quality compromises data
- **Run exclusion**: If >20% volumes with motion artifact
- **Run replacement**: If <20% artifact, continue analysis with spike regressors

### Effect Size Reporting
- **Small volume correction**: Report effect sizes (Cohen's d) for ROI tests
- **Whole-brain**: Report cluster extent and t-values

---

## Ethics & Data Management

### Informed Consent
- **Procedure**: Written informed consent; safety screening questionnaire
- **Safety Screening**: Confirmed no contraindications for MRI
- **Right to Withdraw**: Stated; participants may withdraw without penalty

### Ethics Approval
- **Status**: [extracted or TO BE COMPLETED - IRB approval]
- **IRB Number**: [TO BE COMPLETED]
- **Approval Date**: [TO BE COMPLETED]

### Data Privacy and Security
- **De-identification**: Participants assigned numeric ID (001-040)
- **Anatomical Images**: Face-stripping applied to remove identifying features
- **Data Storage**: Encrypted server in secure lab; encrypted backup
- **Access**: [VERIFY: 3 lab personnel authorized]
- **Data Retention**: Raw data retained 5 years post-publication; shared data (de-identified) permanently
- **Secondary Use**: Data may be shared with collaborators for future research (with updated consent)

### Confidentiality
- **Recording**: Only BOLD signal recorded (no audio, face images de-identified)
- **Sharing**: All shared data is de-identified and HIPAA-compliant

### Risk Mitigation
- **Minimal Risk**: Standard fMRI with established safety profile
- **Exclusion Safeguards**: Contraindication screening, recent pregnancy/metal implants excluded
- **Discomfort Monitoring**: Emergency call button in scanner; panic protocol established

---

## Deviations from Preregistration

Any changes made during data collection will be reported:
- Documentation of deviation and reason
- Impact on analyses
- Data collection date of deviation

---

## References

1. Beyer, F., Flannery, J., Gau, R., et al. (2021). A fMRI pre-registration template. PsychArchives. https://doi.org/10.23668/PSYCHARCHIVES.5121
2. Sanfey, A. G., Rilling, J. K., Aronson, J. A., Nystrom, L. E., & Cohen, J. D. (2003). The Neural Basis of Economic Decision-Making in the Ultimatum Game. Science, 300(5626), 1755-1758.
3. Koenigs, M., & Tranel, D. (2007). Irrational economic decision-making after ventromedial prefrontal damage. Social Cognitive and Affective Neuroscience, 2(2), 84-92.
4. Poldrack, R. A., et al. (2017). Scanning the Horizons: Towards Transparent and Reproducible Neuroimaging Research. Nature Reviews Neuroscience, 18(2), 115-126.

---

**Preregistration Status**: ✅ SUBMITTED  
**Generated by**: Biopsychology Preregistration Skill - fMRI Module  
**Generation Date**: 2026-06-17
