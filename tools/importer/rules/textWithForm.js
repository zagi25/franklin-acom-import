export default function createTextWithFormBlocks(block, document) {
  // const textWrapper = block.querySelector('.text');
  const wrappers = [...block.querySelector('.flex .dexter-FlexContainer-Items .flex .dexter-FlexContainer-Items').children];
  const textWrapper = wrappers[0];
  // const formWrapper= block.querySelector('.faasform');
  // const formWrapper = wrappers[1].querySelector('.position');
  const textWrapper2 = wrappers[1];

  const textCells = [['text'], [textWrapper]];
  const textTable = WebImporter.DOMUtils.createTable(textCells, document);
  textTable.classList.add('import-table');
  const textCells2 = [['text'], [textWrapper2]];
  const textTable2 = WebImporter.DOMUtils.createTable(textCells2, document);
  textTable2.classList.add('import-table');

  // const faasDiv = document.createElement('div');
  // const faasHeadingText = formWrapper.querySelector('.text')?.textContent;
  // const faasLink= 'https://milo.adobe.com/tools/faas#eyIxNDkiOiIiLCIxNzIiOiIiLCJpZCI6IjQ1IiwibCI6ImVuX3VzIiwiZCI6Imh0dHBzOi8vbWFpbi0tZGMtLWFkb2JlY29tLmhseC5wYWdlL2Fjcm9iYXQvYnVzaW5lc3Mvd2ViaW5hcnMvYWNjZWxlcmF0ZS15b3VyLWNvbnRyYWN0LXByb2Nlc3Mtd2l0aC1hZG9iZS1tc2Z0LWNvbmZpcm1hdGlvbiIsImFzIjpmYWxzZSwiYXIiOmZhbHNlLCJwYyI6eyIxIjoianMiLCIyIjoiZmFhc19zdWJtaXNzaW9uIiwiMyI6InNmZGMiLCI0IjoiZGVtYW5kYmFzZSIsIjUiOiIifSwicSI6e30sInAiOnsianMiOnsiMzYiOiIiLCIzOSI6IiIsIjc3IjoxLCI3OCI6MSwiNzkiOjEsIjkwIjoiRkFBUyIsIjkyIjoiMjg0NiIsIjkzIjoiMjg0OCIsIjk0IjoiIn19LCJlIjp7fSwidGl0bGVfYWxpZ24iOiJjZW50ZXIiLCJ0aXRsZV9zaXplIjoiaDUiLCJwYzEiOnRydWUsInBjMiI6dHJ1ZSwicGMzIjp0cnVlLCJwYzQiOnRydWUsInBqczkzIjoiMzIwNCIsInBqczk0IjoiMjgzOCIsInBqczM2IjoiNzAxNVkwMDAwMDNBQ3N4UUFHIiwicGpzMzkiOiIiLCJwanM5MiI6IjI4NDYiLCJxMTAzIjpbXSwicGM1IjpmYWxzZSwiaGlkZVByZXBvcHVsYXRlZCI6ZmFsc2UsInN0eWxlX2xheW91dCI6ImNvbHVtbjIiLCJ0aXRsZSI6IkNvbXBsZXRlIHRoZSBmb3JtIHRvIHdhdGNoIHRoZSBvbi1kZW1hbmQgd2ViaW5hci4gIn0=';
  // const faasLinkText = 'Form as a Service - DMe Webinars and Whitepapers Form (45) - Monday, February 12, 2024 at 23:22';
  // const faasCells = [['text (center, s heading)']];
  // const faas = document.createElement('a');
  // faas.textContent = faasLinkText;
  // faas.href = faasLink;
  // const faasHeading = document.createElement('h5');
  // faasHeading.textContent = faasHeadingText;
  // faasDiv.append(faasHeading, faas);
  // faasCells.push([faasDiv]);
  // const faasTable = WebImporter.DOMUtils.createTable(faasCells, document);
  // faasTable.classList.add('import-table');

  const sectionMetadataCells = [['Section Metadata'], ['style', 'xl spacing, two up']];
  const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
    sectionMetadataCells,
    document,
  );

  block.before(document.createElement('hr'));
  // block.replaceWith(textTable, faasTable,  sectionMetaDataTable);
  block.replaceWith(textTable, textTable2, sectionMetaDataTable);
}
