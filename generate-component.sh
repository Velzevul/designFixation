#!/bin/bash

echo -n "Component's name: "
read componentName

mkdir -p "./src/components/$componentName"

echo "{
  \"name\": \"$componentName\",
  \"main\": \"$componentName.jsx\"
}" >> "./src/components/$componentName/package.json"

echo "import React from 'react'

const $componentName = ({

}) => {
  return (
    <div>
      I am $componentName component!
    </div>
  )
}

export default $componentName
" >> "./src/components/$componentName/$componentName.jsx"

echo "created component $componentName"

exit 0
