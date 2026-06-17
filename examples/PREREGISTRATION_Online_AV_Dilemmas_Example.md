# Preregistration: Moral Judgment in Autonomous Vehicle Dilemmas

## Metadata

### Study Identification
- **Title**: Moral Preferences and Decision Confidence in Autonomous Vehicle Dilemma Scenarios: An Online Experiment
- **Short Title**: Moral Judgments in AV Trolley Problems
- **Study ID**: AV-MORAL-2026-001
- **Registration Date**: 2026-06-17
- **Registration Platform**: OSF Registries
- **DOI/URL**: https://osf.io/[will-be-generated]

### Authors and Contributors
- **Principal Investigator(s)**: Dr. Lisa Anderson, Department of Philosophy & Ethics, Tech University
- **Co-Investigators**: Prof. Robert Zhang (Computer Science), Dr. Amanda Khan (Psychology)
- **Contributors**: Undergraduate research assistants (4)
- **Corresponding Author**: Dr. Lisa Anderson (landerson@techuniv.edu)

### Institutional Information
- **Institution(s)**: Tech University
- **Department(s)**: Department of Philosophy & Ethics
- **Funding Source(s)**: University Research Grant URG-2025-1823
- **Conflicts of Interest**: None declared

### Study Classification
- **Study Type**: Experimental (between-subjects)
- **Research Domain**: Moral psychology + Decision-making
- **Modality/Modalities**: Behavioral (online)

### Temporal Information
- **Preregistration Type**: Before data collection
- **Expected Start Date**: 2026-07-01
- **Expected Completion Date**: 2026-10-31
- **Analysis Start Date**: 2026-11-01

### Version Control
- **Version Number**: 1.0
- **Last Updated**: 2026-06-17
- **Change Log**: Initial preregistration for Stage 1 submission

---

## Study Information

### Research Question
Do utilitarian moral judgments (maximize overall welfare) vs. deontological judgments (avoid direct harm) in autonomous vehicle dilemmas differ across framing conditions, and do these relate to decision confidence and policy preferences?

### Hypotheses

**Primary Hypothesis (Directional):**
H1: Participants in the "direct harm" framing condition will make more deontological choices (reject AV action that directly harms one person to save five) compared to the "statistical harm" condition, replicating the doctrine of double effect.

**Secondary Hypotheses:**
H2: Utilitarian choices will be faster (lower reaction time) and more confident than deontological choices.
H3: Participants who make utilitarian choices will favor stronger government regulation of autonomous vehicles (paradox of self-aware harm).

---

## Participants

### Sample Characteristics
- **Planned N**: 400 (100 per condition, 4 conditions)
- **Age**: 18+ years old
- **Location**: United States (Prolific platform)
- **Language**: English (primary language required)

### Inclusion Criteria
- Age 18+ years
- Located in United States
- English as primary/fluent language
- Prolific approval rate ≥95% (quality control)
- No prior participation in AV-MORAL studies

### Exclusion Criteria
- Age <18 years
- Non-US residence
- Non-English speaker
- Prolific approval rate <95%
- Failed attention check (see Data Quality section)
- Duplicate detection (same IP, device fingerprint)

### Recruitment
- Platform: Prolific Academic
- Link: [study link - generated at launch]
- Compensation: £0.75 base + variable bonus based on accuracy (£0.00-£0.25)
- Estimated Duration: 10-15 minutes

### Stopping Rule
- Continue recruitment until N=400 achieved OR until 2026-10-31
- If attrition rate >15%, continue recruiting to N=480
- Primary analysis proceeds with final N regardless (intent-to-treat)

---

## Experiment Design

### Platform & Framework
- **Platform**: Prolific Academic (recruitment)
- **Experiment Framework**: jsPsych 7.3 (browser-based)
- **Hosting**: Qualtrics (survey + jsPsych embed)
- **Duration**: ~12 minutes (target)

### Task Overview
Participants read 8 autonomous vehicle dilemma scenarios and make moral judgments (accept/reject AV action), rate confidence, and respond to policy questions.

### Experimental Conditions (Between-Subjects, 2×2)
- **Factor 1: Framing** (2 levels)
  - Level A: Direct harm framing ("The AV will directly hit one person to save five")
  - Level B: Statistical harm framing ("The AV's algorithm decision saves five but statistically harms one")

- **Factor 2: Consequence Valence** (2 levels)
  - Level 1: Loss framing ("Without action, five people die")
  - Level 2: Gain framing ("With action, five people are saved")

- **Resulting 4 Conditions**: 
  - Condition 1: Direct harm + Loss (N=100)
  - Condition 2: Direct harm + Gain (N=100)
  - Condition 3: Statistical harm + Loss (N=100)
  - Condition 4: Statistical harm + Gain (N=100)

### Stimuli & Design

**Scenario Example (Direct Harm + Loss):**
```
An autonomous vehicle (AV) is traveling on a highway with a family of 5 inside. 
Suddenly, a truck veers into the AV's lane. The AV's emergency systems detect that 
if it continues, it will collide with the truck, killing all 5 occupants.

However, there is one alternative: The AV can swerve hard to the right, hitting a 
single person walking on the shoulder (pedestrian), killing them instead. The pedestrian 
would have no chance to escape.

What should the AV do?
[Button: "Accept action (hit pedestrian)" | "Reject action (accept crash)"]
```

**Variations:** 8 scenarios total (4 base scenarios × 2 framing versions each)

### Trial Structure
1. **Scenario presentation**: Text displayed, read as needed
2. **Moral judgment**: "Should the AV take this action?" (binary response)
3. **Confidence rating**: "How confident in your decision?" (1-7 Likert scale)
4. **Reaction time**: Recorded automatically (from scenario onset to response)
5. **Timing per trial**: ~1-2 minutes (self-paced)

### Block Structure
- **Number of blocks**: 1 experimental block
- **Scenarios per block**: 8 (4 base, 2 framings each)
- **Order**: Randomized across participants
- **Practice**: 1 practice trial before experimental block (deontological choice scenario)

### Outcome Variables

**Primary:**
- Moral choice (binary: utilitarian/deontological)
- Choice proportion (% utilitarian choices)

**Secondary:**
- Reaction time (ms, from stimulus onset to response)
- Confidence rating (1-7 scale)

**Tertiary:**
- Policy preference: "Should government regulate autonomous vehicles?" (1-7 Likert)
- Demographic questions (age, gender, education, prior AV exposure)

---

## Data Quality Procedures

### Attention Checks
- **Attention Check 1** (during scenario block): "To ensure you're paying attention, please select 'somewhat confident' for this item." (embedded in confidence ratings) [Location: Trial 4]
- **Passing Criteria**: Correct response required; incorrect response flags participant for potential exclusion
- **Number of Checks**: 1 embedded check + 2 trap questions in policy section
- **Overall Rule**: ≥2/3 checks passed required; if failed, participant excluded

### Response Time Bounds
- **Minimum**: 500 ms per scenario (too fast indicates random clicking)
- **Maximum**: 300 seconds per scenario (too slow indicates disengagement)
- **Exclusion**: If >50% of trials fall outside bounds, participant excluded
- **Analysis**: Outlier RTs (>3 SD from group mean) analyzed separately

### Bot Detection
- **Check 1**: Duplicate IP detection (allowed: max 1 per IP if different device ID)
- **Check 2**: Geolocation consistency (Prolific provides; vs. declared location)
- **Check 3**: Device fingerprint matching (same device used for multiple accounts)
- **Action**: Flagged participants reviewed; clear duplicates excluded

### Incomplete Data
- **Completion Rule**: All 8 scenarios must be completed; if quit before completion, automatic exclusion
- **Browser Close**: Session timeout after 30 minutes inactivity; participant excluded
- **Data Retention**: Even if excluded, data retained for quality analysis

### Survey Validation
- **Speeding Check**: Entire survey <3 minutes → excluded (too fast)
- **Straight-lining Check**: Same response to 5+ consecutive varied-content items → review (possible auto-completion)

---

## Analysis Plan

### Data Cleaning

**Exclusion Pipeline:**
1. Failed attention checks → exclude
2. Response time violations (>50% outside bounds) → exclude
3. Duplicate/bot detection → exclude
4. Incomplete task → exclude
5. Straight-lining (>5 items identical) → exclude

**Missing Data Handling:**
- If 1-2 scenarios missing (but task otherwise complete), imputation via mode (most common choice for that condition)
- If >2 scenarios missing, participant excluded

### Primary Analysis

**Generalized Linear Mixed Model (GLMM):**
- **DV**: Moral choice (binary: utilitarian=1, deontological=0)
- **Fixed Effects**:
  - Framing (direct/statistical)
  - Consequence valence (loss/gain)
  - Framing × Valence interaction
- **Random Effects**: Random intercept by participant
- **Model**: Logistic regression
- **Inference**: Wald-type χ² tests
- **Effect size**: Odds ratios (OR) with 95% CI

**Hypothesis Test:**
- H1: Framing effect (direct > statistical utilitarian choices), p < .05

### Secondary Analyses

**Reaction Time Analysis:**
- GLMM with RT as DV (log-transformed)
- Factors: Framing × Choice (utilitarian/deontological)
- Hypothesis: Utilitarian choices faster (choice × condition interaction)

**Confidence Analysis:**
- GLMM with confidence rating as DV (ordinal logistic regression)
- Factors: Framing × Choice
- Hypothesis: Utilitarian choices lower confidence

**Policy Preference Correlation:**
- Pearson correlation: proportion utilitarian choices ↔ regulation preference
- Prediction: Negative correlation (utilitarian choosers favor less regulation)

### Multiple Comparisons Correction
- **Primary analysis**: No correction (single test of H1)
- **Secondary analyses**: FDR correction across 3 tests (p_adjusted < .05)
- **Exploratory**: Reported as exploratory, no correction

### Exploratory Analyses
- **Demographics**: Interact age/gender/education with framing effect
- **Platform effects**: Check if Prolific sample differs from published university samples

### Visualization
- Proportion plots by condition (bar charts)
- RT distributions by choice type (violin plots)
- Scatter: utilitarian proportion ↔ policy preference

---

## Ethics & Data Management

### Informed Consent
- **Procedure**: Electronic informed consent before task
- **Language**: Clear, Flesch-Kincaid grade 6
- **Content**: Study purpose (moral judgment research), risks (low), confidentiality, right to withdraw

### Ethics Approval
- **Status**: [extracted or TO BE COMPLETED - IRB approved/pending]
- **IRB Number**: [TO BE COMPLETED]
- **Approval Date**: [TO BE COMPLETED]
- **Risk Level**: Minimal risk (no deception, standard survey)

### Data Privacy and Security
- **De-identification**: Prolific ID and response data separated; linked via randomly-generated code only
- **Storage**: Qualtrics secure server (HIPAA-compliant)
- **Access**: [VERIFY: PI + RA only, encrypted login]
- **Data Retention**: Raw data destroyed 3 years post-publication; published data archived permanently
- **Secondary Use**: Data may be used for future research; no re-contact needed (consent covers secondary use)

### Confidentiality
- **Recording**: No audio/video; anonymous online survey
- **Data Sharing**: Anonymized response dataset available on OSF (https://osf.io/[link])
- **Restrictions**: No de-identification possible (behavioral data is low-risk)

### Potential Risks & Mitigation
- **Psychological stress**: Dilemma scenarios may provoke discomfort (minimal risk, participants can skip)
- **Mitigation**: Debriefing statement explaining no universally "correct" answer; resources for ethics discussion provided

---

## Deviations from Preregistration

Any changes will be reported:
- Deviation documentation: reason, date, impact
- Distinction between pre-registered (confirmatory) and post-hoc (exploratory) analyses
- All changes reported in final manuscript

---

## References

1. PRP-QUANT Preregistration Task Force. (2020). Preregistration Standards for Psychology. ZPID. https://doi.org/10.23668/psycharchives.4584
2. Hauser, M., Cushman, F., Young, L., Kang-Xing Jin, R., & Mikhail, J. (2007). The Role of Culture and Emotion in Moral Judgment. Psychological Science, 18(8), 645-659.
3. Greene, J. D., Sommerville, R. B., Nystrom, L. E., Darley, J. M., & Cohen, J. D. (2004). The Neural Bases of Cognitive Conflict and Control in Moral Judgment. Neuron, 44(2), 389-400.
4. Bosnjak, M., et al. (2022). A Template for Preregistration of Quantitative Research in Psychology. American Psychologist, 77(4), 602-615.

---

**Preregistration Status**: ✅ SUBMITTED  
**Generated by**: Biopsychology Preregistration Skill - Online Module  
**Generation Date**: 2026-06-17
