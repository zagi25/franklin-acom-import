export default function createTextWithFormBlocks(block, document) {
  // const textWrapper = block.querySelector('.text');
  const wrappers = [...block.querySelector('.dexter-FlexContainer-Items').children];
  const textWrapper = wrappers[1];
  // const formWrapper= block.querySelector('.faasform');
  const formWrapper = wrappers[0].querySelector('.flex');

  const textCells = [['text'], [textWrapper]];
  const textTable = WebImporter.DOMUtils.createTable(textCells, document);
  textTable.classList.add('import-table');

  const faasDiv = document.createElement('div');
  const faasHeadingText = formWrapper.querySelector('.text')?.textContent;
  const faasLink = 'https://milo.adobe.com/tools/faas#eyIxNDkiOiIiLCIxNzIiOiIiLCJpZCI6IjQ1IiwibCI6ImVuX3VzIiwiZCI6Imh0dHBzOi8vbWFpbi0tZGMtLWFkb2JlY29tLmhseC5wYWdlL2Fjcm9iYXQvYnVzaW5lc3MvcmVwb3J0cy9hZG9iZS1hY3JvYmF0LXNpZ24tY2xvc2UtZ2Fwcy1pbi1kaWdpdGFsLWZpcnN0LXNhbGVzLXN0cmF0ZWd5LWNvbmZpcm1hdGlvbiIsImFzIjp0cnVlLCJhciI6dHJ1ZSwicGMiOnsiMSI6ImpzIiwiMiI6ImZhYXNfc3VibWlzc2lvbiIsIjMiOiJzZmRjIiwiNCI6ImRlbWFuZGJhc2UiLCI1IjoiIn0sInEiOnt9LCJwIjp7ImpzIjp7IjM2IjoiIiwiMzkiOiIiLCI3NyI6MSwiNzgiOjEsIjc5IjoxLCI5MCI6IkZBQVMiLCI5MiI6IjI4NDYiLCI5MyI6IjI4NDgiLCI5NCI6IiJ9fSwiZSI6e30sInRpdGxlX2FsaWduIjoiY2VudGVyIiwidGl0bGVfc2l6ZSI6Img1IiwicGMxIjp0cnVlLCJwYzIiOnRydWUsInBjMyI6dHJ1ZSwicGM0Ijp0cnVlLCJwanM5MyI6IjI4NDciLCJwanM5NCI6IjciLCJwanMzNiI6IjcwMTVZMDAwMDA0N25JOVFBSSIsInBqczM5IjoiIiwicGpzOTIiOiIyODQ2IiwicTEwMyI6W10sInBjNSI6ZmFsc2UsImhpZGVQcmVwb3B1bGF0ZWQiOmZhbHNlLCJzdHlsZV9sYXlvdXQiOiJjb2x1bW4yIn0=';
  const faasLinkText = 'Form as a Service - DMe Webinars and Whitepapers Form (45) - Monday, January 8, 2024 at 24:20';
  const faasCells = [['text (center, s heading)']];
  const faas = document.createElement('a');
  faas.textContent = faasLinkText;
  faas.href = faasLink;
  const faasHeading = document.createElement('h5');
  faasHeading.textContent = faasHeadingText;
  faasDiv.append(faasHeading, faas);
  faasCells.push([faasDiv]);
  const faasTable = WebImporter.DOMUtils.createTable(faasCells, document);
  faasTable.classList.add('import-table');

  const sectionMetadataCells = [['Section Metadata'], ['style', 'xl spacing, two up']];
  const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
    sectionMetadataCells,
    document,
  );

  block.before(document.createElement('hr'));
  block.replaceWith(textTable, faasTable, sectionMetaDataTable);
}
