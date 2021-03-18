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
