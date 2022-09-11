import { renderAsset, checkRenderStatus, getAsset } from './api.js';

const $editBody = document.getElementById('edit-body');
const $edit = document.getElementById('edit');
const $editResult = document.getElementById('edit-result');

const $statusRenderId = document.getElementById('render-id-status');
const $status = document.getElementById('status');
const $statusResult = document.getElementById('status-result');

const $getRenderId = document.getElementById('render-id-get');
const $get = document.getElementById('get');
const $getResult = document.getElementById('get-result');

$edit.onclick = async () => {
	console.log(
		JSON.stringify($editBody.value.replace(/(\r\n|\n|\r|\s)/gm, ''), null, 2)
	);
	const renderResult = await renderAsset(
		JSON.stringify($editBody.value.replace(/(\r\n|\n|\r|\s)/gm, ''))
	);
	$editResult.innerText = JSON.stringify(renderResult, null, 2);
};

$status.onclick = async () => {
	const renderStatus = await checkRenderStatus($statusRenderId.value);
	$statusResult.innerText = JSON.stringify(renderStatus, null, 2);
};

$get.onclick = async () => {
	const servedAsset = await getAsset($getRenderId.value);
	$getResult.innerText = JSON.stringify($getRenderId, null, 2);
};
