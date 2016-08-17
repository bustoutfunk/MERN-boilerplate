var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var connect = require('react-redux').connect;
var LineChart = require("react-chartjs").Line;

var WellData = React.createClass({
  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      type: 'Battery'
    }
  },

  getInitialState: function(){
    return {
      wellData: this.props.wellData || [],
      chartData: [], // Filters wellData
      chartLabels: [],
      dateRangeLabels: ['Month', 'Week', 'Day', 'Hour'],
      dateRange: 'Month'
    }
  },

  componentDidMount: function(){
    this._updateChartData(this.state.dateRange);
  },

  render: function(){
    var chartData = {
      labels: this.state.chartLabels,
      datasets: [
        {
          data: this.state.chartData
        }
      ]
    };

    var buttons = this.state.dateRangeLabels.map((label)=>{
      return <button key={label} onClick={ ()=>{this._updateChartRange(label)} }>{label}</button>
    });

    return (
      <div>
        {buttons}
        <LineChart data={chartData} width="600" height="250" />
      </div>
    )
  },

  _updateChartRange: function(rangeValue) {
    this._updateChartData(rangeValue);
  },

  _updateChartData: function(rangeValue) {
    var chartData = [];
    var chartLabels = [];

    var viewToData = {'Battery': 'battery', 'Temperature': 'temp', 'Water': 'level'};
    var rangeToFormat = {'Month': 'M/D/YY', 'Week': 'M/D/YY', 'Day': 'HH:mm', 'Hour': 'mm:ss'}

    _.each(this.state.wellData, function(dataPoint){
      if(dataPoint.well_id === '100'){ //Change Well ID later
        // Get X-Value Label
        var label = moment(dataPoint.record_date, "YYYY-MM-DD HH:mm:ss Z");

        // If Date is not in range, skip to the next point
        if(!this._dateWithinRange(rangeValue, label))
          return;

        chartLabels.push(label.format(rangeToFormat[rangeValue]));

        // Get Y-Value
        var value = dataPoint[viewToData[this.props.type]];
        if(!isNaN(value)) {
          value = parseFloat(value); 
          chartData.push(value);
        }
        else throw new Error('Invalid Well Value');
      }
    }, this);

    this.setState({
      dateRange: rangeValue,
      chartData: chartData,
      chartLabels: chartLabels
    });
  },

  _dateWithinRange: function(range, date) {
    var currentDate = moment()
    var priorDate = moment()

    //FIX HOUR

    //Set Prior Date
    switch(range){
      case 'Month':
        priorDate.subtract(1, 'months');
        break;
      case 'Week':
        priorDate.subtract(7, 'days');
        break;
      case 'Day':
        priorDate.subtract(1, 'days');
        break;
      case 'Hour':
        priorDate.subtract(1, 'hours');
        break;
    }

    //Parse Date and see if it's within the range
    date = moment(date);
    return (date.unix() >= priorDate.unix() && date.unix() <= currentDate.unix())
  }

});

var mapStateToProps = function(state){
  return {
    wellData: [
      {
        "id": "37",
        "level": "H",
        "battery": "73.5",
        "temp": "82.4",
        "well_id": "100",
        "record_date": "2016-7-20 11:10:48",
        "record_by": "3",
        "mac_address": "0013A20040C42A47",
        "stat1": "1",
        "stat2": "1",
        "pg": "1",
        "created": "2015-12-06 14:10:49",
        "modified": "2015-12-06 14:10:49",
        "is_send_push": "0"
      },
      {
        "id": "38",
        "level": "H",
        "battery": "73.1",
        "temp": "82.4",
        "well_id": "100",
        "record_date": "2016-8-10 11:24:52",
        "record_by": "3",
        "mac_address": "0013A20040C42A47",
        "stat1": "1",
        "stat2": "1",
        "pg": "1",
        "created": "2015-12-06 14:24:53",
        "modified": "2015-12-06 14:24:53",
        "is_send_push": "0"
      },
      {
        "id": "39",
        "level": "H",
        "battery": "73.4",
        "temp": "82.4",
        "well_id": "100",
        "record_date": "2016-8-11 11:25:06",
        "record_by": "3",
        "mac_address": "0013A20040C42A47",
        "stat1": "1",
        "stat2": "1",
        "pg": "1",
        "created": "2015-12-06 14:25:07",
        "modified": "2015-12-06 14:25:07",
        "is_send_push": "0"
      },
      {
        "id": "42",
        "level": "H",
        "battery": "73.21",
        "temp": "87.8",
        "well_id": "100",
        "record_date": "2016-8-17 19:55:21",
        "record_by": "3",
        "mac_address": "0013A20040C42A47",
        "stat1": "1",
        "stat2": "1",
        "pg": "1",
        "created": "2015-12-11 12:26:22",
        "modified": "2015-12-11 12:26:22",
        "is_send_push": "0"
      },
      {
        "id": "46",
        "level": "H",
        "battery": "73.9",
        "temp": "84.2",
        "well_id": "100",
        "record_date": "2016-8-17 20:00:06",
        "record_by": "0",
        "mac_address": "0013A20040C42A47",
        "stat1": "1",
        "stat2": "1",
        "pg": "1",
        "created": "2016-01-25 13:29:56",
        "modified": "2016-01-25 13:29:56",
        "is_send_push": "0"
      }
    ]
  }
}

module.exports = connect(mapStateToProps)(WellData);

