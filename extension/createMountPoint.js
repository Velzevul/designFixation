var parent = document.querySelector('.Grid.Module.hasFooter')
var wrap = document.querySelector('.GridItems')

wrap.style.display = 'none'

var reactRoot = document.createElement('div')
reactRoot.id = 'designFixationApp'

parent.insertBefore(reactRoot, parent.firstChild)
