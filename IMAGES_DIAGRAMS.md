# Images and Diagrams

Use diagrams only when they help the reader understand the architecture, a process, a data model, or a key user flow. Introduce every diagram in the text, then explain what it shows after the figure.

## Recommended workflow

1. Create architecture and process diagrams in [draw.io](https://www.drawio.com/).
2. Save the editable source as a `.drawio` XML file in a `diagrams/` folder.
3. Export a PNG or PDF copy to `images/` for inclusion in the report.
4. Export at least 500 pixels wide. Use a larger export for dense architecture diagrams so labels remain readable in the PDF.
5. Insert the exported file through a `figure` environment, give it a clear caption, and reference it in the text.

For hand drawn sketches, explanatory flows, and workshop style diagrams, [Excalidraw](https://excalidraw.com/) is also suitable. Export the final result as PNG or PDF and store the editable source with the project when possible.

## LaTeX example

```tex
\begin{figure}[H]
  \centering
  \includegraphics[width=0.85\textwidth]{images/architecture.png}
  \caption{High-level architecture of the proposed solution.}
  \label{fig:architecture}
\end{figure}
```

Use descriptive filenames such as `architecture.png`, `data-flow.png`, or `user-workflow.png`. Keep only images that support the report's explanation.
