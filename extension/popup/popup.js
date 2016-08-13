class AppComponent extends React.Component {
  constructor (props) {
    super(props)

    this.startStudy = this.startStudy.bind(this)
    this.endStudy = this.endStudy.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.typeParticipantId = this.typeParticipantId.bind(this)

    this.state = {
      participantId: localStorage.getItem('inspirationSeekingParticipantId'),
      sessionId: localStorage.getItem('inspirationSeekingSessionId'),
      condition: localStorage.getItem('inspirationSeekingCondition') || 'off'
    }
  }

  typeParticipantId (e) {
    this.setState({
      participantId: e.target.value
    })
  }

  changeCondition (v) {
    this.setState({
      condition: v
    })
  }

  startStudy () {
    const sessionId = uuid.v4()

    localStorage.setItem('inspirationSeekingSessionId', sessionId)
    localStorage.setItem('inspirationSeekingParticipantId', this.state.participantId)
    localStorage.setItem('inspirationSeekingCondition', this.state.condition)

    this.setState({
      sessionId
    })
  }

  endStudy () {
    localStorage.removeItem('inspirationSeekingSessionId')

    window.open(`https://vdziubak.com?sessionId=${this.state.sessionId}&participantId=${this.state.participantId}&condition=${this.state.condition}`, 'QuestionnaireWindow', 'width=500, resizable, scrollbars, centerscreen, titlebar=0')

    this.setState({
      sessionId: null
    })
  }

  render () {
    let mainSection = ''
    if (this.state.sessionId) {
      mainSection = (
        <button
          className="Button"
          onClick={this.endStudy}>End Experiment</button>
      )
    } else {
      mainSection = (
        <button
          className="Button"
          onClick={this.startStudy}
          disabled={this.state.participantId === ''}>Start Experiment</button>
      )
    }

    return (
      <div className="App">
        <div className="App__section">
          <div className="l-block">
            <label className="InputGroup">
              <div className="InputGroup__label">Participant ID:</div>

              <div className="Input">
                <input
                  className="Input__text"
                  type="text"
                  placeholder="Assigned by the researcher"
                  value={this.state.participantId}
                  onChange={this.typeParticipantId}
                  disabled={this.state.sessionId} />
              </div>
            </label>
          </div>

          <div className="InputGroup">
            <div className="InputGroup__label">System:</div>

            <div className="l-grid">
              <label className="Input">
                <input
                  className="Input__radio"
                  type="radio"
                  checked={this.state.condition === 'on'}
                  onChange={() => { this.changeCondition('on') }}
                  disabled={this.state.sessionId} />

                <div className="Input__label">On</div>
              </label>

              <label className="Input">
                <input
                  className="Input__radio"
                  type="radio"
                  checked={this.state.condition === 'off'}
                  onChange={() => { this.changeCondition('off') }}
                  disabled={this.state.sessionId} />

                <div className="Input__label">Off</div>
              </label>
            </div>
          </div>
        </div>

        <div className="App__section">
          {mainSection}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppComponent />, document.getElementById('app'))
