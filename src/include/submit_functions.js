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
