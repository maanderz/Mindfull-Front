import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';


class Recipes extends Component {
  static navigationOptions = {
    title: 'Recipes',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor (){
    super();
    this.state = {
      list: [],
      api: {
        id: 21580375,
        key : 'da87403dad4e077ff0e40d912cd1051a'
      },
    };
  }



  componentDidMount = () => {
    console.log('passing data :P', this.props.navigation.state.params.ingredients)
    let ingredients = this.props.navigation.state.params.ingredients
    console.log('ingredients', ingredients)
    let url = `https://api.yummly.com/v1/api/recipes?_app_id=${this.state.api.id}&_app_key=${this.state.api.key}`
    
    // let recipeUrl = 'https://www.yummly.com/recipe/'

    if (ingredients.length <= 0) {
      console.log('no input')
      this.props.navigation.navigate('Search')
    } else {
    ingredients.forEach(ingredient => 
      url += `&allowedIngredient[]=${ingredient}`
      )
      console.log('url', url)

    fetch(`${url}`, {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let recipeList = [];
      let recipe = {};
      responseJson.matches.forEach(key => (
        //recipe[name] = key.recipeName,
        //recipe[url] = key.smallImageUrls,        
        recipeList.push(key.recipeName)
        //recipeList.push(recipe)
      ))
      console.log('123', recipeList)
       let newList = {...this.state.list}
         newList = recipeList
          this.setState({
             list: newList
          }, () => console.log('newList is...',this.state.list))
    })
    .catch((error) => {
       console.error(error);
    });
  }



    // var ingredients = {ingredients: 'apple'};
    // // console.log(test)
    // fetch("http://192.168.88.99:3000/recipes", {
    //   method: "POST",
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body:  JSON.stringify(ingredients)
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   let newList = {...this.state.list}
    //   newList = responseJson.result
    //    this.setState({
    //       list: newList
    //    }, () => console.log('newList is...',this.state.list))
       
    // })
    // .catch((error) => {
    //    console.error(error);
    // });


 }


  render() {
    // let recipeList = this.props.recipes.map(recipe => {
    // });
    return (
      <View style={styles.container}>
        <Text>Ingredients I have:</Text>
        <FlatList
        data={this.props.navigation.state.params.ingredients}
        renderItem={({item}) => (
          <Text>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        />
        <Text>Recipes page</Text>
        <Button 
          raised
          color='black'
          title="Recipe Details"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center'}}
          onPress={() => this.props.navigation.navigate('RecipeDetails')}
        />
        <FlatList
        data={this.state.list}
        renderItem={({item}) => (
          <Text>{item}</Text>
          // <View>
          // <Text>{item.name}</Text>,
          // <Text>{item.smallImageUrls}</Text>
          // </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Recipes;