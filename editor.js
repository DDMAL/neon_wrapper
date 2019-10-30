import NeonView from './Neon/src/NeonView';
import DisplayPanel from './Neon/src/DisplayPanel/DisplayPanel';
import DivaView from './Neon/src/DivaView';
import DivaEdit from './Neon/src/SquareEdit/DivaEditMode';
import SingleView from './Neon/src/SingleView/SingleView';
import SingleEditMode from './Neon/src/SquareEdit/SingleEditMode';
import InfoModule from './Neon/src/InfoModule';
import TextView from './Neon/src/TextView';
import TextEditMode from './Neon/src/TextEditMode';

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

    let pageCount = manifest['mei_annotations'].length;
    if (pageCount === 0) {
      throw new Error('At least one page is required in \'mei_annotations\'! 0 provided.');
    }

    params.View = pageCount > 1 ? DivaView : SingleView;
    params.NeumeEdit = pageCount > 1 ? DivaEdit : SingleEditMode;

    // Start Neon
    view = new NeonView(params);
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
