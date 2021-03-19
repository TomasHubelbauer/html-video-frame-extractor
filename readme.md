# HTML Video Frame Extractor

This repository contains a tool for extracting frames from a video in plain
JavaScript in the browser. The frames are downloaded as individual images.

Run using a static file server (`file:` protocol cannot be used due to ES module
use), e.g.: `python -m http.server`.

## To-Do

### Add an ETA display for remaining time estimation

Since the seeking based method is so slow I might as well add an approximation
of when the process it about to be done.

### Display only the `canvas` element and hide the `video` element

They both show the same thing anyway and the canvas is more important because
it shows the current, effective frame as seen by the code and not the browser.

### Fix blank video and canvas on iOS

### Provide a user friendly way of showing and testing bulk download

Add some UI imagery and guidance on how to set up the browser to download
individual files into a specific directory. Add a test batch download button for
verifying the browser is configured correctly without having to run the decoding
directly (download like three test text files at once to show the idea).
