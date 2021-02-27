import React from 'react';
import './App.css';
import Navigation from '../components/navigation/Navigation.jsx'
import Logo from '../components/logo/Logo.jsx';
import ImageLinkForm from '../components/image link form/ImageLinkForm';
import Rank from '../components/rank/Rank.jsx';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.jsx'
import Signin from '../components/signin form/Signin.jsx';
import Register from '../components/register form/Register.jsx'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particleOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		},
		line_linked: {
			shadow: {
				enable: true,
				color: "#3CA9D1",
				blur: 5
			}
		}
	}
}

const app = new Clarifai.App({
	apiKey: '3160b1eb71a7425b8b78e134bf56e940'
});

class App extends React.Component {

	constructor() {
			super();
			this.state = {
				input: '',
				imageUrl: '',
				boxes: [],
				route: 'signin',
				signedIn: false
			};
	}

	changeRoute = (route) => {
		this.setState({route: route});
	}

	signIn = () => {
		this.setState({signedIn: true});
	}

	signOut = () => {
		this.setState({signedIn: false});
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	onSubmit = async () => {
		this.setState({ imageUrl: this.state.input, boxes: [] })

		try {
			const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
			const faceBoxes = await response.outputs[0].data.regions.map(region => region.region_info.bounding_box);
			const faceLocs = [];
			for (let box of faceBoxes) {
				faceLocs.push(this.calculateFaceLocation(box));
			}
			this.setState({ boxes: faceLocs })
		} catch (error) {
			console.log('oops', error);
		}
	}

	calculateFaceLocation = (boxData) => {
		const image = document.getElementById('input-image');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: boxData.left_col * width,
			topRow: boxData.top_row * height,
			rightCol: width - (boxData.right_col * width),
			bottomRow: height - (boxData.bottom_row * height)
		};
	}


	render() {
		const { input, imageUrl, boxes, route, signedIn } = this.state
		return (
			<div className="App">
				<Particles className="particles" params={particleOptions} />
				<Navigation changeRoute={this.changeRoute} isSignedIn={signedIn} signOut={this.signOut}/>
				{ (() => {
						if (route === 'signin') {
							return (
								<div>
									<Logo />									
									<Signin changeRoute={this.changeRoute} signIn={this.signIn}/>
								</div>
							);
						}
						else if (route === 'home') {
							return (
								<React.Fragment>
									<Logo />																		
									<Rank />
									<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
									<FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
								</React.Fragment>
							)
						}
						else if (route === 'register') {
							return (
								<React.Fragment>
									<Logo />									
									<Register changeRoute={this.changeRoute} signIn={this.signIn}/>
								</React.Fragment>
							)
						}
					})()
				}
			</div>
		);
	}
}

export default App;
