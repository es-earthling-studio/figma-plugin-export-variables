export function copyTextToClipboard(text: string) {
  const copyFrom = document.createElement("textarea");
  const { body, activeElement } = document;
  let result = true;

  copyFrom.textContent = text;
  body.appendChild(copyFrom);
  copyFrom.focus({ preventScroll: true });
  copyFrom.select();

  // Figma doesn't support the clipboard API, so even though execCommand() is
  // deprecated, it's the only way to trigger a copy
  if (!document.execCommand("copy")) {
    result = false;
  }

  // now that the selected text is copied, remove the copy source
  body.removeChild(copyFrom);

  if (activeElement) {
    // refocus the previously active element, since we stole the
    // focus to copy the text from the temp textarea
    (activeElement as HTMLElement).focus({ preventScroll: true });
  }

  return result;
}
