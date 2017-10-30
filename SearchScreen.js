import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  FlatList, 
  ActivityIndicator
} from 'react-native';

import { List, ListItem, SearchBar, ButtonGroup } from "react-native-elements";

import styles from './styles';

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      searchItem: "email",
      searchItems: [
        "email",
        "first_name",
        "last_name"
      ],
      searchTerm: "",
      error: null,
      selectedIndex: 0,
      refreshing: true
    };

    this.updateIndex = this.updateIndex.bind(this)
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, searchItem, searchTerm } = this.state;
    const url = `https://sandbox.glofox.com/2.0/members?page=${page}&limit=12&${searchItem}=${searchTerm}`;
    this.setState({ loading: true });
    const fetchParam = {
      method:'get',
      headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJzYW5kYm94Lmdsb2ZveC5jb20iLCJleHAiOjE1MTExOTIyNzYsImlhdCI6MTUwODUxMzg3NiwiaXNzIjoic2FuZGJveC5nbG9mb3guY29tIiwibmJmIjoxNTA4NTEzODc2LCJ1c2VyIjp7Il9pZCI6IjU5MTFhYzlhMTYzZDk2M2EwMjAwMDAwMCIsIm5hbWVzcGFjZSI6InRoZXdvZGZhY3RvcnkiLCJicmFuY2hfaWQiOiI1NmNkYzAxNTVjNDZiYjE3NmJiOTI1ODIiLCJmaXJzdF9uYW1lIjoiQ3VjdW1iZXIiLCJsYXN0X25hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlzU3VwZXJBZG1pbiI6ZmFsc2V9fQ.cVEXvLx0xhkXHLn_XbQj-8iU3bG3Vsn4vZbtQlD60PE',
        'Content-Type': 'application/json'
      }
    }

    fetch(url, fetchParam)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.data : [...this.state.data, ...res.data],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleSearch = (searchTerm) => {

    if(this.state.searchItem === 'email')
      searchTerm = searchTerm.toLowerCase();
    
    this.setState({searchTerm});
    this.handleRefresh();
  }

  updateIndex (selectedIndex) {
    var searchItem = this.state.searchItems[selectedIndex];

    this.setState({selectedIndex});
    this.setState({searchItem});

    this.handleRefresh();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    const buttons = ['Email', 'First Name', 'Last Name']
    const { selectedIndex } = this.state
    return ( 
      <View>
        <SearchBar 
          placeholder="Type Here..." 
          onChangeText={this.handleSearch} 
          ref={search => this.search = search}
          lightTheme round /> 
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 40}} />
      </View>
        );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  static navigationOptions = {
    title: 'Welcome',
    tabBarLabel: 'Search Members',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../GlofoxMembers/images/search-icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <ListItem
                  roundAvatar
                  title={`${item.first_name} ${item.last_name}`}
                  subtitle={item.email}
                  avatar={{ uri: item.image_url }}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              )}
              keyExtractor={item => item.email}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
            />
          </List>
      </View>
    );
  }
}

export default SearchScreen;


