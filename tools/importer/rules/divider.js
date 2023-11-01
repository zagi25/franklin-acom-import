export default function createDividerBlock(block, document) {
  const sectionMetadataCells = [['Section Metadata'], ['style', 'divider']];

  const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
    sectionMetadataCells,
    document,
  );
  sectionMetaDataTable.classList.add('import-table');
  block.after(document.createElement('hr'));
  block.replaceWith(sectionMetaDataTable);
}
