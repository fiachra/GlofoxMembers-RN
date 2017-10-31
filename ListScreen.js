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

class ListScreen extends Component {
  constructor(props) {
    super(props);
    // this constructor defines the cutom state of the comonent
    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
    };
  }


  componentDidMount() {
    this.makeRemoteRequest();
  }

  //Make the request from the server 
  makeRemoteRequest = () => {
    const { page } = this.state;
    const url = `https://sandbox.glofox.com/2.0/members?page=${page}&limit=12`;
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

        console.log(res.data.length);
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

  handleSearch = () => {
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

  static navigationOptions = {
    title: 'Welcome',
    tabBarLabel: 'List Members',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../GlofoxMembers/images/list-icon.png')}
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
              //Here we bind the functions needed for lazy loading and refreshing
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={3}
            />
          </List>
      </View>
    );
  }
}

export default ListScreen;