# HTML Video Frame Extractor

Run using a static file server (`file:` protocol cannot be used due to ES module
use), e.g.: `python -m http.server`.

## To-Do

### Implement a playback based alternative

The seeking from frame to frame is really quite slow. Maybe it would be better
to make the video play back and in `requestAnimationFrame` determine what frame
we're on right now and process it if it has not been processed yet. It could
also be an option to vary the playback speed such that we do not get skipped
frames if the processing is too slow and the playback speed causes skips in it.
At the end of the playback, the video could be played again only in the ranges
where lost frames are such that the resulting download list is all of the video
frames.

### Add an ETA display for remaining time estimation

Since the seeking based method is so slow I might as well add an approximation
of when the process it about to be done.

### Display only the `canvas` element and hide the `video` element

They both show the same thing anyway and the canvas is more important because
it shows the current, effective frame as seen by the code and not the browser.

### Consider adding TAR or even ZIP export

We have https://github.com/photopea/UZIP.js and my ESM compatible version of
that so putting all the screenshots into a single archive for download could be
nicely doable. The compression might even not be completely bad since the frames
should not change much from one to the other on videos this tool is intended
for.

### Set up mobile scaling metadata

### Fix blank video and canvas on iOS
