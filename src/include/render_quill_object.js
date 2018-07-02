export function renderQuillObject(delta, quill) {
  const contents = JSON.parse(delta);
  quill.setContents(contents);
  document.getElementById('content').innerHTML = quill.root.innerHTML;
  const images = document.getElementById('content').querySelectorAll('img');
  images.forEach((img) => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  });
}

export function renderQuillPatchObject(props, value, quill) {
  const content = JSON.parse(value.content);
  quill.setContents(content);
  props.initialize({ title: value.title });
}
