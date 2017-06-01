// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   Image,
//   FlatList, 
//   ScrollView
// } from 'react-native';
// import { StackNavigator } from 'react-navigation';
// import NavBar from './App/Components/NavBar';
// import TopBar from './App/Components/TopBar';
// import CurrencyBlock from './App/Components/CurrencyBlock';
// import images from './App/Config/images';
// import axios from 'axios';

// export default class Obsidian extends Component {
//   static navigationOptions = {
//     header: null,
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       currencies: []
//     };
//   }

//   componentDidMount() {
//      axios.get('http:/localhost:3000/')
//        .then(res => {
//         console.log(res.data);
//          const currencies = res.data;
//          this.setState({ currencies });
//        });
//    }

//    _keyExtractor = (item, index) => item.data.id;

//    renderItem = ({item}) => {
//     console.log(item);
//     return (
//       <CurrencyBlock key={item.data.id} name = {item.name} amount={item.data.last} shares={item.shares}/>
//     )
//   }

//   render() {
//     const { navigate } = this.props.navigation;
//     let nameList;
//     return (
//       <View style={styles.background}>
//         <TopBar />
//         <View style={styles.nav}>
//           <View style={{flexDirection: 'row'}}>
//             <View style={{flex: 1}}>
//               <TouchableHighlight onPress={() => navigate('Profile')} >
//               <Image source={images.person} style={{width: 25, height: 25, marginLeft: 10}} />
//               </TouchableHighlight>
//             </View>
//             <View style={{flex: 1, alignItems: 'center'}}>
//             <Image source={images.logo} style={{ width: 35, height: 25}}/>
//             </View>
//             <View style={{flex: 1}}/>
//           </View>
//         </View>

//         <View style={styles.container}>
//           <View style={{flex: 1, flexDirection: 'column',}}>
//             <FlatList
//               data={this.state.currencies}
//               renderItem={this.renderItem}
//               keyExtractor={this._keyExtractor}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// class ProfileScreen extends React.Component {
//   static navigationOptions = {
//     header: null
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View>
//       <TopBar />
//       <View style={styles.nav}>
//           <View style={{flexDirection: 'row'}}>
//             <View style={{flex: 1}}>
//               <TouchableHighlight onPress={() => navigate('Home')} >
//               <Image source={images.person} style={{width: 25, height: 25, marginLeft: 10}} />
//               </TouchableHighlight>
//             </View>
//             <View style={{flex: 1, alignItems: 'center'}}>
//             <Image source={images.logo} style={{ width: 35, height: 25}}/>
//             </View>
//             <View style={{flex: 1}}/>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }



// const ObsidianApp = StackNavigator({
//   Home: { screen: Obsidian },
//   Profile: { screen: ProfileScreen },
//   });

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     margin: 10,
//     backgroundColor: '#312F32',
//   },
//   background: {
//     height: '100%',
//     backgroundColor: '#1F2223',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//    nav: {
//     backgroundColor: '#DC6464',
//     height: 50,
//     paddingTop: 15,
//   },
// });

// AppRegistry.registerComponent('Obsidian', () => ObsidianApp);




// <View style={styles.background}>
//       <View style=>
//       </View>
//       <View>
//       <Card>
//         <CardSection>
//           <Input
//             placeholder="user@email.com"
//             label="Email"
//             value={this.state.email}
//             onChangeText={email => this.setState({ email })}
//           />
//         </CardSection>

//         <CardSection>
//           <Input
//             secureTextEntry
//             placeholder="password"
//             label="Password"
//             value={this.state.password}
//             onChangeText={password => this.setState({ password })}
//           />
//         </CardSection>

//         <Text style={styles.errorTextStyle}>
//           {this.state.error}
//         </Text>

//         <CardSection>
//           {this.renderButton()}
//         </CardSection>
//       </Card>
//       </View>
//       </View>