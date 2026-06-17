# Installation & Setup Guide

Complete guide for setting up the Biopsychology Preregistration Skill with various AI tools and platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Claude Desktop Setup](#claude-desktop-setup)
- [Claude Code / Abacus AI CLI Setup](#claude-code--abacus-ai-cli-setup)
- [GitHub Copilot CLI Setup](#github-copilot-cli-setup)
- [Aider Setup](#aider-setup)
- [Cursor / Windsurf Setup](#cursor--windsurf-setup)
- [ChatGPT / Web-based LLMs](#chatgpt--web-based-llms)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Git** installed on your system
- One of the following AI tools:
  - Claude Desktop (recommended for full automation)
  - Claude Code / Abacus AI CLI
  - GitHub Copilot CLI
  - Aider
  - Cursor / Windsurf
  - ChatGPT Plus (for file uploads)
  - Any other LLM with file access capabilities

## Claude Desktop Setup

**Best for:** Full automation with MCP (Model Context Protocol) support

### Step 1: Clone the Repository

```bash
git clone https://github.com/caggursoy/biopsych-prereg-skill.git
cd biopsych-prereg-skill
```

### Step 2: Configure MCP

1. **Locate your Claude Desktop config file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Edit the config file** (create if it doesn't exist):

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/absolute/path/to/biopsych-prereg-skill"
      ]
    }
  }
}
```

**Important:** Replace `/absolute/path/to/biopsych-prereg-skill` with the actual path where you cloned the repository.

3. **Restart Claude Desktop** to load the configuration.

### Step 3: Verify Installation

1. Open Claude Desktop
2. Navigate to your research project directory in the conversation
3. Say: "Create a preregistration"
4. Claude should detect the skill and begin analysis

### Alternative: Add to Existing MCP Config

If you already have MCP servers configured, add the skill path to your existing filesystem server:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/projects",
        "/path/to/biopsych-prereg-skill"
      ]
    }
  }
}
```

## Claude Code / Abacus AI CLI Setup

**Best for:** Command-line workflow with full automation

### Step 1: Clone to Your Project

```bash
cd /path/to/your/research/project
git clone https://github.com/caggursoy/biopsych-prereg-skill.git
```

### Step 2: Use the Skill

Start Claude Code in your project directory:

```bash
claude-code
# or
abacus-cli
```

Then in the conversation:
```
"Use the skill at ./biopsych-prereg-skill/SKILL.md to create a preregistration"
```

Or simply:
```
"Create a preregistration"
```

The AI should automatically detect the skill files in your project.

## GitHub Copilot CLI Setup

**Best for:** GitHub-integrated workflow

### Step 1: Install GitHub Copilot CLI

```bash
gh extension install github/gh-copilot
```

### Step 2: Clone to Your Project

```bash
cd /path/to/your/research/project
git clone https://github.com/caggursoy/biopsych-prereg-skill.git
```

### Step 3: Use with Copilot

```bash
gh copilot explain "Use the skill at ./biopsych-prereg-skill/SKILL.md to analyze this project and create a preregistration"
```

Or for interactive mode:

```bash
gh copilot suggest -t shell "create preregistration using biopsych-prereg-skill"
```

**Note:** GitHub Copilot CLI has limited file reading capabilities. You may need to manually provide context by copying skill content into your prompt.

## Aider Setup

**Best for:** AI pair programming with full file access

### Step 1: Install Aider

```bash
pip install aider-chat
```

### Step 2: Clone the Repository

```bash
cd /path/to/your/research/project
git clone https://github.com/caggursoy/biopsych-prereg-skill.git
```

### Step 3: Start Aider with Skill Context

For EEG projects:
```bash
aider --read biopsych-prereg-skill/SKILL.md \
      --read biopsych-prereg-skill/skills/eeg/SKILL.md \
      --read biopsych-prereg-skill/templates/eeg/EEG_ERP_PREREGISTRATION_GUIDE.md \
      --read biopsych-prereg-skill/configs/eeg-config.json
```

For fMRI projects:
```bash
aider --read biopsych-prereg-skill/SKILL.md \
      --read biopsych-prereg-skill/skills/fmri/SKILL.md \
      --read biopsych-prereg-skill/templates/fmri/FMRI_PREREGISTRATION_GUIDE.md \
      --read biopsych-prereg-skill/configs/fmri-config.json
```

For online behavioral projects:
```bash
aider --read biopsych-prereg-skill/SKILL.md \
      --read biopsych-prereg-skill/skills/online/SKILL.md \
      --read biopsych-prereg-skill/templates/online/ONLINE_BEHAVIORAL_PREREGISTRATION_GUIDE.md \
      --read biopsych-prereg-skill/configs/online-config.json
```

For psychophysiology projects:
```bash
aider --read biopsych-prereg-skill/SKILL.md \
      --read biopsych-prereg-skill/skills/psychophys/SKILL.md \
      --read biopsych-prereg-skill/templates/psychophys/PSYCHOPHYSIOLOGY_PREREGISTRATION_GUIDE.md \
      --read biopsych-prereg-skill/configs/psychophys-config.json
```

### Step 4: Create Preregistration

In Aider prompt:
```
Create a preregistration for this project using the loaded skill files
```

## Cursor / Windsurf Setup

**Best for:** VS Code-like AI IDE experience

### Step 1: Clone to Your Workspace

```bash
cd /path/to/your/research/project
git clone https://github.com/caggursoy/biopsych-prereg-skill.git
```

### Step 2: Open in Cursor/Windsurf

```bash
cursor .
# or
windsurf .
```

### Step 3: Reference in Chat

In the AI chat panel:
```
@biopsych-prereg-skill/SKILL.md Create a preregistration for this project
```

Or:
```
Use the skill files in ./biopsych-prereg-skill to generate a preregistration
```

**Tip:** Add the skill directory to your workspace for easier access.

## ChatGPT / Web-based LLMs

**Best for:** No local installation required

### Step 1: Download Skill Files

1. Go to the [GitHub repository](https://github.com/caggursoy/biopsych-prereg-skill)
2. Download the following files for your modality:
   - `SKILL.md` (base skill)
   - `skills/[your-modality]/SKILL.md`
   - `templates/[your-modality]/[TEMPLATE].md`
   - `configs/[your-modality]-config.json`

### Step 2: Upload to ChatGPT

1. Start a new conversation
2. Upload the downloaded files
3. Provide context:

```
I want to create a preregistration for my [EEG/fMRI/online/psychophys] study.
I've uploaded the skill files. Please analyze my project and generate a draft preregistration.

Here's information about my project:
[Paste relevant details, file listings, or script excerpts]
```

### Step 3: Iterative Completion

ChatGPT will ask questions to complete missing sections. Provide information as requested.

**Limitation:** Web-based LLMs cannot directly access your local files. You'll need to manually provide file contents or excerpts.

## Troubleshooting

### Skill Not Detected

**Problem:** AI doesn't recognize the skill files

**Solutions:**
1. Verify the skill files are in the correct location
2. Use absolute paths instead of relative paths
3. Explicitly reference the skill: "Use the skill at /full/path/to/SKILL.md"
4. Check file permissions (should be readable)

### MCP Configuration Issues (Claude Desktop)

**Problem:** Claude Desktop doesn't load MCP config

**Solutions:**
1. Verify JSON syntax in config file (use a JSON validator)
2. Ensure paths use forward slashes (even on Windows)
3. Use absolute paths, not relative paths
4. Restart Claude Desktop after config changes
5. Check Claude Desktop logs for errors

### Modality Not Detected

**Problem:** Skill doesn't detect your research modality

**Solutions:**
1. Ensure you have characteristic files:
   - EEG: `.set`, `.vhdr`, `.eeg` files
   - fMRI: `.nii`, `.nii.gz` files
   - Online: `.html`, `.js` files
   - Psychophys: `.acq`, `.edf` files
2. Manually specify modality: "Create an EEG preregistration"
3. Add keywords to your README (e.g., "EEG study", "fMRI experiment")

### Missing Dependencies

**Problem:** MCP server fails to start

**Solutions:**
1. Install Node.js (required for MCP filesystem server)
2. Run: `npm install -g @modelcontextprotocol/server-filesystem`
3. Verify npx is in your PATH: `which npx` (Unix) or `where npx` (Windows)

### Permission Denied

**Problem:** Cannot read skill files

**Solutions:**
```bash
chmod -R 755 /path/to/biopsych-prereg-skill
```

### Path Issues on Windows

**Problem:** Paths with spaces or backslashes cause errors

**Solutions:**
1. Use forward slashes: `C:/Users/Name/biopsych-prereg-skill`
2. Avoid spaces in path: Move to `C:/biopsych-prereg-skill`
3. Use escaped backslashes: `C:\\Users\\Name\\biopsych-prereg-skill`

## Verification

To verify your installation works:

1. Navigate to a test project directory
2. Create a simple test file (e.g., `test.set` for EEG)
3. Run the skill
4. Confirm it detects the modality and generates output

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review `USAGE_GUIDE.md` for usage instructions
3. Open an issue on GitHub with:
   - Your AI tool/platform
   - Error messages
   - Steps to reproduce
   - Your configuration (redact sensitive paths)

## Next Steps

After successful installation:

1. Read `USAGE_GUIDE.md` for usage instructions
2. Review example preregistrations in `examples/`
3. Navigate to your research project and create your first preregistration
4. See `README.md` for full documentation
