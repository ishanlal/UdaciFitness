import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Agenda as UdaciFitnessCalendar } from 'react-native-calendars'
import {white} from '../utils/colors'
//import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
//import { AppLoading } from 'expo'
import { AppLoading } from 'expo'

class History extends Component {
  /*state = {
    ready: false,
  }*/
  state = {
    ready: false,
    selectedDate: new Date().toISOString().slice(0,10)
  }
  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarResults()
    .then((entries) => dispatch(receiveEntries(entries)))
    .then(({entries}) => {
      if (!entries[timeToString()]) {
        dispatch(addEntry({
          [timeToString()]: getDailyReminderValue()
        }))
      }
    })
    .then(() => this.setState(() => ({
      ready: true
    })))
  }
  //renderItem = ({today, ...metrics}, formattedDate, key) => (
  renderItem = (dateKey, {today, ...metrics}, firstItemInDay) => (
    <View style={styles.item}>
      {today
        ? <View>
            //<DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableOpacity onPress={() => console.log('Pressed!')}>
            //<MetricCard metrics={metrics} date={formattedDate} />
            <MetricCard metrics={metrics} />
          </TouchableOpacity>}
    </View>
  )
  //renderEmptyDate(formattedDate) {
  renderEmptyDate() {
    return (
      <View style={styles.item}>
        //<DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  onDayPress = (day) => {
          this.setState({
              selectedDate: day.dateString
          })
      };

    render() {
      const { entries } = this.props;
      //const { ready } = this.state
      const { ready, selectedDate } = this.state;

      if (ready === false) {
        return <AppLoading />
      }

      return (
          {/*<UdaciFitnessCalendar
            items={entries}
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
           />*/}
           <UdaciFitnessCalendar
              items={entries}
              onDayPress={this.onDayPress}
              renderItem={(item, firstItemInDay) => this.renderItem(selectedDate, item, firstItemInDay)}
              renderEmptyDate={this.renderEmptyDate}
                  />
      )
    }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20 ,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps (entries) {
  return {
    entries,
  }
}

export default connect(mapStateToProps)(History);
