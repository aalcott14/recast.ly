class App extends React.Component {
  constructor (props) {
    super(props);
    this.searchYouTube = props.searchYouTube;

    props.searchYouTube({query: 'test', key: YOUTUBE_API_KEY, max: 5}, this.useQueryResults.bind(this));
    console.log('PINGA2')
    this.state = {
      currentVideo: exampleVideoData[0], 
      videoList: exampleVideoData
    };
  }

  useQueryResults(data) {
    this.setState({
      currentVideo: data.items.length > 0 ? data.items[0] : '',
      videoList: data.items
    });
  }

  getSearchResults(queryText) {
    var queryText = $('input.form-control').val();
    if(queryText === '' || queryText === undefined) {
      return;
    }
    queryText = queryText.trim();
    this.searchYouTube({
      max: 20,
      query: queryText,
      key: YOUTUBE_API_KEY
    }, this.useQueryResults.bind(this));
  }

  selectVideo(video) {
    this.setState({
      currentVideo: video
    });
  }

  render() {
    return (<div>
      <Nav clickHandler={this.getSearchResults.bind(this)}/>
      { (this && this.state && this.state.currentVideo)?
        <div className="col-md-7"> 
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        :<div></div>
      }
      {
        (this && this.state && this.state.videoList) ?
        <div className="col-md-5">
          <VideoList videos={this.state.videoList} selectVideo={this.selectVideo.bind(this)}/>
        </div>
        :<div></div>
      }
    </div>);
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
