import React from 'react'

import HistoryDetailsComponent from '../HistoryDetailsComponent'
import HistorySummaryComponent from '../HistorySummaryComponent'

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
    const {history} = this.props

    const historySummary = (
      <HistorySummaryComponent
        history={history}
        focusedExampleIndex={this.state.detailsViewFocus}
        detailsViewShown={this.state.detailsViewShown}
        focusExampleCallback={this.setDetailsViewFocus}
        clickExampleCallback={this.toggleDetailsView} />
    )

    let detailsView = ''
    if (this.state.detailsViewShown) {
      detailsView = (
        <HistoryDetailsComponent
          examples={history.examples}
          focus={this.state.detailsViewFocus}
          toggleCallback={this.toggleDetailsView} />
      )
    }

    return (
      <div>
        {historySummary}
        {detailsView}
      </div>
    )
  }
}

export default HistoryContainer
