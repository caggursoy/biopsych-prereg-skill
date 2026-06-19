# Contributing to the Biopsychology Preregistration Skill

Thank you for your interest in contributing to this project! We welcome contributions from researchers, developers, and open science advocates.

## Supported Modalities

Currently supported modalities with full skill implementation:
- **EEG/ERP** - Electroencephalography and Event-Related Potentials
- **fMRI** - Functional Magnetic Resonance Imaging
- **Online Behavioral** - Web-based experiments (jsPsych, Qualtrics, etc.)
- **Psychophysiology** - ECG, HRV, EDA, EMG, respiration, pupillometry

Modalities that would benefit from contributions:
- **MEG** - Magnetoencephalography
- **fNIRS** - Functional Near-Infrared Spectroscopy
- **TMS** - Transcranial Magnetic Stimulation
- **EMA/ESM** - Ecological Momentary Assessment / Experience Sampling Method
- **Eye Tracking** - Standalone eye tracking studies
- **Motion Capture** - Kinematic and biomechanical studies

## How to Contribute

### Quick Start: Report Issues & Share Feedback

**We've created templates to make it easy for you to share feedback:**

When you open an issue, choose one of these templates:

1. **🐛 [Bug Report](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=bug_report.md)**
   - Something's broken or not working as expected
   - Includes fields for reproduction steps and your setup

2. **💡 [Feature Request](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=feature_request.md)**
   - Suggest improvements to the skill or workflow
   - Helps us understand the problem and your proposed solution

3. **📋 [Template Improvement](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=template_improvement.md)**
   - Propose changes to existing templates
   - Suggest templates for new modalities (fNIRS, TMS, MEG, etc.)

4. **🎯 [General Feedback](https://github.com/caggursoy/biopsych-prereg-skill/issues/new?template=idea.md)**
   - Share ideas, observations, or constructive criticism
   - Great for conceptual suggestions and feedback

**Alternatively**, use [GitHub Discussions](https://github.com/caggursoy/biopsych-prereg-skill/discussions) for general questions that don't fit a specific issue template.

### 1. Suggesting Improvements

Found an issue or have a suggestion?

- **Open an Issue**: Use the appropriate template above. Describe clearly:
  - What template or skill is affected
  - What the issue is
  - How to reproduce it (if applicable)
  - Suggested fix (if you have one)

- **Discussion Topics**: Start a Discussion for:
  - Missing sections in templates
  - Unclear guidance or examples
  - New modalities to support
  - Improvements to skill detection logic

### 2. Adding New Templates (Full Contribution)

Want to create a preregistration template for a new modality?

1. **Choose a modality** not yet covered (e.g., fNIRS, TMS, EMA/ESM, MEG, pupillometry)
2. **Create a folder**: `templates/[modality]/`
3. **Write the guide**: `[MODALITY]_PREREGISTRATION_GUIDE.md`
   - Follow the format of existing templates
   - Include modality-specific sections
   - Add references to key publications
   - Include examples of completed sections
4. **Create the skill**: `skills/[modality]/SKILL.md`
   - Define detection patterns
   - Specify parameter extraction logic
   - Document output format
5. **Create configuration**: `configs/[modality]-config.json`
   - Software detection patterns
   - Key parameters to extract
   - Required sections
6. **Submit a Pull Request** with:
   - Your new template files
   - Example preregistration demonstrating the template
   - Test cases or validation examples

### 3. Sharing Example Preregistrations

Examples help researchers understand how to use templates effectively.

**To contribute an example:**

1. **Create a completed preregistration** using one of our templates
2. **De-identify**: Remove all personal information
3. **Name it**: `examples/PREREGISTRATION_[Modality]_[StudyName]_Example.md`
4. **Add metadata**: Include
   - Modality
   - Research domain
   - Key features demonstrated
5. **Explain what's shown**: Brief comment about what the example illustrates
6. **Submit a Pull Request**

### 4. Improving Documentation

Help make the project clearer and more accessible.

**Areas where contributions are welcome:**

- **Tutorials**: Step-by-step guides for using templates
- **FAQ**: Common questions and answers
- **Glossary**: Definitions of technical terms
- **Case studies**: Real-world examples of how templates were used
- **Translations**: Translate templates or documentation to other languages
- **Accessibility improvements**: Better formatting, clearer language, etc.

### 5. Reporting Errors or Dead Links

Found a broken reference or incorrect citation?

- **Check the publication**: Verify the reference is indeed broken/incorrect
- **Open an Issue**: Include:
  - The broken/incorrect reference
  - What should it be (if known)
  - Where it appears in the repo
- **Submit a PR** with the corrected reference

## Contribution Guidelines

### Code of Conduct

- Be respectful and inclusive of all contributors
- Value diverse perspectives and expertise
- Focus on scientific rigor and open science principles
- Give credit where credit is due

### Quality Standards

#### For Templates

- [ ] Includes all required sections (metadata, ethics, modality-specific)
- [ ] References are current and verified (published 2020 or later)
- [ ] Examples are provided for complex sections
- [ ] Clear guidance on when sections apply
- [ ] Addresses potential edge cases
- [ ] Compliant with major preregistration platforms (OSF, AsPredicted, PsychArchives)

#### For Skills

- [ ] Detection patterns are specific to the modality
- [ ] Parameter extraction logic is well-documented
- [ ] Software signatures are accurate and up-to-date
- [ ] Handles edge cases (multiple modalities, custom implementations)
- [ ] Confidence levels are realistic
- [ ] Output is clear and actionable

#### For Configuration Files

- [ ] Patterns match actual file formats and software outputs
- [ ] Thresholds are justified
- [ ] All required sections are defined
- [ ] Comments explain non-obvious settings

### Submission Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/caggursoy/biopsych-prereg-skill.git
   cd biopsych-prereg-skill
   ```

2. **Create a branch** for your contribution
   ```bash
   git checkout -b feature/[descriptive-name]
   # Examples:
   # feature/meg-template
   # feature/fnirs-skill
   # fix/broken-references
   # docs/add-tutorial
   ```

3. **Make your changes**
   - Edit files, add new templates, etc.
   - Verify changes are well-formatted
   - Test if applicable

4. **Commit with clear messages**
   ```bash
   git commit -m "Add MEG preregistration template with detection logic"
   git commit -m "Fix broken citation for Bosnjak et al. (2022)"
   git commit -m "Update AGENTS.md with new skill routing instructions"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/[descriptive-name]
   ```

6. **Submit a Pull Request**
   - Clear title describing the contribution
   - Detailed description of changes
   - Reference any related issues (e.g., "Closes #15")
   - If new template: link to example demonstrating usage

### PR Description Template

```markdown
## Description
[What does this PR add or fix?]

## Type of Contribution
- [ ] New template for [modality]
- [ ] New skill implementation
- [ ] Bug fix in existing template
- [ ] Documentation improvement
- [ ] Example preregistration
- [ ] Configuration update
- [ ] Other: [describe]

## Checklist
- [ ] Follows template/skill guidelines
- [ ] References are verified and current
- [ ] Related example provided (if new template)
- [ ] Markdown is well-formatted
- [ ] No sensitive information included
- [ ] Tested/validated (if applicable)

## Related Issues
Closes #[issue number]
Related to #[issue number]

## Additional Notes
[Any context that reviewers should know]
```

## Review Process

1. **Automated checks**: Markdown formatting and link validation (if configured)
2. **Community review**: Other contributors may suggest improvements
3. **Maintainer review**: Project maintainers verify quality and scope
4. **Merge**: Once approved, your contribution is merged!

## Recognition

All contributors are recognized in:
- Git commit history
- [CONTRIBUTORS.md](CONTRIBUTORS.md) (maintained by project)
- Project README acknowledgments (for major contributions)

## Questions?

- **For contribution guidance**: Open a Discussion or Issue
- **For general questions**: Check [README.md](README.md) and existing Issues
- **For urgent matters**: Contact the project maintainers

## Thank You!

Your contributions help make preregistration more accessible and transparent research more common. We appreciate your effort to advance open science!

---

**Happy contributing!** 🎉

For more information, see:
- [README.md](README.md) - Project overview
- [INSTALL.md](INSTALL.md) - Installation and setup guide
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - How to use the skills
- [AGENTS.md](AGENTS.md) - Agent skill specifications
- [LICENSE](LICENSE) - MIT License
