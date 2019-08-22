import NeonView from './Neon/src/NeonView.js';
import DisplayPanel from './Neon/src/DisplayPanel/DisplayPanel.js';
import DivaView from './Neon/src/DivaView.js';
import DivaEdit from './Neon/src/SquareEdit/DivaEditMode.js';
import SingleView from './Neon/src/SingleView/SingleView.js';
import SingleEditMode from './Neon/src/SquareEdit/SingleEditMode.js';
import InfoModule from './Neon/src/InfoModule.js';
import TextView from './Neon/src/TextView.js';
import TextEditMode from './Neon/src/TextEditMode.js';

init();

async function init () {
  if (manifestText !== '') {
    let manifest = JSON.parse(decodeURIComponent(manifestText));
    let params = {
      manifest: manifest,
      Display: DisplayPanel,
      Info: InfoModule,
      TextView: TextView,
      TextEdit: TextEditMode
    };
    let mediaType = await window.fetch(manifest.image).then(response => {
      if (response.ok) {
        return response.headers.get('Content-Type');
      } else {
        throw new Error(response.statusText);
      }
    });
    // Use media type to set which view and edit modules to use.
    let isSinglePage = mediaType.match(/^image\/*/);
    params.View = isSinglePage ? SingleView : DivaView;
    params.NeumeEdit = isSinglePage ? SingleEditMode : DivaEdit;

    // Start Neon
    let view = new NeonView(params);
    view.start();

    let div = document.getElementsByClassName('navbar-start')[0];
    let newDiv = document.createElement('div');
    let validationButton = document.createElement('button');
    let anchor = document.createElement('a');
    anchor.classList.add('navbar-item');
    validationButton.classList.add('button');
    validationButton.textContent = 'Validate';
    anchor.append(validationButton);
    newDiv.append(anchor);
    div.append(newDiv);
    validationButton.addEventListener('click', (evt) => {
      view.getPageMEI(view.view.getCurrentPageURI()).then(mei => {
        return window.fetch('', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'user_input': mei
          })
        });
      }).then(response => {
        if (response.ok) {
          window.close();
        } else {
          console.error(response);
        }
      }).catch(err => {
        console.error(err);
      });
    });
  }
}
