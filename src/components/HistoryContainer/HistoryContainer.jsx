import React from 'react'

import HistoryQueryComponent from '../HistoryQueryComponent'
import DetailsViewComponent from '../DetailsViewComponent'
import ExamplesComponent from '../ExamplesComponent'
import Block from '../../layouts/Block'
import Media from '../../layouts/Media'

class HistoryContainer extends React.Component {
  constructor (props) {
    super(props)

    this.toggleDetailsView = this.toggleDetailsView.bind(this)
    this.setDetailsViewFocus = this.setDetailsViewFocus.bind(this)

    this.state = {
      detailsViewShown: false,
      detailsViewFocus: 0
    }
  }

  toggleDetailsView () {
    this.setState({
      detailsViewShown: !this.state.detailsViewShown
    })
  }

  setDetailsViewFocus (index) {
    this.setState({
      detailsViewFocus: index
    })
  }

  render () {
    const {item} = this.props

    const historyExamples = (
      <ExamplesComponent
        examples={item.examples}
        focusedExampleIndex={this.state.detailsViewFocus}
        detailsViewShown={this.state.detailsViewShown}
        focusExampleCallback={this.setDetailsViewFocus}
        clickExampleCallback={this.toggleDetailsView} />
    )

    const historyQuery = (
      <HistoryQueryComponent history={item} />
    )

    let detailsView = ''
    if (this.state.detailsViewShown) {
      detailsView = (
        <Block n={2}>
          <DetailsViewComponent
            examples={item.examples}
            focus={this.state.detailsViewFocus}
            toggleCallback={this.toggleDetailsView} />
        </Block>
      )
    }

    return (
      <div>
        <div style={{padding: '0 24px 24px 24px'}}>
          <Media
            alignItems="center"
            figure={historyQuery}
            body={historyExamples} />
        </div>

        {detailsView}
      </div>
    )
  }
}

export default HistoryContainer
