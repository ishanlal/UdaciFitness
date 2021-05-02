import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import {timeToString, getDailyReminderValue} from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends Component {
  /*static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    const year = entryId.slice(0,4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }*/

  reset = () => {
    const { remove, goBack, entryID } = this.props;

    remove();
    goBack();
    removeEntry(entryID);
  }
  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }
  render () {

    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{margin: 20}}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
})

function mapStateToProps (state, { route }) {
  const { entryID } = route.params;

  return {
    entryID,
    metrics: state[entryID]
  }
}

function mapDispatchToProps (dispatch, { navigation, route }) {
  const { entryID } = route.params;

  return {
    remove: () => dispatch(addEntry({
      [entryID]: timeToString() === entryID
        ? getDailyReminderValue()
        : new Array()
    })),
    goBack: () => navigation.goBack()
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(EntryDetail);
