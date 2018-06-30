export function renderQuillObject(delta, quill) {
  const contents = JSON.parse(delta);
  quill.setContents(contents);
  document.getElementById('content').innerHTML = quill.root.innerHTML;
  const images = document.getElementById('content').querySelectorAll('img');
  images.forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  })
}
