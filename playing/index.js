import defer from '../esm-defer/index.js';

window.addEventListener('load', () => {
  const fileInput = document.querySelector('input[type="file"]');
  const rateInput = document.querySelector('input[type="number"]');
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
    button.textContent = `Download all ${frames} frames`;
    button.focus();
  });

  video.addEventListener('loadedmetadata', () => {
    dimensionDiv.textContent = `Dimensions: ${video.videoWidth}x${video.videoHeight}`;
    durationDiv.textContent = `${video.duration} seconds`;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    rateInput.dispatchEvent(new Event('change'));
  });

  button.addEventListener('click', async () => {
    rateInput.disabled = '';
    button.disabled = true;
    const context = canvas.getContext('2d');
    await video.play();

    const a = document.createElement('a');
    a.target = '_blank';
    window.requestAnimationFrame(function snap() {
      durationDiv.textContent = `${video.currentTime.toFixed(2)} / ${video.duration}`;
      const frames = ~~(video.duration * rateInput.valueAsNumber);
      const frame = ~~(video.currentTime / (1 / rateInput.valueAsNumber));
      frameDiv.textContent = `${frame}/${frames}`;
      canvas.title = frame;

      // TODO: Figure out why this makes the video stuck on frame but not time
      context.drawImage(video, 0, 0);

      a.download = `${frame}.png`;
      a.href = canvas.toDataURL();
      a.click();

      if (frame !== frames) {
        window.requestAnimationFrame(snap);
      }
    });
  });

  if (fileInput.value) {
    fileInput.dispatchEvent(new Event('change'));
  }
});
