import { renderAsset, checkRenderStatus, getAsset } from './api.js';

const $submitBtn = document.getElementById('submit');
const $spinnerSubmit = document.getElementById('render-spinner');
const $inputBody = document.getElementById('body');

const $retrieveBtn = document.getElementById('retrieve');
const $spinnerResult = document.getElementById('result-spinner');
const $status = document.getElementById('status');
const $result = document.getElementById('result');

let renderId;

$submitBtn.onclick = async () => {
  $spinnerSubmit.style.display = 'block';
  $inputBody.style.opacity = '0.5';
  $submitBtn.style.opacity = '0.5';
  $submitBtn.innerText = 'SUBMITTING...';
  try {
    const renderResult = await renderAsset(
      $inputBody.value.replace(/(\r\n|\n|\r)/gm, '')
    );
    console.log(renderResult);
    renderId = renderResult.response.id;
    alert('Render queued!! you can get the result when rendering done');
  } catch (err) {
    console.log(err);
    alert(err);
  } finally {
    $spinnerSubmit.style.display = 'none';
    $inputBody.style.opacity = '1';
    $submitBtn.style.opacity = '1';
    $submitBtn.innerText = 'SUBMIT';
  }
};

$retrieveBtn.onclick = async () => {
  $spinnerResult.style.display = 'block';
  $status.innerText = '';
  $retrieveBtn.style.opacity = '0.5';
  $result.style.opacity = '0.5';
  $retrieveBtn.innerText = 'CHECKING STATUS...';
  console.log('About to fetch id: ', renderId);
  try {
    const status = await checkRenderStatus(renderId);
    console.log(status.response);
    if (status.response.status === 'rendering') {
      $status.innerText = 'Still rendering. Try again later';
    } else if (status.response.status === 'done') {
      const $link = document.createElement('a');
      $link.innerText = status.response.url;
      $link.href = status.response.url;
      $status.appendChild($link);
      const $sourceTag = document.createElement('source');
      $sourceTag.src = status.response.url;
      $result.querySelector('video').innerHTML = '';
      $result.querySelector('video').appendChild($sourceTag);
    }
  } catch (err) {
    console.log(err);
  } finally {
    $spinnerResult.style.display = 'none';
    $retrieveBtn.style.opacity = '1';
    $result.style.opacity = '1';
    $retrieveBtn.innerText = 'RETRIEVE RENDER';
  }
};
