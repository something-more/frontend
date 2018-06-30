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

export async function renderQuillPatchObject(props, quill) {
  await props.retrieveStory(props.match.params.id);
  const contents = await JSON.parse(props.story.content);
  await quill.setContents(contents);
  props.initialize({title: props.story.title});
}
