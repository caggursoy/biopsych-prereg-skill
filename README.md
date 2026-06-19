# biopsych-prereg-skill

AI-powered preregistration generator for biopsychology research. Automatically analyzes your project directory and generates preregistrations for EEG, fMRI, online behavioral, and psychophysiology studies.

## What Is This?

This project provides:
- **Automated Preregistration**: AI analyzes your project and generates a preregistration draft
- **Templates**: Community-standard templates for different research modalities
- **Skills**: Reusable AI prompts that detect your research type and extract key information
- **Examples**: Complete preregistration examples for different study types

## Quick Start (30 seconds)

1. [Install](INSTALL.md) the skill in Claude Desktop
2. Go to your research project folder
3. Say: **"Create a preregistration"**
4. AI generates a draft → Complete any missing sections → Done!

👉 **[Full Quick Start Guide →](QUICKSTART.md)**

## Documentation

| Document | Purpose |
|----------|---------|
| **[QUICKSTART.md](QUICKSTART.md)** | Get started in 5 minutes |
| **[INSTALL.md](INSTALL.md)** | Installation for different platforms |
| **[USAGE_GUIDE.md](USAGE_GUIDE.md)** | Complete usage instructions |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | How the system works |
| **[REFERENCES.md](REFERENCES.md)** | All citations and resources |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | How to contribute |

## Why Preregister?

Preregistration helps you:
- **Increase Transparency**: Document plans before seeing data
- **Distinguish Confirmatory from Exploratory**: Separate hypothesis-testing from data exploration
- **Reduce Bias**: Minimize HARKing (Hypothesizing After Results are Known) and p-hacking
- **Improve Reproducibility**: Provide detailed methods for others to replicate
- **Enhance Credibility**: Show findings were predicted, not discovered


## Supported Research Modalities

### EEG/ERP
Document complex preprocessing pipelines, artifact handling, component definitions, and time windows.

### fMRI
Specify preprocessing steps, ROIs, contrasts, and multiple comparison corrections.

### Online Behavioral Studies
Define data quality criteria, exclusion rules, attention checks, and bot detection.

### Psychophysiology
Specify signal processing, artifact detection, baseline windows, and physiological confounds.

## For Multimodal Studies

If you use multiple methods (e.g., EEG + behavioral, fMRI + psychophysiology):
1. Use the relevant templates for each modality
2. Include a section on synchronization and integration
3. Specify how data from different modalities will be combined
4. Document timing and alignment procedures

## Project Structure

```
templates/          # Preregistration templates for each modality
skills/            # AI skills for automated preregistration generation
examples/          # Completed preregistration examples
configs/           # Configuration files for detection and extraction
```


## Development Status

⚠️ **This project is in early development.** Templates are based on established standards, but skills are experimental. Always review and validate generated preregistrations before submission.

[See full status →](README.md#status)

## License & Attribution

MIT License. See [LICENSE](LICENSE) for details.

Templates are built on community-driven efforts. Acknowledgments: EEG/ERP Methods Preregistration Template team, fMRI Preregistration Template contributors, Joint Psychological Societies, Center for Open Science, ZPID, and Society for Psychophysiological Research.

## Contributing & Feedback

This is an **experimental tool built by one person**—I need your help to make it better. The best way to contribute is to test it, break it, and tell me what you think.

**How to Share Feedback:**

Open a [GitHub issue](https://github.com/caggursoy/biopsych-prereg-skill/issues) with your:
- 🐛 **[Bug Report](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=bug_report.md)** — Something's broken or not working as expected
- 💡 **[Feature Request](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=feature_request.md)** — An idea to improve the skill or workflow
- 📋 **[Template Improvement](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=template_improvement.md)** — Suggest changes to templates or new modalities
- 🎯 **[General Feedback](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=idea.md)** — Ideas, observations, or constructive criticism

**Ways to contribute:**
- Test it on your research projects and share results
- Suggest improvements to detection logic
- Contribute new templates for other modalities (fNIRS, TMS, MEG, etc.)
- Share example preregistrations
- Add or improve references and resources

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## Resources

- **Installation**: [INSTALL.md](INSTALL.md)
- **Usage Guide**: [USAGE_GUIDE.md](USAGE_GUIDE.md)  
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **References**: [REFERENCES.md](REFERENCES.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

## Contact

Maintainer: Çağatay Gürsoy ([@caggursoy](https://github.com/caggursoy))

- **Issues**: Open an issue on this repository
- **Discussions**: Use GitHub Discussions

## Version History

- **v1.1** (June 2026): Full skill implementation with psychophysiology support, comprehensive installation guide, multi-platform support
- **v1.0** (June 2026): Initial release with templates and base skills