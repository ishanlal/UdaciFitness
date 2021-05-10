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

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  }
  shouldComponentUpdate (nextProps) {
    const metrics = nextProps.metrics;
    return metrics.length && !metrics[0].today
    //return nextProps.metrics !== null && !nextProps.metrics.today
  }
  render () {

    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics[0]} />
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
  const { entryId } = route.params;
  return {
    metrics: state[entryId]
  }
}

function mapDispatchToProps (dispatch, { navigation, route }) {
  const { entryId } = route.params;
  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : new Array()
    })),
    goBack: () => navigation.goBack()
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(EntryDetail);
