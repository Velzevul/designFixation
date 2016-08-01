import React from 'react'

import flow from '../../mock/flow.js'
import Wrap from '../../layouts/Wrap'
import KeywordSection from '../KeywordSection'
import ImageSection from '../ImageSection'
import Block from '../../layouts/Block'

const Flow = () => {
  let flowSections = []
  let backPoint = null

  for (let [index, section] of flow.entries()) {
    switch (section.type) {
      case 'keyword':
        backPoint = section
        flowSections.push(
          <Block
            n={2}
            key={index}>
            <KeywordSection
              pins={section.collectedPins}
              query={section.query}/>
          </Block>
        )
        break
      case 'image':
        flowSections.push(
          <Block
            n={2}
            key={index}>
            <ImageSection
              pins={section.collectedPins}
              image={section.imageUrl}
              id={section.id}
              key={index} />
          </Block>
        )
        break
      case 'back':
        console.log(backPoint)
        flowSections.push(
          <Block
            n={2}
            key={index}>
            <KeywordSection
              pins={section.collectedPins}
              query={backPoint.query}
              backPoint
              key={index} />
          </Block>
        )
        backPoint = null
        break
    }
  }

  return (
    <Wrap maxWidth="80rem">
      {flowSections}
    </Wrap>
  )
}

export default Flow
