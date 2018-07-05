import moment from 'moment/moment';

export async function onDestroy(id, dispatch, routeFn) {
  const isConfirm = window.confirm('정말 삭제하겠습니까?');

  if (isConfirm) {
    await alert('삭제되었습니다');
    await dispatch(id);
    await routeFn;
  } else {
    alert('삭제를 취소하셨습니다');
  }
}

export async function onCreate(quill, values, dispatch, file) {
  const delta = JSON.stringify(quill.getContents());

  const formData = new FormData();

  formData.append('title', values.title);
  formData.append('content', delta);
  formData.append('date_created', moment().format());
  if (file) {
    formData.append('thumbnail', file);
  }

  await dispatch(formData);
}

export async function onPatch(id, quill, values, dispatch) {
  const delta = JSON.stringify(quill.getContents());

  const formData = new FormData();

  formData.append('title', values.title);
  formData.append('content', delta);
  formData.append('date_modified', moment().format());

  await dispatch(formData, id);
}
