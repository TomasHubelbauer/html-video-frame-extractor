import defer from '../esm-defer/index.js';
import UZIP from '../esm-uzip-js/index.js';

window.addEventListener('load', () => {
  const fileInput = document.querySelector('input[type="file"]');
  const rateInput = document.querySelector('input[type="number"]');
  const frameInput = document.querySelector('input[type="range"]');
  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');
  const dimensionDiv = document.querySelector('#dimensionDiv');
  const durationDiv = document.querySelector('#durationDiv');
  const frameDiv = document.querySelector('#frameDiv');
  const button = document.querySelector('button');

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length === 0) {
      return;
    }

    if (fileInput.files.length > 1) {
      alert('Select only a single file!');
      return;
    }

    const url = URL.createObjectURL(fileInput.files[0]);
    video.src = url;
    fileInput.remove();
  });

  rateInput.addEventListener('change', () => {
    const frames = ~~(video.duration * rateInput.valueAsNumber);
    frameInput.max = frames;
    frameDiv.textContent = `Frame ${frameInput.value}/${frames}`;
    button.textContent = `Download all ${frames} frames in an archive`;
  });

  frameInput.addEventListener('input', () => {
    rateInput.dispatchEvent(new Event('change'));

    video.currentTime = frameInput.valueAsNumber / rateInput.valueAsNumber;
    durationDiv.textContent = `${video.currentTime.toFixed(2)} / ${video.duration}`;
  });

  video.addEventListener('loadedmetadata', () => {
    dimensionDiv.textContent = `Dimensions: ${video.videoWidth}x${video.videoHeight}`;
    durationDiv.textContent = `${video.duration} seconds`;
    frameInput.value = 0;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    rateInput.dispatchEvent(new Event('change'));
    frameInput.removeAttribute('disabled');
    frameInput.focus();
    button.disabled = false;
  });

  let seek;

  video.addEventListener('seeked', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    canvas.title = frameInput.value;
    seek?.resolve();
  });

  button.addEventListener('click', async () => {
    rateInput.disabled = '';
    frameInput.disabled = '';
    button.disabled = true;
    frameInput.disabled = '';

    const frames = ~~(video.duration * rateInput.valueAsNumber);
    const payload = {};
    for (let index = 0; index < frames; index++) {
      seek = defer();
      frameInput.value = index;
      frameInput.dispatchEvent(new Event('input'));
      await seek.promise;
      const blobDeferred = defer();
      canvas.toBlob(blobDeferred.resolve);
      const blob = await blobDeferred.promise;
      const arrayBuffer = await blob.arrayBuffer();
      payload[`${index}.png`] = new Uint8Array(arrayBuffer);
    }

    const arrayBuffer = UZIP.encode(payload);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(new Blob([arrayBuffer], { type: 'application/zip' }));
    fileReader.addEventListener('loadend', () => {
      const a = document.createElement('a');
      a.target = '_blank';

      // TODO: Use the name from the video file
      a.download = 'frames.zip';
      a.href = fileReader.result;
      a.click();
    });
  });

  if (fileInput.value) {
    fileInput.dispatchEvent(new Event('change'));
  }
});
