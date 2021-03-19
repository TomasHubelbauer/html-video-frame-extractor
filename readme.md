# HTML Video Frame Extractor

This repository contains a tool for extracting frames from a video in plain
JavaScript in the browser. The frames are downloaded as individual images.

There are two implementations available each based on a different method of
obtaining the distinct frames: one through seeking and one through plaing.

## Running

Run using a static file server (`file:` protocol cannot be used due to ES module
use), e.g.: `python -m http.server`.

## Methods

### Seeking

This implementation seeks to video to a time corresponding with each calculated
frame and once the seeking is done, captures the frame of the video and
downloads it. The seeking is slow, but since there is no playback to sync with,
the method is precise and probably as fast as can be while remaining precise.
Use this method.

### Playing

This implementation plays the video back and continuously checks to see what
frame the video is at and downloads the frame. It is very choppy, because the
initiation of the download makes the whole thread stutter. It is missing
detection of duplicate frames, but in practice that's not a problem, because
the processing of a single frame takes so long we're actually missing many
frames instead of getting duplicates. The idea originally was this method might
be faster with some gaps which could be filled back by combining this with the
seeking based method, but it is now clear this idea has no legs so it is left
only so I remember to not attempt this optimization again in the future. Also,
the rendering of the video to the canvas for some reason makes the video stuck
on a frame even though its playback is ongoing. Not sure why, maybe a security
feature, maybe a more explicit user interaction type is needed, in any case, it
does not matter, because this approach does not work anyway.

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
