import React from 'react'
import SearchBar from "./SearchBar";
import youtube from "../api/youtube";
import {config} from "../api/config";
import VideoList from "./VideoList";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null,
        }
    }

    onTermSubmit = async term => {
        const response = await youtube.get("/search", {
            params: {
                q: term,
                part: "snippet",
                maxResults: 5,
                type: 'video',
                key: config["youtube-api-key"]
            }
        });
        this.setState({videos: response.data.items})
    };

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={this.onVideoSelect}
                />
            </div>
        )
    }
}

export default App;