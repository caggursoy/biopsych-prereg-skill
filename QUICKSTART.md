# Quick Start Guide

Get your preregistration draft in 5 minutes.

## TL;DR

1. Navigate to your research project folder
2. Say "Create a preregistration" to the AI
3. The AI will analyze your files and generate a draft
4. Complete any missing sections interactively
5. Review `PREREGISTRATION_DRAFT.md`

## Installation

**See [INSTALL.md](INSTALL.md) for detailed platform-specific setup.**

### Quick Setup for Claude Desktop

1. Clone this repository:
   ```bash
   git clone https://github.com/caggursoy/biopsych-prereg-skill.git
   cd biopsych-prereg-skill
   ```

2. Add to Claude Desktop MCP configuration:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/biopsych-prereg-skill"]
       }
     }
   }
   ```

3. Restart Claude Desktop

## Basic Usage

### Using the Automated Skill

Navigate to your research project and:

```
Create a preregistration
```

Or use the command:
```
/preregister
```

The skill will:
1. **Scan your files** to detect your research modality (EEG, fMRI, online, psychophysiology)
2. **Extract information** from your code, data, and documentation
3. **Generate a draft** with detected information pre-filled
4. **Identify gaps** and ask you to complete missing sections
5. **Create PREREGISTRATION_DRAFT.md** ready for review

### What Gets Detected Automatically

- Research modality from file types (`.set` for EEG, `.nii` for fMRI, `.html/.js` for online, `.acq` for psychophysiology)
- Study information from README and documentation files
- Analysis parameters from scripts (Python, R, MATLAB)
- Software versions from requirements files
- Sample size from power analysis scripts

## Next Steps

- **Full Documentation**: See [INSTALL.md](INSTALL.md) for detailed setup and [USAGE_GUIDE.md](USAGE_GUIDE.md) for comprehensive instructions
- **Architecture**: Check [ARCHITECTURE.md](ARCHITECTURE.md) to understand how the system works
- **Manual Templates**: Use templates in `templates/` for manual preregistration
- **Examples**: See `examples/` for completed preregistration examples
- **References**: See [REFERENCES.md](REFERENCES.md) for all citations and resources

## Common Workflows

### For EEG/ERP Studies

The skill will detect your EEG analysis software (EEGLAB, MNE, FieldTrip) and:
- Extract preprocessing parameters
- Document your ICA settings
- Auto-fill component definitions and time windows
- See example: `examples/PREREGISTRATION_EEG_N170_Example.md`

### For fMRI Studies

The skill will check your BIDS directory structure and:
- Extract acquisition parameters (TR, TE, voxel size)
- Validate preprocessing choices
- Document GLM design and contrasts
- See example: `examples/PREREGISTRATION_fMRI_RewardProcessing_Example.md`

### For Online Behavioral Studies

The skill will identify your experiment platform (jsPsych, Qualtrics, Pavlovia) and:
- Extract trial structure and conditions
- Find data quality rules and attention checks
- Document recruitment and exclusion criteria
- See example: `examples/PREREGISTRATION_Online_AV_Dilemmas_Example.md`

### For Psychophysiology Studies

The skill will detect your physiological software (AcqKnowledge, Kubios, NeuroKit2) and:
- Identify signal types (ECG, HRV, EDA, EMG)
- Extract sampling rates and preprocessing methods
- Document artifact detection procedures
- See example: `examples/PREREGISTRATION_Psychophys_StressHRV_Example.md`

## Manual Registration Platforms

Once you have your draft, register at:
- **OSF Registries**: https://osf.io/registries
- **AsPredicted**: https://aspredicted.org/
- **PsychArchives**: https://www.psycharchives.org/
- **ClinicalTrials.gov**: For clinical studies

## Need Help?

1. See [USAGE_GUIDE.md](USAGE_GUIDE.md) for detailed instructions
2. Check [INSTALL.md](INSTALL.md) for platform-specific setup
3. Review examples in `examples/` folder
4. Open an issue on GitHub for problems
