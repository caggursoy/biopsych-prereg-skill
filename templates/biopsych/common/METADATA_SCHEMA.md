# Common Metadata Schema for Biopsychology Preregistrations

## Purpose

This schema provides common fields that apply to all biopsychology preregistrations, regardless of modality (EEG, fMRI, online, psychophysiology).

## Metadata Fields

### Study Identification
- **Title**: Full study title
- **Short Title**: Abbreviated title for reference
- **Study ID**: Unique identifier (if applicable)
- **Registration Date**: Date of preregistration
- **Registration Platform**: Where preregistered (e.g., OSF, AsPredicted, ClinicalTrials.gov)
- **DOI/URL**: Persistent identifier for the preregistration

### Authors and Contributors
- **Principal Investigator(s)**: Name, affiliation, ORCID
- **Co-Investigators**: Names, affiliations, ORCIDs
- **Contributors**: Other team members and their roles
- **Corresponding Author**: Contact information

### Institutional Information
- **Institution(s)**: Primary research institution(s)
- **Department(s)**: Specific department or lab
- **Funding Source(s)**: Grant numbers and funding agencies
- **Conflicts of Interest**: Any potential conflicts

### Study Classification
- **Study Type**: 
  - Experimental
  - Observational
  - Correlational
  - Longitudinal
  - Cross-sectional
  - Other (specify)
- **Research Domain**:
  - Cognitive neuroscience
  - Affective neuroscience
  - Clinical neuroscience
  - Social neuroscience
  - Developmental neuroscience
  - Other (specify)
- **Modality/Modalities**:
  - EEG/ERP
  - fMRI
  - MEG
  - Psychophysiology (ECG, EDA, etc.)
  - Behavioral only
  - Multimodal (specify combination)

### Temporal Information
- **Preregistration Type**:
  - Before data collection
  - Before data analysis (data already collected)
  - Registered Report (Stage 1)
- **Expected Start Date**: When data collection will begin
- **Expected Completion Date**: When data collection will end
- **Analysis Start Date**: When analysis is expected to begin

### Version Control
- **Version Number**: Current version of preregistration
- **Last Updated**: Date of last modification
- **Change Log**: Summary of changes from previous versions

## JSON Schema Example

```json
{
  "study_identification": {
    "title": "string",
    "short_title": "string",
    "study_id": "string",
    "registration_date": "YYYY-MM-DD",
    "registration_platform": "string",
    "doi_url": "string"
  },
  "authors": {
    "principal_investigator": [
      {
        "name": "string",
        "affiliation": "string",
        "orcid": "string"
      }
    ],
    "co_investigators": [],
    "contributors": [],
    "corresponding_author": {
      "name": "string",
      "email": "string"
    }
  },
  "institutional_info": {
    "institutions": ["string"],
    "departments": ["string"],
    "funding_sources": ["string"],
    "conflicts_of_interest": "string"
  },
  "study_classification": {
    "study_type": "string",
    "research_domain": "string",
    "modalities": ["string"]
  },
  "temporal_info": {
    "preregistration_type": "string",
    "expected_start_date": "YYYY-MM-DD",
    "expected_completion_date": "YYYY-MM-DD",
    "analysis_start_date": "YYYY-MM-DD"
  },
  "version_control": {
    "version_number": "string",
    "last_updated": "YYYY-MM-DD",
    "change_log": "string"
  }
}
```

## Usage Notes

- This metadata should be included at the beginning of every preregistration
- Fields marked as required should always be completed
- Optional fields can be omitted if not applicable
- Use consistent formatting across all preregistrations
- Update version information whenever changes are made
