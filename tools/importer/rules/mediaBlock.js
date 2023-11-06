const makeImage = (node, document) => {
  const imageTags = node.querySelectorAll('img');
  let imgLink = null;
  let imgSrc = null;
  imageTags.forEach((image) => {
    if (imgSrc) {
      return;
    }
    const alt = image.getAttribute('alt');
    const src = image.getAttribute('src');
    if (alt) {
      if (src && src.indexOf('https') === -1) {
        imgSrc = `https://www.adobe.com/${image.getAttribute('src')}`;
      } else {
        imgSrc = image.getAttribute('src');
      }

      if (imgSrc.includes('.svg')) {
        imgLink = document.createElement('a');
        imgLink.innerHTML = imgSrc;
        imgLink.setAttribute('href', imgSrc);
      } else {
        imgLink = document.createElement('img');
        imgLink.setAttribute('src', imgSrc);
        imgLink.setAttribute('alt', alt);
      }
    }
  });
  return imgLink;
};

const makeVideo = (node, document) => {
  const video = node.querySelector('iframe');
  const videoLink = document.createElement('a');
  videoLink.src = video?.src;
  videoLink.textContent = video?.src;
  video.remove();

  return videoLink;

};

const makeText = (node, document, textDiv) => {
  if (node.classList.contains('cta')) {
    const oldCta = node.querySelector('a');
    const ctaText = oldCta.textContent;
    if (ctaText) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.setAttribute('href', oldCta.href);
      const ctaWrapper = oldCta.classList.contains('doccloud-Button--blue') ? document.createElement('b') : document.createElement('b');
      if (oldCta.classList.contains('spectrum-Button')) {
        ctaWrapper.textContent = ctaText;
        ctaAnchor.appendChild(ctaWrapper);
        textDiv.appendChild(ctaAnchor);

        return;
      }
      ctaAnchor.textContent = ctaText;
      textDiv.appendChild(ctaAnchor);
    }

    return;
  }
  textDiv.appendChild(node.cloneNode(true));
};

export default function mediaBlock(block, document) {
  const cells = [['Media(xl spacing)']];
  const textDiv = document.createElement('div');
  let image = null;
  let video = null;
  const content = [];
  [...block.querySelectorAll('.cmp-title, .cmp-text, .cta, .image, .video')].forEach((node) => {
    if (node.classList.contains('image')) {
      image = makeImage(node, document);
      content.push(image);
      return;
    } else if (node.classList.contains('video')) {
      video = makeVideo(node, document);
      content.push(video);
    }

    if (!textDiv.childElementCount) {
      content.push(textDiv);
    }
    makeText(node, document, textDiv);
    return;
  });

  cells.push(content);
  const table = window.WebImporter.DOMUtils.createTable(cells, document);
  table.classList.add('import-table');

  const sectionMetaDataCells = [['Section Metadata']];
  const sectionTable = window.WebImporter.DOMUtils.createTable(
    sectionMetaDataCells,
    document,
  );
  sectionTable.classList.add('import-table');
  block.before(document.createElement('hr'));
  block.replaceWith(table);
}
