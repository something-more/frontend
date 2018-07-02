import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientListStory } from '../../../reducers/reducer_story';
import AlertError from '../structure/alert_error';

class MainCarousel extends Component {

  async componentWillMount() {
    await this.props.clientListStory();
  }

  renderItem() {
    return _.map(this.props.storyList, (story) => {
      return (
        <div key={story.id}>
          {story.title}
        </div>
      )
    })
  }

  render() {
    return (
    <div className="">
      {this.renderItem()}
      <AlertError errors={this.props.error}/>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    storyList: state.story.list,
    error: state.story.error
  }
}

export default connect(mapStateToProps, {clientListStory })(MainCarousel);
