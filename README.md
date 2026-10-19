# PFE Enterprise Report Template

This repository is a reusable LaTeX template for an end-of-study project report. The report uses neutral sample text and the placeholder organization name **PFE ENTERPRISE**. Replace all text in square brackets and the sample paragraphs with your own content.

## Use on Overleaf

1. Download this repository as a ZIP file, or push it to your own Git repository.
2. In Overleaf, select **New Project** then **Upload Project**, and upload the ZIP file.
3. Open `Frontmatter/AbstractAR_page.tex` and select **XeLaTeX** in the Overleaf compiler menu.
4. Compile `AbstractAR_page.tex`. Overleaf creates `AbstractAR_page.pdf` in the project files.
5. Keep `AbstractAR_page.pdf` in the `Frontmatter` folder. `main.tex` includes it automatically with `\includepdf`.
6. Select `main.tex` as the main document and compile it with **XeLaTeX**.

## Customize the template

- Edit `Frontmatter/Page_de_garde.tex` for the title, degree, jury, date, and enterprise branding.
- Replace the sample abstracts in `Frontmatter/AbstractEN.tex`, `Frontmatter/AbstractFR.tex`, and `Frontmatter/AbstractAR_page.tex`.
- Replace the text in `Frontmatter/GeneralIntroduction.tex`, `Chapters/`, and `Endmatter/ConclusionPerspectives.tex`.
- Keep only diagrams and screenshots that genuinely help a reader understand your work.
- `Chapters/chapter2.tex` and `Chapters/chapter5.tex` include table examples; `Chapters/chapter4.tex` includes an image placeholder and a copy-ready `\\includegraphics` example.
- `Endmatter/Acronyms.tex` keeps the original long acronym-table format. Add only acronyms that appear in your report.
- The table of contents is followed by automatic lists of figures and tables. Any `figure` or `table` environment with a `\\caption{...}` appears in the matching list after compilation.

## Files to compile

- `main.tex`: the complete report.
- `Frontmatter/AbstractAR_page.tex`: the standalone Arabic abstract; compile this first with XeLaTeX to produce the PDF embedded in `main.tex`.
