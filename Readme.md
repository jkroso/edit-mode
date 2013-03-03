# edit-mode

A wrapper around the native browser contenteditable feature. edit-mode ensures that no more than one element is editable at a time and provides useful events for monitoring change.

## Installation
 
    component install jkroso/edit-mode

See [component](https://github.com/component/component#component) for more information.

## API

### editMode(el)

Put `el` into edit mode. If another element is in edit-mode it will be taken out of it first.

### events

- `edit` events fire as content changes
- `change` events will be fired when the element leaves edit mode unless its content hasn't changed

## Example

    editMode = require('edit-mode');
    var el = document.getElementById('content');
    editMode(el);
    
    el.addEventListener('change', function(event){ 
      console.log('New Value:', event.target.value);
    });

## License 

MIT
