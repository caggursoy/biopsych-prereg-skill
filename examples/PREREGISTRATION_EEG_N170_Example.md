# Preregistration: N170 Face Processing in Developmental Dyslexia

## Metadata

### Study Identification
- **Title**: N170 Event-Related Potential Amplitude in Developmental Dyslexia: An EEG Study
- **Short Title**: N170 Dyslexia EEG Study
- **Study ID**: DDYS-ERP-2026-001
- **Registration Date**: 2026-06-17
- **Registration Platform**: OSF Registries
- **DOI/URL**: https://osf.io/[will-be-generated]

### Authors and Contributors
- **Principal Investigator(s)**: Dr. Sarah Johnson, Department of Psychology, University of Example
- **Co-Investigators**: Prof. Michael Chen, Dr. Emily Williams
- **Contributors**: Research assistants (3 RAs), graduate students (2)
- **Corresponding Author**: Dr. Sarah Johnson (sjohnson@example.edu)

### Institutional Information
- **Institution(s)**: University of Example
- **Department(s)**: Department of Psychology, Cognitive Neuroscience Lab
- **Funding Source(s)**: NIH Grant R01-MH123456
- **Conflicts of Interest**: None declared

### Study Classification
- **Study Type**: Experimental (between-subjects)
- **Research Domain**: Developmental neuroscience + Cognitive neuroscience
- **Modality/Modalities**: EEG/ERP

### Temporal Information
- **Preregistration Type**: Before data collection
- **Expected Start Date**: 2026-07-01
- **Expected Completion Date**: 2027-06-30
- **Analysis Start Date**: 2027-07-01

### Version Control
- **Version Number**: 1.0
- **Last Updated**: 2026-06-17
- **Change Log**: Initial preregistration submission

---

## Study Information

### Research Question
Does the N170 event-related potential (ERP) component, a hallmark of face processing, show reduced amplitude in children with developmental dyslexia compared to typically developing peers?

### Hypotheses

**Primary Hypothesis (Directional):**
H1: Children with dyslexia will show significantly reduced N170 amplitude (lower negativity) to face stimuli compared to typically developing controls, reflecting atypical neural face processing mechanisms.

**Secondary Hypotheses:**
H2: N170 latency will be delayed in dyslexic children (later peak latency) compared to controls.
H3: The dyslexia-related N170 reduction will be lateralized to the right hemisphere (typical for face processing).

---

## Participants

### Sample Characteristics
- **Planned N**: 60 (30 dyslexic, 30 controls)
- **Age**: 8-12 years old
- **Gender**: Balanced across groups (target 50% female)

### Inclusion Criteria (Dyslexic group)
- Formal diagnosis of developmental dyslexia within past 2 years
- Average or above-average nonverbal intelligence (IQ ≥ 85)
- Normal or corrected-to-normal vision and hearing
- English as primary language

### Inclusion Criteria (Control group)
- No history of reading difficulties or dyslexia diagnosis
- Average or above-average nonverbal intelligence (IQ ≥ 85)
- Normal or corrected-to-normal vision and hearing
- English as primary language
- Matched age and gender to dyslexic participants

### Exclusion Criteria (Both groups)
- History of neurological disorder (seizures, brain injury, etc.)
- Use of psychoactive medications affecting neural activity
- Metal implants incompatible with EEG recording
- Diagnosis of ADHD or other developmental disorders (controlled separately)

### Recruitment
- Recruitment through local school district, parent organizations
- Compensation: $30 gift card per participant

### Stopping Rule
- Continue recruitment until N=60 achieved (or until 2027-06-30)
- If dropout rate exceeds 20%, continue recruiting to N=75

---

## EEG Data Acquisition

### System and Equipment
- **EEG System**: BioSemi ActiveTwo
- **Number of Electrodes**: 64 channels
- **Montage**: 10-20 system (standard 64-electrode layout)
- **Reference Electrode**: Average reference (computed offline)
- **Ground Electrode**: CMS-DRL (common mode sense / driven right leg)
- **Sampling Rate**: 500 Hz
- **Online Filters**: High-pass 0.1 Hz (hardware), Low-pass 100 Hz (hardware); Notch filter 60 Hz

### Impedance Management
- **Target Impedance**: <20 kΩ (BioSemi standard)
- **Check Frequency**: Before each subject session
- **Impedance Recording**: Documented in lab notebook

### Data Acquisition
- **Recording Duration**: ~20 minutes per session
- **Continuous vs. Epoched**: Continuous recording during experimental block

---

## Experimental Paradigm

### Task Description
Passive viewing of face and non-face (house) stimuli in alternating blocks to isolate face-processing neural activity.

### Stimuli
- **Face Stimuli**: Grayscale photographs of neutral-expression faces (equal gender, varied ethnicity)
  - Source: [EXTRACTED: database/subfolder location]
  - Size: 300×400 pixels
  - Presentation duration: 500 ms
- **Control Stimuli**: Grayscale photographs of houses (varied architecture)
  - Size: 300×400 pixels
  - Presentation duration: 500 ms
- **Interstimulus Interval (ISI)**: 1000 ms (blank screen)

### Trial Structure
- **Block Design**: Alternating blocks (face, house, face, house)
- **Trials per Block**: 50 face images × 2 blocks + 50 house images × 2 blocks = 200 trials total
- **Block Duration**: ~2.5 minutes per block
- **Inter-block Break**: 1 minute (eyes open, no task)

### Number of Trials
- **Faces**: 100 trials (2 blocks × 50)
- **Houses**: 100 trials (2 blocks × 50)
- **Total**: 200 trials

### Session Duration
- Setup and impedance check: ~10 minutes
- Instructions and practice: ~2 minutes
- Experimental blocks: ~10 minutes
- Cleanup: ~3 minutes
- **Total**: ~25 minutes

### Instructions to Participants
"You will see images of faces and houses on the screen. Your job is simply to watch and look at each image. Just keep your eyes on the center of the screen. There is no right or wrong answers—we're just recording your brain activity. Try to minimize eye movements and blinks, but if you need to blink, go ahead."

---

## Preprocessing Plan

### Artifact Detection and Correction

**Blink Detection and Removal:**
- Method: Independent Component Analysis (ICA)
- Tool: EEGLAB (runica algorithm)
- Component Selection: [VERIFY: 2-3 blink components typically identified]
- Threshold: Components correlating >0.95 with EOG channel marked as blink-related

**Muscle Artifacts:**
- Detection: Threshold rejection on channels >100 μV
- Action: Excluded from analysis

**Movement Artifacts:**
- Detection: Threshold rejection on channels >150 μV
- Action: Entire trial excluded (conservative approach)

**Drift Correction:**
- Method: High-pass filter at 0.5 Hz (applied offline)
- Rationale: Removes slow drift in EEG signal

### ICA Setup
- **ICA Algorithm**: runica (infomax)
- **Number of Components**: 64 (all channels)
- **Convergence Criterion**: [VERIFY: default EEGLAB settings]
- **Component Exclusion**: Manual inspection + correlation with EOG

### Epoching
- **Epoch Duration**: -200 ms to +600 ms relative to stimulus onset
- **Baseline Correction**: Yes, using -200 to 0 ms pre-stimulus window
- **Baseline Method**: Mean subtraction

### Re-referencing
- **Reference Scheme**: Average reference (offline computation)
- **Channels Included**: All 64 scalp channels

### Filtering
- **High-pass Filter**: 0.5 Hz (Butterworth, 2nd order)
- **Low-pass Filter**: 40 Hz (Butterworth, 2nd order) [VERIFY: chosen for ERP analysis]
- **Notch Filter**: 60 Hz (powerline artifact)

### Downsampling
- **Original Sampling Rate**: 500 Hz
- **Target Sampling Rate**: 500 Hz (no downsampling)
- **Rationale**: 500 Hz adequate for face-processing ERP components

---

## Analysis Plan

### ERP Component of Interest
- **Component**: N170
- **Definition**: Negative-going deflection peaking ~170 ms post-stimulus
- **Typically Observed**: Right hemisphere > left hemisphere; maximal at lateral temporal sites

### Electrode Selection
- **Electrode Clusters**:
  - **Right hemisphere ROI**: PO8, PO10, O2, T6 (right temporal-occipital)
  - **Left hemisphere ROI**: PO7, PO9, O1, T5 (left temporal-occipital)
- **Justification**: Standard 10-20 locations for face-processing ERPs

### Time Windows
- **N170 Window**: 140-200 ms post-stimulus
- **Measurement**: Peak amplitude (most negative value) and latency (time of peak)

### Statistical Tests

**Primary Analysis:**
- **Test Type**: Mixed-effects ANOVA
- **Factors**:
  - Within: Hemisphere (left/right), Stimulus type (face/house)
  - Between: Group (dyslexia/control)
- **Dependent Variable**: N170 amplitude (μV)
- **Expected Effect**: Group × Stimulus Type interaction (reduced N170 in dyslexia for faces)

**Secondary Analysis:**
- **N170 Latency**: Same ANOVA structure with latency as DV

### Multiple Comparisons Correction
- **Method**: False Discovery Rate (FDR) correction
- **Alpha Level**: p < 0.05 (FDR-corrected)
- **Minimum cluster size**: Not applicable for peak amplitude measurement

### Effect Size Reporting
- **Metric**: Cohen's d for group differences, partial η² for ANOVA

### Handling Missing Data
- **Exclusion Criteria for Trials**: Trials with remaining artifacts after preprocessing (>10% per participant excluded)
- **Exclusion Criteria for Participants**: If >30% of trials excluded after preprocessing, participant removed from analysis
- **Handling**: Removed participants reported separately

### Data Visualization
- **Grand Average Waveforms**: Plotted by group and stimulus type
- **Topographic Maps**: Show voltage distribution at N170 peak latency

---

## Ethics & Data Management

### Informed Consent
- **Procedure**: Written informed consent from parents/guardians; child assent obtained
- **Language**: Age-appropriate (Flesch-Kincaid grade 4)
- **Right to Withdraw**: Clearly stated; participants may withdraw without penalty

### Ethics Approval
- **Status**: [TO BE COMPLETED - IRB approval obtained/pending]
- **IRB Number**: [extracted or TO BE COMPLETED]
- **Approval Date**: [TO BE COMPLETED]

### Data Privacy and Security
- **De-identification**: Participants assigned numeric ID (001-060)
- **Data Storage**: Encrypted external hard drive + secure server backup
- **Access**: Lab personnel only (3 authorized individuals)
- **Data Retention**: Raw EEG data retained 7 years post-publication (NIH requirement)
- **Secondary Use**: Raw EEG data may be shared with collaborators (with separate consent)

### Confidentiality
- **Recording**: No audio/video recorded; only EEG electrical signals
- **Data Sharing**: If shared, all identifying information removed

### Risk Mitigation
- **Minimal Risk Study**: Standard EEG recording with established safety profile
- **Exclusion Safeguards**: Children with seizure history excluded
- **Emergency Procedures**: [extracted from IRB protocol]

---

## Deviations from Preregistration

Any changes to this preregistration made during data collection will be documented and reported in the final manuscript. Deviations will include:
- Reason for deviation
- Date of modification
- Impact on planned analyses

---

## References

1. Govaart, G. H., et al. (2025). EEG ERP Preregistration Template. MetaArXiv. https://doi.org/10.31222/osf.io/4nvpt
2. Paul, E. M., et al. (2021). Making ERP Research More Transparent: Guidelines for Preregistration. International Journal of Psychophysiology, 167, 42-57.
3. Eimer, M. (2011). The Face‐Sensitivity of the N170 Component. Frontiers in Human Neuroscience, 5, 119.
4. Bentin, S., Allison, T., Puce, A., Perez, E., & McCarthy, G. (1996). Electrophysiological Studies of Face Perception in Humans. Journal of Cognitive Neuroscience, 8(6), 551-565.

---

**Preregistration Status**: ✅ SUBMITTED  
**Generated by**: Biopsychology Preregistration Skill - EEG Module  
**Generation Date**: 2026-06-17
