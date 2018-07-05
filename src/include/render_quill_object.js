export function renderQuillPatchObject(props, value, quill) {
  const content = JSON.parse(value.content);
  quill.setContents(content);
  props.initialize({ title: value.title });
}
