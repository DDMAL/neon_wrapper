import NeonView from './Neon/src/NeonView.js';
import DisplayPanel from './Neon/src/DisplayPanel/DisplayPanel.js';
import DivaView from './Neon/src/DivaView.js';
import DivaEdit from './Neon/src/SquareEdit/DivaEditMode.js';
import SingleView from './Neon/src/SingleView/SingleView.js';
import SingleEditMode from './Neon/src/SquareEdit/SingleEditMode.js';
import InfoModule from './Neon/src/InfoModule.js';
import TextView from './Neon/src/TextView.js';
import TextEditMode from './Neon/src/TextEditMode.js';

var view;
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
    view = new NeonView(params);
    view.start();
  }
}
